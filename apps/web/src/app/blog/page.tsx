import { loadPosts } from "@/lib/api";
import { PostCard } from "@/components/cards/PostCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays and notes on creative technology, product leadership, and expressive systems.",
};

export default async function BlogPage() {
  const posts = await loadPosts();

  return (
    <section className="container space-y-8 py-16 md:py-20">
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight">Writing</h1>
        <p className="max-w-2xl text-base text-muted">
          Observations on crafting expressive, high-performing experiences and
          partnering with teams to ship meaningful work.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
