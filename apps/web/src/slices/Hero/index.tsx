// import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

export type HeroProps = SliceComponentProps<any>;

export default function Hero({ slice }: HeroProps): JSX.Element {
  const primary = slice.primary;
  const highlights = slice.items || [];

  return (
    <div className="grid gap-10 md:grid-cols-[1.2fr,0.8fr] md:items-end">
      <div className="space-y-6">
        {primary.eyebrow && (
          <p className="text-xs uppercase tracking-[0.35em] text-muted">
            {primary.eyebrow}
          </p>
        )}
        {primary.heading && (
          <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            {primary.heading}
          </h1>
        )}
        {primary.subheading && (
          <div className="max-w-xl text-base text-muted">
            <PrismicRichText field={primary.subheading} />
          </div>
        )}
        <div className="flex flex-wrap gap-3 text-sm font-medium">
          {primary.primary_action_label && primary.primary_action_link && (
            <PrismicNextLink
              field={primary.primary_action_link}
              className="rounded-full border border-border px-5 py-2 transition-colors hover:border-foreground"
            >
              {primary.primary_action_label}
            </PrismicNextLink>
          )}
          {primary.secondary_action_label && primary.secondary_action_link && (
            <PrismicNextLink
              field={primary.secondary_action_link}
              className="rounded-full border border-border px-5 py-2 transition-colors hover:border-foreground"
            >
              {primary.secondary_action_label}
            </PrismicNextLink>
          )}
        </div>
      </div>
      {highlights.length > 0 && (
        <div className="grid gap-3 rounded-2xl border border-border/70 p-6 backdrop-blur">
          {highlights.map((item: any, index: number) => (
            <div
              key={index}
              className="grid gap-1 rounded-xl border border-border/60 px-4 py-3"
            >
              <span className="text-xs uppercase tracking-[0.2em] text-muted">
                {item.label}
              </span>
              <span className="text-lg font-medium text-foreground">
                {item.detail}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
