# Contributing

## Workflow

1. Fork the repository or create a feature branch from `main`
2. Install dependencies with `pnpm install`
3. Create a descriptive branch name (`feature/prismic-previews`, `fix/hero-contrast`, etc.)
4. Run `pnpm lint && pnpm typecheck && pnpm test` before committing
5. Include relevant unit/Playwright tests for new behavior when possible
6. Open a pull request with a concise summary and screenshots for UI changes

## Commit Guidelines

- Conventional commits preferred (e.g., `feat: add project filter`, `fix: guard analytics loader`)
- Keep commits scoped; avoid bundling unrelated changes
- Run `pnpm format` or `pnpm format:write` when touching multiple files

## Code Style

- TypeScript strict mode everywhere (`tsconfig.base.json`)
- Use Tailwind tokens defined in `tailwind.config.ts`
- Favor Astro components for static rendering; reach for React islands only when interactivity is required
- Enforce accessibility (semantic HTML, focus states, prefers-reduced-motion)
- Validate external data with Zod before usage (`src/lib/prismic-schemas.ts`)

## Testing

- Unit tests: `pnpm test`
- E2E tests: `pnpm test:e2e` (requires dev server or `PLAYWRIGHT_BASE_URL`)
- Add tests for new utilities/components and update existing snapshots if necessary

## Documentation

Update `README.dev.md` or `README.cms.md` when changing developer workflow, content modeling, or deployment requirements.
