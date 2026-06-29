# Template System Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the site's presentation layer around the approved fixed rail, editorial homepage, page-specific templates, bilingual content view, counterpart links, Piazzolla typography, and article author metadata.

**Architecture:** Preserve Astro routes, collections, search, and SEO helpers. Extend collection metadata and shared content helpers first, then let the shared shell own the global content view while detail templates use static counterpart links. Keep filtering as progressive enhancement over fully rendered static content.

**Tech Stack:** Astro 5, TypeScript, MDX content collections, React islands already installed, plain CSS, Pagefind, Astro RSS.

---

### Task 1: Extend Content Contracts and Counterpart Lookups

**Files:**
- Modify: `src/content/config.ts`
- Modify: `src/content/projects/friendup.mdx`
- Modify: `src/content/projects/klido.mdx`
- Modify: `src/content/projects/valhalla.mdx`
- Modify: `src/lib/content.ts`

- [ ] **Step 1: Add schema fields**

Add optional `featureImage` to writing. Add `lang`, `translationKey`, and `slug` to projects, defaulting existing projects to English only.

- [ ] **Step 2: Add explicit project metadata**

Set each existing project to:

```yaml
lang: en
slug: valhalla
```

using the correct slug for each entry.

- [ ] **Step 3: Add shared lookup helpers**

Implement:

```ts
export async function getWritingCounterpart(entry: WritingEntry) {
  if (!entry.data.translationKey) return undefined;
  const writings = await getPublishedWritings();
  return writings.find(
    (candidate) =>
      candidate.data.translationKey === entry.data.translationKey &&
      candidate.data.lang !== entry.data.lang
  );
}

export async function getProjectCounterpart(entry: ProjectEntry) {
  if (!entry.data.translationKey) return undefined;
  const projects = await getProjects();
  return projects.find(
    (candidate) =>
      candidate.data.translationKey === entry.data.translationKey &&
      candidate.data.lang !== entry.data.lang
  );
}
```

Use project `slug` rather than filename parsing in `getProjectUrl`.

- [ ] **Step 4: Verify contracts**

Run: `npm run check`

Expected: zero errors.

- [ ] **Step 5: Commit**

```bash
git add src/content/config.ts src/content/projects src/lib/content.ts
git commit -m "feat: add bilingual content contracts"
```

### Task 2: Rebuild the Shared Shell and Content View

**Files:**
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/components/SiteNav.astro`
- Modify: `src/components/MobileMenuIsland.tsx`
- Modify: `src/components/ContentViewFilter.astro`
- Modify: `src/components/ContentViewFilterIsland.tsx`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Make shell behavior explicit**

Add `showContentView?: boolean` to `BaseLayout`, defaulting to `true`. Render one global controller island and pass the content-view control into both desktop rail and mobile menu. Detail layouts set `showContentView={false}`.

- [ ] **Step 2: Rebuild desktop rail markup**

Render the brand as:

```astro
<span>PROMISE</span>
<span>XU</span>
```

Keep navigation and search in the upper flow and place the content-view slot in a bottom rail region.

- [ ] **Step 3: Rebuild mobile menu**

Pass `showContentView` into the existing island and render `All / EN / 中文` at the bottom of the open panel. Preserve button semantics, `aria-expanded`, `aria-controls`, normal navigation links, and search.

- [ ] **Step 4: Generalize filtering**

Update `applyView` so `[data-lang]` elements are shown for `all` or matching language, and `[data-empty-for]` empty states appear only for their matching selected view. Continue synchronizing `aria-current` and local storage.

- [ ] **Step 5: Replace shell CSS**

Use a fixed full-height rail on desktop, a flexible main canvas offset by rail width, and a sticky mobile header below the desktop breakpoint. Give the rail search right-side space and anchor the content view at the bottom.

- [ ] **Step 6: Verify shell types**

Run: `npm run check`

Expected: zero errors.

- [ ] **Step 7: Commit**

```bash
git add src/layouts/BaseLayout.astro src/components/SiteNav.astro src/components/MobileMenuIsland.tsx src/components/ContentViewFilter.astro src/components/ContentViewFilterIsland.tsx src/styles/global.css
git commit -m "feat: rebuild responsive publication shell"
```

### Task 3: Build the Editorial Homepage and Dense Writing Rows

**Files:**
- Modify: `src/components/WritingCard.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/pages/writing/index.astro`
- Modify: `src/pages/en/writing/index.astro`
- Modify: `src/pages/zh/writing/index.astro`
- Modify: `src/pages/writing/category/[category].astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Give writing cards explicit variants**

