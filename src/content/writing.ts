/**
 * Posts published on the Inkwell blog.
 *
 * The blog is the real thing — a separate deployed app with its own database.
 * This file is an index, not a copy: every entry links out. Add an entry when
 * you publish, keep the excerpt to one sentence.
 */

export const blogUrl = "https://inkwell-blog-eta.vercel.app";

export type WritingEntry = {
  title: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  /** Path on the blog, e.g. "/posts/the-build-that-looked-finished". */
  path: string;
  excerpt: string;
};

export const writing: WritingEntry[] = [
  {
    title: "The Build That Looked Finished",
    date: "2026-10-25",
    path: "/posts/the-build-that-looked-finished",
    excerpt:
      "A .next directory with twelve files and no BUILD_ID, and why exit codes are better evidence than directory listings.",
  },
  {
    title: "The Cookie Flag That Broke My Auth for Three Hours",
    date: "2026-10-24",
    path: "/posts/the-cookie-flag-that-broke-my-auth",
    excerpt:
      "sameSite strict versus lax, and the three lines of config worth writing down.",
  },
  {
    title: "Notes on Building a Search Box Nobody Hates",
    date: "2026-10-23",
    path: "/posts/notes-on-building-a-search-box",
    excerpt:
      "Debounce, cancellation, and why an empty-result state is a feature rather than a bug.",
  },
];

export function formatWritingDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}
