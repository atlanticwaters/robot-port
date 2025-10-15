import { loadProjects, loadProject } from "@/lib/api";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { LightboxImage } from "@/components/ui/Lightbox";
import { PrismicNextImage } from "@prismicio/next";
import { asPlainText, pickLabel, resolveLinkURL } from "@/utils/prismic";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface ProjectPageProps {
  params: { uid: string };
}

export async function generateStaticParams() {
  const projects = await loadProjects();
  return projects
    .filter((project) => project.uid)
    .map((project) => ({
      uid: project.uid!,
    }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = await loadProject(params.uid);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const description = asPlainText(project.data.summary as any, 200);

  return {
    title: `${project.data.title} · Project`,
    description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await loadProject(params.uid);

  if (!project) {
    notFound();
  }

  const description = asPlainText(project.data.summary as any, 200);
  const galleryImages = project.data.gallery?.filter((item) => item.media?.url) ?? [];
  const metrics = project.data.metrics ?? [];
  const serviceList = project.data.services ?? [];
  const relatedLinks = project.data.links?.filter((link) =>
    resolveLinkURL(link.url as any)
  ) ?? [];

  return (
    <article className="container space-y-16 py-16 md:py-24">
      <header className="grid gap-10 md:grid-cols-[minmax(0,1.2fr),minmax(0,0.8fr)] md:items-end">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-muted">
            {project.data.client ?? "Client"}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            {project.data.title}
          </h1>
          {description ? (
            <p className="max-w-2xl text-base text-muted">{description}</p>
          ) : null}
          <div className="flex flex-wrap gap-2">
            {serviceList.map((service, index) => (
              <span
                key={index}
                className="rounded-full border border-border/60 px-3 py-1 text-xs uppercase tracking-[0.25em] text-muted"
              >
                {pickLabel(service.label, "Service")}
              </span>
            ))}
          </div>
        </div>
        <aside className="space-y-4 rounded-2xl border border-border/70 bg-background/70 p-6 text-sm text-muted">
          <dl className="grid gap-2">
            {project.data.year ? (
              <div className="flex items-center justify-between">
                <dt className="text-xs uppercase tracking-[0.3em]">Year</dt>
                <dd className="text-foreground">{project.data.year}</dd>
              </div>
            ) : null}
            {project.data.duration ? (
              <div className="flex items-center justify-between">
                <dt className="text-xs uppercase tracking-[0.3em]">Duration</dt>
                <dd className="text-foreground">{project.data.duration}</dd>
              </div>
            ) : null}
            {project.data.roles?.length ? (
              <div>
                <dt className="text-xs uppercase tracking-[0.3em]">Roles</dt>
                <dd className="mt-1 text-foreground">
                  {project.data.roles
                    .map((role) => pickLabel(role.label))
                    .join(", ")}
                </dd>
              </div>
            ) : null}
            {project.data.tags?.length ? (
              <div>
                <dt className="text-xs uppercase tracking-[0.3em]">Tags</dt>
                <dd className="mt-1 flex flex-wrap gap-2">
                  {project.data.tags.map((entry, index) => (
                    <span
                      key={index}
                      className="rounded-full border border-border/60 px-3 py-1 text-xs uppercase tracking-[0.3em] text-muted"
                    >
                      {pickLabel(
                        entry.tag?.data?.label ?? entry.tag?.uid ?? "Tag"
                      )}
                    </span>
                  ))}
                </dd>
              </div>
            ) : null}
            {project.data.skills?.length ? (
              <div>
                <dt className="text-xs uppercase tracking-[0.3em]">Skills</dt>
                <dd className="mt-1 flex flex-wrap gap-2">
                  {project.data.skills.map((entry, index) => (
                    <span
                      key={index}
                      className="rounded-full border border-border/60 px-3 py-1 text-xs uppercase tracking-[0.3em] text-muted"
                    >
                      {pickLabel(
                        entry.skill?.data?.label ?? entry.skill?.uid ?? "Skill"
                      )}
                    </span>
                  ))}
                </dd>
              </div>
            ) : null}
          </dl>
          {relatedLinks.length ? (
            <div className="border-t border-border/60 pt-4">
              <p className="text-xs uppercase tracking-[0.3em]">Links</p>
              <ul className="mt-3 space-y-2">
                {relatedLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      className="text-sm text-accent"
                      href={resolveLinkURL(link.url as any) ?? "#"}
                    >
                      {pickLabel(link.label, "Link")}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>
      </header>

      {project.data.cover?.url ? (
        <div className="overflow-hidden rounded-3xl">
          <PrismicNextImage
            field={project.data.cover as any}
            className="rounded-3xl border border-border/70"
          />
        </div>
      ) : null}

      {metrics.length ? (
        <section>
          <div className="grid gap-6 md:grid-cols-3">
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
          </div>
        </section>
      ) : null}

      {project.data.body?.length ? (
        <section className="space-y-12">
          <SliceZone slices={project.data.body as any} components={components} />
        </section>
      ) : null}

      {galleryImages.length ? (
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Gallery
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {galleryImages.map((item, index) => (
              <LightboxImage
                key={index}
                src={item.media?.url!}
                alt={item.media?.alt ?? ""}
                caption={item.caption ?? null}
              />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
