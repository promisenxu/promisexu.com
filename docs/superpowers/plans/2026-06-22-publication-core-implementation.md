# Publication Core First Launch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first public launch slice of `promisexu.com`: an Astro + TypeScript + MDX publication core with language-scoped writing routes, search, project gallery, about page, metadata, RSS, sitemap, and launch-quality checks.

**Architecture:** Use Astro content collections as the source of truth for writings and projects. Render static pages by default, with small Astro islands only for archive/homepage filtering. Keep content language in routes and metadata; defer full UI localization, comments, D1, Turnstile, Keystatic, full CV, and full case studies.

**Tech Stack:** Astro, TypeScript, MDX, Tailwind CSS, Pagefind, Astro content collections, static RSS/sitemap generation, Cloudflare-compatible static output.

---

## File Structure

Create or modify these files:

- `package.json`: scripts and dependencies.
- `astro.config.mjs`: Astro integrations and site config.
- `tsconfig.json`: strict TypeScript config.
- `docs/design/references.md`: theme/reference audit and visual direction constraints.
- `docs/architecture/routing-and-language.md`: durable route and language model.
- `docs/architecture/seo-aeo.md`: SEO/AEO architecture notes.
- `docs/architecture/comments-system.md`: deferred comments architecture moved out of README.
- `docs/learning/phase-learning-guide.md`: learning checkpoints by phase.
- `src/content/config.ts`: typed content collection schemas.
- `src/content/writings/en/*.mdx`: English seed writing content.
- `src/content/writings/zh/*.mdx`: Chinese seed writing content.
- `src/content/projects/*.mdx`: Valhalla, FriendUp, and Klido project entries.
- `src/lib/site.ts`: site constants, categories, navigation, language labels.
- `src/lib/content.ts`: content query helpers for writings/projects.
- `src/lib/seo.ts`: canonical URLs, metadata, JSON-LD helpers.
- `src/layouts/BaseLayout.astro`: HTML shell, metadata, navigation, footer.
- `src/layouts/ArticleLayout.astro`: article page layout.
- `src/components/SiteNav.astro`: global navigation.
- `src/components/WritingCard.astro`: reusable writing preview.
- `src/components/ProjectCard.astro`: reusable project preview.
- `src/components/ArchiveControls.astro`: static archive filter links and hydrated controls mount.
- `src/components/ArchiveControlsIsland.tsx`: client-side archive filtering island.
- `src/components/HomeDiscoveryIsland.tsx`: client-side homepage discovery island.
- `src/pages/index.astro`: publication-style homepage.
- `src/pages/writing/index.astro`: canonical all-writing archive.
- `src/pages/en/writing/index.astro`: English-only archive.
- `src/pages/en/writing/[slug].astro`: English article route.
- `src/pages/zh/writing/index.astro`: Chinese-only archive.
- `src/pages/zh/writing/[slug].astro`: Chinese article route.
- `src/pages/projects/index.astro`: project gallery.
- `src/pages/about.astro`: positioning page.
- `src/pages/search.astro`: Pagefind search page.
- `src/pages/rss.xml.ts`: writing RSS feed.
- `src/pages/robots.txt.ts`: robots output.
- `public/assets/projects/*`: simple launch project visuals.
- `src/styles/global.css`: site typography and layout styles.
- `README.md`: concise project charter linked to detailed docs.

## Task 0: Consolidate README, Design References, And Learning Guide

Status: Complete in commit `fd3dcd8`; spec and documentation-quality reviews approved.

**Files:**
- Modify: `README.md`
- Create: `docs/design/references.md`
- Create: `docs/architecture/routing-and-language.md`
- Create: `docs/architecture/seo-aeo.md`
- Create: `docs/architecture/comments-system.md`
- Create: `docs/learning/phase-learning-guide.md`

- [ ] **Step 1: Replace README with a concise project charter**

```md
# promisexu.com

Personal publication, writing archive, and lightweight proof system for Promise Xu.

## Current Launch Goal

The first public launch is a publication core with light proof:

- Publication-style homepage.
- `/writing/` as the canonical all-language archive.
- `/en/writing/` and `/zh/writing/` as language-scoped archives.
- `/en/writing/[slug]/` and `/zh/writing/[slug]/` as language-scoped article routes.
- Category-led writing navigation using Growth, Marketing & Business; Culture, Art & Film; and Misc.
- Pagefind search.
- Project gallery for Valhalla, FriendUp, and Klido.
- `/about/` as an author/positioning page.
- SEO and AEO foundations.

## Stack

- Framework: Astro
- Language: TypeScript
- Content: MDX + Astro content collections
- Search: Pagefind
- Styling: plain CSS first, with Tailwind available if it proves useful
- Hosting target: Cloudflare Pages or Cloudflare Workers static assets
- Later comments stack: Cloudflare Worker / Pages Function, Turnstile, and D1

## Core Constraints

- Writing archive comes before career proof; career proof comes before technical portfolio.
- English and Chinese writings do not need one-to-one counterparts.
- URL language scope is content language, not UI language.
- Full UI localization is deferred.
- Static HTML is the default; hydrate JavaScript only where interaction earns it.
- Comments must not require GitHub login when implemented later.
- Turnstile must be validated server-side when comments are implemented later.
- Comments remain moderated by default when implemented later.
- Avoid committing secrets, unpublished private writing, or local-only generated artifacts.

## First Launch Deferred Scope

- Comments.
- D1.
- Turnstile.
- Moderation admin.
- Keystatic.
- Full CV page.
- Full case-study system.
- Full UI localization.
- Complex recommendation engine.

## Current Planning Docs

- Design spec: `docs/superpowers/specs/2026-06-22-publication-core-design.md`
- Implementation plan: `docs/superpowers/plans/2026-06-22-publication-core-implementation.md`
- Design references: `docs/design/references.md`
- Routing and language: `docs/architecture/routing-and-language.md`
- SEO and AEO: `docs/architecture/seo-aeo.md`
- Deferred comments system: `docs/architecture/comments-system.md`
- Learning guide: `docs/learning/phase-learning-guide.md`

## Development

Install and run commands will be added when the Astro app is scaffolded.
```

- [ ] **Step 2: Create `docs/design/references.md`**

