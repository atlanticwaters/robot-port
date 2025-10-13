import { loadProjects, loadTags, loadSkills } from "@/lib/api";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { ProjectsFilter } from "@/components/projects/ProjectsFilter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Index of principal-level engagements across product, brand, and platform.",
};

interface ProjectsPageProps {
  searchParams: { tag?: string; skill?: string; year?: string };
}

export default async function ProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  const [projects, tags, skills] = await Promise.all([
    loadProjects(),
    loadTags(),
    loadSkills(),
  ]);

  const selectedTag = searchParams.tag;
  const selectedSkill = searchParams.skill;
  const selectedYear = searchParams.year;

  const filteredProjects = projects.filter((project) => {
    const matchesTag = selectedTag
      ? project.data.tags.some((entry) => entry.tag?.uid === selectedTag)
      : true;
    const matchesSkill = selectedSkill
      ? project.data.skills.some((entry) => entry.skill?.uid === selectedSkill)
      : true;
    const matchesYear = selectedYear
      ? String(project.data.year ?? "") === selectedYear
      : true;
    return matchesTag && matchesSkill && matchesYear;
  });

  const years = Array.from(
    new Set(projects.map((project) => project.data.year).filter(Boolean))
  ).sort((a, b) => (b ?? 0) - (a ?? 0)) as (number | null)[];

  return (
    <section className="container space-y-8 py-16 md:py-20">
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">
          Selected Work
        </h1>
        <p className="max-w-2xl text-base text-muted">
          A cross-section of partnerships spanning product strategy, design
          systems, creative direction, and front-end engineering leadership.
        </p>
      </div>

      <ProjectsFilter
        tags={tags}
        skills={skills}
        years={years}
        selectedTag={selectedTag}
        selectedSkill={selectedSkill}
        selectedYear={selectedYear}
      />

      <div className="grid gap-8">
        {filteredProjects.length ? (
          <div className="grid gap-6 md:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-border/70 p-10 text-center text-sm text-muted">
            No projects match the current filters. Adjust the selections to
            explore more work.
          </div>
        )}
      </div>
    </section>
  );
}
