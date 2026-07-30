import { getExcerpt, getReadTime, formatDate } from "./postUtils";

/**
 * BlogCard
 * Editorial-style preview card for a single post. Used in grids
 * and lists across the public site.
 *
 * Expects the raw shape returned by GET /posts:
 * post: {
 *   id, title, content, status, createdAt, updatedAt,
 *   user: { name }, comments: [...]
 * }
 * index: optional position in the list, rendered as an issue number.
 */
export default function BlogCard({ post, index }) {
  if (!post) return null;

  const { id, title, content, createdAt, user, comments = [] } = post;

  const excerpt = getExcerpt(content);
  const readTime = getReadTime(content);
  const publishedDate = formatDate(createdAt);
  const issueNumber =
    typeof index === "number" ? String(index + 1).padStart(2, "0") : null;

  return (
    <a
      href={`/posts/${id}`}
      className="group flex flex-col border-b border-zinc-200 py-8 transition-opacity hover:opacity-80 last:border-b-0"
    >
      <div className="mb-2 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-zinc-500">
        {issueNumber && <span>No. {issueNumber}</span>}
        {publishedDate && (
          <>
            <span className="h-px w-4 bg-zinc-300" aria-hidden="true" />
            <span>{publishedDate}</span>
          </>
        )}
      </div>

      <h3 className="font-serif text-xl leading-snug text-black sm:text-2xl">
        {title}
      </h3>

      {excerpt && (
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
          {excerpt}
        </p>
      )}

      <div className="mt-4 flex items-center gap-3 text-xs text-zinc-500">
        {user?.name && <span>{user.name}</span>}
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
    </a>
  );
}

/**
 * BlogCardSkeleton
 * Loading placeholder matching BlogCard's layout, for use while
 * GET /posts is in flight.
 */
export function BlogCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-3 border-b border-zinc-200 py-8 last:border-b-0">
      <div className="h-3 w-24 bg-zinc-100" />
      <div className="h-6 w-3/4 bg-zinc-100" />
      <div className="h-4 w-full bg-zinc-100" />
      <div className="h-4 w-2/3 bg-zinc-100" />
    </div>
  );
}
