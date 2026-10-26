/**
 * Curated project list.
 *
 * Order matters — the first entry is the one a recruiter reads. Lead with the
 * project that proves the most depth, not the one with the most stars.
 */

export type Project = {
  slug: string;
  title: string;
  /** One line. Appears on the card. */
  tagline: string;
  year: string;
  role: string;
  stack: string[];
  repo?: string;
  live?: string;
  /** Shown larger on the home page. */
  featured?: boolean;

  /* --- Case study --- */
  problem: string;
  approach: string[];
  outcome: string;
  learned: string;
};

export const projects: Project[] = [
  {
    slug: "inkwell",
    title: "Inkwell",
    tagline: "A full-stack blog with hand-rolled auth and live comments.",
    year: "2026",
    role: "Solo — design, backend, frontend, tests, deployment",
    stack: ["Next.js 15", "TypeScript", "Prisma", "PostgreSQL", "SSE", "Tailwind", "Vitest", "Playwright"],
    repo: "https://github.com/Restarsh/inkwell-blog",
    live: "https://inkwell-blog-eta.vercel.app",
    featured: true,
    problem:
      "I wanted to stop building todo apps. A blog forces you to solve the problems that actually bite in production: sessions that survive a page reload, ownership checks that cannot be bypassed by editing a URL, and a database schema that does not need rewriting the first time you add a feature.",
    approach: [
      "Designed the Postgres schema by hand before touching an ORM — explicit cascade rules, and indexes chosen for the queries I knew the UI would make: posts by author, comments by post, published posts by date.",
      "Hand-rolled authentication rather than reaching for an auth library. Passwords are bcrypt at cost 12; sessions are signed JWTs in httpOnly, sameSite=lax cookies. Writing it myself meant I had to understand why each flag exists.",
      "Discovered that jsonwebtoken depends on Node's crypto and therefore cannot run in Next.js Edge middleware. Split the token layer onto jose, which uses WebCrypto, so the same session can be verified at the edge and in the Node runtime.",
      "Treated middleware as a UX guard, not a security boundary. Every mutating route handler re-reads the session and re-checks resource ownership, because middleware cannot see the database.",
      "Added live comments over Server-Sent Events: a Route Handler streams new comments and a presence count, resumes from Last-Event-ID after Vercel's connection cap, and the client reconciles optimistic inserts against the server response. Chose SSE over WebSockets because serverless functions cannot upgrade connections, and per-connection database polling over in-memory pub/sub because instances share no state.",
      "Tested the parts worth testing: Vitest unit suites for slug generation, Zod schemas, JWT signing and password hashing, plus Playwright specs for the register-post-comment flow and cross-tab comment propagation. CI typechecks and builds against a throwaway Postgres service on every push.",
    ],
    outcome:
      "Live with a real Postgres database, a migration history that lets me deploy schema changes without touching a shell, and a CI pipeline that runs typechecks, unit tests, and a production build on every push. The auth layer survived a deliberate attempt to edit another user's post by changing the ID in a PATCH request — it returns 403.",
    learned:
      "The hardest problem was not a bug: SSE connections on Vercel Hobby are closed after ten seconds, and a naive implementation loses every comment posted during the gap. Sending Last-Event-ID turns a dropped connection into a resumable cursor instead of a hole. The other lesson that stuck: a session cookie with secure: true hardcoded silently fails over plain HTTP, and the browser reports nothing at all.",
  },
  {
    slug: "hcosc",
    title: "Himalaya College Open Source Club",
    tagline: "The club's public site — built to someone else's requirements.",
    year: "2025 — 2026",
    role: "Frontend developer, Code For Change",
    stack: ["HTML", "CSS", "JavaScript", "Responsive design"],
    repo: "https://github.com/Restarsh/hcosc",
    featured: true,
    problem:
      "The club needed a public presence and had none. The requirements came from committee members rather than from me, which is the part that made it worth doing: real stakeholders have opinions, deadlines, and a phone.",
    approach: [
      "Started with a content inventory before writing any markup — what pages exist, what each one is for, and what could be cut. Half the initial wishlist did not survive that conversation.",
      "Built mobile-first. Most club members visit from a phone on campus wifi, so the layout is designed at 360px and expanded upward rather than the other way round.",
      "Kept the build dependency-free. No framework, no bundler — a club site that requires a toolchain to update is a site that stops being updated the year the original developer graduates.",
      "Handled the unglamorous parts: semantic landmarks, focus states, alt text, and a colour contrast pass with a checker rather than by eye.",
    ],
    outcome:
      "Shipped and used by the club for announcements and event sign-ups. Still maintainable by someone who is not me, which was the actual success criterion.",
    learned:
      "Requirements gathering is engineering work. The first draft I built solved a problem nobody had; the second draft, built after one honest conversation with the committee, solved the problem they did have. That conversation saved more time than any refactor.",
  },
  {
    slug: "flashcard",
    title: "FlashCard",
    tagline: "Spaced-repetition study tool with a keyboard-first interface.",
    year: "2025",
    role: "Solo",
    stack: ["JavaScript", "LocalStorage", "CSS"],
    repo: "https://github.com/Restarsh/flashCard",
    featured: true,
    problem:
      "Existing flashcard apps assume you will use a mouse. When you are reviewing two hundred cards a day, reaching for the trackpad between every card is the difference between a habit and an abandoned tab.",
    approach: [
      "Designed the interaction around four keys — space to reveal, 1/2/3 to grade recall — so a full review session never requires the mouse.",
      "Implemented a simplified SM-2 scheduling algorithm: cards carry an ease factor and an interval, and a failed recall resets the interval without resetting the ease entirely.",
      "Persisted state to LocalStorage with a versioned schema, so a future format change can migrate old data rather than silently discarding someone's deck.",
      "Kept the whole thing framework-free to stay under 30 KB, which matters when the intended use is a phone on mobile data.",
    ],
    outcome:
      "Used daily during exam preparation. The scheduling produces noticeably fewer repetitions than a fixed-interval rotation for the same recall rate, which was the hypothesis worth testing.",
    learned:
      "Versioned persistence is cheap insurance. I changed the card format twice mid-development; the first time, unversioned data was silently wiped. The second time, a migration function handled it in nine lines.",
  },
  {
    slug: "homelab",
    title: "Homelab & self-hosted services",
    tagline: "A small server, a lot of systemd units, and everything documented.",
    year: "2025 — ongoing",
    role: "Solo — hardware, networking, operations",
    stack: ["Linux", "Shell", "systemd", "Nginx", "Docker"],
    repo: "https://github.com/Restarsh/homelab-scripts",
    problem:
      "Running your own services teaches you the layer below the framework. I wanted to understand why deployments fail at 2am, and the only way to learn that is to be the person on call for your own infrastructure.",
    approach: [
      "Every service runs as a systemd unit with a restart policy and a log strategy, rather than as a process in a detached terminal session that dies with the SSH connection.",
      "Nginx as a reverse proxy with real TLS certificates, so the setup matches what a production deployment actually looks like.",
      "Wrote the provisioning as shell scripts in the repository rather than as commands typed once and forgotten. Rebuilding the box from scratch is now a fifteen-minute exercise instead of a weekend.",
      "Kept a plain-text operations log — what broke, what the symptom was, what fixed it — because the second time a disk fills up you want the answer in ten seconds.",
    ],
    outcome:
      "Several services in daily use, and a working mental model of ports, proxies, permissions and the difference between a service that is running and a service that is healthy.",
    learned:
      "The gap between 'it works on my machine' and 'it works' is almost entirely configuration and permissions. Explaining that gap convincingly in an interview is easier when you have lived in it.",
  },
  {
    slug: "fintechathon",
    title: "Fintechathon",
    tagline: "A time-boxed build — what survives when you have 36 hours.",
    year: "2026",
    role: "Team member — frontend",
    stack: ["React", "Tailwind", "REST APIs"],
    repo: "https://github.com/Restarsh/fintechathon",
    problem:
      "A hackathon brief with a hard deadline and a team that had never worked together. The interesting constraint was not the feature list but deciding what to cut without leaving a demo that does not run.",
    approach: [
      "Spent the first hour on a scope conversation rather than on code. Agreed on one end-to-end path that would be demo-ready, and treated everything else as optional.",
      "Built the demo path first — the screens a judge would actually click — and only then filled in the surrounding states.",
      "Front-loaded the integration risk: wired the frontend to the API with fake data on hour two, so the real data swap was a config change rather than a rewrite.",
    ],
    outcome:
      "A working end-to-end demo delivered on time, with the team's scope decision holding up under the clock.",
    learned:
      "Under a deadline, the useful question is 'what is the smallest thing that demonstrates the idea', not 'what is the full feature list'. Answering that early is what makes the last six hours calm instead of frantic.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}
