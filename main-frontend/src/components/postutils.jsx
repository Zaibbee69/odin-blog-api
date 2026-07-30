/**
 * postUtils
 * Small helpers to derive display-only values from the raw Post
 * shape returned by the API (id, title, content, status, createdAt,
 * updatedAt, user: { name }, comments: []). The schema has no
 * excerpt/readTime/image fields, so we compute them on the client.
 */

const WORDS_PER_MINUTE = 200;

/** Strip basic markdown/HTML markup so previews read as plain text. */
function stripMarkup(content = "") {
  return content
    .replace(/<[^>]*>/g, " ")
    .replace(/[#*_>`~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** First `maxLength` characters of a post's content, word-safe. */
export function getExcerpt(content = "", maxLength = 160) {
  const plain = stripMarkup(content);
  if (plain.length <= maxLength) return plain;
  const truncated = plain.slice(0, maxLength);
  return `${truncated.slice(0, truncated.lastIndexOf(" "))}…`;
}

/** Estimated reading time in whole minutes, minimum 1. */
export function getReadTime(content = "") {
  const wordCount = stripMarkup(content).split(" ").filter(Boolean).length;
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
}

/** Format an ISO date string (createdAt/updatedAt) for display. */
export function formatDate(isoString, options = {}) {
  if (!isoString) return null;
  return new Date(isoString).toLocaleDateString("en-US", {
    month: options.long ? "long" : "short",
    day: "numeric",
    year: "numeric",
  });
}
