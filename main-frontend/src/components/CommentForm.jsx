import { useState } from "react";

/**
 * CommentForm
 * Lets a signed-in visitor leave a comment on a post
 * (POST /posts/:id/comments is authenticated).
 *
 * This component does not implement auth itself — it expects the
 * parent app to tell it who's signed in via `currentUser`, and to
 * supply `onSubmit(content)` which performs the actual request
 * (including attaching the auth token). If `currentUser` is null,
 * it shows a sign-in prompt instead of the textarea.
 *
 * currentUser: { name } | null
 * onSubmit: (content: string) => Promise<void>
 */
export default function CommentForm({ currentUser, onSubmit }) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  if (!currentUser) {
    return (
      <div className="flex flex-col items-start gap-3 border border-dashed border-zinc-300 px-6 py-8 text-center sm:items-center">
        <p className="text-sm text-zinc-600">Sign in to join the discussion.</p>
        <a
          href="/login"
          className="rounded-full border border-zinc-900 px-5 py-2 text-sm text-black transition-colors hover:bg-black hover:text-white"
        >
          Sign in
        </a>
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmed = content.trim();
    if (!trimmed || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);
    try {
      await onSubmit(trimmed);
      setContent("");
    } catch (err) {
      setError("Couldn't post your comment. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label htmlFor="comment" className="text-sm font-medium text-black">
        Leave a comment
      </label>
      <textarea
        id="comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={`Share your thoughts, ${currentUser.name}…`}
        rows={4}
        maxLength={2000}
        className="w-full resize-none border border-zinc-300 bg-white px-4 py-3 text-sm text-black placeholder:text-zinc-400 focus:border-black focus:outline-none"
      />

      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-400">
          {content.trim().length}/2000
        </span>
        <button
          type="submit"
          disabled={!content.trim() || isSubmitting}
          className="rounded-full bg-black px-5 py-2 text-sm text-white transition-opacity hover:opacity-80 disabled:opacity-40"
        >
          {isSubmitting ? "Posting…" : "Post comment"}
        </button>
      </div>

      {error && <p className="text-sm text-zinc-500">{error}</p>}
    </form>
  );
}
