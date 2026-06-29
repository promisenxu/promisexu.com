# Template System Redesign

Date: 2026-06-29
Status: Approved

## Goal

Replace the site's presentation layer while preserving the working content architecture, routes, collections, SEO foundations, search, and asymmetric bilingual model.

The redesign should feel like a structured personal publication with a stronger editorial homepage, a more deliberate fixed rail, clear page-specific templates, and a site-wide content-language preference.

## Non-Goals

This revision does not:

- adopt or fork an Astro theme;
- change the approved information architecture or canonical routes;
- add full UI localization;
- add comments, D1, Turnstile, or moderation;
- add a CMS;
- require images for writing or projects;
- derive listing images from images embedded in article bodies;
- add client-side routing or animated page transitions.

## Architecture

Keep the current Astro content layer and route structure. Replace or substantially revise the shared shell, page-template markup, and CSS.

The presentation layer should continue to favor static HTML. Use normal links for language counterparts and keep client JavaScript limited to the global content-view preference and mobile menu.

## Global Desktop Shell

Desktop uses a full-height left rail and a flexible main canvas.

The rail:

- remains visible and fixed independently of page scrolling;
- displays the site name on two prominent lines: `PROMISE` and `XU`;
- uses larger primary links for `Writing`, `Projects`, and `About`;
- contains the existing search form with clear space between the input and the rail's right divider;
- places the global `View / All / EN / 中文` control at the bottom;
- gives the bottom control side and bottom margins comparable to the rail's upper spacing;
- keeps the same visual treatment on listing and detail pages.

The main canvas:

- has responsive outer padding and width constraints;
- permits each page template to choose a single-column or multi-column internal grid;
- does not force article, archive, project, and About pages into one rigid grid.

## Mobile Shell

Mobile uses a compact sticky header and hamburger menu.

The menu contains:

- `Writing`, `Projects`, and `About`;
- search;
- the global content-view control anchored near the bottom.

The global content-view control is not permanently exposed in the collapsed mobile header.

## Content View

`View / All / EN / 中文` is a site-wide content-language preference rather than a UI-language selector.

It applies to:

- homepage writing and other language-aware modules;
- writing archives;
- project listings;
- About content.

Behavior:

- `All` shows content in both languages;
- `EN` shows English content;
- `中文` shows Chinese content;
- About in `All` view shows the complete English section followed by the complete Chinese section;
- project listings show a clear empty state when the selected language has no projects;
- the preference remains soft and may be saved locally;
- explicit language-scoped writing routes still set the appropriate initial view;
- interface labels remain in the launch UI language.

The global `View` control is hidden on every article and project detail page. Detail pages use a local counterpart switch when applicable.

## Homepage Template

The homepage is an editorial index rather than a uniform stream.

The opening remains:

```text
PROMISE XU
Writing and projects across growth, culture, and the web.
```

Writing hierarchy:

- an explicitly featured article leads within the active view;
- when no featured article is available, the newest article leads;
- the lead may receive a larger title, wider span, and explicit feature image;
- following articles use a controlled mix of smaller editorial tiles and compact rows;
- featured remains a subtle item label, not a separate section;
- writing remains dominant over projects.

Writing metadata on the homepage includes category and date. It does not display content language.

### Feature Images

Writing frontmatter gains an optional `featureImage`.

Rules:

- only `featureImage` supplies imagery to homepage writing previews;
- images embedded in MDX article bodies are never promoted automatically;
- the lead and smaller editorial tiles may display `featureImage`;
- items without `featureImage` use a complete typography-led layout;
- no placeholder image is rendered.

### Homepage Projects

Projects appear after writing as a restrained image-led row or responsive grid.

- Project images remain optional.
- Text-only projects retain a deliberate layout without placeholders.
- Cards link only to internal project detail pages.
- Projects must not compete with the lead writing hierarchy.

## Writing Archive Template

Writing archives remain retrieval surfaces rather than curated editorial pages.

- Use dense, uniform chronological rows.
- Do not use a lead item or varied homepage grid.
- Prioritize title, description, category, and date.
- Do not display content language in row metadata.
- Keep category controls in the main canvas.
- Use the global rail `View` control for content-language filtering.
- Do not display feature images in archive rows for this revision.

## Projects Index Template

The Projects index uses a responsive image-led grid.

- Images are optional.
- Text-only cards remain valid and receive intentional typographic treatment.
- Cards link to internal project detail pages.
- The global content view filters projects by content language.
- A selected language with no projects produces a clear empty state.

