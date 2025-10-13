# Astro to Next.js Migration Guide

## Overview

Your project has been migrated from Astro to Next.js 14 with Prismic CMS integration. This document outlines what's been done and the next steps.

## What's Been Completed

### 1. Package Configuration
- ✅ Updated [package.json](package.json) with Next.js dependencies
- ✅ Removed Astro-specific packages
- ✅ Added `@prismicio/next`, `@prismicio/react`
- ✅ Added `@slicemachine/adapter-next`
- ✅ Updated scripts for Next.js workflow

### 2. Configuration Files
- ✅ Created [next.config.mjs](next.config.mjs) with Prismic image optimization
- ✅ Updated [tsconfig.json](tsconfig.json) for Next.js
- ✅ Created [.eslintrc.json](.eslintrc.json) for Next.js linting
- ✅ Updated [slicemachine.config.json](../../slicemachine.config.json) for Next.js adapter

### 3. Prismic Integration
- ✅ Updated [src/lib/prismic.ts](src/lib/prismic.ts) to use Next.js patterns
- ✅ Added preview support with `enableAutoPreviews`
- ✅ Updated environment variables to use `NEXT_PUBLIC_` prefix
- ✅ Created [.env.local](.env.local) with initial configuration

### 4. Next.js App Router Structure
- ✅ Created [src/app/layout.tsx](src/app/layout.tsx) - Root layout with Prismic preview
- ✅ Created [src/app/page.tsx](src/app/page.tsx) - Homepage
- ✅ Created [src/styles/globals.css](src/styles/globals.css) - Global styles with Tailwind
- ✅ Created [src/app/api/preview/route.ts](src/app/api/preview/route.ts) - Prismic preview API
- ✅ Created [src/app/api/exit-preview/route.ts](src/app/api/exit-preview/route.ts) - Exit preview API
- ✅ Created [src/app/slice-simulator/page.tsx](src/app/slice-simulator/page.tsx) - Slice Machine simulator

## What Needs To Be Done

### 1. Install Dependencies
```bash
cd apps/web
pnpm install
```

### 2. Convert Astro Slices to React Components

Each slice in `src/slices/` needs to be converted from `.astro` to `.tsx`:

**Current Slices to Convert:**
- Hero
- RichTextSection
- MediaGallery
- Metrics
- Quote
- ImageGrid
- Callout
- LinkGroup
- CodeBlock
- CTABanner

**Example Conversion:**

**Before (Astro):**
```astro
---
import type { Content } from "@prismicio/client";

export interface Props {
  slice: Content.HeroSlice;
}

const { slice } = Astro.props;
---

<section class="hero">
  <h1>{slice.primary.title}</h1>
</section>
```

**After (React/TSX):**
```tsx
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

export default function Hero({ slice }: HeroProps) {
  return (
    <section className="hero">
      <h1>{slice.primary.title}</h1>
    </section>
  );
}
```

### 3. Update Slices Index

Once slices are converted, update [src/slices/index.ts](src/slices/index.ts):

```typescript
// Remove .astro extensions and update paths
import Hero from './Hero';
import RichTextSection from './RichTextSection';
// ... etc

export const components = {
  hero: Hero,
  rich_text_section: RichTextSection,
  // ... etc
};
```

### 4. Convert Pages to App Router

Migrate pages from `src/pages/*.astro` to `src/app/*/page.tsx`:

**Current Pages:**
- `pages/index.astro` → `app/page.tsx` ✅ (basic version created)
- `pages/blog/index.astro` → `app/blog/page.tsx`
- `pages/blog/[uid].astro` → `app/blog/[uid]/page.tsx`
- `pages/work/index.astro` → `app/projects/page.tsx`
- `pages/work/[uid].astro` → `app/projects/[uid]/page.tsx`
- `pages/case-study/index.astro` → `app/case-study/page.tsx`
- `pages/case-study/[uid].astro` → `app/case-study/[uid]/page.tsx`
- `pages/about.astro` → `app/about/page.tsx`

**Example Page Conversion:**

