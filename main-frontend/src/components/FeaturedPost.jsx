/**
 * FeaturedPost
 * Large-format hero for the single most recent post, sat at the
 * top of the homepage. Signature device: an oversized drop cap
 * pulled from the excerpt, echoing a printed-magazine opening spread.
 *
 * post: same shape as BlogCard's `post` prop.
 */
export default function FeaturedPost({ post }) {
  if (!post) return null;

  const {
    id,
    title,
    excerpt,
    coverImage,
    publishedAt,
    readTimeMinutes,
    author,
  } = post;

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const firstLetter = excerpt?.trim().charAt(0);
  const restOfExcerpt = excerpt?.trim().slice(1);

  return (
    <a href={`/posts/${id}`} className="group block">
      <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-zinc-500">
        <span className="border border-zinc-900 px-2 py-1 text-black">
          Latest
        </span>
        {formattedDate && <span>{formattedDate}</span>}
      </div>

      <div className="grid gap-8 md:grid-cols-5 md:gap-12">
        <div className="md:col-span-3">
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
            {author?.name && <span className="text-black">{author.name}</span>}
            {author?.name && readTimeMinutes && (
              <span aria-hidden="true">·</span>
            )}
            {readTimeMinutes && <span>{readTimeMinutes} min read</span>}
          </div>

          <span className="mt-8 inline-block border-b border-black pb-1 text-sm text-black transition-opacity group-hover:opacity-60">
            Read the story
          </span>
        </div>

        {coverImage && (
          <div className="md:col-span-2">
            <div className="aspect-[4/5] w-full overflow-hidden bg-zinc-100">
              <img
                src={coverImage}
                alt=""
                className="h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
          </div>
        )}
      </div>
    </a>
  );
}
