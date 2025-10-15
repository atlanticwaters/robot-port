'use client';

// Concept 01 — Modular Rhythm (Project Detail)
// Layout: Centered column with modular sections, paired metadata rail on desktop.
// Color & Type: Light background layers with subtle borders; headings set in secondary serif via CSS variable.
// Motion: Hero, metadata rail, and body slices animate with staggered fade/slide; respects reduced motion and uses MotionConfig.

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { projectMocks } from '@/mocks/documents';

const containerVariants = (reduced: boolean) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: reduced ? 0 : 0.1 },
  },
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.33, 1, 0.68, 1] } },
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

  const metadata = [
    { label: 'Client', value: project.data.client },
    { label: 'Role', value: project.data.roles?.map((role) => role.label).join(' · ') },
    { label: 'Services', value: project.data.services?.map((service) => service.label).join(' · ') },
    { label: 'Timeline', value: `${project.data.duration} • ${project.data.year}` },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <main className="bg-[var(--color-bg)] text-[var(--color-fg)]">
        <motion.section
          initial="hidden"
          animate="show"
          variants={containerVariants(prefersReducedMotion)}
          className="mx-auto grid max-w-6xl gap-12 px-6 pb-24 pt-24 md:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)] md:gap-20"
        >
          <motion.header variants={fadeUp} className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-muted)]">
              {project.data.client}
            </p>
            <h1
              className="text-5xl leading-[1.05] tracking-tight md:text-6xl"
              style={{ fontFamily: 'var(--font-secondary)' }}
            >
              {project.data.title}
            </h1>
            <p className="text-lg text-[var(--color-muted)]">
              {project.data.summary?.[0]?.text}
            </p>
            <motion.div
              variants={containerVariants(prefersReducedMotion)}
              className="flex flex-wrap gap-3"
            >
              {project.data.tags?.map((tagRelation) => (
                <motion.span
                  key={tagRelation.tag?.id}
                  variants={fadeUp}
                  className="rounded-full border border-[var(--color-border)] bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.25em] text-[var(--color-secondary)] shadow-sm"
                >
                  {tagRelation.tag?.data.label}
                </motion.span>
              ))}
            </motion.div>
          </motion.header>

          <motion.aside
            variants={fadeUp}
            className="space-y-4 rounded-3xl border border-[var(--color-border)] bg-white/70 p-6 shadow-sm backdrop-blur"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-muted)]">
              Project facts
            </p>
            <ul className="space-y-3 text-sm">
              {metadata.map((item) => (
                <li key={item.label} className="flex flex-col gap-1 border-b border-dashed border-[var(--color-border)] pb-3 last:border-none last:pb-0">
                  <span className="uppercase tracking-[0.25em] text-[var(--color-muted)]">
                    {item.label}
                  </span>
                  <span className="font-medium">{item.value}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2 pt-2">
              {project.data.links?.map((link) => (
                <a
                  key={link.label}
                  href={(link.url && 'url' in link.url) ? link.url.url ?? '#' : '#'}
                  target={(link.url && 'target' in link.url) ? link.url.target : undefined}
                  rel="noreferrer"
                  className="text-sm font-semibold text-[var(--color-accent)] underline-offset-4 hover:underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.aside>
        </motion.section>

        <motion.figure
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-150px' }}
          variants={fadeUp}
          className="mx-auto max-w-6xl px-6"
        >
          <div className="overflow-hidden rounded-[2.5rem] border border-[var(--color-border)] bg-white shadow-lg shadow-[rgba(15,23,42,0.08)]">
            <Image
              src={project.data.cover.url ?? '/placeholder.jpg'}
              alt={project.data.cover.alt ?? project.data.title}
              width={1920}
              height={1080}
              className="h-auto w-full object-cover"
            />
          </div>
        </motion.figure>

        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-120px' }}
          variants={containerVariants(prefersReducedMotion)}
          className="mx-auto max-w-4xl space-y-16 px-6 pb-28 pt-16"
        >
          <motion.article variants={fadeUp} className="space-y-6 text-lg leading-relaxed text-[var(--color-muted)]">
            <p>
              We lead with a narrative overview that grounds the project in outcomes. Replace this block with a
              rich text slice (`RichSection`) once CMS content is wired. Each paragraph maintains ~70ch measure for readability.
            </p>
            <p>
              Modular Rhythm emphasizes clarity and cadence: sections snap to a 24px baseline grid, with callouts breaking the rhythm intentionally to signal importance.
            </p>
          </motion.article>

          <motion.div
            variants={containerVariants(prefersReducedMotion)}
            className="grid gap-6 rounded-3xl border border-[var(--color-border)] bg-white/70 p-8 shadow-sm md:grid-cols-3"
          >
            {project.data.metrics?.map((metric) => (
              <motion.div key={metric.label} variants={fadeUp}>
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">{metric.label}</p>
                <p className="mt-2 text-3xl font-semibold">{metric.value}</p>
                <p className="mt-2 text-sm text-[var(--color-muted)]">{metric.context}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={containerVariants(prefersReducedMotion)}
            className="space-y-8 rounded-[2.5rem] border border-[var(--color-border)] bg-white/80 p-10 shadow-sm"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl font-semibold tracking-tight"
              style={{ fontFamily: 'var(--font-secondary)' }}
            >
              Delivery highlights
            </motion.h2>
            <motion.ul variants={containerVariants(prefersReducedMotion)} className="grid gap-6 md:grid-cols-2">
              {project.data.skills?.map((skillRelation) => (
                <motion.li
                  key={skillRelation.skill?.id}
                  variants={fadeUp}
                  className="rounded-2xl border border-dashed border-[var(--color-border)] p-6 text-sm text-[var(--color-muted)]"
                >
                  <span className="block text-xs uppercase tracking-[0.25em] text-[var(--color-muted)]">
                    {skillRelation.skill?.data.category}
                  </span>
                  <span className="mt-2 block text-lg font-medium text-[var(--color-fg)]">
                    {skillRelation.skill?.data.label}
                  </span>
                  <span className="mt-2 block text-sm">
                    {skillRelation.skill?.data.description}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.section>
      </main>
    </MotionConfig>
  );
}
