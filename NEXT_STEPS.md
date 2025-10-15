# Next Steps - Getting Content Live

Great work adding the custom types to Prismic! Here's what to do next:

---

## Step 1: Save the Custom Types ✅

For each custom type you added the JSON to:

1. Make sure you clicked **"Save"** in the top-right corner of each custom type editor
2. Verify the custom types appear in the list at **Settings → Custom Types**

You should now see:

- ✅ Settings (Singleton)
- ✅ Navigation (Singleton)
- ✅ Project (Repeatable)
- ✅ Post (Repeatable)
- ✅ Case Study (Repeatable)

---

## Step 2: Create Your First Documents 📝

Now that custom types exist, create some content!

### A. Settings Document (Required)

1. Go to **Documents** in Prismic
2. Click **"Create new"** → Select **"Settings"**
3. Fill in the fields:
   - **Site Title**: `Alex Waters — Principal Creative Technologist`
   - **Site Description**: `Alex Waters collaborates with design-forward teams to shape expressive, high-performance product experiences.`
   - **Primary Color**: `#0b1120`
   - **Secondary Color**: `#1f2937`
   - **Accent Color**: `#f97316`
   - **Primary Font**: `Space Grotesk, Inter, sans-serif`
   - **Secondary Font**: `Fraunces, Georgia, serif`
4. Click **"Publish"** (not just Save as Draft)

### B. Navigation Document (Required)

1. Click **"Create new"** → Select **"Navigation"**
2. Add **Navigation Items** (click "+ Add item" for each):
   - Label: `Work`, Link: `/work`
   - Label: `About`, Link: `/about`
   - Label: `Case Studies`, Link: `/case-study`
   - Label: `Writing`, Link: `/blog`
3. Add **Social Links**:
   - Platform: `LinkedIn`, URL: `https://www.linkedin.com/in/alexwaters`
   - Platform: `Dribbble`, URL: `https://dribbble.com/awaters`
4. Click **"Publish"**

### C. Create a Project (Optional but recommended)

1. Click **"Create new"** → Select **"Project"**
2. Fill in:
   - **UID**: `guilded-platform-refresh`
   - **Title**: `Guilded Platform Refresh`
   - **Summary**: `Led the comprehensive redesign of Guilded's community platform, introducing a modern visual language and improved navigation patterns.`
3. Switch to **"Details"** tab:
   - **Services**: Add items like `Product Design`, `Design Systems`, `Frontend Architecture`
   - **Roles**: Add `Principal Designer`, `Technical Lead`
   - **Year**: `2024`
   - **Client**: `Guilded`
   - **Duration**: `8 months`
   - **Metrics**:
     - Label: `User Engagement`, Value: `+40%`, Context: `Increase in daily active users`
     - Label: `Performance`, Value: `2.5s`, Context: `Average load time improvement`
4. Click **"Publish"**

### D. Create a Blog Post (Optional)

1. Click **"Create new"** → Select **"Post"**
2. Fill in:
   - **UID**: `building-design-systems-scale`
   - **Title**: `Building Design Systems at Scale`
   - **Excerpt**: `Lessons learned from architecting design systems for teams of 100+ engineers.`
   - **Publish Date**: Pick a recent date
   - **Author**: `Alex Waters`
3. Click **"Publish"**

---

## Step 3: Verify Content Appears on Your Site 🎉

Once you've published at least the **Settings** and **Navigation** documents:

1. Go to your local site: **http://localhost:3000**
2. Refresh the page
3. You should see:
   - ✅ Real content instead of mock data
   - ✅ Your navigation items in the header
   - ✅ Your site title and colors
   - ✅ Any projects you created

### Expected Behavior:

**Before Publishing Documents:**

- Site shows mock data (placeholder projects)
- Console logs show "Falling back to mocks"

**After Publishing Documents:**

- Site shows real content from Prismic
- No fallback errors in console
- Navigation reflects what you set up

---

## Step 4: Verify the Connection 🔍

Check the Next.js dev server logs to confirm it's fetching from Prismic:

```bash
# The terminal where pnpm dev is running should show:
# ✓ Compiled successfully
# No "[prismic] Falling back to mocks" errors
```

If you still see fallback errors:

1. Make sure documents are **Published** (not just saved as draft)
2. Wait a few seconds and refresh
3. Check that custom type IDs match exactly: `settings`, `navigation`, `project`, `post`, `case_study`

---

## Troubleshooting

### "Still seeing mock data"

- Verify documents are **Published** in Prismic (green checkmark)
- Check browser console for errors
- Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

### "Custom types not showing in Prismic"

- Make sure you clicked **Save** after pasting each JSON
- Refresh the Custom Types page
- Check the JSON editor doesn't show validation errors

### "Cannot create documents"

- Make sure custom types are saved first
- Try refreshing the Prismic dashboard

---

## What's Working Right Now

✅ **Next.js Dev Server**: Running at http://localhost:3000
✅ **Prismic Repository**: Connected to "fairway"
✅ **Custom Types**: Added via JSON (if saved)
✅ **Mock Data Fallback**: Site works even without content
✅ **Environment**: Properly configured

---

## Quick Reference

- **Local Site**: http://localhost:3000
- **Prismic Dashboard**: https://fairway.prismic.io
- **Repository Name**: fairway
- **Custom Types Location**: Settings → Custom Types
- **Documents Location**: Documents (main sidebar)

---

## Next Actions

1. ✅ Verify custom types are saved in Prismic
2. ⏳ Create Settings document and publish
3. ⏳ Create Navigation document and publish
4. ⏳ (Optional) Create 1-2 Projects
5. ⏳ Refresh http://localhost:3000 to see real content!

Once you publish Settings and Navigation, your site will switch from mock data to real Prismic content automatically! 🚀
