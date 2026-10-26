import { blogUrl, fallbackWriting, type WritingEntry } from "@/content/writing";

/**
 * Fetches posts from Inkwell's public API at build time.
 *
 * ISR: the page revalidates hourly, so publishing a post surfaces on the
 * portfolio without a redeploy. If the API is down or returns nothing, the
 * fallback list is used and the build continues.
 */

type ApiPost = {
  slug: string;
  title: string;
  content: string;
  createdAt: string;
};

type ApiResponse = { items?: ApiPost[] };

function toExcerpt(content: string, max = 170): string {
  const plain = content.replace(/\s+/g, " ").trim();
  return plain.length > max ? `${plain.slice(0, max).trimEnd()}...` : plain;
}

function toEntry(post: ApiPost): WritingEntry {
  return {
    title: post.title,
    date: post.createdAt.slice(0, 10),
    path: `/posts/${post.slug}`,
    excerpt: toExcerpt(post.content),
  };
}

export async function getWriting(limit = 20): Promise<WritingEntry[]> {
  try {
    const res = await fetch(`${blogUrl}/api/posts?limit=${limit}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`blog API returned HTTP ${res.status}`);

    const data = (await res.json()) as ApiResponse;
    if (!Array.isArray(data.items) || data.items.length === 0) {
      throw new Error("blog API returned no items");
    }

    return data.items.slice(0, limit).map(toEntry);
  } catch (err) {
    console.error("[blog] fetch failed, using fallback list:", err);
    return fallbackWriting.slice(0, limit);
  }
}
