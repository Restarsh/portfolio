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
