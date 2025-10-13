// import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

export type CTABannerProps = SliceComponentProps<any>;

export default function CTABanner({ slice }: CTABannerProps): JSX.Element {
  const primary = slice.primary;

  return (
    <section className="my-20">
      <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-primary/90 via-primary/80 to-secondary/80 p-10 text-white">
        <div className="relative z-10 max-w-3xl space-y-4">
          {primary.heading && (
            <h2 className="text-3xl font-semibold tracking-tight">
              {primary.heading}
            </h2>
          )}
          {primary.description && (
            <p className="text-base text-white/80">{primary.description}</p>
          )}
          {primary.action_label && primary.action_link && (
            <PrismicNextLink
              field={primary.action_link}
              className="inline-flex rounded-full bg-white px-6 py-2 text-sm font-semibold text-primary transition hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {primary.action_label}
            </PrismicNextLink>
          )}
        </div>
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),_transparent_55%)]"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
