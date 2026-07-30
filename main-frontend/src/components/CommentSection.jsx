import { useState } from "react";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";

/**
 * CommentSection
 * Displays a post's comments and lets a signed-in visitor add one
 * via POST /posts/:id/comments (authenticated).
 *
 * Auth itself lives outside this component — it's handed a
 * `currentUser` (or null) and an `authToken` to attach to the
 * request. This component only knows how to read and post comments.
 *
 * postId: number | string
 * initialComments: Array<{ id, content, createdAt, user: { name } }>
 * currentUser: { name } | null
 * authToken: string | null
 */
export default function CommentSection({
  postId,
  initialComments = [],
  currentUser = null,
  authToken = null,
}) {
  const [comments, setComments] = useState(initialComments);
  const [submitError, setSubmitError] = useState(null);

  async function handlePostComment(content) {
    setSubmitError(null);
    const response = await fetch(
      `http://localhost:3000/posts/${postId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
        body: JSON.stringify({ content }),
      },
    );

    if (!response.ok) {
      setSubmitError("Couldn't post your comment.");
      throw new Error("Failed to post comment");
    }

    const newComment = await response.json();
    setComments((current) => [newComment, ...current]);
  }

  return (
    <section aria-labelledby="comments-heading" className="py-4">
      <h2 id="comments-heading" className="mb-8 font-serif text-2xl text-black">
        {comments.length > 0
          ? `${comments.length} comment${comments.length === 1 ? "" : "s"}`
          : "Comments"}
      </h2>

      <div className="mb-10 border-b border-zinc-200 pb-10">
        <CommentForm currentUser={currentUser} onSubmit={handlePostComment} />
        {submitError && (
          <p className="mt-3 text-sm text-zinc-500">{submitError}</p>
        )}
      </div>

      {comments.length === 0 ? (
        <p className="text-sm text-zinc-500">
          No comments yet — be the first to share your thoughts.
        </p>
      ) : (
        <ul className="flex flex-col">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </ul>
      )}
    </section>
  );
}
