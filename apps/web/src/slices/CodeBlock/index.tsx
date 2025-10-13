// import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

export type CodeBlockProps = SliceComponentProps<any>;

export default function CodeBlock({ slice }: CodeBlockProps): JSX.Element {
  const primary = slice.primary;

  return (
    <section className="my-16">
      {primary.title && (
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">
          {primary.title}
        </h2>
      )}
      <pre className="overflow-x-auto rounded-2xl border border-border/60 bg-[#0b1120] p-5 text-sm text-slate-100 shadow-inner">
        <code>
          {primary.code ?? "// Code sample from Prismic renders here."}
        </code>
      </pre>
      {primary.caption && (
        <p className="mt-3 text-sm text-muted">{primary.caption}</p>
      )}
    </section>
  );
}
