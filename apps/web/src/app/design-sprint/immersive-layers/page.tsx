'use client';

// Concept 02 — Immersive Layers
// Direction: Dark, cinematic homepage with layered glassmorphism and depth cues.
// Color & Type: Lean on elevated dark surfaces (var(--color-elevated)) with accent glows; headings use var(--font-secondary).
// Motion: Parallax hero text + media, magnetic hover on project cards, scroll-triggered fades with reduced-motion guard.

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { mockedHomePage } from '@/mocks/home';
import { projectMocks } from '@/mocks/documents';

const heroSlice = mockedHomePage.slices.find((slice) => slice.slice_type === 'hero');

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Page() {
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'center start'],
  });
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -60]);
  const mediaY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 80]);
  const featured = projectMocks.slice(0, 5);

  return (
    <main className="relative overflow-hidden bg-[#030712] text-[var(--color-fg)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(15,118,110,0.24),transparent_55%)]" />
      <section
        ref={heroRef}
        className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-24 pt-28 md:flex-row md:items-center md:gap-24"
      >
        <motion.header
          style={{ y: headlineY }}
          className="relative z-10 max-w-xl space-y-6"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-cyan-200/80">
            {heroSlice?.primary.eyebrow}
          </p>
          <h1
            className="text-5xl leading-[1.05] text-slate-100 md:text-6xl"
            style={{ fontFamily: 'var(--font-secondary)' }}
          >
            {heroSlice?.primary.heading}
          </h1>
          <p className="text-base text-slate-300">
            {heroSlice?.primary.subheading}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/work"
              className="rounded-full bg-[linear-gradient(120deg,#0ea5e9,#22d3ee)] px-6 py-3 text-sm font-semibold text-slate-900 shadow-[0_10px_40px_rgba(14,165,233,0.45)] transition hover:-translate-y-0.5"
            >
              {heroSlice?.primary.primary_action_label}
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/40"
            >
              {heroSlice?.primary.secondary_action_label}
            </Link>
          </div>
        </motion.header>

        <motion.div
          style={{ y: mediaY }}
          className="relative ml-auto w-full max-w-md"
        >
          <div className="absolute inset-0 -translate-y-6 translate-x-6 rounded-[2.5rem] bg-gradient-to-br from-cyan-400/30 via-purple-500/20 to-transparent blur-3xl" />
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 shadow-[0_20px_80px_rgba(15,23,42,0.45)] backdrop-blur-xl">
            <Image
              src="/images/guilded-cover.jpg"
              alt="Motion still"
              width={1080}
              height={1350}
              className="h-auto w-full object-cover"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: prefersReducedMotion ? 0.4 : 0.7 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent"
            />
            <motion.div
              className="absolute inset-x-0 bottom-0 flex items-center justify-between px-6 pb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.5 } }}
            >
              <span className="text-xs uppercase tracking-[0.4em] text-white/70">
                CURRENT FOCUS
              </span>
              <span className="text-sm font-semibold text-white">Immersive product orchestration</span>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 pb-28">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Selected collaborations</h2>
          <Link href="/projects" className="text-sm font-medium text-cyan-200/80 underline-offset-4 hover:text-cyan-100 hover:underline">
            Explore archive
          </Link>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-12 grid gap-10 lg:grid-cols-[repeat(auto-fit,minmax(280px,1fr))]"
        >
          {featured.map((project) => (
            <motion.li
              key={project.id}
              variants={cardVariants}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : { y: -12, scale: 1.02, transition: { type: 'spring', stiffness: 220, damping: 16 } }
              }
              className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-6 text-slate-200 shadow-[0_20px_60px_rgba(15,23,42,0.55)] backdrop-blur-xl"
            >
              <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-transparent to-purple-500/20" />
              </div>
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/50">
                <span>{project.data.year}</span>
                <span>{project.data.client}</span>
              </div>
              <h3 className="mt-6 text-3xl font-semibold text-white">
                <Link href={`/projects/${project.uid}`} className="after:absolute after:inset-0">
                  {project.data.title}
                </Link>
              </h3>
              <p className="mt-4 text-sm text-slate-300">
                {project.data.summary?.[0]?.text}
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.25em] text-cyan-200/80">
                {project.data.tags?.slice(0, 3).map((tagRelation) => (
                  <span key={tagRelation.tag?.id} className="rounded-full border border-white/20 px-4 py-1">
                    {tagRelation.tag?.data.label}
                  </span>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="mt-8 flex items-center gap-3 text-sm font-semibold text-cyan-200"
              >
                <span>Dive into case study</span>
                <span aria-hidden>↗</span>
              </motion.div>
            </motion.li>
          ))}
        </motion.ul>
      </section>
    </main>
  );
}
