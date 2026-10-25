import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTilMeta, getTilPost, formatTilDate } from "@/lib/til";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getAllTilMeta().map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getTilPost(slug);
  if (!post) return { title: "Note not found" };

  return {
    title: post.title,
    description: post.title,
  };
}

export default async function TilPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getTilPost(slug);
  if (!post) notFound();

  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <Link href="/til" className="text-sm text-muted transition hover:text-ink">
          ← All notes
        </Link>

        <h1 className="text-2xl font-semibold leading-tight tracking-tight">{post.title}</h1>

        <div className="flex flex-wrap items-center gap-3">
          <time
            dateTime={post.date}
            className="font-mono text-xs text-muted"
          >
            {formatTilDate(post.date)}
          </time>
          {post.tags.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <li key={tag} className="chip">
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      {/* Trusted HTML: authored in this repository, rendered at build time. */}
      <div className="prose max-w-prose" dangerouslySetInnerHTML={{ __html: post.html }} />

      <footer className="border-t border-line pt-6">
        <Link href="/til" className="text-sm text-muted transition hover:text-ink">
          ← All notes
        </Link>
      </footer>
    </article>
  );
}
