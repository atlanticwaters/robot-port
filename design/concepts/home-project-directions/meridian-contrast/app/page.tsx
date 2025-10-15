'use client';

// Concept 05 — Meridian Contrast
// Direction: Monochrome minimalism with oversized typography and tight pacing (pulls from Paco Lui + Lucas Fields references).
// Color & Type: High-contrast gradient backdrop, bold sans headline (var(--font-primary)), supporting serif accent.
// Motion: Curtain reveal on hero headline, subtle scale on project tiles, reduced-motion friendly.

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { mockedHomePage } from '@/mocks/home';
import { projectMocks } from '@/mocks/documents';

const heroSlice = mockedHomePage.slices.find((slice) => slice.slice_type === 'hero');

const heroVariants = (reduce: boolean) => ({
  hidden: { opacity: 0, y: reduce ? 0 : 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
});

const gridVariants = (reduce: boolean) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: reduce ? 0 : 0.14, delayChildren: 0.2 },
  },
});

const tileVariants = (reduce: boolean) => ({
  hidden: { opacity: 0, y: reduce ? 0 : 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] },
  },
});

export default function Page() {
  const prefersReducedMotion = useReducedMotion();
  const featured = projectMocks.slice(0, 4);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-[#f5f5f5]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.1),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.08),transparent_50%),linear-gradient(135deg,#0a0a0a,rgba(0,0,0,0.6))]" />

      <section className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-24 pt-28 md:flex-row md:items-end md:gap-24">
        <motion.header
          initial="hidden"
          animate="show"
          variants={heroVariants(prefersReducedMotion)}
          className="space-y-8 md:max-w-2xl"
        >
          <p className="text-xs uppercase tracking-[0.5em] text-neutral-400">
            {heroSlice?.primary.eyebrow}
          </p>
          <div className="space-y-6">
            <h1 className="text-[clamp(3rem,8vw,6rem)] leading-[0.9] uppercase tracking-[-0.04em]">
              {heroSlice?.primary.heading}
            </h1>
            <p className="max-w-xl text-base text-neutral-300">
              {heroSlice?.primary.subheading}
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm font-medium">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[#050505] transition hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(255,255,255,0.18)]"
            >
              {heroSlice?.primary.primary_action_label}
              <span aria-hidden>↗</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-500 px-6 py-3 transition hover:border-white/80"
            >
              {heroSlice?.primary.secondary_action_label}
            </Link>
          </div>
        </motion.header>

        <motion.ul
          initial="hidden"
          animate="show"
          variants={gridVariants(prefersReducedMotion)}
          className="grid w-full max-w-sm gap-4 text-xs uppercase tracking-[0.4em] text-neutral-400"
        >
          {heroSlice?.items?.map((item) => (
            <motion.li
              key={item.label}
              variants={tileVariants(prefersReducedMotion)}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur"
            >
              <span>{item.label}</span>
              <span className="font-semibold text-white">{item.detail}</span>
            </motion.li>
          ))}
        </motion.ul>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 pb-32">
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <h2 className="text-2xl uppercase tracking-[0.4em] text-white/70">
            Selected Work
          </h2>
          <Link
            href="/projects"
            className="text-xs uppercase tracking-[0.45em] text-neutral-400 transition hover:text-white"
          >
            Full Index
          </Link>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-150px' }}
          variants={gridVariants(prefersReducedMotion)}
          className="mt-16 grid gap-10 md:grid-cols-2"
        >
          {featured.map((project, index) => (
            <motion.li
              key={project.id}
              variants={tileVariants(prefersReducedMotion)}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : { scale: 1.02, transition: { type: 'spring', stiffness: 220, damping: 18 } }
              }
              className="group relative overflow-hidden rounded-[2.75rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.5em] text-neutral-500">
                <span>0{index + 1}</span>
                <span>{project.data.year}</span>
              </div>
              <h3 className="mt-6 text-[2rem] font-semibold leading-[1.05] text-white">
                <Link href={`/projects/${project.uid}`} className="after:absolute after:inset-0">
                  {project.data.title}
                </Link>
              </h3>
              <p className="mt-4 text-sm text-neutral-300">
                {project.data.summary?.[0]?.text}
              </p>
              <div className="relative mt-6 overflow-hidden rounded-3xl border border-white/10">
                <Image
                  src={project.data.cover.url ?? '/images/placeholder.jpg'}
                  alt={project.data.cover.alt ?? project.data.title}
                  width={1280}
                  height={720}
                  className="h-auto w-full object-cover opacity-90 transition group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent" />
              </div>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-white/80">
                <span>Open case study</span>
                <span aria-hidden>↗</span>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </section>
    </main>
  );
}
