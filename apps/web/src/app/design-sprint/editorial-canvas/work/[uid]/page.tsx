'use client';

// Concept 03 — Editorial Canvas (Project Detail)
// Layout: Single column narrative with marginalia column for metadata and pull quotes.
// Color & Type: Warm newsprint background, thin rules, serif headings using var(--font-secondary).
// Motion: Soft fade/slide reveals; subtle underline animations, fully reduced-motion safe.

import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { projectMocks } from '@/mocks/documents';

const fadeIn = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.45, 0, 0.55, 1] } },
};

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

  return (
    <MotionConfig reducedMotion="user">
      <main className="bg-[#f8f6f2] text-[#1f1f1f]">
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_119px,rgba(0,0,0,0.05)_120px)] opacity-30" />
          <section className="relative mx-auto max-w-5xl px-6 pb-16 pt-28 md:px-0">
            <motion.header
              initial="hidden"
              animate="show"
              variants={fadeIn}
              className="grid gap-12 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]"
            >
              <div className="space-y-6">
                <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">
                  {project.data.client} • {project.data.year}
                </p>
                <h1
                  className="text-5xl leading-tight text-[#161616] md:text-[4rem]"
                  style={{ fontFamily: 'var(--font-secondary)', letterSpacing: '-0.03em' }}
                >
                  {project.data.title}
                </h1>
                <p className="text-lg text-neutral-600 max-w-2xl">
                  {project.data.summary?.[0]?.text}
                </p>
              </div>

              <motion.aside
                initial="hidden"
                animate="show"
                variants={fadeIn}
                transition={{ delay: prefersReducedMotion ? 0 : 0.2 }}
                className="space-y-6 border-l border-neutral-300/70 pl-6 text-sm text-neutral-500"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.3em]">Roles</p>
                  <p className="mt-2 text-neutral-700">
                    {project.data.roles?.map((role) => role.label).join(' · ')}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em]">Services</p>
                  <p className="mt-2 text-neutral-700">
                    {project.data.services?.map((service) => service.label).join(' · ')}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em]">Duration</p>
                  <p className="mt-2 text-neutral-700">{project.data.duration}</p>
                </div>
                <div className="pt-4">
                  {project.data.links?.map((link) => (
                    <Link
                      key={link.label}
                      href={(link.url && 'url' in link.url) ? link.url.url ?? '#' : '#'}
                      className="inline-flex items-center gap-2 border-b border-neutral-500/60 pb-1 text-xs uppercase tracking-[0.25em] text-neutral-700 transition hover:gap-3 hover:text-neutral-900"
                    >
                      <span>{link.label}</span>
                      <span aria-hidden>↗</span>
                    </Link>
                  ))}
                </div>
              </motion.aside>
            </motion.header>
          </section>
        </div>

        <motion.figure
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-160px' }}
          variants={fadeIn}
          className="mx-auto max-w-5xl px-6 md:px-0"
        >
          <div className="overflow-hidden rounded-[2.75rem] border border-neutral-300/70">
            <Image
              src={project.data.cover.url ?? '/images/placeholder.jpg'}
              alt={project.data.cover.alt ?? project.data.title}
              width={1800}
              height={1080}
              className="h-auto w-full object-cover"
            />
          </div>
        </motion.figure>

        <section className="mx-auto max-w-3xl px-6 py-20 md:px-0">
          <motion.article
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-120px' }}
            variants={fadeIn}
            className="space-y-8 text-lg leading-relaxed text-neutral-600"
          >
            <p>
              This concept embraces an editorial cadence reminiscent of long-form magazines. Sections are separated by generous breathing room, and all content aligns to a 60px baseline to keep rhythm consistent.
            </p>
            <p>
              Replace these placeholders with Prismic slices such as `RichSection`, `MediaBlock`, and `StatsRow`. Use the marginalia column for testimonials or strategic quotes.
            </p>
          </motion.article>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-120px' }}
            variants={fadeIn}
            className="mt-16 space-y-10 border-l-2 border-neutral-300/70 pl-8"
          >
            {project.data.metrics?.map((metric) => (
              <div key={metric.label}>
                <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">{metric.label}</p>
                <p className="mt-3 text-3xl font-semibold text-[#151515]">{metric.value}</p>
                <p className="mt-2 text-sm text-neutral-500">{metric.context}</p>
              </div>
            ))}
          </motion.div>
        </section>

        <section className="border-t border-neutral-300/60 bg-[#f1ede6]">
          <div className="mx-auto max-w-5xl px-6 py-20 md:px-0">
            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-120px' }}
              variants={fadeIn}
              className="text-3xl font-semibold text-[#181818]"
              style={{ fontFamily: 'var(--font-secondary)' }}
            >
              Skill contributions
            </motion.h2>
            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-100px' }}
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: prefersReducedMotion ? 0 : 0.12 },
                },
              }}
              className="mt-12 grid gap-8 md:grid-cols-2"
            >
              {project.data.skills?.map((skillRelation) => (
                <motion.li
                  key={skillRelation.skill?.id}
                  variants={fadeIn}
                  className="rounded-[2rem] border border-neutral-300/70 bg-white/80 p-8 shadow-[0_8px_30px_rgba(15,15,15,0.08)]"
                >
                  <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">
                    {skillRelation.skill?.data.category}
                  </p>
                  <p className="mt-3 text-xl font-semibold text-neutral-900">
                    {skillRelation.skill?.data.label}
                  </p>
                  <p className="mt-3 text-sm text-neutral-500">
                    {skillRelation.skill?.data.description}
                  </p>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </section>
      </main>
    </MotionConfig>
  );
}
