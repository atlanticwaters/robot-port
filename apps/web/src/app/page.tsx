import { loadProjects } from "@/lib/api";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — Astro + Prismic",
};

export default async function HomePage() {
  const projects = await loadProjects();
  const displayProjects = projects.slice(0, 6);

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-5xl font-bold tracking-tight">Principal Portfolio</h1>
      <p className="mt-4 text-lg text-neutral-600">
        Astro + Prismic wired. Replace this with your Slice-driven homepage.
      </p>
      <div className="mt-6 rounded-2xl border border-dashed border-neutral-300 p-6">
        <h2 className="text-xl font-semibold">Design Sprint Concepts</h2>
        <p className="mt-2 text-sm text-neutral-600">
          Explore four visual directions for the redesigned homepage and project detail experience.
        </p>
        <Link
          href="/design-sprint"
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-neutral-800 px-4 py-2 text-sm font-medium text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
        >
          View concept hub
          <span aria-hidden>↗</span>
        </Link>
      </div>

      <section className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayProjects.map((p) => (
          <Link
            key={p.id}
            href={`/projects/${p.uid}`}
            className="block rounded-2xl border p-5 transition hover:shadow-md"
          >
            <h3 className="text-xl font-semibold">
              {p.data?.title ?? "Untitled Project"}
            </h3>
            <p className="mt-2 text-sm text-neutral-600">
              {typeof p.data?.summary === 'string' ? p.data.summary : "Summary goes here."}
            </p>
          </Link>
        ))}
      </section>
    </main>
  );
}
