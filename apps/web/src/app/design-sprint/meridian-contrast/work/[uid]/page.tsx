'use client';

// Concept 05 — Meridian Contrast (Project Detail)
// Layout: Split hero with vertical timeline rail, bold numeric markers, and focused narrative blocks.
// Color & Type: Charcoal gradient base with white typography and subtle amber accent chips.
// Motion: Scroll-driven progress indicator, staggered section reveals, respecting reduced motion settings.

import { useRef } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { MotionConfig, motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { projectMocks } from '@/mocks/documents';

type PageProps = {
  params: { uid: string };
};

const sectionVariants = (reduce: boolean) => ({
  hidden: { opacity: 0, y: reduce ? 0 : 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
});

export default function ProjectPage({ params }: PageProps) {
  const prefersReducedMotion = useReducedMotion();
  const project = projectMocks.find((p) => p.uid === params.uid);

  if (!project) {
    notFound();
    return null;
  }

  const timelineRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start end', 'end start'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });
  const progressHeight = useTransform(progress, (value) => `${value * 100}%`);

  const timeline = [
    {
      label: 'Context',
      copy: 'Defining what a premium, motion-forward product should feel like for ambitious teams.',
    },
    {
      label: 'Execution',
      copy: 'Architected modular motion primitives, enabling choreographed narratives across surfaces.',
    },
    {
      label: 'Impact',
      copy: 'Elevated engagement metrics and established a reusable system for subsequent launches.',
    },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative overflow-hidden bg-[#050505] text-[#f5f5f5]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent_65%),linear-gradient(135deg,#050505,#0c0c0c)]" />

        <section className="relative mx-auto max-w-6xl px-6 pb-20 pt-28 md:grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-end md:gap-16">
          <motion.header
            initial="hidden"
            animate="show"
            variants={sectionVariants(prefersReducedMotion)}
            className="space-y-6"
          >
            <p className="text-xs uppercase tracking-[0.5em] text-neutral-400">
              {project.data.client} • {project.data.year}
            </p>
            <h1 className="text-[clamp(2.8rem,7vw,4.8rem)] leading-[0.95] uppercase tracking-[-0.04em]">
              {project.data.title}
            </h1>
            <p className="max-w-xl text-base text-neutral-300">{project.data.summary?.[0]?.text}</p>
            <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.4em] text-neutral-500">
              {project.data.roles?.map((role) => (
                <span key={role.label} className="rounded-full border border-white/15 px-4 py-1">
                  {role.label}
                </span>
              ))}
            </div>
          </motion.header>

          <motion.figure
            initial="hidden"
            animate="show"
            variants={sectionVariants(prefersReducedMotion)}
            transition={{ delay: prefersReducedMotion ? 0 : 0.1 }}
            className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 shadow-[0_30px_120px_rgba(0,0,0,0.65)]"
          >
            <Image
              src={project.data.cover.url ?? '/images/placeholder.jpg'}
              alt={project.data.cover.alt ?? project.data.title}
              width={1600}
              height={1200}
              className="h-auto w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent" />
          </motion.figure>
        </section>

        <section className="relative mx-auto max-w-6xl px-6 pb-28 md:grid md:grid-cols-[120px_1fr] md:gap-16">
          <div className="relative hidden md:block">
            <div className="h-full w-[2px] bg-white/10" />
            <motion.div
              className="absolute left-0 top-0 w-[2px] rounded-full bg-gradient-to-b from-white via-white/80 to-transparent"
              style={{ height: progressHeight }}
            />
          </div>

          <div ref={timelineRef} className="space-y-12">
            {timeline.map((section, index) => (
              <motion.article
                key={section.label}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-150px' }}
                variants={sectionVariants(prefersReducedMotion)}
                transition={{ delay: prefersReducedMotion ? 0 : index * 0.04 }}
                className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-10 backdrop-blur-xl"
              >
                <p className="text-xs uppercase tracking-[0.45em] text-neutral-400">{section.label}</p>
                <p className="mt-4 text-lg text-neutral-200">{section.copy}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#0a0a0a]">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-120px' }}
              variants={sectionVariants(prefersReducedMotion)}
              className="text-3xl uppercase tracking-[0.35em] text-white/80"
            >
              Metrics
            </motion.h2>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-100px' }}
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: prefersReducedMotion ? 0 : 0.12 },
                },
              }}
              className="mt-12 grid gap-6 md:grid-cols-3"
            >
              {project.data.metrics?.map((metric) => (
                <motion.div
                  key={metric.label}
                  variants={sectionVariants(prefersReducedMotion)}
                  className="rounded-3xl border border-white/10 bg-white/[0.05] p-8 text-sm text-neutral-300"
                >
                  <p className="text-xs uppercase tracking-[0.45em] text-white/70">{metric.label}</p>
                  <p className="mt-4 text-3xl font-semibold text-white">{metric.value}</p>
                  <p className="mt-2 text-xs">{metric.context}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
    </MotionConfig>
  );
}
