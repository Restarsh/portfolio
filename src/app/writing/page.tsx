import type { Metadata } from "next";
import { blogUrl, formatWritingDate } from "@/content/writing";
import { getWriting } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Writing",
  description: "Posts published on my blog - notes on building software that holds up.",
};

export default async function WritingPage() {
  const posts = await getWriting();

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="eyebrow">Writing</p>
        <h1 className="text-2xl font-semibold tracking-tight">Notes on building things</h1>
        <p className="max-w-prose text-sm leading-relaxed text-muted">
          I write on a separate blog - it has its own database and its own deployment, which
          is itself one of the projects in the list. Everything below links out.
        </p>
      </header>

      <ul className="divide-y divide-line rounded-xl border border-line bg-surface">
        {posts.map((post) => (
          <li key={post.path}>
            <a
              href={`${blogUrl}${post.path}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-1.5 px-5 py-5 transition hover:bg-canvas"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-[15px] font-medium text-ink transition group-hover:text-accent">
                  {post.title}
                </span>
                <span className="font-mono text-xs text-muted">
                  {formatWritingDate(post.date)}
                </span>
              </div>
              <p className="max-w-prose text-sm leading-relaxed text-muted">{post.excerpt}</p>
            </a>
          </li>
        ))}
      </ul>

      <p className="text-sm text-muted">
        <a
          href={blogUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-accent hover:underline"
        >
          Visit the blog ↗
        </a>
      </p>
    </div>
  );
}

