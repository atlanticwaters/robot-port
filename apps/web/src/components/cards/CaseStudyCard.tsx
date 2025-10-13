import type { CaseStudyDocument } from "@/lib/prismic-schemas";
import { asPlainText } from "@/utils/prismic";
import Link from "next/link";

interface CaseStudyCardProps {
  caseStudy: CaseStudyDocument;
}

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const summary = asPlainText(caseStudy.data.hero_description as any, 160);
  const href = `/case-study/${caseStudy.uid}`;

  return (
    <article className="group flex flex-col gap-6 rounded-3xl border border-border/70 bg-background/75 p-6 transition hover:border-foreground/60">
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-background/80">
        {caseStudy.data.hero_media?.url ? (
          <img
            src={caseStudy.data.hero_media.url}
            alt={caseStudy.data.hero_media.alt ?? ""}
            loading="lazy"
            className="aspect-video w-full object-cover transition duration-700 group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.35em] text-muted">
          {caseStudy.data.hero_kicker ?? "Case Study"}
        </p>
        <h3 className="text-xl font-semibold tracking-tight text-foreground">
          {caseStudy.data.hero_headline ?? caseStudy.data.title}
        </h3>
        {summary ? <p className="text-sm text-muted">{summary}</p> : null}
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:gap-3"
        >
          Read case study <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
