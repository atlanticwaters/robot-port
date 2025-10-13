// import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

export type LinkGroupProps = SliceComponentProps<any>;

export default function LinkGroup({ slice }: LinkGroupProps): JSX.Element {
  const primary = slice.primary;
  const items = slice.items || [];

  return (
    <section className="my-16">
      <div className="grid gap-6 rounded-3xl border border-border/70 bg-background/70 p-8">
        {primary.heading && (
          <h2 className="text-2xl font-semibold tracking-tight">
            {primary.heading}
          </h2>
        )}
        {primary.description && (
          <p className="max-w-2xl text-base text-muted">
            {primary.description}
          </p>
        )}
        <ul className="grid gap-3">
          {items.map((item: any, index: number) => (
            <li key={index}>
              <PrismicNextLink
                field={item.link}
                className="group flex items-center justify-between rounded-xl border border-transparent px-4 py-3 transition hover:border-border hover:bg-background/60"
              >
                <span className="text-sm font-medium text-foreground group-hover:text-accent">
                  {item.label ?? "Link"}
                </span>
                <span
                  aria-hidden="true"
                  className="text-muted group-hover:text-accent"
                >
                  →
                </span>
              </PrismicNextLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
