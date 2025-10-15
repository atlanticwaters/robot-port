# Prismic CMS Setup Guide

## Current Issue

The Prismic repository `robot-port` cannot be reached at `https://robot-port.cdn.prismic.io/api/v2`.

This typically means the repository either:

- Hasn't been created yet
- Was deleted
- Has a different name
- The domain might need time to propagate

## Setup Steps

### 1. Create or Verify Prismic Repository

1. Go to [prismic.io](https://prismic.io) and log in
2. Check if you have a repository named `robot-port`
3. If not, create a new repository:
   - Click "Create repository"
   - Name it exactly: `robot-port`
   - Choose your plan (Start is free)

### 2. Set Up Custom Types

You need to create the following custom types in your Prismic repository:

#### Settings (Single)

- Type: `settings`
- Repeatable: No
- Fields:
  - `site_title` - Key Text
  - `site_description` - Rich Text
  - `og_image` - Image
  - `color_primary` - Color
  - `color_secondary` - Color
  - `color_accent` - Color
  - `font_primary` - Key Text
  - `font_secondary` - Key Text

#### Navigation (Single)

- Type: `navigation`
- Repeatable: No
- Fields:
  - `items` - Group (repeatable)
    - `label` - Key Text
    - `link` - Link
  - `social_links` - Group (repeatable)
    - `platform` - Key Text
    - `url` - Link

#### Project (Repeatable)

- Type: `project`
- Repeatable: Yes
- Fields:
  - `title` - Key Text
  - `summary` - Rich Text
  - `cover` - Image
  - `services` - Group (repeatable)
    - `label` - Key Text
  - `roles` - Group (repeatable)
    - `label` - Key Text
  - `year` - Number
  - `client` - Key Text
  - `duration` - Key Text
  - `metrics` - Group (repeatable)
    - `label` - Key Text
    - `value` - Key Text
    - `context` - Key Text
  - `body` - Slices (use the slices from `/apps/web/src/slices`)

#### Case Study (Repeatable)

- Type: `case_study`
- Repeatable: Yes
- Similar structure to Project with additional case study fields

#### Post (Repeatable)

- Type: `post`
- Repeatable: Yes
- Fields:
  - `title` - Key Text
  - `excerpt` - Rich Text
  - `publish_date` - Date
  - `author` - Key Text
  - `cover` - Image
  - `body` - Slices

### 3. Alternative: Use Slice Machine

Instead of manually creating types, you can use Slice Machine:

```bash
cd apps/web
pnpm slicemachine
```

However, we encountered validation errors with some slice models. You may need to:

1. Update slice models in `/apps/web/src/slices/*/model.json`
2. Or create the custom types manually in Prismic dashboard

### 4. Upload Content

Once the repository is set up and custom types are created:

#### Option A: Manual Entry

1. Go to your Prismic dashboard
2. Create documents for each custom type
3. Use the mock data from `/apps/web/src/mocks/documents.ts` as reference

#### Option B: API Upload (Future)

Once the repository is accessible, we can run:

```bash
cd apps/web
node scripts/upload-content.mjs
```

This script will upload placeholder content programmatically.

### 5. Update Environment Variables

If your repository has a different name, update `.env.local`:

```env
NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME=your-actual-repo-name
PRISMIC_ACCESS_TOKEN=your-access-token
```

## Current Configuration

- **Repository Name**: `robot-port`
- **Endpoint**: `https://robot-port.cdn.prismic.io/api/v2`
- **Access Token**: Configured in `.env.local`
- **Mock Data**: Working (site loads with mock content)

## Mock Data Fallback

The site is currently configured to fall back to mock data when Prismic is unavailable.This ensures the site works for development even without Prismic content.

Mock data is defined in:

- `/apps/web/src/mocks/documents.ts`
- `/apps/web/src/mocks/home.ts`

## Next Steps

1. ✅ Verify or create the Prismic repository at [prismic.io](https://prismic.io)
2. ✅ Set up custom types (manually or via Slice Machine)
3. ✅ Create initial documents in Prismic
4. ✅ Test the connection by refreshing the Next.js site

Once the repository is accessible, the site will automatically fetch real content from Prismic instead of using mocks.
