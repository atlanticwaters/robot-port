'use client';

// Concept 01 — Modular Rhythm
// Direction: Balanced, grid-forward homepage with clear hierarchy. Spacing leans on modular 24px rhythm.
// Color & Type: Neutral light surface (var(--color-bg)) with dark type (var(--color-fg)); primary headlines use var(--font-secondary).
// Motion: Staggered hero + card entrance using Framer Motion variants; respects prefers-reduced-motion.

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { mockedHomePage } from '@/mocks/home';
import { projectMocks } from '@/mocks/documents';

const heroSlice = mockedHomePage.slices.find((slice) => slice.slice_type === 'hero');
const metricsSlice = mockedHomePage.slices.find((slice) => slice.slice_type === 'metrics');

const heroVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const listVariants = (reduced: boolean) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: reduced ? 0 : 0.08, delayChildren: 0.12 },
  },
});

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] } },
};

export default function Page() {
  const prefersReducedMotion = useReducedMotion();
  const featured = projectMocks.slice(0, 6);

  return (
    <main className="bg-[var(--color-bg)] text-[var(--color-fg)]">
      <section className="mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-20 pt-24 md:pb-28 md:pt-28">
        <div className="grid gap-8 md:grid-cols-[1fr_minmax(0,280px)] md:items-start">
          <motion.header
            initial="hidden"
            animate="show"
            variants={heroVariants}
            className="space-y-6"
          >
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-[var(--color-muted)]">
              {heroSlice?.primary.eyebrow}
            </p>
            <h1
              className="text-5xl leading-[1.05] tracking-tight md:text-6xl"
              style={{ fontFamily: 'var(--font-secondary)' }}
            >
              {heroSlice?.primary.heading}
            </h1>
            <p className="max-w-xl text-lg text-[var(--color-muted)]">
              {heroSlice?.primary.subheading}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/work"
                className="rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-[var(--color-primary-foreground)] shadow-sm shadow-[var(--color-ring)] transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-[var(--color-ring)]"
              >
                {heroSlice?.primary.primary_action_label}
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-[var(--color-border)] px-6 py-3 text-sm font-semibold text-[var(--color-fg)] transition hover:bg-[var(--color-elevated)] hover:shadow-sm"
              >
                {heroSlice?.primary.secondary_action_label}
              </Link>
            </div>
          </motion.header>

          <motion.ul
            initial="hidden"
            animate="show"
            variants={listVariants(prefersReducedMotion)}
            className="grid gap-4 rounded-3xl border border-[var(--color-border)] bg-[var(--color-elevated)] p-6 shadow-sm"
          >
            {heroSlice?.items?.map((item) => (
              <motion.li
                key={item.label}
                variants={itemVariants}
                className="flex items-center justify-between rounded-2xl bg-white/60 px-4 py-3 text-sm font-medium text-[var(--color-secondary)] shadow-inner shadow-[rgba(15,23,42,0.06)] backdrop-blur"
              >
                <span>{item.label}</span>
                <span className="text-[var(--color-accent)]">{item.detail}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <motion.section
          initial="hidden"
          animate="show"
          variants={listVariants(prefersReducedMotion)}
          className="grid gap-4 rounded-3xl border border-[var(--color-border)] bg-white/70 p-6 shadow-sm backdrop-blur md:grid-cols-4"
        >
          <motion.div variants={itemVariants} className="md:col-span-1">
            <p className="text-xs uppercase tracking-[0.4em] text-[var(--color-muted)]">
              {metricsSlice?.primary.title}
            </p>
            <h2 className="mt-3 text-2xl font-semibold leading-tight">{metricsSlice?.primary.caption}</h2>
          </motion.div>
          <motion.ul variants={listVariants(prefersReducedMotion)} className="md:col-span-3 grid gap-4 md:grid-cols-3">
            {metricsSlice?.items?.map((metric) => (
              <motion.li
                key={metric.label}
                variants={itemVariants}
                className="rounded-2xl border border-dashed border-[var(--color-border)] p-4"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-muted)]">{metric.label}</p>
                <p className="mt-2 text-3xl font-semibold">{metric.value}</p>
                <p className="mt-2 text-sm text-[var(--color-muted)]">{metric.context}</p>
              </motion.li>
            ))}
          </motion.ul>
        </motion.section>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="flex items-baseline justify-between">
          <h2 className="text-3xl font-semibold tracking-tight">Featured projects</h2>
          <Link
            href="/projects"
            className="text-sm font-medium text-[var(--color-muted)] underline-offset-4 hover:text-[var(--color-fg)] hover:underline"
          >
            View archive
          </Link>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          variants={listVariants(prefersReducedMotion)}
          className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {featured.map((project, index) => (
            <motion.li
              key={project.id}
              variants={itemVariants}
              className="group relative flex flex-col gap-4 rounded-3xl border border-[var(--color-border)] bg-white/80 p-5 shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-[var(--color-muted)]">
                <span>{project.data.year}</span>
                <span>0{index + 1}</span>
              </div>
              <h3 className="text-2xl font-semibold leading-tight">
                <Link href={`/projects/${project.uid}`} className="after:absolute after:inset-0">
                  {project.data.title}
                </Link>
              </h3>
              <p className="text-sm text-[var(--color-muted)]">
                {project.data.summary?.[0]?.text}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.data.services?.slice(0, 2).map((service) => (
                  <span
                    key={service.label}
                    className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[var(--color-secondary)]"
                  >
                    {service.label}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-[var(--color-accent)] opacity-0 transition group-hover:opacity-100">
                <span>Read case study</span>
                <span aria-hidden>↗</span>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </section>
    </main>
  );
}
