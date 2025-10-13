// import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

export type ImageGridProps = SliceComponentProps<any>;

export default function ImageGrid({ slice }: ImageGridProps): JSX.Element {
  const primary = slice.primary;
  const items = slice.items || [];

  return (
    <section className="my-16 space-y-6">
      {primary.heading && (
        <h2 className="text-2xl font-semibold tracking-tight">
          {primary.heading}
        </h2>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item: any, index: number) => (
          <figure
            key={index}
            className="overflow-hidden rounded-2xl border border-border/60"
          >
            {item.image?.url && (
              <img
                src={item.image.url}
                alt={item.image.alt ?? ""}
                className="aspect-[4/5] w-full object-cover"
                loading="lazy"
              />
            )}
            {item.caption && (
              <figcaption className="px-4 py-3 text-sm text-muted">
                {item.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