```md
# Design References

## Visual Direction

The site should feel clean, structured, and editorial. It should not use a heavy global background, strong global color wash, or theme treatment that forces every article/page to feel the same. Individual articles and sections should have room to carry their own tone through content, imagery, and local layout choices.

## Reference Priority

1. Self Esteem: primary visual reference for a magazine-style editorial publication.
2. Fyrre: secondary reference for magazine/blog hierarchy and polished editorial surfaces.
3. Lipi: inspect before implementation; use only if its structure supports the approved IA.
4. Tone: technical reference for MDX, Pagefind, RSS, sitemap, JSON-LD, and token-based CSS.
5. Astro Sidey: inspect before implementation; use only for specific layout ideas if relevant.

## Borrow

- Editorial masthead clarity.
- Strong writing-first homepage hierarchy.
- Dense but readable archive treatment.
- Long-form typography rhythm.
- Clean project/work preview cards.
- Minimal JavaScript.
- Token-based spacing, typography, borders, and neutral colors.

## Reject

- Full-template adoption before auditing structure.
- Portfolio-first homepage patterns.
- Generic oversized personal hero.
- Decorative global backgrounds.
- Strong global color themes that limit page-level tone.
- Visual gimmicks that weaken reading.
- IA that conflicts with `/writing/`, `/en/writing/`, and `/zh/writing/`.

## Implementation Rule

Use these themes as references, not as the application architecture. Build the approved content model and routes directly. Copy no large template surface unless the implementation worker first records why the copied pattern matches the approved spec.
```

- [ ] **Step 3: Create `docs/architecture/routing-and-language.md`**

````md
# Routing And Language

## Route Contract

```txt
/                         publication-style homepage
/writing/                 canonical all-writing archive
/en/writing/              English-only archive
/en/writing/[slug]/       English article
/zh/writing/              Chinese-only archive
/zh/writing/[slug]/       Chinese article
/projects/                project gallery
/about/                   author positioning page
/search/                  Pagefind search
```

## Rules

- `/writing/` is the canonical archive across languages.
- `/en/writing/` and `/zh/writing/` are language-scoped archive views.
- Article URLs are language-scoped.
- Route language means content language.
- UI localization is deferred.
- Chinese and English writings do not need counterparts.
- `hreflang` applies only when a true translation counterpart exists.
- Saved content-language preference can enhance `/writing/`, but scoped routes should not be silently overridden.
````

- [ ] **Step 4: Create `docs/architecture/seo-aeo.md`**

```md
# SEO And AEO Architecture

## SEO Requirements

- Canonical URL helper for every page.
- Title and description metadata.
- Open Graph and Twitter metadata.
- Sitemap.
- RSS feed for writing.
- `robots.txt`.
- Language labels on writing.
- `hreflang` only for true translation counterparts.
- Article structured data for writing pages.
- Basic `Person` and `WebSite` structured data where accurate.

## AEO Requirements

AEO means semantic clarity, provenance, entity consistency, and extractable structure without flattening the writing into generic SEO content.

Article pages should expose:

- One `h1`.
- Clear description or dek.
- Publish date and updated date.
- Language.
- Category.
- Tags.
- Canonical URL.
- External publication URL when applicable.
- Author identity.
- Structured headings.

Avoid inflated claims, fake expertise schema, hidden keyword stuffing, duplicate pages pretending to be translations, generic AI-written summaries, and forced key-takeaway blocks.
```

- [ ] **Step 5: Create `docs/architecture/comments-system.md`**

````md
# Deferred Comments System

Comments are deferred from the first public launch.

When implemented later:

- Comments must not require GitHub login.
- Turnstile must be validated server-side.
- Comments must be moderated by default.
- Raw HTML must not be accepted.
- Contact details must not be displayed publicly.
- Rate limiting is required.
- Moderation actions must not use unsafe GET requests.
- D1 schema changes must be documented as migrations.

Target architecture:

```txt
Astro comment form
  -> Turnstile token
  -> POST /api/comments
  -> Worker validates Turnstile
  -> D1 stores pending comment
  -> moderation
  -> approved comments render on page
```

Initial tables for the later phase:

- `comments`
- `comment_moderation_events`
- `comment_rate_limits`
````

- [ ] **Step 6: Create `docs/learning/phase-learning-guide.md`**

````md
# Phase Learning Guide

Each implementation phase should include a concept, an explain-back, and a verification.

## Phase 1: Astro Foundation

Concept: Astro routing, layouts, static generation, and build output.

Explain-back: Explain how Astro turns `src/pages` into routes and why static HTML is useful for this site.

Verification: Run `npm run build` and identify generated files in `dist`.

## Phase 2: Content Collections

Concept: MDX files become typed content entries through Astro content collections.

Explain-back: Explain how frontmatter validation works and why category validation prevents IA drift.

Verification: Change a writing category to an invalid value and confirm `npm run check` fails, then restore it.

## Phase 3: Language-Scoped Routing

Concept: Content language belongs in routes; UI language is deferred.

Explain-back: Explain why `/writing/` is all writing while `/en/writing/` and `/zh/writing/` are scoped views.

Verification: Confirm `/writing/` shows both languages, `/en/writing/` shows English, and `/zh/writing/` shows Chinese.

## Phase 4: SEO And AEO

Concept: Metadata, canonical URLs, structured data, RSS, sitemap, and semantic page structure.

Explain-back: Explain the difference between canonical URL, external publication URL, and translation key.

Verification: Inspect generated HTML for canonical tags and JSON-LD.

## Phase 5: Pagefind

Concept: Static indexing and client-side search over generated pages.

Explain-back: Explain why Pagefind runs after Astro build.

Verification: Run `npm run build` and confirm `dist/pagefind` exists.

## Phase 6: Astro Islands

Concept: Static baseline with selective hydration.

Explain-back: Explain what `client:idle` changes and why article content should not depend on JavaScript.

Verification: Disable JavaScript and confirm core writing pages remain readable.

## Phase 7: Cloudflare Deployment

Concept: Static assets, build output, preview deployments, production deployments, and environment variables.

Explain-back: Explain the difference between static pages and later serverless comment endpoints.

Verification: Confirm Cloudflare preview deployment serves the same route set as local build.

## Later Phase: Comments

Concept: Server-side Turnstile validation, D1 persistence, moderation, and rate limiting.

Explain-back: Explain why client-side Turnstile validation alone is insufficient.

Verification: Add tests for valid token, invalid token, pending moderation, and rate limit behavior.
````

- [ ] **Step 7: Commit documentation consolidation**

```bash
git add README.md docs/design/references.md docs/architecture/routing-and-language.md docs/architecture/seo-aeo.md docs/architecture/comments-system.md docs/learning/phase-learning-guide.md
git commit -m "docs: consolidate launch plan and learning guide"
```

## Task 1: Scaffold Astro Foundation

