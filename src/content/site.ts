/**
 * Every word the site says about you. Edit this file first.
 */

export const site = {
  name: "Amir",
  handle: "Restarsh",
  role: "Frontend Developer",
  location: "Kathmandu, Nepal",

  title: "Amir - Frontend Developer",
  description:
    "Frontend developer in Kathmandu. React, Next.js, TypeScript. I build interfaces that hold up under real use, and I write down what I learn along the way.",

  email: "restarsh.ziq@gmail.com",
  resumeUrl: "/resume.pdf",

  links: {
    github: "https://github.com/Restarsh",
    blog: "https://inkwell-blog-eta.vercel.app",
    linkedin: "https://www.linkedin.com/in/imamirshrestha",
  },

  bio: [
    "I build web interfaces with React, Next.js and TypeScript, and I care more about how they behave on a slow connection than how they look in a screenshot.",
    "Most recently I shipped Inkwell, a full-stack blog with cookie-based authentication and a Postgres schema I designed by hand. Before that I built the site for Himalaya College's Open Source Club, where the requirements came from people who were not me.",
    "I keep a homelab, I'm learning Rust in public, and I write down the bugs that cost me more than twenty minutes.",
  ],

  highlights: [
    "React, Next.js, TypeScript",
    "Postgres, Prisma",
    "Accessibility and performance budgets",
    "Linux and self-hosting",
  ],
} as const;
