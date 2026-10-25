import Link from "next/link";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          {site.name} · {site.location}
        </p>

        <nav className="flex items-center gap-4">
          <a
            href={site.links.github}
            className="transition hover:text-ink"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </a>
          <a
            href={site.links.blog}
            className="transition hover:text-ink"
            rel="noopener noreferrer"
            target="_blank"
          >
            Blog
          </a>
          <a href={`mailto:${site.email}`} className="transition hover:text-ink">
            Email
          </a>
          <Link href="/contact" className="transition hover:text-ink">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
