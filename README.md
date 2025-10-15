# Robot Port

Principal-level portfolio built with Next.js + Prismic. This repo contains the monorepo scaffold, Slice Machine models, mock content, and deployment tooling.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **CMS:** Prismic with Slice Machine
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Testing:** Vitest + Playwright
- **Package Manager:** pnpm

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Start Slice Machine (in separate terminal)
cd apps/web && pnpm slicemachine
```

## Documentation

- `README.dev.md` – local development & testing workflow
- `README.cms.md` – Prismic content modeling and slice guidance
- `README.deploy.md` – deployment checklist
- `CONTRIBUTING.md` – contributing standards and conventions