**Before (Astro with getStaticPaths):**
```astro
---
export async function getStaticPaths() {
  const posts = await loadPosts();
  return posts.map(post => ({ params: { uid: post.uid }, props: { post } }));
}

const { post } = Astro.props;
---
<h1>{post.data.title}</h1>
```

**After (Next.js App Router):**
```tsx
import { notFound } from "next/navigation";
import { createClient } from "@/lib/prismic";

export async function generateStaticParams() {
  const client = createClient();
  const posts = await client.getAllByType("post");

  return posts.map((post) => ({
    uid: post.uid,
  }));
}

export default async function BlogPost({ params }: { params: { uid: string } }) {
  const client = createClient();
  const post = await client.getByUID("post", params.uid).catch(() => notFound());

  return <h1>{post.data.title}</h1>;
}
```

### 5. Convert Layout Files

Convert Astro layouts to React components:

- `src/layouts/BaseLayout.astro` → Can be incorporated into `src/app/layout.tsx`
- `src/layouts/ArticleLayout.astro` → Create as a React component in `src/components/layouts/`

### 6. Convert Astro Components to React

All `.astro` components in `src/components/` need to be converted to `.tsx`:

**Components to Convert:**
- `components/ui/ResponsiveImage.astro`
- `components/layout/Analytics.astro`
- `components/layout/Seo.astro`
- `components/layout/SiteChrome.astro`
- `components/layout/partials/SiteFooter.astro`
- `components/layout/partials/SiteHeader.astro`
- `components/cards/ProjectCard.astro`
- `components/cards/PostCard.astro`
- `components/cards/CaseStudyCard.astro`
- `components/navigation/NavMenu.astro`
- `components/SliceZone.astro`

**Note:** `ThemeToggle.tsx` and `Lightbox.tsx` are already React components ✅

### 7. Update API Layer

The API layer in [src/lib/api.ts](src/lib/api.ts) needs updating:
- Remove Astro-specific imports (e.g., `import.meta.env`)
- Update environment variable access to use `process.env`
- Test the mock fallback system still works

### 8. Test the Setup

After completing conversions:

```bash
# Start development server
pnpm dev

# Visit http://localhost:3000

# Test Slice Machine
pnpm slicemachine
# Visit http://localhost:9999
```

### 9. Update Prismic Content Types

If needed, regenerate TypeScript types:

```bash
# Install Prismic CLI globally if not already
pnpm add -g @slicemachine/cli

# Generate types
pnpm slicemachine
```

## Environment Variables

Update your `.env.local` with actual values:

```env
NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME=robot-port
PRISMIC_ACCESS_TOKEN=your_access_token_here
PRISMIC_PREVIEW_SECRET=your_preview_secret_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Key Differences: Astro vs Next.js

### Component Syntax
- Astro: `<Component {...props} />`
- Next.js: Same, but use `className` instead of `class`

### Data Fetching
- Astro: `getStaticPaths()` + `Astro.props`
- Next.js: `generateStaticParams()` + async Server Components

### Environment Variables
- Astro: `import.meta.env.VAR_NAME`
- Next.js: `process.env.VAR_NAME` (server) or `process.env.NEXT_PUBLIC_VAR_NAME` (client)

### Styles
- Astro: `<style>` tag or `class="..."`
- Next.js: CSS Modules, Tailwind with `className="..."`

### Client Interactivity
- Astro: `client:*` directives
- Next.js: `"use client"` directive at top of file

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prismic Next.js Documentation](https://prismic.io/docs/nextjs)
- [Slice Machine Documentation](https://prismic.io/docs/slice-machine)
- [Next.js App Router Guide](https://nextjs.org/docs/app)

## Need Help?

Common issues:
1. **Import errors**: Update path aliases from `@components/*` to `@/components/*`
2. **Hydration errors**: Ensure server and client render the same HTML
3. **Image optimization**: Use `next/image` instead of `<img>` tags
4. **Dynamic routes**: Use `[param]` folders, not `[param].tsx` files

## Next Steps

1. Run `pnpm install` to install Next.js dependencies
2. Start with converting one simple slice (like `Quote` or `Callout`)
3. Test in the slice simulator
4. Convert more slices
5. Convert pages one by one
6. Test thoroughly before deploying

Good luck with the migration! 🚀
