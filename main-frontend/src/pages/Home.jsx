import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FeaturedPost from "../components/FeaturedPost";
import BlogCard, { BlogCardSkeleton } from "../components/BlogCard";

const POSTS_PER_PAGE = 6;

/**
 * Home
 * Public blog landing page. Fetches published posts from GET /posts
 * (returns Post[] with { id, title, content, status, createdAt,
 * updatedAt, user: { name }, comments: [] } — the server already
 * filters to published posts), spotlights the most recent as a
 * hero, and lists the rest in a reading grid with simple
 * client-side "load more" pagination.
 *
 * This page is read-only: no create/edit/publish/delete affordances
 * live here, that belongs to the separate author dashboard.
 */
export default function Home() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  useEffect(() => {
    let isMounted = true;

    async function fetchPosts() {
      setStatus("loading");
      try {
        const response = await fetch("http://localhost:3000/posts");
        if (!response.ok) throw new Error("Failed to load posts");
        const data = await response.json();
        if (isMounted) {
          setPosts(Array.isArray(data) ? data : (data.posts ?? []));
          setStatus("success");
        }
      } catch (err) {
        if (isMounted) setStatus("error");
        console.error(err);
      }
    }

    fetchPosts();
    return () => {
      isMounted = false;
    };
  }, []);

  const [featured, ...rest] = posts;
  const visiblePosts = rest.slice(0, visibleCount);
  const hasMore = visibleCount < rest.length;

  return (
    <div className="min-h-screen bg-white text-black antialiased">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6">
        {/* Hero / featured post */}
        <section className="border-b border-zinc-200 py-14 sm:py-20">
          {status === "loading" && <FeaturedSkeleton />}
          {status === "success" && featured && <FeaturedPost post={featured} />}
          {status === "success" && !featured && (
            <EmptyState
              heading="Nothing published yet"
              body="Once a post goes live, it'll appear here first."
            />
          )}
          {status === "error" && (
            <ErrorState onRetry={() => window.location.reload()} />
          )}
        </section>

        {/* Post grid */}
        {(status === "loading" ||
          (status === "success" && rest.length > 0)) && (
          <section className="py-14 sm:py-20">
            <div className="mb-10 flex items-baseline justify-between">
              <h2 className="font-serif text-2xl text-black">
                More from the archive
              </h2>
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                {status === "success" ? `${rest.length} posts` : ""}
              </span>
            </div>

            <div className="flex flex-col">
              {status === "loading" &&
                Array.from({ length: 4 }).map((_, i) => (
                  <BlogCardSkeleton key={i} />
                ))}

              {status === "success" &&
                visiblePosts.map((post, i) => (
                  <BlogCard key={post.id} post={post} index={i} />
                ))}
            </div>

            {status === "success" && hasMore && (
              <div className="mt-12 flex justify-center">
                <button
                  type="button"
                  onClick={() =>
                    setVisibleCount((count) => count + POSTS_PER_PAGE)
                  }
                  className="rounded-full border border-zinc-900 px-6 py-2.5 text-sm text-black transition-colors hover:bg-black hover:text-white"
                >
                  Load more posts
                </button>
              </div>
            )}
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

function FeaturedSkeleton() {
  return (
    <div className="grid animate-pulse gap-8 md:grid-cols-5 md:gap-12">
      <div className="flex flex-col gap-4 md:col-span-3">
        <div className="h-3 w-32 bg-zinc-100" />
        <div className="h-10 w-full bg-zinc-100" />
        <div className="h-10 w-2/3 bg-zinc-100" />
        <div className="mt-4 h-4 w-full bg-zinc-100" />
        <div className="h-4 w-5/6 bg-zinc-100" />
      </div>
      <div className="md:col-span-2">
        <div className="aspect-[4/5] w-full bg-zinc-100" />
      </div>
    </div>
  );
}

function EmptyState({ heading, body }) {
  return (
    <div className="flex flex-col items-start gap-2 py-10">
      <h2 className="font-serif text-2xl text-black">{heading}</h2>
      <p className="max-w-md text-zinc-500">{body}</p>
    </div>
  );
}

function ErrorState({ onRetry }) {
  return (
    <div className="flex flex-col items-start gap-4 py-10">
      <h2 className="font-serif text-2xl text-black">Couldn't load posts</h2>
      <p className="max-w-md text-zinc-500">
        Something went wrong reaching the server. Check your connection and try
        again.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-full border border-zinc-900 px-5 py-2 text-sm text-black transition-colors hover:bg-black hover:text-white"
      >
        Try again
      </button>
    </div>
  );
}
