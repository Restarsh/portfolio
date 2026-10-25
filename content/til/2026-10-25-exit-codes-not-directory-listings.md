---
title: Exit codes are evidence, directory listings are not
date: 2026-10-25
tags: [tooling, nextjs]
---

A `.next` directory with twelve files and four subdirectories looks like a build. It is not
a build. The file that proves it is `BUILD_ID`, roughly twenty bytes, written as the final
step of a successful `next build`.

If the build crashes three files in, everything before that point still lands on disk,
fully formed, indistinguishable at a glance from a complete artifact. There is no marker on
the failed half.

The fix is not to inspect harder. It is to stop treating `ls` as evidence of success:

```bash
npm run build && echo "BUILD OK" || echo "BUILD FAILED"
```

`&&` only fires on exit code 0. That is the precise signal, and it generalises: a process
list with a healthy PID is not a working service, four of five applied migrations is not a
migration, and 200 of 240 passing tests is not a passing suite.

The useful question is "what does this system emit when it succeeds, and did I check for
that specifically?" — not "does the output look right".

</BDS:create_file>

<BDS:create_file fileName="portfolio/content/til/2026-10-24-cookie-flags.md">

```markdown
---
title: The three cookie flags that decide whether auth works
date: 2026-10-24
tags: [auth, security, nextjs]
---

Session cookies have five flags that matter and three that will silently break you.

**`httpOnly`** — always. If JavaScript can read the token, an XSS bug becomes an account
takeover. There is no legitimate reason for client code to see a session token.

**`secure`** — on in production, off on `localhost`. The browser drops a `secure` cookie
that arrives over plain HTTP, and it does so without an error. You will spend an hour
wondering why login "works" and nothing persists.

**`sameSite`** — `lax` is almost always right. It sends the cookie on top-level GET
navigations but not on cross-site POSTs, which is exactly the CSRF protection a typical app
needs. `strict` breaks the redirect back from any OAuth provider: the callback arrives,
the cookie does not, and your handler quietly mints a second account. No error, no log line.

Two more that people forget: `path: "/"` explicitly, or the cookie scopes itself to the one
route that set it; and a `maxAge`, because a token that never expires is a token you cannot
revoke.

Five lines of config. Worth a comment next to each one explaining the failure mode it
prevents.