Status: Complete in commits `0069a66` and `b974c7e60c95f9e519c98ac36387f7411391192c`; spec and code-quality reviews approved.

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `src/styles/global.css`
- Create: `src/lib/site.ts`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "promisexu.com",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build && pagefind --site dist",
    "preview": "astro preview",
    "check": "astro check",
    "lint:content": "astro check"
  },
  "dependencies": {
    "@astrojs/check": "^0.9.4",
    "@astrojs/mdx": "^4.3.0",
    "@astrojs/rss": "^4.0.12",
    "@astrojs/sitemap": "^3.4.1",
    "@astrojs/tailwind": "^6.0.2",
    "@pagefind/default-ui": "^1.3.0",
    "astro": "^5.10.0",
    "pagefind": "^1.3.0",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.8.3"
  },
  "devDependencies": {}
}
```

- [ ] **Step 2: Install dependencies**

Run:

```bash
npm install
```

Expected: `package-lock.json` is created and dependencies install without errors.

- [ ] **Step 3: Create `astro.config.mjs`**

```js
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://promisexu.com",
  output: "static",
  integrations: [
    mdx(),
    sitemap(),
    tailwind({
      applyBaseStyles: false
    })
  ]
});
```

- [ ] **Step 4: Create `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

- [ ] **Step 5: Create `src/lib/site.ts`**

```ts
export const site = {
  name: "Promise Xu",
  title: "Promise Xu",
  description: "Writing on growth, marketing, business, culture, art, film, and the web.",
  url: "https://promisexu.com",
  author: "Promise Xu",
  locale: "en_CA"
} as const;

export const writingCategories = [
  "Growth, Marketing & Business",
  "Culture, Art & Film",
  "Misc"
] as const;

export type WritingCategory = (typeof writingCategories)[number];

export const languages = {
  all: "All",
  en: "English",
  zh: "中文"
} as const;

export type ContentLanguage = "en" | "zh";
```

- [ ] **Step 6: Create `src/styles/global.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: light;
  --color-ink: #111111;
  --color-muted: #5f6368;
  --color-border: #d9dce1;
  --color-bg: #ffffff;
  --color-surface: #f6f7f8;
  --color-accent: #1f4f8f;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

html {
  background: var(--color-bg);
  color: var(--color-ink);
}

body {
  margin: 0;
  min-height: 100vh;
}

a {
  color: inherit;
  text-decoration-thickness: 0.08em;
  text-underline-offset: 0.18em;
}

main {
  width: min(1120px, calc(100vw - 32px));
  margin: 0 auto;
}

.prose {
  max-width: 72ch;
  line-height: 1.75;
  font-size: 1.0625rem;
}

.prose h1,
.prose h2,
.prose h3 {
  line-height: 1.18;
}
```

- [ ] **Step 7: Verify scaffold**

Run:

```bash
npm run check
```

Expected: fails only if no Astro pages exist yet. Continue to Task 2.

- [ ] **Step 8: Commit scaffold**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json src/lib/site.ts src/styles/global.css
git commit -m "feat: scaffold astro foundation"
```

## Task 2: Define Content Collections And Seed Content

Status: Complete in commit `f21c1dd`; spec and code-quality reviews approved.

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/writings/en/hello-publication.mdx`
- Create: `src/content/writings/zh/hello-publication.mdx`
- Create: `src/content/writings/en/growth-note.mdx`
- Create: `src/content/projects/valhalla.mdx`
- Create: `src/content/projects/friendup.mdx`
- Create: `src/content/projects/klido.mdx`

- [ ] **Step 1: Create content schema**

```ts
import { defineCollection, z } from "astro:content";
import { writingCategories } from "@/lib/site";

const writing = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lang: z.enum(["en", "zh"]),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    category: z.enum(writingCategories),
    tags: z.array(z.string()).default([]),
    slug: z.string(),
    translationKey: z.string().optional(),
    canonicalUrl: z.string().url().optional(),
    publishedAtExternalUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false)
  })
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    description: z.string(),
    role: z.string(),
    status: z.string().optional(),
    image: z.string(),
    link: z.string().url().optional(),
    featured: z.boolean().default(true),
    order: z.number().int().positive()
  })
});

export const collections = {
  writing,
  projects
};
```

- [ ] **Step 2: Create English seed writing**

Create `src/content/writings/en/hello-publication.mdx`:

```mdx
---
title: "Opening Notes"
description: "A short note introducing the shape of this publication."
lang: "en"
date: "2026-06-22"
updated: "2026-06-22"
category: "Misc"
tags: ["publication", "notes"]
slug: "opening-notes"
featured: true
draft: false
---

This site is a home for essays, criticism, project notes, and selected work.

It is intentionally mixed. The connective tissue is not a single beat. It is the judgment behind what gets written, built, and revised.
```

Create `src/content/writings/en/growth-note.mdx`:

```mdx
---
title: "A Note On Growth Work"
description: "A short launch essay for growth, marketing, and business writing."
lang: "en"
date: "2026-06-21"
updated: "2026-06-21"
category: "Growth, Marketing & Business"
tags: ["growth", "marketing"]
slug: "growth-work"
featured: false
draft: false
---

Growth work is most useful when it is treated as evidence gathering instead of theater.

The best systems make it easier to see what changed, what worked, and what should be abandoned.
```

- [ ] **Step 3: Create Chinese seed writing**

Create `src/content/writings/zh/hello-publication.mdx`:

```mdx
---
title: "开场笔记"
description: "一篇关于这个个人出版空间的简短说明。"
lang: "zh"
date: "2026-06-20"
updated: "2026-06-20"
category: "Culture, Art & Film"
tags: ["写作", "文化"]
slug: "opening-notes"
featured: true
draft: false
---

这里会放一些文章、评论、项目记录和公开作品。

中英文内容不需要一一对应。这个网站的重点不是对称，而是清楚地保存和呈现不同语言里的写作。
```

- [ ] **Step 4: Create project entries**

Create `src/content/projects/valhalla.mdx`:

```mdx
---
name: "Valhalla"
description: "A recipe and cooking workflow product."
role: "Product, engineering, and content architecture"
status: "Active"
image: "/assets/projects/valhalla.svg"
featured: true
order: 1
---

Valhalla is a product for structuring recipes, cooking notes, and kitchen workflows.
```

Create `src/content/projects/friendup.mdx`:

```mdx
---
name: "FriendUp"
description: "A social product for making plans and building friendships."
role: "Product and growth"
status: "Public link available"
image: "/assets/projects/friendup.svg"
link: "https://joinfriendup.com"
featured: true
order: 2
---

FriendUp explores how lightweight social software can help people move from intent to plans.
```

Create `src/content/projects/klido.mdx`:

