import type { Metadata } from "next";
import Link from "next/link";
import { getAllTilMeta, formatTilDate } from "@/lib/til";

export const metadata: Metadata = {
  title: "TIL",
  description: "Short notes on things I had to work out the hard way.",
};

export default function TilIndexPage() {
  const notes = getAllTilMeta();

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="eyebrow">Today I learned</p>
        <h1 className="text-2xl font-semibold tracking-tight">Notes</h1>
        <p className="max-w-prose text-sm leading-relaxed text-muted">
          Short write-ups of things that cost me more than twenty minutes. Mostly so I do not
          pay for the same lesson twice, partly because writing it down is how I find out
          whether I actually understood it.
        </p>
      </header>

      {notes.length === 0 ? (
        <p className="text-sm text-muted">No notes yet.</p>
      ) : (
        <ul className="divide-y divide-line rounded-xl border border-line bg-surface">
          {notes.map((note) => (
            <li key={note.slug}>
              <Link
                href={`/til/${note.slug}`}
                className="group flex flex-col gap-1.5 px-5 py-4 transition hover:bg-canvas"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-sm font-medium text-ink transition group-hover:text-accent">
                    {note.title}
                  </span>
                  <span className="font-mono text-xs text-muted">
                    {formatTilDate(note.date)}
                  </span>
                </div>
                {note.tags.length > 0 && (
                  <ul className="flex flex-wrap gap-1.5">
                    {note.tags.map((tag) => (
                      <li key={tag} className="chip">
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
