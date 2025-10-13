# Developer Guide

## Prerequisites
- Node.js 20 (see `.nvmrc`)
- pnpm 9 (`corepack enable` recommended)
- Prismic repository (set `PRISMIC_REPOSITORY_NAME` and optionally `PRISMIC_ACCESS_TOKEN`)

## Install & Run
1. Install dependencies:
   ```bash
   pnpm install
   ```
2. Copy `.env.example` to `.env` and provide values:
   ```bash
   cp .env.example .env
   ```
3. Start the dev servers (Astro + Slice Machine):
   ```bash
   pnpm dev       # Astro at http://localhost:4321
   pnpm slices    # Slice Machine at http://localhost:9999
   ```

The frontend consumes live Prismic content when credentials are present. Absent credentials, rich mocks under `apps/web/src/mocks` provide realistic fallback data for local development.

## Common Scripts
| Command | Description |
| --- | --- |
| `pnpm lint` | Run eslint across the monorepo |
| `pnpm format` | Check formatting with Prettier |
| `pnpm typecheck` | Strict TypeScript checks |
| `pnpm test` | Vitest unit tests with coverage |
| `pnpm test:e2e` | Playwright smoke tests (requires `pnpm dev` running or `PLAYWRIGHT_BASE_URL`) |
| `pnpm build` | Typecheck + production build |

## Project Layout
```
apps/web            # Astro app
├─ src
│  ├─ components    # Layout, cards, UI primitives
│  ├─ lib           # Prismic client, schemas, analytics, search helpers
│  ├─ pages         # Astro routes, API endpoints, sitemap/rss
│  ├─ slices        # Shared slice Astro implementations + models/mocks
│  └─ styles        # Tailwind-driven global styles
├─ tests/e2e        # Playwright specs
├─ vitest.config.ts # Vitest configuration
└─ tailwind.config.ts
customtypes         # Prismic Custom Type JSON definitions
```

## Coding Standards
- Tailwind with theme tokens defined in `tailwind.config.ts`
- Runtime validation of Prismic data via Zod (`src/lib/prismic-schemas.ts`)
- React islands only when interaction is required (`LightboxImage`, `ThemeToggle`)
- Accessibility first: semantic headings, focus-visible, high contrast
- Tests for new utilities/components whenever feasible (`*.test.ts` or Playwright)

## Slice Development Workflow
1. Run `pnpm slices` to launch Slice Machine
2. Create/edit slices under `apps/web/src/slices` (Astro implementations, model, mock, screenshot)
3. Use the simulator at `/slices` to preview
4. Commit updated `model.json`, `mocks.json`, and screenshots for each slice

## Preview & CMS Integration
- Preview endpoint: `/api/preview` (`PRISMIC_PREVIEW_SECRET` must match Prismic repo)
- Exit preview: `/api/exit-preview`
- Slice Simulator: `/slices`

## Troubleshooting
- Missing Prismic credentials → app falls back to structured mocks (console warns in dev)
- Analytics scripts only load when configured in `settings` singleton
- Regenerate search index via `/api/search.json` endpoint during build