```mdx
---
name: "Klido"
description: "A product project with a thin first-launch public profile."
role: "Product and execution"
status: "Selected work"
image: "/assets/projects/klido.svg"
featured: true
order: 3
---

Klido is included as selected project proof for the first launch.
```

- [ ] **Step 5: Add temporary project visuals**

Create `public/assets/projects/valhalla.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img" aria-labelledby="title desc">
  <title id="title">Valhalla project preview</title>
  <desc id="desc">A simple editorial launch visual for Valhalla.</desc>
  <rect width="1200" height="800" fill="#f3eadc"/>
  <circle cx="300" cy="310" r="130" fill="#d95f3d"/>
  <rect x="500" y="230" width="420" height="72" rx="16" fill="#171717"/>
  <rect x="500" y="340" width="320" height="38" rx="12" fill="#8a3ffc"/>
  <text x="500" y="470" fill="#171717" font-family="Arial, sans-serif" font-size="72" font-weight="700">Valhalla</text>
</svg>
```

Create `public/assets/projects/friendup.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img" aria-labelledby="title desc">
  <title id="title">FriendUp project preview</title>
  <desc id="desc">A simple editorial launch visual for FriendUp.</desc>
  <rect width="1200" height="800" fill="#eaf4ff"/>
  <circle cx="420" cy="350" r="110" fill="#1f77ff"/>
  <circle cx="560" cy="350" r="110" fill="#66c2a5"/>
  <circle cx="700" cy="350" r="110" fill="#ffd166"/>
  <text x="360" y="560" fill="#171717" font-family="Arial, sans-serif" font-size="72" font-weight="700">FriendUp</text>
</svg>
```

Create `public/assets/projects/klido.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img" aria-labelledby="title desc">
  <title id="title">Klido project preview</title>
  <desc id="desc">A simple editorial launch visual for Klido.</desc>
  <rect width="1200" height="800" fill="#f5f2ff"/>
  <rect x="300" y="220" width="600" height="360" rx="48" fill="#171717"/>
  <rect x="360" y="290" width="480" height="52" rx="18" fill="#ffffff"/>
  <rect x="360" y="380" width="320" height="52" rx="18" fill="#8a3ffc"/>
  <text x="455" y="520" fill="#ffffff" font-family="Arial, sans-serif" font-size="72" font-weight="700">Klido</text>
</svg>
```

- [ ] **Step 6: Verify content schema**

Run:

```bash
npm run check
```

Expected: content schemas compile. If the command fails because no routes exist yet, record the exact output and continue to Task 3; route creation in Tasks 4-6 resolves that failure.

- [ ] **Step 7: Commit content schema and seed content**

```bash
git add src/content/config.ts src/content/writings src/content/projects public/assets/projects
git commit -m "feat: define content collections"
```

## Task 3: Add Content Query And SEO Helpers

Status: Complete in commit `96fa48a`; spec and code-quality reviews approved.

**Files:**
- Create: `src/lib/content.ts`
- Create: `src/lib/seo.ts`

- [ ] **Step 1: Create content helpers**

```ts
import { getCollection, type CollectionEntry } from "astro:content";
import type { ContentLanguage, WritingCategory } from "@/lib/site";

export type WritingEntry = CollectionEntry<"writing">;
export type ProjectEntry = CollectionEntry<"projects">;

export async function getPublishedWritings() {
  const writings = await getCollection("writing", ({ data }) => !data.draft);
  return writings.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getWritingsByLanguage(lang: ContentLanguage) {
  const writings = await getPublishedWritings();
  return writings.filter((entry) => entry.data.lang === lang);
}

export async function getWritingsByCategory(category: WritingCategory) {
  const writings = await getPublishedWritings();
  return writings.filter((entry) => entry.data.category === category);
}

export async function getFeaturedWritings() {
  const writings = await getPublishedWritings();
  return writings.filter((entry) => entry.data.featured);
}

export async function getProjects() {
  const projects = await getCollection("projects");
  return projects.sort((a, b) => a.data.order - b.data.order);
}

export function getWritingUrl(entry: WritingEntry) {
  const prefix = entry.data.lang === "zh" ? "/zh" : "/en";
  return `${prefix}/writing/${entry.data.slug}/`;
}
```

- [ ] **Step 2: Create SEO helpers**

```ts
import { site } from "@/lib/site";

export type SeoInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
};

export function canonicalUrl(path: string) {
  return new URL(path, site.url).toString();
}

export function pageTitle(title: string) {
  return title === site.title ? site.title : `${title} | ${site.title}`;
}

export function buildSeo(input: SeoInput) {
  return {
    title: pageTitle(input.title),
    description: input.description,
    canonical: canonicalUrl(input.path),
    image: input.image ? canonicalUrl(input.image) : undefined,
    type: input.type ?? "website"
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.author,
    url: site.url
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  url: string;
  datePublished: Date;
  dateModified?: Date;
  lang: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: input.url,
    inLanguage: input.lang,
    datePublished: input.datePublished.toISOString(),
    dateModified: (input.dateModified ?? input.datePublished).toISOString(),
    author: {
      "@type": "Person",
      name: site.author,
      url: site.url
    }
  };
}
```

- [ ] **Step 3: Run TypeScript check**

Run:

```bash
npm run check
```

Expected: helper imports compile or page-missing errors remain until routes exist.

- [ ] **Step 4: Commit helpers**

```bash
git add src/lib/content.ts src/lib/seo.ts
git commit -m "feat: add content and seo helpers"
```

## Task 4: Build Layouts And Navigation

Status: Complete in commits `1c6e448` and `17bdf6fda26e6e81325991eeb26d53f9763490f7`; spec and code-quality reviews approved.

**Files:**
- Create: `src/components/SiteNav.astro`
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/layouts/ArticleLayout.astro`

- [ ] **Step 1: Create site navigation**

```astro
---
import { writingCategories } from "@/lib/site";
---

<header class="site-header">
  <a class="brand" href="/">Promise Xu</a>
  <nav aria-label="Primary navigation">
    <a href="/writing/">Writing</a>
    {writingCategories.map((category) => (
      <a href={`/writing/?category=${encodeURIComponent(category)}`}>{category}</a>
    ))}
    <a href="/search/">Search</a>
    <a href="/projects/">Projects</a>
    <a href="/about/">About</a>
  </nav>
</header>

<style>
  .site-header {
    width: min(1120px, calc(100vw - 32px));
    margin: 0 auto;
    padding: 24px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    border-bottom: 1px solid var(--color-border);
  }

  .brand {
    font-weight: 800;
    text-decoration: none;
    white-space: nowrap;
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 16px;
    flex-wrap: wrap;
    font-size: 0.95rem;
  }

  nav a {
    text-decoration: none;
    color: var(--color-muted);
  }

  nav a:hover {
    color: var(--color-ink);
  }
 </style>
