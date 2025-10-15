'use client';

// Concept 02 — Immersive Layers (Project Detail)
// Layout: Full-bleed hero with layered media stack, followed by split narrative panels.
// Color & Type: Dark gradient surfaces with cyan/orange accents; typography mixes serif display (var(--font-secondary)) and sans body.
// Motion: Parallax hero media, staggered reveal for narrative cards, ambient glow activated on scroll; respects reduced motion.

import { useRef } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MotionConfig, motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
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

  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -120]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 60]);

  const sections = [
    {
      title: 'Challenge',
      body: 'Align immersive storytelling with high-performance product flows for cross-platform teams.',
    },
    {
      title: 'Approach',
      body: 'Built layered motion prototypes to orchestrate velocity, using spatial cues to keep momentum.',
    },
    {
      title: 'Outcome',
      body: 'Shipped a coherent experience that increased active engagement and qualitative delight across pilots.',
    },
  ];

  const galleryInViewRef = useRef<HTMLDivElement | null>(null);
  const galleryInView = useInView(galleryInViewRef, { amount: 0.2, once: true });

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative overflow-hidden bg-[#020617] text-slate-100">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.22),transparent_65%)]" />
        <section
          ref={heroRef}
          className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-24 pt-28 md:flex-row md:items-end md:gap-20"
        >
          <motion.header
            style={{ y: headlineY }}
            className="relative z-20 max-w-xl space-y-6"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/80">
              {project.data.client} • {project.data.year}
            </p>
            <h1
              className="text-5xl leading-tight text-white md:text-6xl"
              style={{ fontFamily: 'var(--font-secondary)' }}
            >
              {project.data.title}
            </h1>
            <p className="text-base text-slate-300">{project.data.summary?.[0]?.text}</p>
            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-white/60">
              {project.data.roles?.map((role) => (
                <span key={role.label} className="rounded-full border border-white/20 px-4 py-1">
                  {role.label}
                </span>
              ))}
            </div>
          </motion.header>

          <motion.div
            style={{ y: mediaY }}
            className="relative ml-auto w-full max-w-lg"
          >
            <div className="absolute inset-0 -translate-x-6 translate-y-8 rounded-[3rem] bg-gradient-to-br from-cyan-400/30 via-transparent to-violet-500/30 blur-3xl" />
            <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 shadow-[0_30px_120px_rgba(15,23,42,0.6)] backdrop-blur-xl">
              <Image
                src={project.data.cover.url ?? '/images/placeholder.jpg'}
                alt={project.data.cover.alt ?? project.data.title}
                width={1600}
                height={1200}
                className="h-auto w-full object-cover"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: prefersReducedMotion ? 0.3 : 0.65 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent"
              />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.45 } }}
                className="pointer-events-none absolute bottom-6 left-6 text-xs uppercase tracking-[0.4em] text-white/75"
              >
                Layered prototype still
              </motion.span>
            </div>
          </motion.div>
        </section>

        <section className="relative mx-auto grid max-w-6xl gap-10 px-6 pb-24 md:grid-cols-[2fr_1fr]">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.article
                key={section.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-120px' }}
                transition={{ delay: prefersReducedMotion ? 0 : index * 0.05, duration: 0.6 }}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 text-sm leading-relaxed text-slate-300 shadow-[0_16px_60px_rgba(15,23,42,0.5)] backdrop-blur-lg"
              >
                <span className="text-xs uppercase tracking-[0.4em] text-cyan-200/70">{section.title}</span>
                <p className="mt-4 text-lg text-slate-100">{section.body}</p>
              </motion.article>
            ))}
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/0 p-8 text-sm text-slate-300 shadow-[0_16px_60px_rgba(15,23,42,0.45)] backdrop-blur-xl"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">Project stats</p>
            {project.data.metrics?.map((metric) => (
              <div key={metric.label} className="border-b border-white/10 pb-4 last:border-none last:pb-0">
                <span className="text-xs uppercase tracking-[0.35em] text-cyan-200/80">{metric.label}</span>
                <p className="mt-3 text-3xl font-semibold text-white">{metric.value}</p>
                <p className="mt-1 text-xs text-slate-400">{metric.context}</p>
              </div>
            ))}
            <div className="pt-2">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Deliverables</p>
              <ul className="mt-3 space-y-2 text-xs uppercase tracking-[0.25em] text-slate-300">
                {project.data.services?.map((service) => (
                  <li key={service.label}>{service.label}</li>
                ))}
              </ul>
            </div>
          </motion.aside>
        </section>

        <section
          ref={galleryInViewRef}
          className="relative mx-auto max-w-6xl px-6 pb-32"
        >
          <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 p-10 shadow-[0_24px_100px_rgba(15,23,42,0.6)] backdrop-blur-xl">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={
                galleryInView
                  ? { opacity: 1, y: 0, transition: { duration: 0.6 } }
                  : { opacity: 0, y: 30 }
              }
              className="text-3xl font-semibold text-white"
              style={{ fontFamily: 'var(--font-secondary)' }}
            >
              Motion vignette
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={
                galleryInView
                  ? { opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.6 } }
                  : { opacity: 0, y: 20 }
              }
              className="mt-4 max-w-2xl text-sm text-slate-300"
            >
              Replace this wrapper with a video slice or animated gallery. The container sits on a frosted panel to
              reinforce depth, with accent gradients pulsing gently on hover.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={
                galleryInView
                  ? { opacity: 1, scale: 1, transition: { delay: 0.15, duration: 0.6 } }
                  : { opacity: 0, scale: 0.94 }
              }
              className="mt-10 grid gap-6 md:grid-cols-2"
            >
              {project.data.gallery?.slice(0, 2).map((item, index) => (
                <div
                  key={`${item.media?.url}-${index}`}
                  className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/10"
                >
                  <Image
                    src={item.media?.url ?? '/images/placeholder.jpg'}
                    alt={item.media?.alt ?? ''}
                    width={1200}
                    height={800}
                    className="h-auto w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent" />
                  <p className="absolute bottom-6 left-6 text-xs uppercase tracking-[0.35em] text-white/75">
                    {item.caption}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
    </MotionConfig>
  );
}
