import type { Metadata } from "next";
import { site } from "@/content/site";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name}.`,
};

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="eyebrow">Contact</p>
        <h1 className="text-2xl font-semibold tracking-tight">Say hello</h1>
        <p className="max-w-prose text-sm leading-relaxed text-muted">
          Open to frontend roles, contract work, and questions about anything I have written.
          I read everything and reply to most of it.
        </p>
      </header>

      <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-start">
        <ContactForm />
      </div>

      <div className="rounded-xl border border-line bg-surface p-5">
        <p className="text-sm text-muted">
          Prefer email?{" "}
          <a href={`mailto:${site.email}`} className="font-medium text-accent hover:underline">
            {site.email}
          </a>
        </p>
        <p className="mt-2 text-sm text-muted">
          Or find me on{" "}
          <a
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-accent hover:underline"
          >
            GitHub
          </a>{" "}
          and{" "}
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-accent hover:underline"
          >
            LinkedIn
          </a>
          .
        </p>
      </div>
    </div>
  );
}