```

- [ ] **Step 2: Create base layout**

```astro
---
import SiteNav from "@/components/SiteNav.astro";
import "@/styles/global.css";

type Props = {
  title: string;
  description: string;
  canonical: string;
  type?: "website" | "article";
  jsonLd?: unknown[];
};

const { title, description, canonical, type = "website", jsonLd = [] } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content={type} />
    <meta property="og:url" content={canonical} />
    <meta name="twitter:card" content="summary_large_image" />
    {jsonLd.map((entry) => (
      <script type="application/ld+json" set:html={JSON.stringify(entry)} />
    ))}
  </head>
  <body>
    <SiteNav />
    <slot />
    <footer class="site-footer">
      <p>© {new Date().getFullYear()} Promise Xu. Writing, projects, and selected work.</p>
    </footer>
  </body>
</html>

<style>
  .site-footer {
    width: min(1120px, calc(100vw - 32px));
    margin: 64px auto 0;
    padding: 24px 0 40px;
    color: var(--color-muted);
    border-top: 1px solid var(--color-border);
  }
</style>
```

- [ ] **Step 3: Create article layout**

```astro
---
import BaseLayout from "@/layouts/BaseLayout.astro";
import { articleJsonLd, buildSeo } from "@/lib/seo";
import { getWritingUrl, type WritingEntry } from "@/lib/content";

type Props = {
  entry: WritingEntry;
};

const { entry } = Astro.props;
const url = getWritingUrl(entry);
const seo = buildSeo({
  title: entry.data.title,
  description: entry.data.description,
  path: url,
  type: "article"
});
const jsonLd = [
  articleJsonLd({
    title: entry.data.title,
    description: entry.data.description,
    url: seo.canonical,
    datePublished: entry.data.date,
    dateModified: entry.data.updated,
    lang: entry.data.lang
  })
];
---

<BaseLayout title={seo.title} description={seo.description} canonical={seo.canonical} type="article" jsonLd={jsonLd}>
  <main class="article-shell">
    <article class="prose" lang={entry.data.lang}>
      <p class="eyebrow">{entry.data.category} · {entry.data.lang === "zh" ? "中文" : "English"}</p>
      <h1>{entry.data.title}</h1>
      <p class="dek">{entry.data.description}</p>
      <p class="meta">
        Published <time datetime={entry.data.date.toISOString()}>{entry.data.date.toLocaleDateString("en-CA")}</time>
        {entry.data.updated && <> · Updated <time datetime={entry.data.updated.toISOString()}>{entry.data.updated.toLocaleDateString("en-CA")}</time></>}
      </p>
      <slot />
      {entry.data.publishedAtExternalUrl && (
        <p class="external">Originally published externally: <a href={entry.data.publishedAtExternalUrl}>source</a></p>
      )}
    </article>
  </main>
</BaseLayout>

<style>
  .article-shell {
    padding: 56px 0;
  }

  .eyebrow,
  .meta,
  .external {
    color: var(--color-muted);
    font-size: 0.95rem;
  }

  .dek {
    color: var(--color-muted);
    font-size: 1.25rem;
    line-height: 1.5;
  }
</style>
```

- [ ] **Step 4: Run check**

```bash
npm run check
```

Expected: layout files compile or route-missing errors remain until pages exist.

- [ ] **Step 5: Commit layouts**

```bash
git add src/components/SiteNav.astro src/layouts/BaseLayout.astro src/layouts/ArticleLayout.astro
git commit -m "feat: add layouts and navigation"
```

## Task 5: Build Writing Routes And Cards

**Files:**
- Create: `src/components/WritingCard.astro`
- Create: `src/components/ArchiveControls.astro`
- Create: `src/pages/writing/index.astro`
- Create: `src/pages/en/writing/index.astro`
- Create: `src/pages/en/writing/[slug].astro`
- Create: `src/pages/zh/writing/index.astro`
- Create: `src/pages/zh/writing/[slug].astro`

- [ ] **Step 1: Create writing card**

```astro
---
import { getWritingUrl, type WritingEntry } from "@/lib/content";

type Props = {
  entry: WritingEntry;
};

const { entry } = Astro.props;
---

<article class="writing-card" data-lang={entry.data.lang} data-category={entry.data.category}>
  <p class="meta">{entry.data.lang === "zh" ? "中文" : "English"} · {entry.data.category}</p>
  <h2><a href={getWritingUrl(entry)}>{entry.data.title}</a></h2>
  <p>{entry.data.description}</p>
  <time datetime={entry.data.date.toISOString()}>{entry.data.date.toLocaleDateString("en-CA")}</time>
</article>

<style>
  .writing-card {
    padding: 24px 0;
    border-bottom: 1px solid var(--color-border);
  }

  .writing-card h2 {
    margin: 0 0 8px;
    font-size: clamp(1.35rem, 2vw, 2rem);
    line-height: 1.2;
  }

  .writing-card p {
    margin: 0 0 12px;
    color: var(--color-muted);
  }

  .meta,
  time {
    font-size: 0.9rem;
    color: var(--color-muted);
  }
</style>
```

- [ ] **Step 2: Create archive controls**

```astro
---
import { writingCategories } from "@/lib/site";

type Props = {
  selectedLanguage: "all" | "en" | "zh";
};

const { selectedLanguage } = Astro.props;
const languageLinks = [
  { key: "all", label: "All", href: "/writing/" },
  { key: "en", label: "English", href: "/en/writing/" },
  { key: "zh", label: "中文", href: "/zh/writing/" }
] as const;
---

<aside class="archive-controls" aria-label="Writing filters">
  <div>
    <span>Language</span>
    {languageLinks.map((item) => (
      <a href={item.href} aria-current={selectedLanguage === item.key ? "page" : undefined}>{item.label}</a>
    ))}
  </div>
  <div>
    <span>Categories</span>
    <a href="/writing/">All</a>
    {writingCategories.map((category) => (
      <a href={`/writing/?category=${encodeURIComponent(category)}`}>{category}</a>
    ))}
  </div>
</aside>

