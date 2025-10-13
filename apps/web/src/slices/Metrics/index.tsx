// import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

export type MetricsProps = SliceComponentProps<any>;

export default function Metrics({ slice }: MetricsProps): JSX.Element {
  const primary = slice.primary;
  const items = slice.items || [];

  return (
    <section className="my-20">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 rounded-3xl border border-border/70 bg-background/70 p-10 shadow-lg shadow-primary/5">
        <div className="max-w-2xl space-y-3">
          {primary.title && (
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              {primary.title}
            </h2>
          )}
          {primary.caption && (
            <p className="text-base text-muted">{primary.caption}</p>
          )}
        </div>
        <dl className="grid gap-6 md:grid-cols-3">
          {items.map((item: any, index: number) => (
            <div
              key={index}
              className="rounded-2xl border border-border/60 bg-background/80 p-6 transition hover:border-foreground/40"
            >
              <dt className="text-xs uppercase tracking-[0.3em] text-muted">
                {item.label}
              </dt>
              <dd className="mt-4 text-3xl font-semibold text-foreground">
                {item.value}
              </dd>
              {item.context && (
                <p className="mt-3 text-sm text-muted">{item.context}</p>
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
