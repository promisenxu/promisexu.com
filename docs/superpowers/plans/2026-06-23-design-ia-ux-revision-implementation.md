# Design IA UX Revision Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the approved design, IA, and UX revision: sticky desktop left rail, mobile hamburger nav, real nav search, revised homepage stream, internal project detail routes, archive alignment, and light article polish.

**Architecture:** Build a global shell around `BaseLayout` and `SiteNav`, then make homepage/archive/article/project pages consume shared row/control components. Keep JavaScript isolated to small islands for mobile nav state and preference-aware filtering; keep static routes and no-JS fallbacks intact. Add internal project detail pages before changing homepage project links so cards never point directly off-site from the homepage.

**Tech Stack:** Astro 5, TypeScript, MDX content collections, React islands where interaction earns hydration, Pagefind, plain CSS/Tailwind base utilities already configured.

---

## File Map

- `src/layouts/BaseLayout.astro`: Owns global page shell, imports global CSS, renders `SiteNav`, wraps main content with the left-rail layout.
- `src/components/SiteNav.astro`: Replace top header with responsive desktop left rail + mobile header/menu; render nav links, search form, and optional contextual view filter slot/props.
- `src/components/SearchForm.astro`: New compact reusable search form that submits to `/search/` with `q`.
- `src/components/ContentViewFilter.astro`: New static filter markup for `All / EN / 中文`; receives selected value and hrefs for no-JS fallback.
- `src/components/ContentViewFilterIsland.tsx`: New small React island that reads/writes the soft preference and filters homepage language-aware content.
- `src/components/WritingCard.astro`: Convert card styling to editorial row styling; support `featured` tag and compact/homepage variants.
- `src/components/ProjectCard.astro`: Convert homepage/projects entries to internal project links and optional image support.
- `src/components/MobileMenuIsland.tsx`: New small React island to control hamburger open/closed state.
- `src/lib/content.ts`: Add `getProjectUrl`, `getProjectBySlug`, and homepage writing ordering helper.
- `src/content/config.ts`: Make project `image` optional.
- `src/pages/index.astro`: Replace current hero/Featured/Latest/discovery sections with approved masthead, view filter, writing stream, and project block.
- `src/pages/projects/index.astro`: Keep projects index but use internal project links and aligned visual system.
- `src/pages/projects/[slug].astro`: New internal project detail pages, with external link inside detail page only.
- `src/pages/writing/index.astro`, `src/pages/en/writing/index.astro`, `src/pages/zh/writing/index.astro`, `src/pages/writing/category/[category].astro`: Move toward shared archive row/control language; remove redundant interactive archive sections if the static filter UX covers the requirement.
- `src/layouts/ArticleLayout.astro`: Light article polish while preserving the global left rail.
- `src/styles/global.css`: Define shell, typography, spacing, controls, rows, and responsive behavior.
- `docs/superpowers/plans/2026-06-23-design-ia-ux-revision-implementation.md`: Track implementation progress.

---

### Task 1: Shared Content URLs and Project Detail Data ✅

**Files:**
- Modify: `src/content/config.ts`
- Modify: `src/lib/content.ts`
- Create: `src/pages/projects/[slug].astro`
- Modify: `src/components/ProjectCard.astro`

- [x] **Step 1: Make project images optional in the content schema**

In `src/content/config.ts`, change the projects schema from:

```ts
image: z.string(),
```

to:

```ts
image: z.string().optional(),
```

- [x] **Step 2: Add project URL helpers**

In `src/lib/content.ts`, add these exports below `getProjects()`:

```ts
export function getProjectUrl(entry: ProjectEntry) {
  return `/projects/${entry.id}/`;
}

export async function getProjectBySlug(slug: string) {
  const projects = await getProjects();
  return projects.find((entry) => entry.id === slug);
}
```

- [x] **Step 3: Update `ProjectCard` to link internally and tolerate missing images**

Replace `src/components/ProjectCard.astro` with:

```astro
---
import { getProjectUrl, type ProjectEntry } from "@/lib/content";

type Props = {
  project: ProjectEntry;
  compact?: boolean;
};

const { project, compact = false } = Astro.props;
const projectUrl = getProjectUrl(project);
---

<article class:list={["project-card", compact && "project-card--compact", !project.data.image && "project-card--text-only"]}>
  {project.data.image && (
    <a class="project-card__media" href={projectUrl} aria-label={`View ${project.data.name}`}>
      <img src={project.data.image} alt={`${project.data.name} project preview`} loading="lazy" />
    </a>
  )}
  <div class="project-card__body">
    <p class="project-card__meta">{project.data.role}</p>
    <h2><a href={projectUrl}>{project.data.name}</a></h2>
    <p class="project-card__description">{project.data.description}</p>
    <a class="project-card__link" href={projectUrl}>View project</a>
  </div>
</article>
```

