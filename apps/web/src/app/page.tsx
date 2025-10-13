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
