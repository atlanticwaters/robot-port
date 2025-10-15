# Deployment Guide

## Build Commands

- Install dependencies: `pnpm install`
- Production build: `pnpm build` (runs lint, typecheck, Astro build)
- Preview server (optional): `pnpm preview`

The Astro app outputs to `apps/web/dist`. Static assets (sitemap, RSS, search index JSON) are generated during `pnpm build`.

## Environment Variables

| Variable                  | Description                                                |
| ------------------------- | ---------------------------------------------------------- |
| `PRISMIC_REPOSITORY_NAME` | Prismic repo name (required)                               |
| `PRISMIC_ACCESS_TOKEN`    | Private repo token (optional)                              |
| `PRISMIC_PREVIEW_SECRET`  | Secret string used by `/api/preview`                       |
| `SITE_URL`                | Canonical site URL (used for sitemap/RSS/structured data)  |
| `NETLIFY_BUILD_HOOK`      | Netlify build webhook (optional, used by Prismic webhooks) |
| `CF_PAGES_HOOK_URL`       | Cloudflare Pages build webhook (optional)                  |

## Netlify

1. Create a new Netlify site and connect this repository
2. Build command: `pnpm build`
3. Publish directory: `apps/web/dist`
4. Add environment variables listed above in Site Settings > Build & deploy > Environment
5. Enable asset optimization (optional) and configure custom headers (see `src/lib/security.ts`)
6. Generate a Build Hook and add it to Prismic’s webhook configuration for automatic rebuilds

## Cloudflare Pages

1. Create a Pages project and connect the repository
2. Build command: `pnpm build`
3. Build output directory: `apps/web/dist`
4. Set the environment variables under Settings > Environment variables
5. (Optional) Use a Cloudflare Pages Function/KV pair for on-demand revalidation
6. Provide the Pages deploy hook URL to Prismic webhooks

## Preview Flow

- `/api/preview` sets the Prismic preview cookie and redirects to the resolved document route
- `/api/exit-preview` clears the preview cookie
- Configure Prismic preview environment to point at production/staging domain with correct secret

## Monitoring & Budgets

- CI runs Lighthouse CI (`.github/workflows/lighthouse.yml`) with performance/accessibility/SEO budgets ≥ 0.9/0.95/0.95
- Unit and E2E tests run in CI each push/PR (`.github/workflows/ci.yml`)

## CDN & Caching Recommendations

- Cache static assets aggressively (immutable hashed files from Astro build)
- Set security headers from `src/lib/security.ts`
- Stale-while-revalidate on HTML pages (via Netlify headers or Cloudflare Cache Rules)

## Prismic Webhooks

Configure a webhook in Prismic targeting either `NETLIFY_BUILD_HOOK` or `CF_PAGES_HOOK_URL`. Include `release` and `publish` events to trigger rebuilds whenever content changes.