Use CSS classes in Task 6; do not keep component-local card CSS once global project styles are added.

- [x] **Step 4: Add static project detail pages**

Create `src/pages/projects/[slug].astro`:

```astro
---
import BaseLayout from "@/layouts/BaseLayout.astro";
import { getProjects, getProjectUrl, type ProjectEntry } from "@/lib/content";
import { buildSeo } from "@/lib/seo";

type Props = {
  project: ProjectEntry;
};

export async function getStaticPaths() {
  const projects = await getProjects();
  return projects.map((project) => ({
    params: { slug: project.id },
    props: { project }
  }));
}

const { project } = Astro.props;
const seo = buildSeo({
  title: project.data.name,
  description: project.data.description,
  path: getProjectUrl(project)
});
const { Content } = await project.render();
---

<BaseLayout title={seo.title} description={seo.description} canonical={seo.canonical}>
  <main>
    <section class="page-header page-header--compact">
      <p class="eyebrow">Project</p>
      <h1>{project.data.name}</h1>
      <p>{project.data.description}</p>
    </section>

    <article class="project-detail">
      {project.data.image && (
        <img class="project-detail__image" src={project.data.image} alt={`${project.data.name} project preview`} />
      )}
      <div class="project-detail__meta">
        <p><strong>Role</strong> {project.data.role}</p>
        {project.data.status && <p><strong>Status</strong> {project.data.status}</p>}
        {project.data.link && <p><a href={project.data.link}>Visit project</a></p>}
      </div>
      <div class="prose">
        <Content />
      </div>
    </article>
  </main>
</BaseLayout>
```

- [x] **Step 5: Run type/build verification**

Run:

```bash
npm run check
npm run build
```

Expected:

- `npm run check` exits `0`.
- `npm run build` exits `0`.
- Build output includes generated `/projects/valhalla/`, `/projects/friendup/`, and `/projects/klido/` pages.

- [x] **Step 6: Commit**

```bash
git add src/content/config.ts src/lib/content.ts src/components/ProjectCard.astro src/pages/projects/[slug].astro
git commit -m "feat: add internal project detail routes"
```

---

### Task 2: Global Shell, Search Form, and Responsive Navigation ✅

**Files:**
- Modify: `src/layouts/BaseLayout.astro`
- Replace: `src/components/SiteNav.astro`
- Create: `src/components/SearchForm.astro`
- Create: `src/components/MobileMenuIsland.tsx`
- Modify: `src/styles/global.css`

- [x] **Step 1: Create reusable search form**

Create `src/components/SearchForm.astro`:

```astro
---
type Props = {
  id?: string;
  label?: string;
  placeholder?: string;
};

const {
  id = "site-search",
  label = "Search",
  placeholder = "Search"
} = Astro.props;
---

<form class="search-form" role="search" action="/search/" method="get">
  <label for={id}>{label}</label>
  <input id={id} type="search" name="q" placeholder={placeholder} autocomplete="off" />
</form>
```

- [x] **Step 2: Create mobile menu island**

Create `src/components/MobileMenuIsland.tsx`:

```tsx
import { useState } from "react";

type Props = {
  links: Array<{ href: string; label: string }>;
};

export default function MobileMenuIsland({ links }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mobile-menu">
      <button
        className="mobile-menu__button"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        onClick={() => setOpen((value) => !value)}
      >
        Menu
      </button>
      <div id="mobile-menu-panel" className="mobile-menu__panel" hidden={!open}>
        <nav aria-label="Mobile navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>
        <form className="search-form" role="search" action="/search/" method="get">
          <label htmlFor="mobile-site-search">Search</label>
          <input id="mobile-site-search" type="search" name="q" placeholder="Search" autoComplete="off" />
        </form>
      </div>
    </div>
  );
}
```

Do not import the Astro component into React at runtime; the inline form above is intentional.

- [x] **Step 3: Replace `SiteNav` with rail/mobile shell controls**

Replace `src/components/SiteNav.astro` with:

