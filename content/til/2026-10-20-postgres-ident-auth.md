---
title: Fedora's Postgres refuses TCP connections by default
date: 2026-10-20
tags: [postgres, linux, fedora]
---

Install PostgreSQL from `dnf`, run `postgresql-setup --initdb`, start the service, and your
Node app still fails with:

```

P1001: Can't reach database server at localhost:5432

```

The server is running. The port is open. The password is correct. The problem is
`pg_hba.conf`, which on Fedora defaults to `ident` for TCP connections — an auth method
that looks up the OS username and has nothing to say about the password you just set.

```

host    all    all    127.0.0.1/32    ident

```

Change it to `scram-sha-256` and reload:

```bash
sudo sed -i 's/^\(host.*\)ident$/\1scram-sha-256/' /var/lib/pgsql/data/pg_hba.conf
sudo systemctl reload postgresql
```

Verify the change landed before retrying:

```
sudo grep -E '^host' /var/lib/pgsql/data/pg_hba.conf
```

`reload` is enough — no restart needed, existing connections survive.

The general lesson: "cannot reach server" is a bad error message. It covers unreachable
host, closed port, refused connection, and rejected credentials. Check `pg_isready` first
to separate network from auth, then read the auth config. The error tells you nothing; the
sequence of checks tells you everything.
