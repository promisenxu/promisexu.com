# Design, IA, and UX Revision

Date: 2026-06-23
Status: Draft for user review

## Goal

Revise the first-launch site direction so `promisexu.com` feels like a structured personal publication and proof system, not a generic portfolio or detached magazine.

The redesign focuses on:

- a global desktop left rail;
- a mobile hamburger navigation pattern;
- a cleaner homepage masthead and writing stream;
- search as a real navigation utility;
- language/content filtering that is visible but not distracting;
- a restrained sans editorial visual system;
- light article and archive polish.

## Non-Goals

This revision does not introduce:

- full UI localization;
- comments;
- D1, Turnstile, or moderation flows;
- a full article redesign;
- related posts;
- a table of contents;
- a hero image system;
- inline search suggestions;
- a large visual rebrand;
- a CMS change.

## Global Shell

Desktop uses a sticky left rail across the entire site.

The left rail appears on:

- homepage;
- writing archives;
- category archives;
- article pages;
- projects index;
- project detail pages;
- about;
- search results.

The rail contains:

- `PROMISE XU` as a small persistent home link;
- primary nav links: `Writing`, `Projects`, `About`;
- a compact search form.

Search is no longer a primary nav link. It is a utility control that submits to `/search/?q=<query>`. The existing `/search/` page remains the results page and no-JavaScript fallback.

Writing categories are removed from global navigation. Categories belong on writing archive/category pages, not in the persistent shell.

The left rail should be narrow, quiet, and functional. It must not feel like a heavy app sidebar.

## Mobile Navigation

Mobile uses a compact top header:

```text
PROMISE XU   menu
```

The hamburger menu contains:

- `Writing`;
- `Projects`;
- `About`;
- search form.

The homepage content view filter remains visible below the homepage masthead instead of being hidden inside the hamburger.

## Homepage

The homepage uses the global left rail plus a restrained main masthead.

Desktop structure:

```text
PROMISE XU        PROMISE XU
                  Writing and projects across growth,
Writing           culture, and the web.
Projects
About             [Featured] Article Title
                  Description...
Search            Category · EN · Date
[________]
                  Article Title
View              Description...
All EN 中文       Category · 中文 · Date

                  Projects
                  Valhalla
                  Description...
```

Mobile structure:

```text
PROMISE XU   menu

PROMISE XU
Writing and projects across growth, culture, and the web.

View
All EN 中文

[Featured] Article Title
Description...
Category · EN · Date

Article Title
Description...

Projects
Valhalla
Description...
```

Homepage copy is fixed for this revision:

```text
PROMISE XU
Writing and projects across growth, culture, and the web.
```

The left rail `PROMISE XU` and main homepage `PROMISE XU` have different roles:

- rail brand: small, functional, persistent home link;
- homepage masthead: larger, editorial page identity.

The homepage masthead should be restrained. It should not become a giant hero or decorative landing-page treatment.

## Homepage Writing Stream

The homepage writing stream replaces the current separate `Featured`, `Latest`, and interactive discovery sections.

Rules:

- no separate `Featured` section;
- no `Latest` heading;
- no homepage interactive discovery island;
- featured appears only as a subtle tag on qualifying writing items;
- if no featured item exists for the active filter, no featured treatment appears;
- ordering is featured first, then newest;
- the stream is filtered by the homepage `View` control;
- writing remains the dominant homepage content.

Example row:

```text
[Featured] Article Title
Description...
Growth, Marketing & Business · EN · 2026-06-23
```

## Homepage View Filter

The homepage has a lightweight content view filter:

```text
View
All EN 中文
```

Behavior:

- affects all language-aware homepage content;
- affects the writing stream immediately;
- can affect project snippets later if bilingual project summaries or variants are added;
- stores a soft preference;
- does not change UI language;
- does not override explicit language routes;
- avoids labels like `Language` that imply UI localization.

For first launch, project entries may remain visible in every view unless project metadata becomes language-aware.

## Projects on Homepage

