# Quick Start Guide

## Prerequisites

- Node.js 22+ (current: v22.20.0)
- pnpm 9+ (managed via corepack)

## Environment Setup

The project is configured with the Prismic repository name **"fairway"**.

Environment file: `apps/web/.env.local`
```env
NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME=fairway
# PRISMIC_ACCESS_TOKEN=your-token-here  # Optional for public content
PRISMIC_PREVIEW_SECRET=your-preview-secret  # Optional for preview mode
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Starting the Development Server

### Option 1: Quick Start Script (Recommended)

```bash
./dev.sh
```

This will:
- Check dependencies and install if needed
- Start Next.js dev server on http://localhost:3000
- Display all running services
- Handle graceful shutdown with Ctrl+C

### Option 2: Individual Commands

```bash
# Start Next.js dev server only
pnpm dev

# Or from root
npm run dev
```

### Option 3: Using npm scripts

```bash
# Start all services
npm run dev:all

# Start just Next.js
npm run dev

# Start Slice Machine (if configured)
npm run slices
```

## Services

| Service | URL | Description |
|---------|-----|-------------|
| **Next.js** | http://localhost:3000 | Main application |
| **Slice Machine** | http://localhost:9999 | Prismic CMS editor (requires setup) |

## Current Status

✅ **Working:**
- Next.js dev server is running
- Environment configured for Prismic "fairway" repository
- Dependencies installed
- Build configuration updated

⚠️ **Notes:**
- Slice Machine requires `slicemachine` CLI to be installed globally or configured
- Build has linting disabled temporarily (see `next.config.mjs`)
- Mock data fallback is available if Prismic content is unavailable

## Development Workflow

1. **Start development:**
   ```bash
   ./dev.sh
   ```

2. **Open browser:**
   - Navigate to http://localhost:3000

3. **Make changes:**
   - Edit files in `apps/web/src/`
   - Hot reload is enabled

4. **Stop services:**
   - Press `Ctrl+C` in terminal running `dev.sh`

## Project Structure

```
robot-port/
├── apps/web/           # Next.js application
│   ├── src/
│   │   ├── app/        # Next.js App Router pages
│   │   ├── components/ # React components
│   │   ├── lib/        # Utilities and API clients
│   │   ├── slices/     # Prismic slice components
│   │   └── styles/     # Global styles
│   ├── .env.local      # Local environment config
│   └── package.json
├── dev.sh              # Quick start script
└── package.json        # Root package.json
```

## Troubleshooting

### Port Already in Use

If port 3000 is already in use:
```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Dependencies Out of Sync

```bash
pnpm install
```

### Clear Next.js Cache

```bash
cd apps/web
pnpm clean
# or
rm -rf .next
```

## Next Steps

1. ✅ Development server is running at http://localhost:3000
2. Connect to Prismic CMS (optional - mock data available)
3. Fix linting errors in production build
4. Set up Slice Machine for CMS content modeling

## Available Scripts

From root directory:

```bash
pnpm dev          # Start Next.js dev server
pnpm dev:all      # Start all services (via dev.sh)
pnpm build        # Production build
pnpm lint         # Run ESLint
pnpm typecheck    # Run TypeScript checks
pnpm test         # Run tests
pnpm format       # Format code
```

## Current Services Running

- ✅ Next.js dev server: http://localhost:3000