```astro
---
import MobileMenuIsland from "@/components/MobileMenuIsland";
import SearchForm from "@/components/SearchForm.astro";

const links = [
  { href: "/writing/", label: "Writing" },
  { href: "/projects/", label: "Projects" },
  { href: "/about/", label: "About" }
];
---

<header class="mobile-header">
  <a class="site-brand" href="/">PROMISE XU</a>
  <MobileMenuIsland client:load links={links} />
</header>

<aside class="site-rail" aria-label="Site navigation">
  <a class="site-brand site-brand--rail" href="/">PROMISE XU</a>
  <nav class="site-rail__nav" aria-label="Primary navigation">
    {links.map((link) => <a href={link.href}>{link.label}</a>)}
  </nav>
  <SearchForm id="rail-site-search" />
  <slot name="rail" />
</aside>
```

- [x] **Step 4: Update `BaseLayout` to own the app shell and rail slot**

Replace the body portion of `src/layouts/BaseLayout.astro` with:

```astro
  <body>
    <div class="site-shell">
      <SiteNav>
        <slot name="rail" slot="rail" />
      </SiteNav>
      <div class="site-content">
        <slot />
        <footer class="site-footer">
          <p>&copy; {new Date().getFullYear()} Promise Xu. Writing, projects, and selected work.</p>
        </footer>
      </div>
    </div>
  </body>
```

Remove the old footer width styles from `BaseLayout.astro`; footer layout will be in global CSS.

- [x] **Step 5: Add shell CSS foundations**

In `src/styles/global.css`, add shell CSS after the `a` rule:

```css
.site-shell {
  width: min(1240px, calc(100vw - 32px));
  margin: 0 auto;
}

.site-rail {
  display: none;
}

.mobile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 0;
  border-bottom: 1px solid var(--color-border);
}

.site-brand {
  font-size: 0.86rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-decoration: none;
}

.mobile-menu__button {
  padding: 7px 0;
  color: var(--color-ink);
  background: transparent;
  border: 0;
  font: inherit;
  font-weight: 700;
}

.mobile-menu__panel {
  position: absolute;
  left: 16px;
  right: 16px;
  top: 58px;
  z-index: 20;
  display: grid;
  gap: 20px;
  padding: 20px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
}

.mobile-menu__panel nav {
  display: grid;
  gap: 14px;
}

.mobile-menu__panel nav a,
.site-rail__nav a {
  color: var(--color-muted);
  text-decoration: none;
}

.mobile-menu__panel nav a:hover,
.site-rail__nav a:hover {
  color: var(--color-ink);
}

.search-form {
  display: grid;
  gap: 8px;
}

.search-form label {
  color: var(--color-muted);
  font-size: 0.82rem;
  font-weight: 700;
}

.search-form input {
  width: 100%;
  padding: 9px 10px;
  color: var(--color-ink);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 0;
  font: inherit;
}

.site-content {
  min-width: 0;
}

.site-footer {
  margin: 64px 0 0;
  padding: 24px 0 40px;
  color: var(--color-muted);
  border-top: 1px solid var(--color-border);
}

@media (min-width: 900px) {
  .site-shell {
    display: grid;
    grid-template-columns: 180px minmax(0, 1fr);
    gap: clamp(48px, 7vw, 96px);
  }

  .mobile-header {
    display: none;
  }

  .site-rail {
    position: sticky;
    top: 0;
    display: grid;
    align-content: start;
    gap: 30px;
    min-height: 100vh;
    padding: 32px 0;
    border-right: 1px solid var(--color-border);
  }

  .site-rail__nav {
    display: grid;
    gap: 12px;
  }

  .site-content {
    padding-top: 32px;
  }
}
```

Also change the existing `main` rule to:

```css
main {
  width: 100%;
}
```

- [x] **Step 6: Run verification**

Run:

```bash
npm run check
npm run build
```

Expected:

- `npm run check` exits `0`.
- `npm run build` exits `0`.
- Build output still includes all existing writing routes and project routes.

- [x] **Step 7: Commit**

```bash
git add src/layouts/BaseLayout.astro src/components/SiteNav.astro src/components/SearchForm.astro src/components/MobileMenuIsland.tsx src/styles/global.css
git commit -m "feat: add responsive left rail shell"
```

---

### Task 3: Content View Filter and Homepage Stream

**Files:**
- Create: `src/components/ContentViewFilter.astro`
- Create: `src/components/ContentViewFilterIsland.tsx`
- Modify: `src/lib/content.ts`
- Modify: `src/pages/index.astro`
- Modify: `src/components/WritingCard.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Add homepage writing ordering helper**

In `src/lib/content.ts`, add:

```ts
export async function getHomepageWritings() {
  const writings = await getPublishedWritings();
  return writings.sort((a, b) => {
    if (a.data.featured !== b.data.featured) {
      return a.data.featured ? -1 : 1;
    }

    return b.data.date.valueOf() - a.data.date.valueOf();
  });
}
```

- [ ] **Step 2: Create static content view filter markup**

Create `src/components/ContentViewFilter.astro`:

```astro
---
type ViewKey = "all" | "en" | "zh";

