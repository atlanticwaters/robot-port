# 🎨 Design Exploration — Homepage & Project Page Concepts

**Context:**  
You are continuing work on the **Astro + Prismic Principal Portfolio** previously scaffolded.  
All architecture, CMS modeling, and build tooling are complete per the master prompt.  
Your new objective is to explore *visual design directions* for the site’s key public-facing pages.

---

## 🎯 Objective

Generate **3–4 distinct visual directions** each for:

- **Homepage**
- **Project Detail Page**

These directions should reflect different combinations of **layout hierarchy, typography, motion, and composition**, while staying consistent with the defined brand tokens and system.

---

## 🧱 Technical Constraints

- **Framework:** Astro + React Islands
- **Styling:** TailwindCSS + shadcn/ui components
- **Motion:** Framer Motion
- **Typography & Colors:** use existing brand tokens from theme configuration
- **Content Source:** Prismic (use placeholder mock data; no API calls required)
- **Output Format:** Astro-compatible component or page stubs

---

## ✨ Deliverables per Concept

Each visual direction should include:

1. **Annotated Layout Sketch**
   - Semantic HTML/TSX structure with Tailwind classes
   - Use comments to describe spacing, rhythm, and hierarchy decisions

2. **Color & Type Use**
   - Specify token usage (`--color-brand`, `--font-primary`, etc.)
   - Demonstrate tonal balance (light/dark contrast, background layering)

3. **Motion & Interaction**
   - Framer Motion transitions (e.g. fade-in, staggered entrance, parallax text)
   - Micro-interactions for hover, scroll, and reveal
   - Respect “reduce motion” preferences

4. **Hero Section Variants**
   - Static image / video hero
   - Text reveal or scrolling intro
   - Split layout hero (type + motion asset)

5. **Project Grid / Narrative Flow**
   - Layout options: uniform grid, staggered grid, timeline, storytelling column
   - Example filters (by tag, skill, or year)
   - Suggest transitions between cards and project detail views

6. **Commentary**
   - Explain intent: what experience or personality does each direction convey?
   - Note trade-offs (e.g., performance vs. depth, editorial vs. graphic feel)

---

## 🌐 Inspirations

Use the following references to inform tone, spacing, and motion—not to copy directly:

- [Lucas Fields – Vesto](https://lucasfields.net/vesto) → modular grid, balanced type rhythm, subdued palette  
- [Paco Lui](https://www.pacolui.com) → editorial minimalism, light scroll motion  
- [Tona Zone – Guilded](https://www.tona.zone/guilded) → immersive art direction, layered motion, organic transitions

Extract patterns for:
- Grid density & whitespace rhythm  
- Typographic scale and contrast  
- Motion choreography and pacing  
- Interaction subtleties (hover, drag, scroll-triggered elements)

---

## 🧩 Output Instructions

- Produce each direction as a **self-contained code block**:
  - `src/pages/index.astro` (Homepage concept)
  - `src/pages/work/[uid].astro` (Project page concept)
- Include brief annotations or inline comments describing:
  - Layout intent
  - Motion triggers
  - Component structure

Example:
```astro
---
// Homepage Concept 1 — Modular Grid
import { motion } from 'framer-motion';
---
<main class="mx-auto max-w-7xl px-6">
  <motion.section initial={{opacity:0, y:30}} animate={{opacity:1, y:0}}>
    <h1 class="text-6xl font-bold tracking-tight text-balance">Designing with Precision</h1>
    <p class="mt-4 text-lg text-muted-foreground">Principal designer & engineer portfolio</p>
  </motion.section>
  <!-- Grid of featured projects here -->
</main>