Project content must gain explicit language data before filtering is enabled. English is the default for existing project entries.

## About Template

About supports separate English and Chinese content without requiring line-level translation equivalence.

- `All` renders the full English section followed by the full Chinese section.
- `EN` renders only English.
- `中文` renders only Chinese.
- The global content-view control changes the visible section without changing UI language.

## Article Template

Article pages retain the fixed global rail but omit its global `View` control.

The article template uses:

- an optional category eyebrow;
- title;
- description or dek;
- publication and optional update date;
- an optional local language-counterpart switch;
- a reading column around `68-74ch`;
- article body content with room for local imagery and page-specific tone.

Article headers and listing metadata do not display `EN` or `中文`.

When a language counterpart exists, render a simple `EN / 中文` switch between the title/description metadata block and the article body. It:

- uses the visual language of the global `View` control;
- omits the `View` label and `All` option;
- uses normal links to canonical language-specific routes;
- does not require client JavaScript.

Render no switch when no counterpart exists.

## Project Detail Template

Project detail pages also omit the global `View` control.

The template supports:

- title and concise description;
- optional project image;
- role/status metadata where useful;
- optional local `EN / 中文` counterpart switch;
- project body;
- an external product link after the internal project context.

The counterpart switch follows the same rules as the article switch. External links remain absent from homepage and Projects index cards.

## SEO and AEO

Every article identifies `Promise Xu` as its author in machine-readable metadata, whether or not a visible byline is shown.

Requirements:

- preserve Article JSON-LD `author` as a `Person` named `Promise Xu`;
- link the author to the site's stable canonical Person identity;
- add `<meta name="author" content="Promise Xu">` to article pages;
- align RSS author data with the same identity;
- retain canonical URLs and language-specific `inLanguage` data;
- add reciprocal `hreflang` links when an article counterpart exists;
- treat language counterparts as separate canonical articles, not duplicate pages.

## Visual System

- Use a white or near-white global shell.
- Use Piazzolla, the variable serif used by `gavinouyang.com`, as the primary Latin typeface.
- Self-host the official open-licensed Piazzolla variable font rather than loading files from the reference site.
- Use an appropriate system CJK serif fallback for Chinese glyphs; do not assume Piazzolla covers Chinese.
- Apply the same editorial type family across the shell, listings, headings, and prose unless testing shows a specific utility control needs a system-sans fallback.
- Create hierarchy through scale, weight, spacing, alignment, and divider rules.
- Provide moderate breathing room without luxury-brand emptiness.
- Avoid gradients, global color washes, decorative blobs, and generic card containers.
- Allow explicit feature images, project images, and local page content to introduce color.
- Preserve accessibility basics: semantic landmarks, visible focus, keyboard-operable menu and controls, sufficient contrast, and reduced-motion compatibility where motion exists.

## Empty and Fallback States

- A filtered listing with no matching content shows a concise, visible empty state.
- Missing optional images never produce placeholders or broken layout space.
- Missing language counterparts produce no local switch.
- Static links and route content remain usable if preference JavaScript fails.

## Verification

Implementation must verify:

- fixed desktop rail behavior at representative desktop widths;
- mobile header and menu behavior;
- global content-view behavior on homepage, archives, Projects, and About;
- detail-page counterpart links and absence rules;
- homepage lead fallback from featured to newest;
- image behavior with and without explicit `featureImage`;
- empty project filtering;
- keyboard navigation and visible focus;
- Astro type/content checks;
- production build and Pagefind indexing;
- rendered desktop and mobile layouts without clipping or overlap.

## Acceptance Criteria

- The desktop rail stays fixed and uses the approved two-line site name.
- Navigation is larger, search has right-side breathing room, and `View` is anchored at the rail bottom.
- The main canvas supports page-specific internal grids.
- Homepage uses an editorial index led by featured content or, failing that, newest content.
- Only explicit `featureImage` values appear in homepage writing previews.
- Homepage and archive writing metadata omit language.
- Writing archives use uniform chronological rows.
- Projects use an image-led responsive grid and support language-filtered empty states.
- About `All` view renders English followed by Chinese.
- Detail pages hide global `View`.
- Bilingual detail pages show a normal-link `EN / 中文` switch between header and body.
- Single-language detail pages show no language switch.
- Article metadata identifies Promise Xu as author for SEO/AEO.
- Existing routes, search, content collections, and publication-first IA remain intact.
