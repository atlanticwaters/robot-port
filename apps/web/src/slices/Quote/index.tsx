// import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

export type QuoteProps = SliceComponentProps<any>;

export default function Quote({ slice }: QuoteProps): JSX.Element {
  const primary = slice.primary;

  return (
    <section className="my-16">
      <figure className="mx-auto max-w-3xl rounded-3xl border border-border/70 bg-background/80 p-10 shadow-inner">
        <blockquote className="text-balance text-2xl font-medium leading-snug text-foreground">
          &quot;
          {primary.quote ??
            "A quote from a client or collaborator will appear here."}
          &quot;
        </blockquote>
        {primary.attribution && (
          <figcaption className="mt-6 text-sm uppercase tracking-[0.35em] text-muted">
            {primary.attribution}
          </figcaption>
        )}
      </figure>
    </section>
  );
}
