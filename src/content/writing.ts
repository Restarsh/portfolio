/**
 * Blog metadata.
 *
 * The post list comes from Inkwell's API at build time (src/lib/blog.ts).
 * The fallback below is used only when that API is unreachable — a blog outage
 * should degrade the page, not fail the deploy.
 */

export const blogUrl = "https://inkwell-blog-eta.vercel.app";

export type WritingEntry = {
  title: string;
  date: string; // YYYY-MM-DD
  path: string; // /posts/<slug>
  excerpt: string;
};

export const fallbackWriting: WritingEntry[] = [
  {
    title: "The Migration That Applied to the Wrong Database",
    date: "2026-10-25",
    path: "/posts/the-migration-that-applied-to-the-wrong-database",
    excerpt:
      "A migration that reported success against the wrong database, and why exit codes are worth less than knowing the target.",
  },
];

export function formatWritingDate(iso: string): string {
  if (!iso) return "";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}
