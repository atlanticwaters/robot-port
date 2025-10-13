"use client";

import { pickLabel } from "@/utils/prismic";
import type { TagDocument, SkillDocument } from "@/lib/prismic-schemas";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface ProjectsFilterProps {
  tags: TagDocument[];
  skills: SkillDocument[];
  years: (number | null)[];
  selectedTag?: string;
  selectedSkill?: string;
  selectedYear?: string;
}

export function ProjectsFilter({
  tags,
  skills,
  years,
  selectedTag,
  selectedSkill,
  selectedYear,
}: ProjectsFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const params = new URLSearchParams();

      const tag = formData.get("tag") as string;
      const skill = formData.get("skill") as string;
      const year = formData.get("year") as string;

      if (tag) params.set("tag", tag);
      if (skill) params.set("skill", skill);
      if (year) params.set("year", year);

      router.push(`/projects${params.toString() ? `?${params.toString()}` : ""}`);
    },
    [router]
  );

  const hasFilters = selectedTag || selectedSkill || selectedYear;

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-2xl border border-border/70 bg-background/70 p-4 md:grid-cols-3"
    >
      <label className="flex flex-col gap-2 text-sm text-muted">
        <span className="text-xs uppercase tracking-[0.3em]">Tag</span>
        <select
          name="tag"
          defaultValue={selectedTag ?? ""}
          className="rounded-xl border border-border/60 bg-background px-3 py-2"
        >
          <option value="">All tags</option>
          {tags.map((tag) => (
            <option key={tag.id} value={tag.uid ?? ""}>
              {pickLabel(tag.data.label)}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-2 text-sm text-muted">
        <span className="text-xs uppercase tracking-[0.3em]">Skill</span>
        <select
          name="skill"
          defaultValue={selectedSkill ?? ""}
          className="rounded-xl border border-border/60 bg-background px-3 py-2"
        >
          <option value="">All skills</option>
          {skills.map((skill) => (
            <option key={skill.id} value={skill.uid ?? ""}>
              {pickLabel(skill.data.label)}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-2 text-sm text-muted">
        <span className="text-xs uppercase tracking-[0.3em]">Year</span>
        <select
          name="year"
          defaultValue={selectedYear ?? ""}
          className="rounded-xl border border-border/60 bg-background px-3 py-2"
        >
          <option value="">All years</option>
          {years.map((year) => (
            <option key={year} value={String(year)}>
              {year}
            </option>
          ))}
        </select>
      </label>
      <div className="md:col-span-3">
        <button
          type="submit"
          className="rounded-full border border-border px-5 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-muted transition hover:border-foreground"
        >
          Apply filters
        </button>
        {hasFilters ? (
          <a href="/projects" className="ml-3 text-sm text-accent">
            Reset
          </a>
        ) : null}
      </div>
    </form>
  );
}
