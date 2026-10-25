import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">404</p>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-2 text-sm text-muted">
        That link is dead, or it never existed. Both happen.
      </p>
      <Link href="/" className="btn mt-6">
        Back home
      </Link>
    </div>
  );
}
