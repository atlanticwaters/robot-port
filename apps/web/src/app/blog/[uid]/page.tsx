import { loadPosts, loadPost } from "@/lib/api";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { asPlainText } from "@/utils/prismic";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: { uid: string };
}

export async function generateStaticParams() {
  const posts = await loadPosts();
  return posts
    .filter((post) => post.uid)
    .map((post) => ({
      uid: post.uid!,
    }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = await loadPost(params.uid);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const description =
    post.data.excerpt ??
    "Insights on designing expressive, high-performance product experiences.";

  return {
    title: `${post.data.title} · Writing`,
    description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await loadPost(params.uid);

  if (!post) {
    notFound();
  }

  const description =
    post.data.excerpt ??
    "Insights on designing expressive, high-performance product experiences.";
  const published = post.data.published_at
    ? new Date(post.data.published_at)
    : null;

  return (
    <article className="container space-y-8 py-16 md:py-20">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.35em] text-muted">
          {post.data.author ?? "Essay"}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          {post.data.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.35em] text-muted">
          {published ? (
            <span>
              {published.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          ) : null}
          {post.data.reading_time ? (
            <span>· {post.data.reading_time} min read</span>
          ) : null}
        </div>
      </header>
      <div className="prose prose-lg prose-slate max-w-3xl dark:prose-invert">
        {post.data.body?.length ? (
          <SliceZone slices={post.data.body as any} components={components} />
        ) : (
          <p>This article is being drafted. Check back soon.</p>
        )}
      </div>
    </article>
  );
}