Replace `compact` with `variant: "lead" | "tile" | "row"`. Render `featureImage` only for `lead` and `tile`, never infer body images, and remove language from metadata:

```astro
<p class="writing-row__meta">
  {entry.data.category} &middot; <time datetime={date}>{date}</time>
</p>
```

- [ ] **Step 2: Structure homepage editorial positions**

For each active language, CSS filtering must leave a useful hierarchy. Render all homepage entries with stable lead/tile/row classes; use the first featured entry, or newest entry when no feature exists, as the default lead. Keep the first six entries and place projects after writing.

- [ ] **Step 3: Simplify archives**

Use only `variant="row"` in all archive routes. Remove duplicated page-level mobile language controls because the mobile menu now owns the global view.

- [ ] **Step 4: Add editorial and archive CSS**

Create a wide lead, two-column tile region where content permits, compact rows below it, and single-column mobile collapse. Keep archive rows uniform and image-free.

- [ ] **Step 5: Verify**

Run: `npm run check`

Expected: zero errors.

Run: `npm run build`

Expected: successful Astro build and Pagefind indexing.

- [ ] **Step 6: Commit**

```bash
git add src/components/WritingCard.astro src/pages/index.astro src/pages/writing src/pages/en/writing/index.astro src/pages/zh/writing/index.astro src/styles/global.css
git commit -m "feat: add editorial homepage templates"
```

### Task 4: Add Language-Aware Projects and Bilingual About

**Files:**
- Modify: `src/components/ProjectCard.astro`
- Modify: `src/pages/projects/index.astro`
- Modify: `src/pages/about.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Mark project cards by language**

Add `data-lang={project.data.lang}` and keep optional image rendering without placeholders.

- [ ] **Step 2: Rebuild Projects index**

Use a responsive image-led grid and render:

```astro
<p class="filtered-empty" data-empty-for="zh">No projects are available in Chinese yet.</p>
```

with equivalent fallback behavior for any empty selected view.

- [ ] **Step 3: Add bilingual About sections**

Render complete English and Chinese sections sequentially, with `data-lang="en"` and `data-lang="zh"`. Keep English first for `All`.

- [ ] **Step 4: Add page CSS**

Style project cards as a responsive grid and About as a restrained sequential reading layout.

- [ ] **Step 5: Verify**

Run: `npm run check`

Expected: zero errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/ProjectCard.astro src/pages/projects/index.astro src/pages/about.astro src/styles/global.css
git commit -m "feat: add language-aware project and about templates"
```

### Task 5: Add Detail Counterpart Switches and Article Metadata

