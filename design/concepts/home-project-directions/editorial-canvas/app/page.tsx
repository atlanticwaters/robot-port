'use client';

// Concept 03 — Editorial Canvas
// Direction: Quiet editorial pacing with generous whitespace and elegant typography.
// Color & Type: Soft off-white background with faint baseline grid; serif display in hero, sans body copy.
// Motion: Gentle fade/slide entrances with slight delay, reduced-motion safe. Hover reveals underline details.

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { mockedHomePage } from '@/mocks/home';
import { projectMocks } from '@/mocks/documents';

const heroSlice = mockedHomePage.slices.find((slice) => slice.slice_type === 'hero');

const fadeIn = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.45, 0, 0.55, 1] } },
};

const listVariants = (reduce: boolean) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: 0.2 },
  },
});

export default function Page() {
  const prefersReducedMotion = useReducedMotion();
  const featured = projectMocks.slice(0, 5);

  return (
    <main className="bg-[#f7f5f1] text-[#202124]">
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(180deg,transparent,transparent_23px,rgba(0,0,0,0.05)_24px)] opacity-40" />
        <section className="relative mx-auto max-w-5xl px-6 pb-20 pt-28 md:px-0">
          <motion.header
            initial="hidden"
            animate="show"
            variants={fadeIn}
            className="max-w-3xl space-y-6"
          >
            <p className="text-sm uppercase tracking-[0.4em] text-neutral-500">
              {heroSlice?.primary.eyebrow}
            </p>
            <h1
              className="text-5xl leading-tight text-[#1a1a1a] md:text-[4.5rem]"
              style={{ fontFamily: 'var(--font-secondary)', letterSpacing: '-0.03em' }}
            >
              {heroSlice?.primary.heading}
            </h1>
            <p className="max-w-xl text-lg text-neutral-600">
              {heroSlice?.primary.subheading}
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 border-b-2 border-[#202124] pb-2 font-semibold tracking-[0.2em] transition hover:gap-3"
              >
                <span>{heroSlice?.primary.primary_action_label}</span>
                <span aria-hidden>↗</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border-b border-neutral-400 pb-2 tracking-[0.2em] text-neutral-500 transition hover:border-neutral-700 hover:text-neutral-700"
              >
                <span>{heroSlice?.primary.secondary_action_label}</span>
              </Link>
            </div>
          </motion.header>

          <motion.section
            initial="hidden"
            animate="show"
            variants={listVariants(prefersReducedMotion)}
            className="mt-16 grid gap-6 md:grid-cols-[1fr_1fr]"
          >
            {heroSlice?.items?.map((item) => (
              <motion.article
                key={item.label}
                variants={fadeIn}
                className="border-l-2 border-neutral-900/40 pl-6"
              >
                <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">{item.label}</p>
                <p className="mt-3 text-2xl font-semibold tracking-tight">{item.detail}</p>
              </motion.article>
            ))}
          </motion.section>
        </section>
      </div>

      <section className="border-t border-neutral-300/60 bg-[#faf8f4]">
        <div className="mx-auto max-w-5xl px-6 py-24 md:px-0">
          <div className="mb-12 flex items-baseline justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">Work in focus</h2>
            <Link
              href="/projects"
              className="text-xs uppercase tracking-[0.35em] text-neutral-500 transition hover:text-neutral-800"
            >
              Browse archive
            </Link>
          </div>

          <motion.ol
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-120px' }}
            variants={listVariants(prefersReducedMotion)}
            className="space-y-12"
          >
            {featured.map((project, index) => (
              <motion.li
                key={project.id}
                variants={fadeIn}
                className="grid gap-6 md:grid-cols-[minmax(160px,0.4fr)_1fr]"
              >
                <div className="space-y-3 text-xs uppercase tracking-[0.35em] text-neutral-400">
                  <span>0{index + 1}</span>
                  <span>{project.data.year}</span>
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-semibold tracking-tight text-[#161616]">
                    <Link href={`/projects/${project.uid}`} className="border-b border-transparent pb-1 transition hover:border-neutral-800">
                      {project.data.title}
                    </Link>
                  </h3>
                  <p className="max-w-2xl text-base text-neutral-600">
                    {project.data.summary?.[0]?.text}
                  </p>
                  <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-neutral-500">
                    {project.data.services?.slice(0, 3).map((service) => (
                      <span key={service.label} className="rounded-full border border-neutral-300 px-4 py-1">
                        {service.label}
                      </span>
                    ))}
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
