import { loadCaseStudies, loadCaseStudy } from "@/lib/api";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { PrismicNextImage } from "@prismicio/next";
import { asPlainText, pickLabel } from "@/utils/prismic";
import { ProjectCard } from "@/components/cards/ProjectCard";
import type { ProjectDocument } from "@/lib/prismic-schemas";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface CaseStudyPageProps {
  params: { uid: string };
}

export async function generateStaticParams() {
  const caseStudies = await loadCaseStudies();
  return caseStudies
    .filter((study) => study.uid)
    .map((study) => ({
      uid: study.uid!,
    }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const caseStudy = await loadCaseStudy(params.uid);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
    };
  }

  const description = asPlainText(caseStudy.data.hero_description as any, 200);

  return {
    title: `${caseStudy.data.title} · Case Study`,
    description,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const caseStudy = await loadCaseStudy(params.uid);

  if (!caseStudy) {
    notFound();
  }

  const description = asPlainText(caseStudy.data.hero_description as any, 200);
  const metrics = caseStudy.data.metrics ?? [];
  const relatedProjects: ProjectDocument[] = (
    caseStudy.data.related_projects ?? []
  )
    .map((entry) => entry.project)
    .filter(
      (project): project is ProjectDocument =>
        Boolean(project) && project?.type === "project"
    );

  return (
    <article className="container space-y-16 py-16 md:py-24">
      <header className="grid gap-10 md:grid-cols-[minmax(0,1.2fr),minmax(0,0.8fr)] md:items-end">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-muted">
            {caseStudy.data.hero_kicker ?? "Case Study"}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            {caseStudy.data.hero_headline ?? caseStudy.data.title}
          </h1>
          {description ? (
            <p className="max-w-2xl text-base text-muted">{description}</p>
          ) : null}
          <div className="flex flex-wrap gap-4 text-sm text-muted">
            <div>
              <span className="block text-xs uppercase tracking-[0.3em] text-muted/80">
                Problem
              </span>
              <p className="mt-1 max-w-md text-muted">
                {asPlainText(caseStudy.data.problem_statement as any, 160)}
              </p>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-[0.3em] text-muted/80">
                Outcome
              </span>
              <p className="mt-1 max-w-md text-muted">
                {asPlainText(caseStudy.data.outcomes as any, 160)}
              </p>
            </div>
          </div>
        </div>
        {caseStudy.data.hero_media?.url ? (
          <div className="overflow-hidden rounded-3xl">
            <PrismicNextImage
              field={caseStudy.data.hero_media as any}
              className="rounded-3xl border border-border/70"
            />
          </div>
        ) : null}
      </header>

      {metrics.length ? (
        <section className="grid gap-6 md:grid-cols-3">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border/60 bg-background/80 p-6"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-muted">
                {pickLabel(metric.label, "Metric")}
              </p>
              <p className="mt-4 text-3xl font-semibold text-foreground">
                {metric.value}
              </p>
              {metric.context ? (
                <p className="mt-3 text-sm text-muted">{metric.context}</p>
              ) : null}
            </div>
          ))}
        </section>
      ) : null}

      <section className="space-y-8">
        <div className="prose prose-slate max-w-3xl dark:prose-invert">
          <h2>Approach</h2>
          <p>{asPlainText(caseStudy.data.approach as any)}</p>
        </div>
        {caseStudy.data.body?.length ? (
          <SliceZone slices={caseStudy.data.body as any} components={components} />
        ) : null}
      </section>

      {relatedProjects.length ? (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Related work
            </h2>
            <a href="/projects" className="text-sm font-semibold text-accent">
              View all
            </a>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {relatedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
