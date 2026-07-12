# Article Page Typography and Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make individual article pages use the archive canvas, readable article typography, explicit image descriptions, and human-readable dates.

**Architecture:** Keep all presentation changes in the existing global stylesheet and date rendering in the shared article layout. Preserve semantic ISO dates and the existing MDX/content schema.

**Tech Stack:** Astro, TypeScript, MDX, plain CSS

---

### Task 1: Shared article presentation

**Files:**
- Modify: `src/styles/global.css`

- [x] **Step 1: Capture the current rendered article**

Run the development server and inspect `/zh/writing/mulaniff-2023-main-visual/` at desktop and mobile widths. Confirm the narrow article shell, title scale, missing paragraph margins, and article top offset.

- [x] **Step 2: Apply the minimum shared CSS**

Remove the `max-width` from `.article-shell`, reduce `.article-header h1`, add adjacent paragraph spacing under `.prose`, add a small image-to-caption gap, define `.image-description` using the meta typography, and remove the article shell's top padding at the desktop breakpoint.

- [x] **Step 3: Verify the presentation**

Inspect the same article route at desktop and mobile widths. Confirm the article canvas matches the archive while the header and `.prose` share a `48rem` cap.

### Task 2: Human-readable article dates

**Files:**
- Modify: `src/layouts/ArticleLayout.astro`

- [x] **Step 1: Preserve machine-readable dates**

Keep `YYYY-MM-DD` strings for each `<time datetime>` value.

- [x] **Step 2: Add display labels**

Format published and optional updated dates with:

```ts
date.toLocaleDateString("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC"
})
```

Render those labels inside the existing `<time>` elements.

- [x] **Step 3: Verify generated output**

Run:

```bash
npm run check
npm run build
```

Expected: both commands exit successfully. Inspect generated HTML and confirm `datetime="2023-08-09"` displays `Aug 9, 2023`.

### Task 3: Final visual verification

**Files:**
- No additional files

- [x] **Step 1: Compare article and archive**

Inspect `/zh/writing/mulaniff-2023-main-visual/` and `/zh/writing/` at the same desktop viewport. Confirm their canvas widths and top alignment match.

- [x] **Step 2: Check responsive behavior**

Inspect the article at a mobile viewport. Confirm the title fits, paragraph spacing is visible, and no horizontal overflow appears.

### Task 4: Refine title scale and article links

**Files:**
- Modify: `src/styles/global.css`

- [x] **Step 1: Match the archive title scale**

Set `.article-header h1` to the archive row title size:

```css
font-size: clamp(1.3rem, 2.4vw, 2rem);
```

- [x] **Step 2: Underline article-content links**

Add:

```css
.prose a,
.co-authors a,
.external a {
  text-decoration: underline;
}
```

Keep language-switch and navigation controls unchanged.

- [x] **Step 3: Verify**

Run `npm run check` and `npm run build`, then inspect the article at desktop and mobile widths. Confirm the article title matches archive-row sizing and the three intended link scopes are underlined.

### Task 5: Match article header and prose widths

**Files:**
- Modify: `src/styles/global.css`

- [x] **Step 1: Set one shared reading width**

Set `.article-header` and `.prose` to the same `48rem` maximum width. A shared fixed unit avoids the different widths produced when `ch` is resolved against their different font sizes.

- [x] **Step 2: Verify**

Run `npm run check` and `npm run build`, then inspect the article at desktop and mobile widths. Confirm the header no longer exceeds the prose line length and no horizontal overflow appears.
