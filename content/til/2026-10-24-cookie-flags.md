---
title: The three cookie flags that decide whether auth works
date: 2026-10-24
tags: [auth, security, nextjs]
---

Session cookies have five flags that matter and three that will silently break you.

**httpOnly** - always. If JavaScript can read the token, an XSS bug becomes an account takeover. There is no legitimate reason for client code to see a session token.

**secure** - on in production, off on localhost. The browser drops a secure cookie that arrives over plain HTTP, and it does so without an error. You will spend an hour wondering why login "works" and nothing persists.

**sameSite** - lax is almost always right. It sends the cookie on top-level GET navigations but not on cross-site POSTs, which is exactly the CSRF protection a typical app needs. strict breaks the redirect back from any OAuth provider: the callback arrives, the cookie does not, and your handler quietly mints a second account. No error, no log line.

Two more that people forget: path: "/" explicitly, or the cookie scopes itself to the one route that set it; and a maxAge, because a token that never expires is a token you cannot revoke.

Five lines of config. Worth a comment next to each one explaining the failure mode it prevents.
