import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <Link href="/work" className="text-sm text-muted transition hover:text-ink">
          ← All projects
        </Link>

        <div className="space-y-2">
          <p className="eyebrow">{project.year}</p>
          <h1 className="text-3xl font-semibold leading-tight tracking-tight">
            {project.title}
          </h1>
          <p className="max-w-prose text-[15px] leading-7 text-muted">{project.tagline}</p>
        </div>

        <dl className="grid gap-3 border-y border-line py-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="eyebrow mb-1">Role</dt>
            <dd className="text-ink">{project.role}</dd>
          </div>
          <div>
            <dt className="eyebrow mb-1">Stack</dt>
            <dd className="flex flex-wrap gap-1.5 pt-0.5">
              {project.stack.map((tech) => (
                <span key={tech} className="chip">
                  {tech}
                </span>
              ))}
            </dd>
          </div>
        </dl>

        <div className="flex flex-wrap items-center gap-4 text-sm">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent hover:underline"
            >
              View it live ↗
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition hover:text-ink"
            >
              Source ↗
            </a>
          )}
        </div>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight">The problem</h2>
        <p className="max-w-prose text-[15px] leading-7 text-muted">{project.problem}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight">What I did</h2>
        <ul className="max-w-prose space-y-3">
          {project.approach.map((item) => (
            <li key={item.slice(0, 32)} className="flex gap-3 text-[15px] leading-7 text-muted">
              <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight">Outcome</h2>
        <p className="max-w-prose text-[15px] leading-7 text-muted">{project.outcome}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight">What I took from it</h2>
        <p className="max-w-prose text-[15px] leading-7 text-muted">{project.learned}</p>
      </section>

      <footer className="border-t border-line pt-6">
        <Link href="/work" className="text-sm text-muted transition hover:text-ink">
          ← All projects
        </Link>
      </footer>
    </article>
  );
}
