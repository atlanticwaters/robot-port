'use client';

// Concept 04 — Kinetic Narrative
// Direction: Timeline-driven storytelling that guides visitors through a sequenced journey.
// Color & Type: Gradient backdrops that shift from deep slate to warm accent; headlines use var(--font-secondary).
// Motion: Hero text reveal synced with looping reel placeholder, scroll-based timeline progress bar with reduced-motion guard.

import { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { mockedHomePage } from '@/mocks/home';
import { projectMocks } from '@/mocks/documents';

const heroSlice = mockedHomePage.slices.find((slice) => slice.slice_type === 'hero');

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] } },
};

export default function Page() {
  const prefersReducedMotion = useReducedMotion();
  const featured = projectMocks.slice(0, 4);

  const timeline = useMemo(
    () =>
      featured.map((project, index) => ({
        title: project.data.title,
        summary: project.data.summary?.[0]?.text ?? '',
        link: `/projects/${project.uid}`,
        index,
        tag: project.data.tags?.[0]?.tag?.data.label,
        cover: project.data.cover.url,
      })),
    [featured],
  );

  const { scrollYProgress } = useScroll({
    offset: ['start start', 'end end'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });
  const progressHeight = useTransform(progress, (value) => `${value * 100}%`);

  return (
    <main className="relative overflow-hidden bg-[#050714] text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.25),transparent_60%)]" />
      <section className="relative mx-auto max-w-6xl px-6 pb-24 pt-28 md:grid md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-center md:gap-16">
        <motion.header
          initial="hidden"
          animate="show"
          variants={fadeIn}
          className="space-y-6"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-orange-200/80">
            {heroSlice?.primary.eyebrow}
          </p>
          <h1
            className="text-5xl leading-tight text-white md:text-[4.4rem]"
            style={{ fontFamily: 'var(--font-secondary)', letterSpacing: '-0.02em' }}
          >
            {heroSlice?.primary.heading}
          </h1>
          <p className="max-w-xl text-base text-slate-300">
            {heroSlice?.primary.subheading}
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-900 shadow-[0_10px_50px_rgba(249,115,22,0.35)] transition hover:-translate-y-0.5"
            >
              {heroSlice?.primary.primary_action_label}
              <span aria-hidden>↗</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 font-semibold text-slate-200 transition hover:border-white/60"
            >
              {heroSlice?.primary.secondary_action_label}
            </Link>
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1, transition: { delay: 0.2, duration: 0.6 } }}
          className="relative mt-16 aspect-[4/5] overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 shadow-[0_30px_120px_rgba(15,23,42,0.6)] backdrop-blur-xl md:mt-0"
        >
          <Image
            src="/images/vesto-cover.jpg"
            alt="Hero motion reel placeholder"
            fill
            sizes="(min-width: 1024px) 420px, (min-width: 768px) 40vw, 90vw"
            className="object-cover"
          />
          {!prefersReducedMotion && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-[#050714] via-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.55, transition: { duration: 0.8, delay: 0.1 } }}
            />
          )}
          <motion.div
            className="absolute bottom-6 left-6 flex flex-col gap-2 text-xs uppercase tracking-[0.35em] text-white/75"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.35, duration: 0.5 } }}
          >
            <span>Reel highlight</span>
            <span className="text-[0.65rem] tracking-[0.5em] text-orange-200/70">Looping narrative gestures</span>
          </motion.div>
        </motion.div>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 pb-32">
        <div className="grid gap-12 md:grid-cols-[120px_1fr]">
          <div className="relative">
            <div className="h-full w-[2px] bg-white/15" />
            <motion.div
              className="absolute left-0 top-0 w-[2px] rounded-full bg-gradient-to-b from-orange-400 via-white to-transparent"
              style={{ height: progressHeight }}
            />
            <p className="mt-6 text-xs uppercase tracking-[0.35em] text-white/60">Journey</p>
          </div>

          <motion.ol
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-120px' }}
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: prefersReducedMotion ? 0 : 0.16 },
              },
            }}
            className="space-y-16"
          >
            {timeline.map((entry) => (
              <motion.li
                key={entry.title}
                variants={fadeIn}
                className="group grid gap-6 rounded-[2.5rem] border border-white/10 bg-white/5 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.45)] backdrop-blur-xl md:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)]"
              >
                <div className="space-y-3 text-xs uppercase tracking-[0.4em] text-white/60">
                  <span>Phase 0{entry.index + 1}</span>
                  <span>{entry.tag}</span>
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-semibold text-white">
                    <Link href={entry.link} className="underline decoration-white/0 underline-offset-8 transition hover:decoration-white/70">
                      {entry.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-slate-300">{entry.summary}</p>
                  <div className="relative mt-6 overflow-hidden rounded-3xl border border-white/10 bg-black/20">
                    <Image
                      src={entry.cover ?? '/images/placeholder.jpg'}
                      alt={entry.title}
                      width={1200}
                      height={800}
                      className="h-auto w-full object-cover opacity-90 transition group-hover:opacity-100"
                      sizes="(min-width: 1024px) 480px, 90vw"
                    />
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>
    </main>
  );
}
