'use client';

// Concept 04 — Kinetic Narrative (Project Detail)
// Layout: Sequential timeline with sticky progress rail and modular sections for storytelling.
// Color & Type: Dark-to-warm gradient surfaces, accent chips for milestones, serif headings for key beats.
// Motion: Scroll-synced progress indicator, section reveals with slight scale pop, micro-interactions on milestone chips.

import { useMemo, useRef } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MotionConfig, motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { projectMocks } from '@/mocks/documents';

type PageProps = {
  params: { uid: string };
};

export default function ProjectPage({ params }: PageProps) {
  const prefersReducedMotion = useReducedMotion();
  const project = projectMocks.find((p) => p.uid === params.uid);

  if (!project) {
    notFound();
    return null;
  }

  const milestones = useMemo(
    () => [
      {
        label: 'Discovery',
        description: 'Mapped opportunity space and strategic levers with executive stakeholders.',
      },
      {
        label: 'Narrative architecture',
        description: 'Crafted motion scripts + prototypes to validate emotional pacing.',
      },
      {
        label: 'Delivery',
        description: 'Guided cross-disciplinary team through build and QA for synchronized launch.',
      },
    ],
    [],
  );

  const timelineRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start start', 'end end'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 20, restDelta: 0.001 });
  const progressHeight = useTransform(progress, (value) => `${Math.min(value * 100, 100)}%`);

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative overflow-hidden bg-[#060816] text-slate-100">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.25),transparent_60%)]" />
        <section className="relative mx-auto max-w-6xl px-6 pb-20 pt-28 md:grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-end md:gap-20">
          <motion.header
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] } }}
            className="space-y-6"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-orange-200/80">
              {project.data.client} • {project.data.year}
            </p>
            <h1
              className="text-5xl leading-tight text-white md:text-[4.2rem]"
              style={{ fontFamily: 'var(--font-secondary)', letterSpacing: '-0.02em' }}
            >
              {project.data.title}
            </h1>
            <p className="max-w-xl text-base text-slate-300">{project.data.summary?.[0]?.text}</p>
            <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.35em] text-white/60">
              {project.data.roles?.map((role) => (
                <span key={role.label} className="rounded-full border border-white/25 px-4 py-1">
                  {role.label}
                </span>
              ))}
            </div>
          </motion.header>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.2, duration: 0.6 } }}
            className="relative aspect-[16/10] overflow-hidden rounded-[3rem] border border-white/10 bg-white/10 shadow-[0_30px_140px_rgba(15,23,42,0.6)] backdrop-blur-2xl"
          >
            <Image
              src={project.data.cover.url ?? '/images/placeholder.jpg'}
              alt={project.data.cover.alt ?? project.data.title}
              fill
              sizes="(min-width: 1024px) 520px, 90vw"
              className="object-cover"
            />
            {!prefersReducedMotion && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-[#060816] via-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.55, transition: { duration: 0.8 } }}
              />
            )}
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.35, duration: 0.5 } }}
              className="pointer-events-none absolute bottom-6 left-6 text-xs uppercase tracking-[0.35em] text-white/75"
            >
              Launch moment
            </motion.span>
          </motion.div>
        </section>

        <section className="relative mx-auto max-w-6xl px-6 pb-28 md:px-6">
          <div className="grid gap-12 md:grid-cols-[120px_1fr]">
            <div className="relative">
              <div className="h-full w-[2px] bg-white/15" />
              <motion.div
                className="absolute left-0 top-0 w-[2px] rounded bg-gradient-to-b from-orange-400 via-white to-transparent"
                style={{ height: progressHeight }}
              />
              <p className="mt-6 text-xs uppercase tracking-[0.35em] text-white/60">Trajectory</p>
            </div>

            <div ref={timelineRef} className="space-y-16">
              {milestones.map((milestone, index) => (
                <motion.article
                  key={milestone.label}
                  initial={{ opacity: 0, y: 40, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-120px' }}
                  transition={{ delay: prefersReducedMotion ? 0 : index * 0.05, duration: 0.65 }}
                  className="rounded-[2.5rem] border border-white/10 bg-white/5 p-10 shadow-[0_24px_100px_rgba(15,23,42,0.55)] backdrop-blur-xl"
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-white/70">
                    <span>Stage 0{index + 1}</span>
                    <motion.span
                      initial={false}
                      whileHover={
                        prefersReducedMotion
                          ? undefined
                          : { scale: 1.08, backgroundColor: 'rgba(249,115,22,0.35)' }
                      }
                      className="rounded-full border border-white/30 px-4 py-1 transition"
                    >
                      {milestone.label}
                    </motion.span>
                  </div>
                  <p className="mt-6 text-lg text-slate-200">{milestone.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#0b1026]">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-semibold text-white"
              style={{ fontFamily: 'var(--font-secondary)' }}
            >
              Key results
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.1, duration: 0.6 }}
              className="mt-12 grid gap-6 md:grid-cols-3"
            >
              {project.data.metrics?.map((metric) => (
                <div key={metric.label} className="rounded-3xl border border-white/10 bg-white/5 p-8 text-sm text-slate-300">
                  <p className="text-xs uppercase tracking-[0.35em] text-orange-200/70">{metric.label}</p>
                  <p className="mt-3 text-3xl font-semibold text-white">{metric.value}</p>
                  <p className="mt-2 text-xs">{metric.context}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
    </MotionConfig>
  );
}