type Props = {
  selected?: ViewKey;
  label?: string;
  hrefs?: Record<ViewKey, string>;
};

const {
  selected = "all",
  label = "View",
  hrefs = {
    all: "/",
    en: "/en/writing/",
    zh: "/zh/writing/"
  }
} = Astro.props;
const views: Array<{ key: ViewKey; label: string; href: string }> = [
  { key: "all", label: "All", href: hrefs.all },
  { key: "en", label: "EN", href: hrefs.en },
  { key: "zh", label: "中文", href: hrefs.zh }
];
---

<div class="view-filter" data-view-filter>
  <p>{label}</p>
  <div>
    {views.map((view) => (
      <a href={view.href} data-view={view.key} aria-current={selected === view.key ? "true" : undefined}>
        {view.label}
      </a>
    ))}
  </div>
</div>
```

- [ ] **Step 3: Create preference-aware homepage filter island**

Create `src/components/ContentViewFilterIsland.tsx`:

```tsx
import { useEffect, useState } from "react";

type ViewKey = "all" | "en" | "zh";

const storageKey = "promisexu.contentView";
const views: Array<{ key: ViewKey; label: string }> = [
  { key: "all", label: "All" },
  { key: "en", label: "EN" },
  { key: "zh", label: "中文" }
];

function applyView(view: ViewKey) {
  document.documentElement.dataset.contentView = view;
}

