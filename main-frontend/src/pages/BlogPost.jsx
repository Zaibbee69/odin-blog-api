import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CommentSection from "../components/CommentSection";
import { getReadTime, formatDate } from "../components/postUtils";

/**
 * BlogPost
 * Public single-post reading view. Fetches GET /posts/:id, which
 * returns { id, title, content, status, createdAt, updatedAt,
 * user: { name }, comments: [...] }, and renders the full article
 * followed by its comment thread.
 *
 * currentUser / authToken are passed through to CommentSection so
 * a signed-in visitor can comment; this page doesn't implement auth
 * itself, it just forwards whatever the app already knows.
 */
export default function BlogPost({
  currentUser = null,
  authToken = null,
  onLogout,
}) {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | success | notFound | error

  useEffect(() => {
    let isMounted = true;

    async function fetchPost() {
      setStatus("loading");
      try {
        const response = await fetch(`http://localhost:3000/posts/${id}`);
        if (response.status === 404) {
          if (isMounted) setStatus("notFound");
          return;
        }
        if (!response.ok) throw new Error("Failed to load post");
        const data = await response.json();
        const resolvedPost = data?.post ?? data;
        if (isMounted) {
          setPost(resolvedPost);
          setStatus("success");
        }
      } catch (err) {
        if (isMounted) setStatus("error");
        console.error(err);
      }
    }

    fetchPost();
    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <div className="min-h-screen bg-white text-black antialiased">
      <Navbar currentUser={currentUser} onLogout={onLogout} />

      <main className="mx-auto max-w-2xl px-6 py-14 sm:py-20">
        {status === "loading" && <ArticleSkeleton />}
        {status === "notFound" && (
          <StateMessage
            heading="Post not found"
            body="This story may have been unpublished or moved."
          />
        )}
        {status === "error" && (
          <StateMessage
            heading="Couldn't load this post"
            body="Something went wrong reaching the server. Check your connection and try again."
            actionLabel="Try again"
            onAction={() => window.location.reload()}
          />
        )}

        {status === "success" && post && (
          <>
            <Article post={post} />
            <div className="mt-16 border-t border-zinc-200 pt-12">
              <CommentSection
                postId={post.id}
                initialComments={post.comments ?? []}
                currentUser={currentUser}
                authToken={authToken}
              />
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

function Article({ post }) {
  const { title, content = "", createdAt, user } = post;
  const readTime = getReadTime(content);
  const publishedDate = formatDate(createdAt, { long: true });

  const paragraphs = content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <article>
      <header className="mb-10">
        <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-zinc-500">
          {publishedDate && <span>{publishedDate}</span>}
          <span aria-hidden="true">·</span>
          <span>{readTime} min read</span>
        </div>
        <h1 className="font-serif text-4xl leading-[1.1] tracking-tight text-black sm:text-5xl">
          {title}
        </h1>
        {user?.name && (
          <p className="mt-6 text-sm text-zinc-600">
            By <span className="text-black">{user.name}</span>
          </p>
        )}
      </header>

      <div className="flex flex-col gap-6 text-lg leading-relaxed text-zinc-800">
        {paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}

function ArticleSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-4 h-3 w-40 bg-zinc-100" />
      <div className="mb-2 h-10 w-full bg-zinc-100" />
      <div className="mb-8 h-10 w-2/3 bg-zinc-100" />
      <div className="flex flex-col gap-3">
        <div className="h-4 w-full bg-zinc-100" />
        <div className="h-4 w-full bg-zinc-100" />
        <div className="h-4 w-5/6 bg-zinc-100" />
        <div className="h-4 w-full bg-zinc-100" />
        <div className="h-4 w-3/4 bg-zinc-100" />
      </div>
    </div>
  );
}

function StateMessage({ heading, body, actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-start gap-4 py-10">
      <h1 className="font-serif text-3xl text-black">{heading}</h1>
      <p className="max-w-md text-zinc-500">{body}</p>
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="rounded-full border border-zinc-900 px-5 py-2 text-sm text-black transition-colors hover:bg-black hover:text-white"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
