import Link from "next/link";
import { site } from "@/content/site";
import { getFeaturedProjects } from "@/content/projects";
import { writing, blogUrl, formatWritingDate } from "@/content/writing";
import { getAllTilMeta, formatTilDate } from "@/lib/til";
import { ProjectCard } from "@/components/ProjectCard";

export default function HomePage() {
  const projects = getFeaturedProjects();
  const til = getAllTilMeta().slice(0, 3);
  const posts = writing.slice(0, 3);

  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="space-y-6">
        <p className="eyebrow">
          {site.role} · {site.location}
        </p>

        <h1 className="text-4xl font-semibold leading-[1.15] tracking-tight sm:text-[2.75rem]">
          {site.name}
          <span className="text-accent">.</span>
        </h1>

        <div className="max-w-prose space-y-4 text-[15px] leading-7 text-muted">
          {site.bio.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>

        <ul className="flex flex-wrap gap-1.5">
          {site.highlights.map((item) => (
            <li key={item} className="chip">
              {item}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Link href="/work" className="btn">
            See the work
          </Link>
          <a
            href={site.resumeUrl}
            className="btn-ghost"
            download
          >
            Download résumé
          </a>
          <a
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted transition hover:text-ink"
          >
            GitHub ↗
          </a>
        </div>
      </section>

      {/* Selected work */}
      <section className="space-y-5">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-lg font-semibold tracking-tight">Selected work</h2>
          <Link href="/work" className="text-sm text-muted transition hover:text-ink">
            All projects →
          </Link>
        </div>

        <div className="space-y-4">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* Writing */}
      <section className="space-y-5">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-lg font-semibold tracking-tight">Writing</h2>
          <a
            href={blogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted transition hover:text-ink"
          >
            The blog ↗
          </a>
        </div>

        <ul className="divide-y divide-line rounded-xl border border-line bg-surface">
          {posts.map((post) => (
            <li key={post.path}>
              <a
                href={`${blogUrl}${post.path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-1 px-5 py-4 transition hover:bg-canvas"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-sm font-medium text-ink transition group-hover:text-accent">
                    {post.title}
                  </span>
                  <span className="font-mono text-xs text-muted">
                    {formatWritingDate(post.date)}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted">{post.excerpt}</p>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* TIL */}
      <section className="space-y-5">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-lg font-semibold tracking-tight">Today I learned</h2>
          <Link href="/til" className="text-sm text-muted transition hover:text-ink">
            All notes →
          </Link>
        </div>

        {til.length === 0 ? (
          <p className="text-sm text-muted">No notes yet.</p>
        ) : (
          <ul className="space-y-2">
            {til.map((note) => (
              <li key={note.slug}>
                <Link
                  href={`/til/${note.slug}`}
                  className="group flex flex-wrap items-baseline justify-between gap-2 rounded-lg px-1 py-1.5"
                >
                  <span className="text-sm text-ink transition group-hover:text-accent">
                    {note.title}
                  </span>
                  <span className="font-mono text-xs text-muted">
                    {formatTilDate(note.date)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Contact */}
      <section className="card p-6">
        <h2 className="text-lg font-semibold tracking-tight">Get in touch</h2>
        <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted">
          Open to frontend roles and interesting freelance work. The fastest way to reach me is
          email, but the form works too.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Link href="/contact" className="btn">
            Send a message
          </Link>
          <a href={`mailto:${site.email}`} className="text-sm text-muted transition hover:text-ink">
            {site.email}
          </a>
        </div>
      </section>
    </div>
  );
}
