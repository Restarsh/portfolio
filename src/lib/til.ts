import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

/**
 * Today-I-learned notes, read from content/til/*.md at build time.
 *
 * These files are committed by the site author and never accept user input, so
 * the rendered HTML is trusted and is not sanitised. If this ever grew a
 * submission form, that would have to change — see the README.
 */

const TIL_DIR = path.join(process.cwd(), "content", "til");

export type TilMeta = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
};

export type TilPost = TilMeta & { html: string };

function ensureDir(): string[] {
  if (!fs.existsSync(TIL_DIR)) return [];
  return fs
    .readdirSync(TIL_DIR)
    .filter((file) => file.endsWith(".md"))
    .sort();
}

function parseFile(file: string): { meta: TilMeta; body: string } {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(TIL_DIR, file), "utf8");
  const { data, content } = matter(raw);

  const date =
    data.date instanceof Date
      ? data.date.toISOString().slice(0, 10)
      : typeof data.date === "string"
        ? data.date.slice(0, 10)
        : "";

  return {
    meta: {
      slug,
      title: typeof data.title === "string" ? data.title : slug,
      date,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    },
    body: content,
  };
}

/** All notes, newest first. Metadata only — cheap to call from a list page. */
export function getAllTilMeta(): TilMeta[] {
  return ensureDir()
    .map((file) => parseFile(file).meta)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

/** A single note with rendered HTML, or null if the slug does not exist. */
export async function getTilPost(slug: string): Promise<TilPost | null> {
  // Reject anything that could traverse out of the content directory.
  if (!/^[a-z0-9-]+$/i.test(slug)) return null;

  const file = `${slug}.md`;
  if (!fs.existsSync(path.join(TIL_DIR, file))) return null;

  const { meta, body } = parseFile(file);
  const html = await marked.parse(body, { gfm: true, breaks: false });

  return { ...meta, html };
}

export function formatTilDate(iso: string): string {
  if (!iso) return "";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}