Projects are a visible secondary block after the writing stream. They should establish proof without drowning the writing.

Rules:

- use a clear `Projects` heading;
- show Valhalla, FriendUp, and Klido;
- each homepage project entry links only to its internal project detail page;
- external product/project links live on project detail pages;
- project entries support optional images;
- no placeholder image should be shown just to fill space;
- text-only project entries remain valid;
- project images must be restrained and must not dominate the homepage.

## Writing Archives

Writing archive pages partially match the homepage stream.

Shared with homepage:

- sans editorial typography;
- quiet controls;
- row/list-based writing presentation;
- consistent metadata treatment.

Archive-specific behavior:

- archive pages remain comprehensive, not curated;
- archive rows may show more metadata than homepage rows;
- desktop language filters live in the left rail on writing archive contexts;
- mobile language filters remain visible above the archive list;
- category filters live in the page content area;
- category filters never move into the persistent global rail.

Default language behavior remains:

- `/writing/` is the canonical all-language archive;
- `/en/writing/` is English-scoped;
- `/zh/writing/` is Chinese-scoped;
- explicit language paths override any saved soft preference.

## Article Pages

Article pages receive light polish only.

Changes should focus on:

- cleaner title, dek, and metadata hierarchy;
- comfortable reading measure;
- improved vertical rhythm;
- consistent sans editorial styling;
- preserving article-level flexibility.

This pass should not add:

- comments;
- related posts;
- table of contents;
- article hero image system;
- complex reading widgets.

The global desktop left rail remains on article pages. Article content must still preserve a comfortable reading measure, roughly `68-74ch`.

## Visual System

The site should use a `sans editorial` direction.

Rules:

- use sans typography throughout for now;
- keep global background white or near-white;
- avoid strong global colors;
- avoid gradients, decorative blobs, and page-wide visual moods;
- create hierarchy through type size, weight, spacing, alignment, and divider rules;
- use balanced-spacious density;
- avoid luxury-brand emptiness;
- prefer editorial rows and structured lists over card-heavy layouts;
- allow cards for projects when they carry real content;
- avoid trapping article pages inside a heavy global theme.

The site should feel authored, structured, and calm.

## Search

Search becomes a real navigation utility.

First-launch behavior:

- compact input in desktop left rail;
- compact input inside mobile hamburger menu;
- submit-only behavior;
- submit routes to `/search/?q=<query>`;
- `/search/` remains the result page and fallback.

Future behavior:

- inline suggestions may be added later;
- suggestions should include writing and projects;
- keyboard support will be required if suggestions are implemented.

The current revision should structure the search form so suggestions can be added later without redesigning the global shell.

## Implementation Boundaries

Expected implementation areas:

- `BaseLayout.astro`;
- `SiteNav.astro` or replacement shell components;
- `global.css`;
- `index.astro`;
- writing archive pages and controls;
- article layout;
- project card/list presentation;
- search form handling.

The current React homepage discovery island should be removed from the homepage. It may be deleted if unused elsewhere.

## Acceptance Criteria

- Desktop uses a sticky left rail across the site.
- Mobile uses a hamburger navigation pattern.
- Homepage main content repeats `PROMISE XU` as a restrained masthead.
- Homepage uses the approved line: `Writing and projects across growth, culture, and the web.`
- Homepage has no `Featured` section heading and no `Latest` heading.
- Featured is a subtle item tag only.
- Homepage writing order is featured first, then newest.
- Homepage has a visible `View / All / EN / 中文` control.
- Homepage view control stores a soft preference and does not change UI language.
- Writing archive language filters use the rail on desktop and visible page-level placement on mobile.
- Writing archive category filters stay in page content.
- Search is an input, not a primary nav link.
- Search submits to `/search/?q=<query>`.
- Writing categories are not in global nav.
- Projects appear as a secondary homepage block and link to internal project pages.
- Article pages keep the global left rail on desktop and receive only light polish.
- Archive pages partially match the homepage visual language while keeping archive-specific controls.
- The visual system remains clean, sans, structured, and neutral.
