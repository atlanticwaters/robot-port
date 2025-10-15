import { asPlainText, resolveLinkURL, pickLabel } from "@/utils/prismic";
import type { ProjectDocument } from "@/lib/prismic-schemas";
import { PrismicNextImage } from "@prismicio/next";
import Link from "next/link";

interface ProjectCardProps {
  project: ProjectDocument;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const summary = asPlainText(project.data.summary as any, 160);
  const link = project.data.links?.find((entry) => resolveLinkURL(entry.url as any));
  const href = link ? resolveLinkURL(link.url as any) : `/projects/${project.uid}`;
  const year = project.data.year ?? null;

  return (
    <article className="group grid gap-6 rounded-3xl border border-border/70 bg-background/75 p-6 transition hover:border-foreground/60">
      <div className="relative overflow-hidden rounded-2xl bg-background/80">
        {project.data.cover?.url ? (
          <PrismicNextImage
            field={project.data.cover as any}
            className="rounded-2xl border border-border/70 transition duration-700 group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-muted">
          {project.data.client ? <span>{project.data.client}</span> : null}
          {year ? <span aria-hidden="true">•</span> : null}
          {year ? <span>{year}</span> : null}
        </div>
        <h3 className="text-xl font-semibold tracking-tight text-foreground">
          {project.data.title}
        </h3>
        {summary ? <p className="text-sm text-muted">{summary}</p> : null}
        <div className="flex flex-wrap gap-2">
          {(project.data.services ?? []).slice(0, 3).map((service, index) => (
            <span
              key={index}
              className="rounded-full border border-border/70 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted"
            >
              {pickLabel(service.label, "Service")}
            </span>
          ))}
        </div>
        <Link
          href={href ?? "#"}
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:gap-3"
        >
          View project
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
