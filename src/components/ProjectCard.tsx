import Link from "next/link";
import type { Project } from "@/content/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card p-5 transition hover:border-accent/50">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h3 className="text-base font-semibold tracking-tight">
          <Link href={`/work/${project.slug}`} className="hover:text-accent">
            {project.title}
          </Link>
        </h3>
        <span className="font-mono text-xs text-muted">{project.year}</span>
      </div>

      <p className="mt-2 text-sm leading-relaxed text-muted">{project.tagline}</p>

      <ul className="mt-3 flex flex-wrap gap-1.5">
        {project.stack.slice(0, 5).map((tech) => (
          <li key={tech} className="chip">
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center gap-4 text-sm">
        <Link href={`/work/${project.slug}`} className="font-medium text-accent hover:underline">
          Case study
        </Link>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition hover:text-ink"
          >
            Live ↗
          </a>
        )}
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition hover:text-ink"
          >
            Code ↗
          </a>
        )}
      </div>
    </article>
  );
}
