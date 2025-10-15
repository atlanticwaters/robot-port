# Home & Project Page Design Directions

This sprint explores five distinct visual directions for the Next.js + Prismic portfolio. Each direction ships with paired homepage (`app/page.tsx`) and project detail (`app/work/[uid]/page.tsx`) stubs that focus on layout hierarchy, motion strategy, and brand token usage.

- **Concept 01 · Modular Rhythm** — Grid-led structure inspired by Lucas Fields; emphasizes balanced spacing, metrics chips, and staggered motion for card reveals.
- **Concept 02 · Immersive Layers** — Rich layering and depth referencing Tona Zone; dark surface gradients, parallax hero, and magnetic hover states.
- **Concept 03 · Editorial Canvas** — Quiet, typographic storytelling aligned with Paco Lui; generous white space, ruled baselines, and breezy scroll choreography.
- **Concept 04 · Kinetic Narrative** — Timeline-led storytelling that leans into motion cues; split hero with looping reel, progressive disclosure of project milestones.
- **Concept 05 · Meridian Contrast** — Monochrome minimalism channeling Lucas Fields + Paco Lui; oversized typography, disciplined motion cadence, and gallery reveals with high-contrast framing.

All stubs import existing mock content from `@/mocks` and use Tailwind tokens (`--color-*`, `--font-*`) plus Framer Motion variants with `prefers-reduced-motion` safeguards. Use these files as references when refining the production implementation in `apps/web/src/app`.