**Files:**
- Create: `src/components/LanguageSwitch.astro`
- Modify: `src/layouts/ArticleLayout.astro`
- Modify: `src/pages/projects/[slug].astro`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/lib/seo.ts`
- Modify: `src/pages/rss.xml.ts`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Build static counterpart switch**

Create a component that accepts the active language and optional English/Chinese URLs, renders only when both exist, and uses normal links with `hreflang`.

- [ ] **Step 2: Wire article counterparts**

Use `getWritingCounterpart`, hide global content view, place the switch between article header and body, remove visible language metadata, and supply reciprocal alternate links to `BaseLayout`.

- [ ] **Step 3: Wire project counterparts**

Use `getProjectCounterpart`, hide global content view, and place the switch between project header and body. Render nothing for current English-only projects.

- [ ] **Step 4: Complete author and alternate metadata**

Add optional `author` and `alternates` props to `BaseLayout`. Article pages emit:

```html
<meta name="author" content="Promise Xu">
<link rel="alternate" hreflang="en" href="...">
<link rel="alternate" hreflang="zh" href="...">
```

Keep existing JSON-LD author data. Add `author: site.author` to RSS items if supported by the installed Astro RSS item contract; otherwise use RSS `customData` with escaped author markup.

- [ ] **Step 5: Verify**

Run: `npm run check`

Expected: zero errors.

Run: `npm run build`

Expected: successful build with article and project pages generated.

- [ ] **Step 6: Commit**

```bash
git add src/components/LanguageSwitch.astro src/layouts src/pages/projects/'[slug].astro' src/lib/seo.ts src/pages/rss.xml.ts src/styles/global.css
git commit -m "feat: add bilingual detail metadata"
```

### Task 6: Self-Host Piazzolla and Finish the Visual System

**Files:**
- Create: `public/fonts/Piazzolla-VariableFont_opsz,wght.woff2`
- Create: `public/fonts/Piazzolla-Italic-VariableFont_opsz,wght.woff2`
- Create: `public/fonts/OFL.txt`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Fetch official font assets**

Download the current official Piazzolla variable WOFF2 files and OFL license from the Google Fonts or upstream Piazzolla repository. Do not copy assets from `gavinouyang.com`.

- [ ] **Step 2: Register fonts**

Add normal and italic `@font-face` declarations with `font-display: swap`, variable weight range, and optical sizing.

- [ ] **Step 3: Apply typography**

Use:

```css
font-family: "Piazzolla", "Songti SC", "STSong", serif;
font-optical-sizing: auto;
```

across the shell and content, retaining system sans only for controls if browser testing shows a legibility problem.

- [ ] **Step 4: Scan visual constraints**

Run:

```bash
rg -n "gradient|#[0-9a-fA-F]{6}|font-family" src/styles/global.css
```

Expected: no gradients or global color wash; only intentional neutral colors and declared font stacks.

- [ ] **Step 5: Commit**

```bash
git add public/fonts src/styles/global.css
git commit -m "style: add Piazzolla editorial typography"
```

### Task 7: Browser and Production Verification

**Files:**
- Modify if needed: files changed in Tasks 1-6
- Modify: `docs/superpowers/plans/2026-06-29-template-system-redesign-implementation.md`

- [ ] **Step 1: Run static checks**

Run: `npm run check`

Expected: zero errors, warnings, or hints.

- [ ] **Step 2: Run production build**

Run: `npm run build`

Expected: successful Astro build and Pagefind indexing.

- [ ] **Step 3: Start preview**

Run: `npm run preview -- --host 127.0.0.1`

Expected: local preview URL.

- [ ] **Step 4: Verify desktop**

At a representative desktop viewport, verify homepage, Writing, Projects, About, one article, and one project:

- fixed rail stays in the viewport while main content scrolls;
- two-line brand, navigation sizing, search spacing, and bottom View placement;
- editorial homepage hierarchy;
- no language metadata in homepage/archive rows;
- project grid and Chinese empty state;
- About filtering;
- detail pages omit global View.

- [ ] **Step 5: Verify mobile and keyboard behavior**

At a representative mobile viewport, verify menu opening, navigation, search, bottom View placement, single-column templates, no horizontal clipping, visible focus, and keyboard reachability.

- [ ] **Step 6: Verify generated metadata**

Inspect built article HTML for canonical URL, `meta[name=author]`, Article JSON-LD author, and counterpart `hreflang` only where a counterpart exists.

- [ ] **Step 7: Mark plan complete and commit fixes**

Check every completed task and commit any verification fixes:

```bash
git add docs/superpowers/plans/2026-06-29-template-system-redesign-implementation.md src public
git commit -m "docs: complete template system redesign"
```
