# restarsh.dev — portfolio

A personal portfolio for **Amir (Restarsh)**, frontend developer in Kathmandu.
Built with Next.js 15 (App Router), Tailwind, and committed markdown. No CMS,
no database, no build step you have to think about.

Live: _add your Vercel URL here once deployed_

---

## What's inside

| Route | Purpose |
|---|---|
| `/` | Hero, selected work, writing, latest TIL, contact |
| `/work` | All projects |
| `/work/[slug]` | Case study — problem, approach, outcome, what I learned |
| `/writing` | Links out to posts published on the Inkwell blog |
| `/til` | Today-I-learned notes, rendered from `content/til/*.md` |
| `/til/[slug]` | A single note |
| `/contact` | Form (Resend) with a honeypot |
| `/api/contact` | POST endpoint that sends the email |

Everything a visitor reads lives in `src/content/` or `content/til/`. There is
no admin panel — you edit a TypeScript file, you commit, you deploy. That is the
point: a portfolio you can still understand in a year.

## Stack

- **Next.js 15** App Router, React Server Components by default
- **Tailwind CSS 3** with CSS variables for theming (dark mode, no flash)
- **gray-matter** + **marked** for TIL markdown
- **Resend** (via `fetch`, no SDK) for the contact form
- Deployed on Vercel

## Quickstart

```bash
npm install
cp .env.example .env.local     # fill in the values, or leave blank to skip email
npm run dev
```

Open http://localhost:3000.

The contact form works without a `RESEND_API_KEY`: it returns a 503 and the UI
shows your email address as a fallback. Nothing silently fails.

## Make it yours

Five places to edit, in order of importance:

1. **`src/content/site.ts`** — name, role, bio, email, social links. Everything
the site says about you lives here.
2. **`src/content/projects.ts`** — the curated project list and case studies.
Four to six entries. Quality over quantity; a hiring manager reads two.
3. **`src/content/writing.ts`** — links to posts on your blog.
4. **`content/til/*.md`** — drop a markdown file in, it appears automatically.
Frontmatter: `title`, `date` (YYYY-MM-DD), `tags` (optional array).
5. **`public/resume.pdf`** — drop your résumé here. The nav links to it.

Then find-and-replace the placeholder email in `site.ts`.

## Adding a TIL

```
cat > content/til/2026-10-26-something-i-learned.md << 'EOF'
---
title: What I learned about X
date: 2026-10-26
tags: [typescript, nextjs]
---

Body in markdown. Rendered at build time, styled by `.prose` in globals.css.
EOF
```

Sorted by date, newest first. No registration step.

## Theming

Colours are RGB triplets in `src/app/globals.css`, consumed by Tailwind as
`bg-canvas`, `text-ink`, `border-line`, `text-accent` and so on. Changing the
palette means editing eight numbers in one file, not hunting through components.

The theme is applied by an inline script in `<head>` before first paint, so
there is no white flash on a dark-mode visit. `ThemeToggle` then reads and writes
`localStorage` on top of that.

## Deployment

Vercel, one command:

```
vercel --prod
```

Or push to GitHub and import the repo. Set the four environment variables from
`.env.example` in **Project → Settings → Environment Variables**, scoped to
Production. `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` are only needed if you want
the contact form to actually send.

**Resend setup:** verify a domain at [resend.com/domains](https://resend.com/domains), then set
`CONTACT_FROM_EMAIL` to an address on it. Resend's `onboarding@resend.dev` sender
only delivers to your own account email, so it is fine for testing and useless
for a real site.

## Notes on decisions

**Why static content instead of a CMS?** A portfolio changes four times a year.
A CMS adds a database, an auth flow, and a failure mode in exchange for saving
you a `git commit`. Wrong trade.

**Why `marked` and not MDX?** TIL notes are prose, not components. MDX would let
me embed React in a note I will never embed React in. Smaller dependency, fewer
surprises.

**Why no HTML sanitisation?** The markdown files are committed by me, rendered at
build time, and never accept user input. Sanitising my own repository is
security theatre. If this ever accepted submissions, `isomorphic-dompurify` would
be mandatory.

**Why CSS variables rather than `dark:` on every class?** Sixty `dark:` prefixes
across a dozen components is sixty chances to forget one. Eight variables in
`:root` and `.dark` is a single source of truth.

## License

MIT — the code. The words and project write-ups are mine; please don't republish
them as your own.
