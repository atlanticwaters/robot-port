import { loadCaseStudies } from "@/lib/api";
import { CaseStudyCard } from "@/components/cards/CaseStudyCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "In-depth looks at collaborative engagements across product, platform, and brand.",
};

export default async function CaseStudiesPage() {
  const caseStudies = await loadCaseStudies();

  return (
    <section className="container space-y-8 py-16 md:py-20">
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">
          Case Studies
        </h1>
        <p className="max-w-2xl text-base text-muted">
          Stories detailing context, constraints, and measurable outcomes across
          principal-level engagements.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {caseStudies.map((caseStudy) => (
          <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
        ))}
      </div>
    </section>
  );
}
