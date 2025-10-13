import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="text-sm uppercase tracking-[0.35em] text-muted">404</p>
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground">
        That page drifted off course.
      </h1>
      <p className="mt-4 max-w-xl text-base text-muted">
        The resource you&apos;re after doesn&apos;t exist or has been moved.
        Navigate back to the work index or return home.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm font-medium">
        <Link
          href="/"
          className="rounded-full border border-border px-5 py-2 transition-colors hover:border-foreground"
        >
          Back home
        </Link>
        <Link
          href="/projects"
          className="rounded-full border border-border px-5 py-2 transition-colors hover:border-foreground"
        >
          View work
        </Link>
      </div>
    </section>
  );
}
