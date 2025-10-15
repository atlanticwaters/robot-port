# Quick Start: Adding Content to Fairway Prismic Repository

Your site is configured to use the **fairway** Prismic repository.

## Current Status

✅ Repository: `fairway` is accessible
❌ Custom Types: None defined yet
🔄 Site: Running at http://localhost:3000 with mock data fallback

## Steps to Add Content

### 1. Access Prismic Dashboard

Go to: **https://fairway.prismic.io**

Log in with your Prismic account.

### 2. Create Custom Types

You need to create these custom types manually in the Prismic dashboard:

#### A. Settings (Single Type)

1. Go to "Custom Types" → "Create New"
2. Type: **Single** (only one document)
3. Name: `settings`
4. Add fields:
   - `site_title` - Key Text
   - `site_description` - Rich Text
   - `color_primary` - Color
   - `color_secondary` - Color
   - `color_accent` - Color
   - `font_primary` - Key Text
   - `font_secondary` - Key Text

#### B. Navigation (Single Type)

1. Type: **Single**
2. Name: `navigation`
3. Add fields:
   - `items` - Group (Repeatable)
     - `label` - Key Text
     - `link` - Link
   - `social_links` - Group (Repeatable)
     - `platform` - Key Text
     - `url` - Link

#### C. Project (Repeatable Type)

1. Type: **Repeatable**
2. Name: `project`
3. Add fields:
   - `title` - Title (Key Text)
   - `summary` - Rich Text
   - `cover` - Image
   - `services` - Group (Repeatable)
     - `label` - Key Text
   - `roles` - Group (Repeatable)
     - `label` - Key Text
   - `year` - Number
   - `client` - Key Text
   - `duration` - Key Text
   - `metrics` - Group (Repeatable)
     - `label` - Key Text
     - `value` - Key Text
     - `context` - Key Text

#### D. Post (Repeatable Type)

1. Type: **Repeatable**
2. Name: `post`
3. Add fields:
   - `title` - Title (Key Text)
   - `excerpt` - Rich Text
   - `publish_date` - Date
   - `author` - Key Text
   - `cover` - Image

### 3. Create Sample Documents

Once custom types are created, add some documents:

#### Settings Document

- Site Title: `Alex Waters — Principal Creative Technologist`
- Site Description: `Alex Waters collaborates with design-forward teams to shape expressive, high-performance product experiences.`
- Color Primary: `#0b1120`
- Color Secondary: `#1f2937`
- Color Accent: `#f97316`
- Font Primary: `Space Grotesk, Inter, sans-serif`
- Font Secondary: `Fraunces, Georgia, serif`

#### Navigation Document

Items:

1. Label: `Work`, Link: `/work`
2. Label: `About`, Link: `/about`
3. Label: `Case Studies`, Link: `/case-study`
4. Label: `Writing`, Link: `/blog`

Social Links:

1. Platform: `LinkedIn`, URL: `https://www.linkedin.com/in/alexwaters`
2. Platform: `Dribbble`, URL: `https://dribbble.com/awaters`

#### Project 1

- Title: `Guilded Platform Refresh`
- UID: `guilded-platform-refresh`
- Summary: `Led the comprehensive redesign of Guilded's community platform, introducing a modern visual language and improved navigation patterns.`
- Services: Product Design, Design Systems, Frontend Architecture
- Roles: Principal Designer, Technical Lead
- Year: 2024
- Client: Guilded
- Duration: 8 months
- Metrics:
  - User Engagement: +40% (Increase in daily active users)
  - Performance: 2.5s (Average load time improvement)

#### Project 2

- Title: `Vesto Wealth Orchestration`
- UID: `vesto-wealth`
- Summary: `Designed and built a sophisticated wealth management platform that simplifies complex financial operations.`
- Services: UX Research, Product Strategy, System Design
- Roles: Design Lead, Strategy Consultant
- Year: 2023
- Client: Vesto
- Duration: 6 months

#### Blog Post 1

- Title: `Building Design Systems at Scale`
- UID: `building-design-systems-scale`
- Excerpt: `Lessons learned from architecting design systems for teams of 100+ engineers.`
- Publish Date: 2024-09-15
- Author: Alex Waters

### 4. Publish Documents

After creating each document, click **"Publish"** to make it live.

### 5. Verify on Your Site

Once published, refresh http://localhost:3000 and you should see your real content instead of mock data!

## Alternative: Use Slice Machine (If Custom Types Are in Code)

If you have custom type definitions in your codebase, you can push them to Prismic using Slice Machine:

```bash
cd apps/web
npx start-slicemachine
```

Then in the Slice Machine UI:

1. Click "Push to Prismic"
2. Select the custom types to push
3. Confirm

## Troubleshooting

### Site Still Shows Mock Data

- Check that documents are **published** (not just saved as draft)
- Verify the UID matches what the site expects
- Clear browser cache and reload
- Check the Next.js server logs for errors

### Custom Types Not Appearing

- Make sure you're logged into the correct Prismic account
- Verify you're in the **fairway** repository
- Custom types need to be created OR pushed from Slice Machine

## Quick Reference

- **Repository**: fairway
- **Dashboard**: https://fairway.prismic.io
- **API Endpoint**: https://fairway.cdn.prismic.io/api/v2
- **Local Site**: http://localhost:3000
- **Access Token**: Already configured in `.env.local`
