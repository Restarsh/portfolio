import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies for the projects I have built and shipped.",
};

export default function WorkPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="eyebrow">Work</p>
        <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
        <p className="max-w-prose text-sm leading-relaxed text-muted">
          {projects.length} projects, each with a write-up covering the problem, what I did,
          and what I would do differently. The ordering is deliberate — the first one is the
          one I would most want to be asked about.
        </p>
      </header>

      <div className="space-y-4">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