<style>
  .archive-controls {
    display: grid;
    gap: 12px;
    padding: 16px;
    margin: 24px 0;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 8px;
  }

  .archive-controls div {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .archive-controls span {
    color: var(--color-muted);
    font-size: 0.9rem;
  }

  .archive-controls a {
    padding: 6px 10px;
    border: 1px solid var(--color-border);
    border-radius: 999px;
    text-decoration: none;
    background: var(--color-bg);
  }

  .archive-controls a[aria-current="page"] {
    color: white;
    background: var(--color-ink);
    border-color: var(--color-ink);
  }
</style>
```

- [ ] **Step 3: Create archive pages**

Create `src/pages/writing/index.astro`:

```astro
---
import ArchiveControls from "@/components/ArchiveControls.astro";
import WritingCard from "@/components/WritingCard.astro";
import BaseLayout from "@/layouts/BaseLayout.astro";
import { getPublishedWritings } from "@/lib/content";
import { buildSeo, websiteJsonLd } from "@/lib/seo";

const writings = await getPublishedWritings();
const seo = buildSeo({
  title: "Writing",
  description: "All writing by Promise Xu across English and Chinese.",
  path: "/writing/"
});
---

<BaseLayout title={seo.title} description={seo.description} canonical={seo.canonical} jsonLd={[websiteJsonLd()]}>
  <main>
    <section class="page-header">
      <h1>Writing</h1>
      <p>Essays, criticism, notes, and published work across English and Chinese.</p>
    </section>
    <ArchiveControls selectedLanguage="all" />
    <section aria-label="All writing">
      {writings.map((entry) => <WritingCard entry={entry} />)}
    </section>
  </main>
</BaseLayout>
```

Create `src/pages/en/writing/index.astro`:

```astro
---
import ArchiveControls from "@/components/ArchiveControls.astro";
import WritingCard from "@/components/WritingCard.astro";
import BaseLayout from "@/layouts/BaseLayout.astro";
import { getWritingsByLanguage } from "@/lib/content";
import { buildSeo } from "@/lib/seo";

const writings = await getWritingsByLanguage("en");
const seo = buildSeo({
  title: "English Writing",
  description: "English essays, notes, and published work by Promise Xu.",
  path: "/en/writing/"
});
---

<BaseLayout title={seo.title} description={seo.description} canonical={seo.canonical}>
  <main>
    <section class="page-header">
      <h1>English Writing</h1>
      <p>English essays, notes, and published work.</p>
    </section>
    <ArchiveControls selectedLanguage="en" />
    <section aria-label="English writing">
      {writings.map((entry) => <WritingCard entry={entry} />)}
    </section>
  </main>
</BaseLayout>
```

Create `src/pages/zh/writing/index.astro`:

```astro
---
import ArchiveControls from "@/components/ArchiveControls.astro";
import WritingCard from "@/components/WritingCard.astro";
import BaseLayout from "@/layouts/BaseLayout.astro";
import { getWritingsByLanguage } from "@/lib/content";
import { buildSeo } from "@/lib/seo";

const writings = await getWritingsByLanguage("zh");
const seo = buildSeo({
  title: "中文写作",
  description: "Promise Xu 的中文文章、评论和笔记。",
  path: "/zh/writing/"
});
---

<BaseLayout title={seo.title} description={seo.description} canonical={seo.canonical}>
  <main>
    <section class="page-header">
      <h1>中文写作</h1>
      <p>中文文章、评论和笔记。</p>
    </section>
    <ArchiveControls selectedLanguage="zh" />
    <section aria-label="Chinese writing">
      {writings.map((entry) => <WritingCard entry={entry} />)}
    </section>
  </main>
</BaseLayout>
```

- [ ] **Step 4: Create dynamic article routes**

Create `src/pages/en/writing/[slug].astro`:

```astro
---
import ArticleLayout from "@/layouts/ArticleLayout.astro";
import { getWritingsByLanguage } from "@/lib/content";

export async function getStaticPaths() {
  const writings = await getWritingsByLanguage("en");
  return writings.map((entry) => ({
    params: { slug: entry.data.slug },
    props: { entry }
  }));
}

const { entry } = Astro.props;
const { Content } = await entry.render();
---

<ArticleLayout entry={entry}>
  <Content />
</ArticleLayout>
```

Create `src/pages/zh/writing/[slug].astro`:

```astro
---
import ArticleLayout from "@/layouts/ArticleLayout.astro";
import { getWritingsByLanguage } from "@/lib/content";

export async function getStaticPaths() {
  const writings = await getWritingsByLanguage("zh");
  return writings.map((entry) => ({
    params: { slug: entry.data.slug },
    props: { entry }
  }));
}

const { entry } = Astro.props;
const { Content } = await entry.render();
---

<ArticleLayout entry={entry}>
  <Content />
</ArticleLayout>
```

- [ ] **Step 5: Run build check**

```bash
npm run build
```

Expected: `dist/writing/index.html`, `dist/en/writing/index.html`, and `dist/zh/writing/index.html` are generated.

- [ ] **Step 6: Commit writing routes**

```bash
git add src/components/WritingCard.astro src/components/ArchiveControls.astro src/pages/writing src/pages/en src/pages/zh
git commit -m "feat: add writing archive and article routes"
```

## Task 6: Build Homepage, Projects, About, Search, RSS, And Robots

**Files:**
- Create: `src/components/ProjectCard.astro`
- Create: `src/pages/index.astro`
- Create: `src/pages/projects/index.astro`
- Create: `src/pages/about.astro`
- Create: `src/pages/search.astro`
- Create: `src/pages/rss.xml.ts`
- Create: `src/pages/robots.txt.ts`

- [ ] **Step 1: Create project card**

```astro
---
import type { ProjectEntry } from "@/lib/content";

type Props = {
  project: ProjectEntry;
};

const { project } = Astro.props;
---

<article class="project-card">
  <img src={project.data.image} alt={`${project.data.name} project preview`} loading="lazy" />
  <div>
    <p class="meta">{project.data.role}</p>
    <h2>{project.data.name}</h2>
    <p>{project.data.description}</p>
    {project.data.link && <a href={project.data.link}>Explore</a>}
  </div>
</article>

<style>
  .project-card {
    display: grid;
    gap: 16px;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    overflow: hidden;
    background: white;
  }

  .project-card img {
    width: 100%;
    aspect-ratio: 3 / 2;
    object-fit: cover;
  }

  .project-card div {
    padding: 18px;
  }

  .project-card h2 {
    margin: 0 0 8px;
  }

  .meta {
    color: var(--color-muted);
    font-size: 0.9rem;
  }
</style>
```

- [ ] **Step 2: Create homepage**

```astro
---
import ProjectCard from "@/components/ProjectCard.astro";
import WritingCard from "@/components/WritingCard.astro";
import BaseLayout from "@/layouts/BaseLayout.astro";
import { getFeaturedWritings, getProjects, getPublishedWritings } from "@/lib/content";
import { buildSeo, personJsonLd, websiteJsonLd } from "@/lib/seo";

const featured = await getFeaturedWritings();
const latest = (await getPublishedWritings()).slice(0, 5);
const projects = (await getProjects()).slice(0, 3);
const seo = buildSeo({
  title: "Promise Xu",
  description: "A personal publication for writing on growth, marketing, business, culture, art, film, and the web.",
  path: "/"
});
---

<BaseLayout title={seo.title} description={seo.description} canonical={seo.canonical} jsonLd={[personJsonLd(), websiteJsonLd()]}>
  <main>
    <section class="hero">
      <p class="eyebrow">Personal publication</p>
      <h1>Writing, projects, and selected work by Promise Xu.</h1>
      <p>Essays and notes across growth, marketing, business, culture, art, film, and the web.</p>
    </section>

    <section>
      <div class="section-heading">
        <h2>Featured</h2>
        <a href="/writing/">All writing</a>
      </div>
      {featured.map((entry) => <WritingCard entry={entry} />)}
    </section>

    <section>
      <div class="section-heading">
        <h2>Latest</h2>
        <a href="/search/">Search</a>
      </div>
      {latest.map((entry) => <WritingCard entry={entry} />)}
    </section>

    <section>
      <div class="section-heading">
        <h2>Projects</h2>
        <a href="/projects/">View projects</a>
      </div>
      <div class="project-grid">
        {projects.map((project) => <ProjectCard project={project} />)}
      </div>
    </section>
  </main>
</BaseLayout>

<style>
  .hero {
    padding: 72px 0 48px;
    max-width: 780px;
  }

  .hero h1 {
    font-size: clamp(2.5rem, 7vw, 5rem);
    line-height: 0.98;
    margin: 0 0 20px;
  }

  .hero p {
    color: var(--color-muted);
    font-size: 1.2rem;
    line-height: 1.55;
  }

  .eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 0.8rem;
  }

  .section-heading {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 16px;
    margin-top: 48px;
    border-top: 1px solid var(--color-border);
    padding-top: 24px;
  }

  .project-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
  }
