import { Link } from "react-router";
import { getExcerpt, getReadTime, formatDate } from "./postUtils";

/**
 * FeaturedPost
 * Full-width hero for the single most recent post, at the top of
 * the homepage. There's no image field in the schema, so the type
 * itself carries the weight: a large serif headline over a
 * drop-cap opening line, in the spirit of a printed opinion page.
 *
 * post: same shape as BlogCard's `post` prop.
 */
export default function FeaturedPost({ post }) {
  if (!post) return null;

  const { id, title, content, createdAt, user, comments = [] } = post;

  const excerpt = getExcerpt(content, 240);
  const readTime = getReadTime(content);
  const publishedDate = formatDate(createdAt, { long: true });

  const firstLetter = excerpt?.charAt(0);
  const restOfExcerpt = excerpt?.slice(1);

  return (
    <Link to={`/posts/${id}`} className="group block">
      <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-zinc-500">
        <span className="border border-zinc-900 px-2 py-1 text-black">
          Latest
        </span>
        {publishedDate && <span>{publishedDate}</span>}
      </div>

      <div className="max-w-3xl">
        <h1 className="font-serif text-4xl leading-[1.1] tracking-tight text-black sm:text-5xl">
          {title}
        </h1>

        {excerpt && (
          <p className="mt-6 text-lg leading-relaxed text-zinc-600">
            {firstLetter && (
              <span className="float-left mr-2 mt-1 font-serif text-6xl leading-[0.85] text-black">
                {firstLetter}
              </span>
            )}
            {restOfExcerpt}
          </p>
        )}

        <div className="mt-6 flex items-center gap-3 text-sm text-zinc-500">
          {user?.name && <span className="text-black">{user.name}</span>}
          {user?.name && <span aria-hidden="true">·</span>}
          <span>{readTime} min read</span>
          {comments.length > 0 && (
            <>
              <span aria-hidden="true">·</span>
              <span>
                {comments.length} comment{comments.length === 1 ? "" : "s"}
              </span>
            </>
          )}
        </div>

        <span className="mt-8 inline-block border-b border-black pb-1 text-sm text-black transition-opacity group-hover:opacity-60">
          Read the story
        </span>
      </div>
    </Link>
  );
}