export default function ContentViewFilterIsland() {
  const [view, setView] = useState<ViewKey>("all");

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    const next = saved === "en" || saved === "zh" || saved === "all" ? saved : "all";
    setView(next);
    applyView(next);
  }, []);

  function choose(next: ViewKey) {
    setView(next);
    window.localStorage.setItem(storageKey, next);
    applyView(next);
  }

  return (
    <div className="view-filter" data-view-filter>
      <p>View</p>
      <div>
        {views.map((item) => (
          <button
            key={item.key}
            type="button"
            aria-pressed={view === item.key}
            onClick={() => choose(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Update `WritingCard` for row styling and featured tag**

Replace `src/components/WritingCard.astro` with:

```astro
---
import { getWritingUrl, type WritingEntry } from "@/lib/content";

type Props = {
  entry: WritingEntry;
  headingLevel?: "h2" | "h3";
  compact?: boolean;
  showFeaturedTag?: boolean;
};

const { entry, headingLevel = "h2", compact = false, showFeaturedTag = true } = Astro.props;
const Heading = headingLevel;
const date = entry.data.date.toISOString().slice(0, 10);
const languageLabel = entry.data.lang === "zh" ? "中文" : "EN";
---

<article
  class:list={["writing-row", compact && "writing-row--compact"]}
  data-lang={entry.data.lang}
  data-category={entry.data.category}
>
  <div class="writing-row__label">
    {showFeaturedTag && entry.data.featured && <span class="tag">Featured</span>}
  </div>
  <div class="writing-row__body">
    <Heading><a href={getWritingUrl(entry)}>{entry.data.title}</a></Heading>
    <p class="writing-row__description">{entry.data.description}</p>
    <p class="writing-row__meta">{entry.data.category} &middot; {languageLabel} &middot; <time datetime={date}>{date}</time></p>
  </div>
</article>
```

- [ ] **Step 5: Replace homepage content**

Replace the body of `src/pages/index.astro` with a layout that imports:

```astro
import ContentViewFilterIsland from "@/components/ContentViewFilterIsland";
import ProjectCard from "@/components/ProjectCard.astro";
import WritingCard from "@/components/WritingCard.astro";
import BaseLayout from "@/layouts/BaseLayout.astro";
import { getHomepageWritings, getProjects } from "@/lib/content";
import { buildSeo, personJsonLd, websiteJsonLd } from "@/lib/seo";
```

Use:

```astro
const writings = await getHomepageWritings();
const homepageWritings = writings.slice(0, 6);
const projects = (await getProjects()).slice(0, 3);
```

Render:

```astro
<BaseLayout title={seo.title} description={seo.description} canonical={seo.canonical} jsonLd={[personJsonLd(), websiteJsonLd()]}>
  <ContentViewFilterIsland slot="rail" client:load />

  <main>
    <section class="home-masthead">
      <h1>PROMISE XU</h1>
      <p>Writing and projects across growth, culture, and the web.</p>
    </section>

    <div class="mobile-view-filter">
      <ContentViewFilterIsland client:load />
    </div>

    <section class="writing-stream" aria-label="Selected writing">
      {homepageWritings.map((entry) => <WritingCard entry={entry} compact />)}
    </section>

    <section class="home-projects" aria-labelledby="projects-heading">
      <h2 id="projects-heading">Projects</h2>
      <div class="project-list">
        {projects.map((project) => <ProjectCard project={project} compact />)}
      </div>
    </section>
  </main>
</BaseLayout>
```

Remove imports and usage of `HomeDiscoveryIsland`, `getFeaturedWritings`, and `getPublishedWritings`.

- [ ] **Step 6: Add CSS for homepage filtering**

In `src/styles/global.css`, add:

```css
.home-masthead {
  max-width: 720px;
  padding: 24px 0 36px;
}

.home-masthead h1 {
  margin: 0 0 14px;
  font-size: clamp(2.2rem, 7vw, 4.4rem);
  line-height: 0.98;
  letter-spacing: 0;
}

.home-masthead p {
  margin: 0;
  color: var(--color-muted);
  font-size: clamp(1.1rem, 2vw, 1.45rem);
  line-height: 1.45;
}

.view-filter {
  display: grid;
  gap: 10px;
}

.view-filter p {
  margin: 0;
  color: var(--color-muted);
  font-size: 0.82rem;
  font-weight: 700;
}

.view-filter div {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.view-filter a,
.view-filter button {
  padding: 5px 8px;
  color: var(--color-muted);
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  font: inherit;
  font-size: 0.85rem;
  text-decoration: none;
}

.view-filter a[aria-current="true"],
.view-filter button[aria-pressed="true"] {
  color: var(--color-bg);
  background: var(--color-ink);
  border-color: var(--color-ink);
}

.mobile-view-filter {
  margin-bottom: 24px;
}

html[data-content-view="en"] [data-lang="zh"],
html[data-content-view="zh"] [data-lang="en"] {
  display: none;
}

.writing-stream {
  border-top: 1px solid var(--color-border);
}

@media (min-width: 900px) {
  .mobile-view-filter {
    display: none;
  }
}
```

- [ ] **Step 7: Run verification**

Run:

```bash
npm run check
npm run build
```

Expected:

- `npm run check` exits `0`.
- `npm run build` exits `0`.
- Homepage no longer references `HomeDiscoveryIsland`.
- Generated homepage contains the approved masthead copy.

- [ ] **Step 8: Commit**

```bash
git add src/lib/content.ts src/components/ContentViewFilter.astro src/components/ContentViewFilterIsland.tsx src/components/WritingCard.astro src/pages/index.astro src/styles/global.css
git commit -m "feat: redesign homepage writing stream"
```

---

### Task 4: Archive Controls and Archive Page Alignment

**Files:**
- Modify: `src/components/ArchiveControls.astro`
- Modify: `src/pages/writing/index.astro`
- Modify: `src/pages/en/writing/index.astro`
- Modify: `src/pages/zh/writing/index.astro`
- Modify: `src/pages/writing/category/[category].astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Change `ArchiveControls` to category-only page controls**

Replace `src/components/ArchiveControls.astro` with:

```astro
---
import { getWritingCategoryUrl, writingCategories } from "@/lib/site";

type Props = {
  selectedCategory?: (typeof writingCategories)[number];
};

const { selectedCategory } = Astro.props;
---

<aside class="archive-controls" aria-label="Writing category filters">
  <span>Category</span>
  <a href="/writing/" aria-current={selectedCategory ? undefined : "page"}>All</a>
  {writingCategories.map((category) => (
    <a href={getWritingCategoryUrl(category)} aria-current={selectedCategory === category ? "page" : undefined}>
      {category}
    </a>
  ))}
</aside>
```

- [ ] **Step 2: Add archive language filter to BaseLayout rail slot**

On `/writing/`, render:

```astro
<ContentViewFilter
  selected="all"
  label="View writing"
  hrefs={{ all: "/writing/", en: "/en/writing/", zh: "/zh/writing/" }}
  slot="rail"
/>
```

On `/en/writing/`, render:

```astro
<ContentViewFilter
  selected="en"
  label="View writing"
  hrefs={{ all: "/writing/", en: "/en/writing/", zh: "/zh/writing/" }}
  slot="rail"
/>
```

On `/zh/writing/`, render:

```astro
<ContentViewFilter
  selected="zh"
  label="View writing"
  hrefs={{ all: "/writing/", en: "/en/writing/", zh: "/zh/writing/" }}
  slot="rail"
/>
```

Import `ContentViewFilter` in those files.

- [ ] **Step 3: Add mobile-visible archive language filters**

Immediately below each archive page header, render the same `ContentViewFilter` without `slot="rail"` inside:

```astro
<div class="archive-language-mobile">
  <ContentViewFilter
    selected="all"
    label="View writing"
    hrefs={{ all: "/writing/", en: "/en/writing/", zh: "/zh/writing/" }}
  />
</div>
```

Use `selected="en"` for `/en/writing/` and `selected="zh"` for `/zh/writing/`.

- [ ] **Step 4: Remove interactive archive islands from static archive pages**

In `src/pages/writing/index.astro` and `src/pages/writing/category/[category].astro`:

- remove `ArchiveControlsIsland` imports;
- remove `archiveItems` constants used only by the island;
- remove `<section class="interactive-archive">...</section>`.

The static language routes and category routes now provide the archive browsing baseline.

- [ ] **Step 5: Update ArchiveControls call sites**

Change:

```astro
<ArchiveControls selectedLanguage="all" />
```

to:

```astro
<ArchiveControls />
```

Change:

```astro
<ArchiveControls selectedLanguage="all" selectedCategory={category} />
```

to:

```astro
<ArchiveControls selectedCategory={category} />
```

Remove all `selectedLanguage` props.

- [ ] **Step 6: Add archive CSS**

In `src/styles/global.css`, add:

```css
.page-header {
  padding: 24px 0 28px;
}

.page-header--compact {
  max-width: 760px;
}

.page-header h1 {
  margin: 0 0 12px;
  font-size: clamp(2rem, 6vw, 3.8rem);
  line-height: 1;
}

.page-header p {
  max-width: 62ch;
  margin: 0;
  color: var(--color-muted);
  font-size: 1.08rem;
  line-height: 1.6;
}

.eyebrow {
  margin: 0 0 10px;
  color: var(--color-muted);
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.archive-language-mobile {
  margin-bottom: 20px;
}

.archive-controls {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin: 0 0 24px;
  padding: 0 0 18px;
  border-bottom: 1px solid var(--color-border);
}

.archive-controls span {
  color: var(--color-muted);
  font-size: 0.85rem;
  font-weight: 700;
}

.archive-controls a {
  padding: 6px 10px;
  color: var(--color-muted);
  border: 1px solid var(--color-border);
  border-radius: 999px;
  text-decoration: none;
}

.archive-controls a[aria-current="page"] {
  color: var(--color-bg);
  background: var(--color-ink);
  border-color: var(--color-ink);
}

@media (min-width: 900px) {
  .archive-language-mobile {
    display: none;
  }
}
```

Remove duplicate page-header/archive CSS from the touched page files after adding global CSS.

- [ ] **Step 7: Run verification**

Run:

```bash
npm run check
npm run build
```

Expected:

- `npm run check` exits `0`.
- `npm run build` exits `0`.
- `/writing/`, `/en/writing/`, `/zh/writing/`, and category pages build.
- Global nav does not list writing categories.

- [ ] **Step 8: Commit**

```bash
git add src/components/ArchiveControls.astro src/pages/writing/index.astro src/pages/en/writing/index.astro src/pages/zh/writing/index.astro 'src/pages/writing/category/[category].astro' src/styles/global.css
git commit -m "feat: align writing archive controls"
```

---

### Task 5: Article Layout and Editorial Row Polish

**Files:**
- Modify: `src/layouts/ArticleLayout.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Simplify article layout markup**

Replace the `<main class="article-shell">` block in `src/layouts/ArticleLayout.astro` with:

```astro
  <main class="article-shell">
    <article lang={entry.data.lang}>
      <header class="article-header">
        <p class="eyebrow">{entry.data.category} &middot; {entry.data.lang === "zh" ? "中文" : "EN"}</p>
        <h1>{entry.data.title}</h1>
        <p class="dek">{entry.data.description}</p>
        <p class="meta">
          Published <time datetime={publishedDate}>{publishedDate}</time>
          {updatedDate && <> &middot; Updated <time datetime={updatedDate}>{updatedDate}</time></>}
        </p>
      </header>
      <div class="prose">
        <slot />
      </div>
      {entry.data.publishedAtExternalUrl && (
        <p class="external">Originally published externally: <a href={entry.data.publishedAtExternalUrl}>source</a></p>
      )}
    </article>
  </main>
```

Remove component-local `<style>` from `ArticleLayout.astro`; use global CSS below.

- [ ] **Step 2: Add article and writing row CSS**

In `src/styles/global.css`, add:

```css
.writing-row {
  display: grid;
  gap: 8px;
  padding: 22px 0;
  border-bottom: 1px solid var(--color-border);
}

.writing-row__label {
  min-height: 1.5rem;
}

.tag {
  display: inline-flex;
  align-items: center;
  padding: 3px 7px;
  color: var(--color-muted);
  border: 1px solid var(--color-border);
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

.writing-row h2,
.writing-row h3 {
  margin: 0 0 8px;
  font-size: clamp(1.3rem, 2.4vw, 2rem);
  line-height: 1.18;
}

.writing-row a {
  text-decoration: none;
}

.writing-row a:hover {
  text-decoration: underline;
}

.writing-row__description {
  max-width: 68ch;
  margin: 0 0 10px;
  color: var(--color-muted);
  line-height: 1.6;
}

.writing-row__meta {
  margin: 0;
  color: var(--color-muted);
  font-size: 0.9rem;
}

.article-shell {
  max-width: 74ch;
  padding: 24px 0 0;
}

.article-header {
  margin-bottom: 40px;
}

.article-header h1 {
  margin: 0 0 16px;
  font-size: clamp(2.2rem, 6vw, 4.5rem);
  line-height: 1;
}

.dek {
  margin: 0 0 16px;
  color: var(--color-muted);
  font-size: clamp(1.15rem, 2vw, 1.4rem);
  line-height: 1.5;
}

.meta,
.external {
  color: var(--color-muted);
  font-size: 0.92rem;
}

.external {
  max-width: 74ch;
  margin-top: 40px;
}
```

- [ ] **Step 3: Check global `.prose` remains readable**

Confirm `src/styles/global.css` still contains:

```css
.prose {
  max-width: 72ch;
  line-height: 1.75;
  font-size: 1.0625rem;
}
```

If missing, add it back unchanged.

- [ ] **Step 4: Run verification**

Run:

```bash
npm run check
npm run build
```

Expected:

- `npm run check` exits `0`.
- `npm run build` exits `0`.
- Article pages build with left rail inherited from `BaseLayout`.

- [ ] **Step 5: Commit**

```bash
git add src/layouts/ArticleLayout.astro src/styles/global.css
git commit -m "style: polish article and writing rows"
```

---

### Task 6: Project Index, Detail Styling, and Search Results Polish

**Files:**
- Modify: `src/pages/projects/index.astro`
- Modify: `src/pages/search.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Simplify projects index styles**

In `src/pages/projects/index.astro`:

- keep `ProjectCard` usage;
- change `<section class="project-grid">` to `<section class="project-list" aria-label="Selected work">`;
- remove component-local page-header and grid CSS.

The page should rely on global `.page-header` and `.project-list` CSS.

- [ ] **Step 2: Remove duplicate search page header CSS**

In `src/pages/search.astro`, remove the component-local `<style>` block. Keep the existing Pagefind script.

- [ ] **Step 3: Add project and search CSS**

In `src/styles/global.css`, add:

```css
.project-list {
  display: grid;
  gap: 18px;
}

.project-card {
  display: grid;
  gap: 16px;
  padding: 18px 0;
  border-bottom: 1px solid var(--color-border);
}

.project-card__media {
  display: block;
}

.project-card img {
  width: 100%;
  max-width: 220px;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
}

.project-card__meta {
  margin: 0 0 8px;
  color: var(--color-muted);
  font-size: 0.9rem;
}

.project-card h2 {
  margin: 0 0 8px;
  font-size: clamp(1.25rem, 2vw, 1.7rem);
  line-height: 1.2;
}

.project-card h2 a {
  text-decoration: none;
}

.project-card h2 a:hover {
  text-decoration: underline;
}

.project-card__description {
  max-width: 62ch;
  margin: 0 0 12px;
  color: var(--color-muted);
  line-height: 1.55;
}

.project-card__link {
  font-weight: 700;
}

.project-detail {
  display: grid;
  gap: 28px;
}

.project-detail__image {
  width: min(100%, 720px);
  border: 1px solid var(--color-border);
}

.project-detail__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 20px;
  color: var(--color-muted);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  padding: 14px 0;
}

.project-detail__meta p {
  margin: 0;
}

@media (min-width: 720px) {
  .project-card {
    grid-template-columns: minmax(0, 220px) minmax(0, 1fr);
    align-items: start;
  }
}

.project-card--text-only {
  grid-template-columns: minmax(0, 1fr);
}
```

Remove any component-local `<style>` from `ProjectCard.astro`.

- [ ] **Step 4: Ensure homepage project cards use compact layout**

Confirm `src/pages/index.astro` renders:

```astro
{projects.map((project) => <ProjectCard project={project} compact />)}
```

- [ ] **Step 5: Run verification**

Run:

```bash
npm run check
npm run build
```

Expected:

- `npm run check` exits `0`.
- `npm run build` exits `0`.
- Pagefind still indexes search content after build.

- [ ] **Step 6: Commit**

```bash
git add src/pages/projects/index.astro src/pages/search.astro src/styles/global.css src/components/ProjectCard.astro
git commit -m "style: align projects and search pages"
```

---

### Task 7: Remove Unused Homepage Discovery Code and Audit JS Weight

**Files:**
- Delete if unused: `src/components/HomeDiscoveryIsland.tsx`
- Check: `src/pages/index.astro`
- Check: `package.json`

- [ ] **Step 1: Confirm discovery island is unused**

Run:

```bash
rg "HomeDiscoveryIsland|Interactive discovery|discoveryItems" src
```

Expected after Task 3:

- No references, except possibly the component file itself.

- [ ] **Step 2: Delete unused component if unreferenced**

If the only remaining match is `src/components/HomeDiscoveryIsland.tsx`, delete that file.

- [ ] **Step 3: Keep React only if still needed**

Run:

```bash
rg "client:" src
```

Expected:

- React is still needed for `MobileMenuIsland` and `ContentViewFilterIsland`.
- Do not remove `@astrojs/react`, `react`, or `react-dom`.

- [ ] **Step 4: Run verification**

Run:

```bash
npm run check
npm run build
```

Expected:

- `npm run check` exits `0`.
- `npm run build` exits `0`.
- No import error for the deleted discovery island.

- [ ] **Step 5: Commit**

```bash
git add -u src/components/HomeDiscoveryIsland.tsx
git commit -m "chore: remove unused homepage discovery island"
```

If no file was deleted, skip this commit and add a status note to this plan under Task 7 explaining why.

---

### Task 8: Final Verification and Documentation Alignment

**Files:**
- Modify if needed: `README.md`
- Modify if needed: `docs/architecture/routing-and-language.md`
- Modify if needed: `docs/design/references.md`
- Modify: `docs/superpowers/plans/2026-06-23-design-ia-ux-revision-implementation.md`

- [ ] **Step 1: Verify README still matches the implemented shell**

Open `README.md` and confirm the launch goal still accurately describes:

- publication-style homepage;
- language-scoped writing routes;
- project gallery/detail pages;
- search;
- SEO/AEO foundations.

If README claims search is only a page or omits project detail pages after they exist, update the relevant bullet.

- [ ] **Step 2: Verify routing documentation**

Open `docs/architecture/routing-and-language.md` and confirm it documents:

- URL language scope remains content language, not UI language;
- `/writing/`, `/en/writing/`, and `/zh/writing/`;
- explicit language paths override soft preferences;
- homepage `View / All / EN / 中文` is a content-view preference, not UI localization.

Update only stale sections.

- [ ] **Step 3: Verify design reference documentation**

Open `docs/design/references.md` and confirm the visual direction notes align with:

- clean sans editorial;
- sticky left rail;
- mobile hamburger;
- no heavy global visual mood.

Update only stale sections.

- [ ] **Step 4: Run full verification**

Run:

```bash
npm run check
npm run build
```

Expected:

- `npm run check` exits `0`.
- `npm run build` exits `0`.
- Build output includes static pages for:
  - `/`
  - `/writing/`
  - `/en/writing/`
  - `/zh/writing/`
  - `/writing/category/growth-marketing-business/`
  - `/writing/category/culture-art-film/`
  - `/writing/category/misc/`
  - `/projects/`
  - `/projects/valhalla/`
  - `/projects/friendup/`
  - `/projects/klido/`
  - `/about/`
  - `/search/`

- [ ] **Step 5: Inspect git status**

Run:

```bash
git status --short
```

Expected:

- Only intended docs/status files are modified before the final commit.

- [ ] **Step 6: Commit docs alignment and plan status**

```bash
git add README.md docs/architecture/routing-and-language.md docs/design/references.md docs/superpowers/plans/2026-06-23-design-ia-ux-revision-implementation.md
git commit -m "docs: align design revision documentation"
```

If no docs changed except task status markers, commit only the plan status file:

```bash
git add docs/superpowers/plans/2026-06-23-design-ia-ux-revision-implementation.md
git commit -m "docs: mark design revision implementation complete"
```
