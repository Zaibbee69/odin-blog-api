import { formatDate } from "./postUtils";

/**
 * CommentItem
 * Renders a single comment. Purely presentational.
 *
 * comment: { id, content, createdAt, user: { name } }
 */
export default function CommentItem({ comment }) {
  const { content, createdAt, user } = comment;

  return (
    <li className="border-b border-zinc-100 py-6 last:border-b-0">
      <div className="mb-2 flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 font-mono text-xs text-white">
          {user?.name ? user.name.charAt(0).toUpperCase() : "?"}
        </span>
        <span className="text-sm font-medium text-black">
          {user?.name ?? "Anonymous"}
        </span>
        <span className="text-xs text-zinc-400">{formatDate(createdAt)}</span>
      </div>
      <p className="pl-10 text-sm leading-relaxed text-zinc-700">{content}</p>
    </li>
  );
}
