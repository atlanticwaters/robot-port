import Link from "next/link";

const concepts = [
  {
    slug: "modular-rhythm",
    title: "Concept 01 · Modular Rhythm",
    description:
      "Grid-led structure with balanced spacing, staggered motion, and surface chips inspired by fintech systems.",
    homeHref: "/design-sprint/modular-rhythm",
    detailHref: "/design-sprint/modular-rhythm/work/vesto-wealth",
  },
  {
    slug: "immersive-layers",
    title: "Concept 02 · Immersive Layers",
    description:
      "Dark, cinematic art direction with glassmorphism, parallax hero media, and magnetic hover states.",
    homeHref: "/design-sprint/immersive-layers",
    detailHref: "/design-sprint/immersive-layers/work/guilded-platform-refresh",
  },
  {
    slug: "editorial-canvas",
    title: "Concept 03 · Editorial Canvas",
    description:
      "Quiet typographic storytelling with newsprint textures, ruled baselines, and marginalia metadata.",
    homeHref: "/design-sprint/editorial-canvas",
    detailHref: "/design-sprint/editorial-canvas/work/guilded-platform-refresh",
  },
  {
    slug: "kinetic-narrative",
    title: "Concept 04 · Kinetic Narrative",
    description:
      "Timeline-driven journey with scroll progress, looping hero reel, and milestone storytelling.",
    homeHref: "/design-sprint/kinetic-narrative",
    detailHref: "/design-sprint/kinetic-narrative/work/guilded-platform-refresh",
  },
  {
    slug: "meridian-contrast",
    title: "Concept 05 · Meridian Contrast",
    description:
      "Monochrome editorial minimalism with oversized type, gallery reveals, and a disciplined motion pulse.",
    homeHref: "/design-sprint/meridian-contrast",
    detailHref: "/design-sprint/meridian-contrast/work/vesto-wealth",
  },
];

export default function DesignSprintIndex() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-24">
      <header className="space-y-5">
        <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">
          Design Sprint
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">
          Homepage & Project Directions
        </h1>
        <p className="max-w-2xl text-base text-neutral-600">
          This hub collects four visual explorations for the portfolio redesign.
          Each concept includes a homepage treatment and a matching project detail
          experience. Use the quick links below to jump straight into the
          prototypes.
        </p>
      </header>

      <section className="mt-16 space-y-10">
        {concepts.map((concept) => (
          <article
            key={concept.slug}
            className="rounded-3xl border border-neutral-200 bg-white/80 p-8 shadow-sm backdrop-blur"
          >
            <h2 className="text-xl font-semibold tracking-tight">
              {concept.title}
            </h2>
            <p className="mt-3 text-sm text-neutral-600">
              {concept.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium text-neutral-800">
              <Link
                href={concept.homeHref}
                className="rounded-full border border-neutral-300 px-5 py-2 transition hover:border-neutral-600 hover:bg-neutral-900 hover:text-white"
              >
                View Homepage
              </Link>
              <Link
                href={concept.detailHref}
                className="rounded-full border border-neutral-300 px-5 py-2 transition hover:border-neutral-600 hover:bg-neutral-900 hover:text-white"
              >
                View Project Detail
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
