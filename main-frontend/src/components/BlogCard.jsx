/**
 * BlogCard
 * Editorial-style preview card for a single post. Used in grids
 * and lists across the public site. Purely presentational —
 * expects a `post` object shaped like the GET /posts response.
 *
 * post: {
 *   id, title, excerpt, coverImage, publishedAt,
 *   readTimeMinutes, author: { name }, tags: []
 * }
 * index: optional position in the list, rendered as an issue number.
 */
export default function BlogCard({ post, index }) {
  if (!post) return null;

  const {
    id,
    title,
    excerpt,
    coverImage,
    publishedAt,
    readTimeMinutes,
    author,
    tags = [],
  } = post;

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const issueNumber =
    typeof index === "number" ? String(index + 1).padStart(2, "0") : null;

  return (
    <a
      href={`/posts/${id}`}
      className="group flex flex-col overflow-hidden border-b border-zinc-200 pb-8 transition-opacity last:border-b-0 hover:opacity-80 sm:flex-row sm:gap-6 sm:pb-10"
    >
      {coverImage && (
        <div className="mb-4 aspect-[16/10] w-full overflow-hidden bg-zinc-100 sm:mb-0 sm:w-56 sm:flex-shrink-0">
          <img
            src={coverImage}
            alt=""
            className="h-full w-full object-cover grayscale transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col justify-center">
        <div className="mb-2 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-zinc-500">
          {issueNumber && <span>No. {issueNumber}</span>}
          {formattedDate && (
            <>
              <span className="h-px w-4 bg-zinc-300" aria-hidden="true" />
              <span>{formattedDate}</span>
            </>
          )}
        </div>

        <h3 className="font-serif text-xl leading-snug text-black sm:text-2xl">
          {title}
        </h3>

        {excerpt && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-600 sm:text-base">
            {excerpt}
          </p>
        )}

        <div className="mt-4 flex items-center gap-3 text-xs text-zinc-500">
          {author?.name && <span>{author.name}</span>}
          {author?.name && readTimeMinutes && <span aria-hidden="true">·</span>}
          {readTimeMinutes && <span>{readTimeMinutes} min read</span>}
          {tags.length > 0 && (
            <>
              <span aria-hidden="true">·</span>
              <span className="truncate">{tags.slice(0, 2).join(", ")}</span>
            </>
          )}
        </div>
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
    <div className="flex animate-pulse flex-col border-b border-zinc-200 pb-8 sm:flex-row sm:gap-6 sm:pb-10">
      <div className="mb-4 aspect-[16/10] w-full flex-shrink-0 bg-zinc-100 sm:mb-0 sm:w-56" />
      <div className="flex flex-1 flex-col justify-center gap-3">
        <div className="h-3 w-24 bg-zinc-100" />
        <div className="h-6 w-3/4 bg-zinc-100" />
        <div className="h-4 w-full bg-zinc-100" />
        <div className="h-4 w-2/3 bg-zinc-100" />
      </div>
    </div>
  );
}
