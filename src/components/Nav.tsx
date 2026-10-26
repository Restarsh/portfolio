import Link from "next/link";
import { site } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/work", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/til", label: "TIL" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-canvas/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-sm font-semibold tracking-tight text-ink">
          {site.name}
          <span className="text-muted">.</span>
        </Link>

        <nav className="flex items-center gap-0.5 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-2.5 py-1.5 text-muted transition hover:bg-surface hover:text-ink"
            >
              {link.label}
            </Link>
          ))}

                    {site.resumeUrl && (
            <a
              href={site.resumeUrl}
              className="ml-1 hidden rounded-lg px-2.5 py-1.5 text-muted transition hover:bg-surface hover:text-ink sm:inline"
            >
              Résumé
            </a>
          )}

          <span className="mx-1.5 h-4 w-px bg-line" aria-hidden />

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
