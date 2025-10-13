// // import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

export type CalloutProps = SliceComponentProps<any>;

export default function Callout({ slice }: CalloutProps): JSX.Element {
  const primary = slice.primary;

  return (
    <section className="my-16">
      <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-tr from-primary/5 via-transparent to-accent/10 p-10">
        {primary.label && (
          <p className="text-xs uppercase tracking-[0.35em] text-muted">
            {primary.label}
          </p>
        )}
        {primary.heading && (
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
            {primary.heading}
          </h2>
        )}
        {primary.body && (
          <p className="mt-3 max-w-2xl text-base text-muted">
            {primary.body}
          </p>
        )}
      </div>
    </section>
  );
}
