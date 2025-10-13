import { loadSettings, loadNavigation, loadSkills, loadProjects } from "@/lib/api";
import { pickLabel } from "@/utils/prismic";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await loadSettings();
  const bio =
    settings?.data.site_description ??
    "Alex Waters partners with design-forward teams to orchestrate expressive, high-performing product experiences.";

  return {
    title: "About",
    description: bio,
  };
}

export default async function AboutPage() {
  const [settings, navigation, skills, projects] = await Promise.all([
    loadSettings(),
    loadNavigation(),
    loadSkills(),
    loadProjects(),
  ]);

  const bio =
    settings?.data.site_description ??
    "Alex Waters partners with design-forward teams to orchestrate expressive, high-performing product experiences.";
  const collaborations = projects.slice(0, 4);

  return (
    <section className="container space-y-16 py-16 md:py-24">
      <div className="grid gap-12 md:grid-cols-[1.1fr,0.9fr] md:items-start">
        <div className="space-y-6">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Principal creative technologist and product design partner.
          </h1>
          <p className="text-base text-muted">{bio}</p>
          <p className="text-base text-muted">
            With over a decade of experience leading hybrid design and
            engineering teams, Alex brings narrative direction, systems
            thinking, and delivery rigor to product organizations shipping
            across platforms.
          </p>
        </div>
        <div className="rounded-2xl border border-border/70 bg-background/70 p-6 text-sm text-muted">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-foreground">
            Capabilities
          </p>
          <ul className="mt-4 space-y-2">
            {skills.map((skill) => (
              <li
                key={skill.id}
                className="flex items-center justify-between"
              >
                <span>{pickLabel(skill.data.label)}</span>
                {skill.data.category ? (
                  <span className="text-xs uppercase tracking-[0.3em] text-muted/80">
                    {skill.data.category}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-muted">
              Selected collaborations
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Recent partners
            </h2>
          </div>
          <a href="/projects" className="text-sm font-semibold text-accent">
            View work
          </a>
        </div>
        <ul className="grid gap-3 md:grid-cols-2">
          {collaborations.map((project) => (
            <li
              key={project.id}
              className="rounded-2xl border border-border/70 bg-background/70 p-4 text-sm text-muted"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-muted/80">
                {project.data.client ?? "Client"}
              </p>
              <p className="mt-2 text-base font-semibold text-foreground">
                {project.data.title}
              </p>
              <p className="mt-2 text-sm text-muted">
                {project.data.roles
                  ?.map((role) => pickLabel(role.label))
                  .join(", ")}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