</style>
```

- [ ] **Step 3: Create projects page**

```astro
---
import ProjectCard from "@/components/ProjectCard.astro";
import BaseLayout from "@/layouts/BaseLayout.astro";
import { getProjects } from "@/lib/content";
import { buildSeo } from "@/lib/seo";

const projects = await getProjects();
const seo = buildSeo({
  title: "Projects",
  description: "Selected project work by Promise Xu.",
  path: "/projects/"
});
---

<BaseLayout title={seo.title} description={seo.description} canonical={seo.canonical}>
  <main>
    <section class="page-header">
      <h1>Projects</h1>
      <p>Selected work, shown as visual proof rather than exhaustive case studies.</p>
    </section>
    <section class="project-grid">
      {projects.map((project) => <ProjectCard project={project} />)}
    </section>
  </main>
</BaseLayout>

<style>
  .page-header {
    padding: 56px 0 24px;
  }

  .project-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 20px;
  }
</style>
```

- [ ] **Step 4: Create about page**

```astro
---
import BaseLayout from "@/layouts/BaseLayout.astro";
import { buildSeo, personJsonLd } from "@/lib/seo";

const seo = buildSeo({
  title: "About",
  description: "About Promise Xu, his writing, projects, and selected work.",
  path: "/about/"
});
---

<BaseLayout title={seo.title} description={seo.description} canonical={seo.canonical} jsonLd={[personJsonLd()]}>
  <main class="about">
    <section class="prose">
      <h1>About Promise Xu</h1>
      <p>Promise Xu writes about growth, marketing, business, culture, art, film, and the web.</p>
      <p>He also builds and studies products, with selected work including Valhalla, FriendUp, and Klido.</p>
      <p><a href="/writing/">Read the writing</a> or <a href="/projects/">view selected projects</a>.</p>
    </section>
  </main>
</BaseLayout>

<style>
  .about {
    padding: 56px 0;
  }
</style>
```

- [ ] **Step 5: Create search page**

```astro
---
import "@pagefind/default-ui/css/ui.css";
import BaseLayout from "@/layouts/BaseLayout.astro";
import { buildSeo } from "@/lib/seo";

const seo = buildSeo({
  title: "Search",
  description: "Search writing and projects by Promise Xu.",
  path: "/search/"
});
---

<BaseLayout title={seo.title} description={seo.description} canonical={seo.canonical}>
  <main>
    <section class="page-header">
      <h1>Search</h1>
      <p>Search writing and projects. Results include language and category context where available.</p>
    </section>
    <div id="search"></div>
  </main>
  <script>
    import { PagefindUI } from "@pagefind/default-ui";
    new PagefindUI({ element: "#search", showSubResults: true });
  </script>
</BaseLayout>
```

- [ ] **Step 6: Create RSS and robots**

Create `src/pages/rss.xml.ts`:

```ts
import rss from "@astrojs/rss";
import { getPublishedWritings, getWritingUrl } from "@/lib/content";
import { site } from "@/lib/site";

export async function GET() {
  const writings = await getPublishedWritings();
  return rss({
    title: site.title,
    description: site.description,
    site: site.url,
    items: writings.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.date,
      link: getWritingUrl(entry)
    }))
  });
}
```

Create `src/pages/robots.txt.ts`:

```ts
import { site } from "@/lib/site";

export function GET() {
  return new Response(`User-agent: *
Allow: /

Sitemap: ${site.url}/sitemap-index.xml
`);
}
```

- [ ] **Step 7: Run build**

```bash
npm run build
```

Expected: Astro build succeeds and Pagefind indexes `dist`.

- [ ] **Step 8: Commit pages**

```bash
git add src/components/ProjectCard.astro src/pages/index.astro src/pages/projects src/pages/about.astro src/pages/search.astro src/pages/rss.xml.ts src/pages/robots.txt.ts
git commit -m "feat: add publication launch pages"
```

## Task 7: Add Lightweight Client Discovery Islands

**Files:**
- Modify: `package.json`
- Modify: `astro.config.mjs`
- Create: `src/components/HomeDiscoveryIsland.tsx`
- Create: `src/components/ArchiveControlsIsland.tsx`
- Modify: `src/pages/index.astro`
- Modify: `src/pages/writing/index.astro`

- [ ] **Step 1: Add React only if islands need state**

Add React for the two approved first-launch islands:

```bash
npm install @astrojs/react react react-dom
```

Modify `astro.config.mjs`:

```js
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://promisexu.com",
  output: "static",
  integrations: [
    mdx(),
    react(),
    sitemap(),
    tailwind({
      applyBaseStyles: false
    })
  ]
});
```

- [ ] **Step 2: Create archive controls island**

```tsx
import { useMemo, useState } from "react";

