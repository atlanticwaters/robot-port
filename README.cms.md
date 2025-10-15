# CMS Guide (Prismic)

## Repository Setup

1. Create a Prismic repository (recommended name: `robot-port`)
2. Copy the JSON definitions in `customtypes/` into Slice Machine (or sync via Prismic CLI)
3. Place slice implementations under `apps/web/src/slices` (already wired for Slice Machine)
4. Configure project using `prismic.config.ts` (adapter already points to `apps/web`)

## Custom Types Overview

| UID          | Kind       | Purpose                                     | Key Fields                                                                                                                      |
| ------------ | ---------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `settings`   | Singleton  | Site-wide metadata, theme tokens, analytics | `site_title`, `site_description`, `primary_color`, `typeface_primary`, `social_links`, `seo_defaults`                           |
| `navigation` | Singleton  | Header, secondary, footer, social nav       | `primary_navigation`, `secondary_navigation`, `footer_navigation`, `social_links`                                               |
| `project`    | Repeatable | Portfolio entries                           | `title`, `summary`, `cover`, `services`, `roles`, `year`, `client`, `tags`, `skills`, `metrics`, `gallery`, `links`, Slice Zone |
| `case_study` | Repeatable | Long-form narrative                         | `hero_*` fields, `problem_statement`, `approach`, `outcomes`, `metrics`, `related_projects`, Slice Zone                         |
| `post`       | Repeatable | Writing / blog articles                     | `title`, `excerpt`, `author`, `published_at`, `tags`, `canonical_url`, Slice Zone                                               |
| `tag`        | Repeatable | Taxonomy for work & posts                   | `label`, `description`, `color`                                                                                                 |
| `skill`      | Repeatable | Capabilities taxonomy                       | `label`, `description`, `category`, `color`                                                                                     |

### Slice Zones

- `project.body`, `case_study.body`, and `post.body` allow curated storytelling using shared slices.

### Shared Slices

| Slice             | Use Case                        | Primary Fields                                                               | Items                       |
| ----------------- | ------------------------------- | ---------------------------------------------------------------------------- | --------------------------- |
| `Hero`            | Page hero with CTA and stats    | `eyebrow`, `heading`, `subheading`, `primary_action_*`, `secondary_action_*` | `label`, `detail`           |
| `RichTextSection` | Narrative text block            | `title`, `align`, `content`                                                  | –                           |
| `MediaGallery`    | Two-column media showcase       | `heading`, `description`                                                     | `media`, `caption`          |
| `Metrics`         | Highlight quantitative outcomes | `title`, `caption`                                                           | `label`, `value`, `context` |
| `Quote`           | Testimonial / pull quote        | `quote`, `attribution`, `title`                                              | –                           |
| `ImageGrid`       | Moodboard / artifact grid       | `heading`, `description`                                                     | `image`, `caption`          |
| `Callout`         | Emphasis block                  | `label`, `heading`, `body`                                                   | –                           |
| `LinkGroup`       | Grouped resource links          | `heading`, `description`                                                     | `label`, `link`, `icon`     |
| `CodeBlock`       | Syntax-highlighted snippet      | `title`, `language`, `code`, `caption`                                       | –                           |
| `CTABanner`       | High-impact CTA                 | `heading`, `description`, `action_*`                                         | –                           |

All slices include `model.json`, `mocks.json`, and a lightweight `screenshot.png` for Slice Machine previews.

## Slice Machine Workflow

- `pnpm slices` runs Slice Machine locally (`http://localhost:9999`)
- Simulator route `/slices` renders slices using the Astro components
- Commit updates for models, mocks, screenshots, and any generated screenshot assets

## Prismic Settings & Navigation

- **Settings** drives theme variables (colors, typefaces) consumed in `BaseLayout`
- Analytics provider/id defined here load scripts through `Analytics.astro`
- **Navigation** populates header menu, secondary CTA, footer sections, and social links

## Content Guidelines

- Provide alt text and captions for all media fields
- Maintain canonical slugs (`uid`) for `project`, `case_study`, and `post`
- Use Group fields for metrics/tags/skills to keep structured data consistent with Zod schemas (`src/lib/prismic-schemas.ts`)
- Editor previews: configure repository preview URL to `https://<site>/api/preview`

## Seed Content

`apps/web/src/mocks/documents.ts` contains rich mock documents mirroring the content models (projects, case studies, posts, tags, skills, settings, navigation). These mocks are used locally when Prismic credentials are absent. Copy them into Prismic to bootstrap editorial data if desired.

## Webhooks & Publishing

- Configure Prismic webhooks to trigger Netlify/Cloudflare build hooks (see `.env.example`)
- Publishing updates automatically invalidate preview sessions and rebuild via CI
