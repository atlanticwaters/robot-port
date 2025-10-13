// import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";

export type RichTextSectionProps =
  SliceComponentProps<any>;

export default function RichTextSection({
  slice,
}: RichTextSectionProps): JSX.Element {
  const primary = slice.primary;
  const content = primary.content;

  return (
    <section
      className={`prose prose-slate dark:prose-invert mx-auto my-16 max-w-3xl ${
        primary.align === "center" ? "text-center" : ""
      }`}
    >
      {primary.title && <h2>{primary.title}</h2>}
      {content && <PrismicRichText field={content} />}
    </section>
  );
}