type Item = {
  title: string;
  description: string;
  url: string;
  lang: "en" | "zh";
  category: string;
  date: string;
};

type Props = {
  items: Item[];
};

export default function ArchiveControlsIsland({ items }: Props) {
  const [language, setLanguage] = useState<"all" | "en" | "zh">("all");
  const visibleItems = useMemo(() => {
    return language === "all" ? items : items.filter((item) => item.lang === language);
  }, [items, language]);

  return (
    <section aria-label="Interactive writing filter">
      <div className="island-controls">
        <button type="button" aria-pressed={language === "all"} onClick={() => setLanguage("all")}>All</button>
        <button type="button" aria-pressed={language === "en"} onClick={() => setLanguage("en")}>English</button>
        <button type="button" aria-pressed={language === "zh"} onClick={() => setLanguage("zh")}>中文</button>
      </div>
      <div>
        {visibleItems.map((item) => (
          <article key={item.url} className="writing-card">
            <p>{item.lang === "zh" ? "中文" : "English"} · {item.category}</p>
            <h2><a href={item.url}>{item.title}</a></h2>
            <p>{item.description}</p>
            <time dateTime={item.date}>{item.date}</time>
          </article>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create homepage discovery island**

```tsx
import { useState } from "react";

type Item = {
  title: string;
  description: string;
  url: string;
  featured: boolean;
};

type Props = {
  items: Item[];
};

export default function HomeDiscoveryIsland({ items }: Props) {
  const [mode, setMode] = useState<"latest" | "featured">("latest");
  const visibleItems = mode === "featured" ? items.filter((item) => item.featured) : items;

  return (
    <section aria-label="Editorial discovery">
      <div className="island-controls">
        <button type="button" aria-pressed={mode === "latest"} onClick={() => setMode("latest")}>Latest</button>
        <button type="button" aria-pressed={mode === "featured"} onClick={() => setMode("featured")}>Featured</button>
      </div>
      {visibleItems.slice(0, 5).map((item) => (
        <article key={item.url} className="writing-card">
          <h2><a href={item.url}>{item.title}</a></h2>
          <p>{item.description}</p>
        </article>
      ))}
    </section>
  );
}
```

- [ ] **Step 4: Wire islands with static fallback**

In `src/pages/index.astro`, import `HomeDiscoveryIsland` and pass serialized latest items below the static featured/latest lists:

```astro
---
import HomeDiscoveryIsland from "@/components/HomeDiscoveryIsland";
import { getWritingUrl } from "@/lib/content";

const discoveryItems = latest.map((entry) => ({
  title: entry.data.title,
  description: entry.data.description,
  url: getWritingUrl(entry),
  featured: entry.data.featured
}));
---

<HomeDiscoveryIsland client:idle items={discoveryItems} />
```

In `src/pages/writing/index.astro`, import `ArchiveControlsIsland` and pass serialized writing items below the static archive list:

```astro
---
import ArchiveControlsIsland from "@/components/ArchiveControlsIsland";
import { getWritingUrl } from "@/lib/content";

const archiveItems = writings.map((entry) => ({
  title: entry.data.title,
  description: entry.data.description,
  url: getWritingUrl(entry),
  lang: entry.data.lang,
  category: entry.data.category,
  date: entry.data.date.toISOString().slice(0, 10)
}));
---

<ArchiveControlsIsland client:idle items={archiveItems} />
```

- [ ] **Step 5: Run build and inspect bundle impact**

```bash
npm run build
```

Expected: build succeeds and the two islands hydrate only on idle.

- [ ] **Step 6: Commit islands**

```bash
git add package.json package-lock.json astro.config.mjs src/components/HomeDiscoveryIsland.tsx src/components/ArchiveControlsIsland.tsx src/pages/index.astro src/pages/writing/index.astro
git commit -m "feat: add lightweight discovery islands"
```

## Task 8: Launch Verification And Documentation Check

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Check README and docs alignment**

Confirm these files still agree after implementation:

```txt
README.md
docs/superpowers/specs/2026-06-22-publication-core-design.md
docs/design/references.md
docs/architecture/routing-and-language.md
docs/architecture/seo-aeo.md
docs/learning/phase-learning-guide.md
```

Expected:

- README stays concise.
- Detailed roadmap, comments architecture, SEO/AEO notes, and learning checkpoints live in docs.
- Routes in docs match implemented routes.
- Deferred scope is still deferred.

- [ ] **Step 2: Run full verification**

```bash
npm run check
npm run build
```

Expected:

- `npm run check` passes.
- `npm run build` passes.
- Pagefind creates `dist/pagefind`.
- Sitemap exists in `dist`.
- RSS exists at `dist/rss.xml`.

- [ ] **Step 3: Start local preview**

```bash
npm run preview
```

Expected: Astro prints a localhost URL.

- [ ] **Step 4: Manually verify key routes**

Open these URLs:

```txt
/
/writing/
/en/writing/
/zh/writing/
/en/writing/opening-notes/
/zh/writing/opening-notes/
/projects/
/about/
/search/
/rss.xml
/robots.txt
```

Expected:

- Each page loads.
- English and Chinese article routes render the correct content.
- `/writing/` includes both English and Chinese writing.
- `/en/writing/` includes only English writing.
- `/zh/writing/` includes only Chinese writing.
- Search UI loads after build and preview.
- No article content depends on JavaScript to be readable.

- [ ] **Step 5: Commit documentation and verification fixes**

```bash
git add README.md
git commit -m "docs: align launch documentation"
```

If verification fixes changed code, include those files in the same commit only if they are directly required to make the launch slice pass.

## Final Acceptance Criteria

- The site builds as a static Astro site.
- `/writing/` is the canonical all-language archive.
- `/en/writing/` and `/zh/writing/` are language-scoped archive routes.
- `/en/writing/[slug]/` and `/zh/writing/[slug]/` render language-scoped article pages.
- Writing categories are controlled to Growth, Marketing & Business; Culture, Art & Film; and Misc.
- Projects render Valhalla, FriendUp, and Klido as image/description-driven entries.
- `/about/` is positioning, not a full CV.
- Search is present through Pagefind.
- RSS, sitemap, robots, canonical metadata, Open Graph metadata, and article JSON-LD are present.
- Comments, D1, Turnstile, moderation admin, Keystatic, full CV, full UI localization, and full case studies are not implemented in this launch slice.
