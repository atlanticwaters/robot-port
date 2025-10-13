// import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

export type MediaGalleryProps = SliceComponentProps<any>;

export default function MediaGallery({
  slice,
}: MediaGalleryProps): JSX.Element {
  const primary = slice.primary;
  const items = slice.items || [];

  return (
    <section className="my-16 space-y-6">
      {primary.heading && (
        <h2 className="text-2xl font-semibold tracking-tight">
          {primary.heading}
        </h2>
      )}
      {primary.description && (
        <p className="max-w-2xl text-base text-muted">{primary.description}</p>
      )}
      <div className="grid gap-5 md:grid-cols-2">
        {items.map((item: any, index: number) => (
          <figure
            key={index}
            className="overflow-hidden rounded-2xl border border-border/60 bg-background shadow-sm"
          >
            {item.media?.url && (
              <img
                src={item.media.url}
                alt={item.media.alt ?? ""}
                className="aspect-video w-full object-cover"
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
