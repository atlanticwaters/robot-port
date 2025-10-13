import type { PostDocument } from "@/lib/prismic-schemas";
import { asPlainText } from "@/utils/prismic";
import Link from "next/link";

interface PostCardProps {
  post: PostDocument;
}

export function PostCard({ post }: PostCardProps) {
  const excerpt = post.data.excerpt ?? asPlainText(post.data.body as any, 140);
  const href = `/blog/${post.uid}`;
  const published = post.data.published_at
    ? new Date(post.data.published_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <article className="group flex flex-col gap-4 rounded-3xl border border-border/60 bg-background/75 p-6 transition hover:border-foreground/60">
      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-muted">
        {published ? <span>{published}</span> : null}
        {post.data.reading_time ? (
          <span>· {post.data.reading_time} min read</span>
        ) : null}
      </div>
      <div className="space-y-3">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          {post.data.title}
        </h3>
        {excerpt ? <p className="text-sm text-muted">{excerpt}</p> : null}
      </div>
      <Link
        href={href}
        className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:gap-3"
      >
        Read article <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
