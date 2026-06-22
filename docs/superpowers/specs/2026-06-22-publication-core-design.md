# Publication Core First Launch Design

## Purpose

First launch for `promisexu.com` should be a publication core with light proof. The site should read less like a portfolio with a blog attached and more like a personal publication with an author and builder behind it.

The priority order is:

1. Writing archive.
2. Career proof.
3. Technical portfolio.

This spec sharpens the existing README roadmap into a first-launch slice. It does not replace the long-term stack decision: Astro, TypeScript, MDX content collections, Cloudflare hosting, Pagefind search, and later Cloudflare-native comments with Turnstile and D1.

## Product Shape

The homepage should establish the publication identity, surface recent and featured writing, and provide clear paths into categories and language-scoped archives. Career proof should exist as credibility context through projects, about/positioning, and technical polish, not as the dominant frame.

First launch includes:

- Publication-style homepage.
- Unified writing archive.
- Language-scoped writing routes.
- Category-led writing navigation.
- Chronological discovery.
- Pagefind search.
- Homepage editorial discovery.
- Compact archive controls.
- Image and description driven project gallery.
- Author/positioning page.

First launch defers:

- Comments.
- Cloudflare D1 comment storage.
- Turnstile.
- Moderation admin.
- Keystatic.
- Full CV page.
- Full case-study system.
- Full UI localization.
- Complex recommendation engine.

## Information Architecture And Routes

Routes should separate content scope from interface language. For first launch, URL paths control content language scope. Full UI localization is deferred.

Approved route model:

```txt
/                         publication-style homepage
/writing/                 canonical all-writing archive
/en/writing/              English-only archive
/en/writing/[slug]/       English article
/zh/writing/              Chinese-only archive
/zh/writing/[slug]/       Chinese article
/projects/                image/description-driven project gallery
/about/                   author positioning page
/search/                  Pagefind-backed search page or search overlay target
```

Routing rules:

- `/writing/` is the canonical unified archive across languages.
- `/en/writing/` and `/zh/writing/` are scoped archive views.
- Article URLs are language-scoped for consistency.
- Route language means content language, not UI language.
- First-launch UI can be English, with clear Chinese labels where useful for language controls.
- Saved content-language preference may adjust archive filtering, but selected state must remain visible and reversible.
- Chinese and English writings do not need counterparts.
- `hreflang` applies only when a true translated counterpart exists.

## Writing Taxonomy

Top-level writing categories should be few, stable, translated later, and useful for navigation.

Initial categories:

- Growth, Marketing & Business.
- Culture, Art & Film.
- Misc.

Tags remain flexible discovery metadata. Categories should not sprawl into tags. Projects are not a writing category; project proof belongs under `/projects/`.

## Content Model

Writing should use Astro content collections with typed frontmatter that supports filtering, SEO, AEO, external canonicals, and optional translation relationships.

Writing frontmatter:

```yaml
title: ""
description: ""
lang: "en" # en | zh
date: "2026-06-22"
updated: "2026-06-22"
category: "Growth, Marketing & Business"
tags: []
slug: ""
translationKey: ""
canonicalUrl: ""
publishedAtExternalUrl: ""
featured: false
draft: false
```

Model rules:

- Use singular `category` to keep top-level IA controlled.
- Use `tags` for flexible discovery.
- Keep `translationKey` optional and only for true counterparts.
- Keep `canonicalUrl` for republished or external-origin pieces.
- Keep `publishedAtExternalUrl` as separate provenance metadata.
- Keep `draft` from day one even before Keystatic.

Projects should use a separate content collection or structured data file. The project model should allow uneven completeness because first-launch project content will be thin.

Project frontmatter:

```yaml
name: ""
description: ""
role: ""
status: ""
image: ""
link: ""
featured: true
order: 1
```

Initial projects:

- Valhalla.
- FriendUp.
- Klido.

## Navigation And Homepage

Navigation owns durable access. The homepage owns editorial prioritization.

Global navigation should include:

- Writing.
- Growth, Marketing & Business.
- Culture, Art & Film.
- Misc.
- Search.
- Projects.
- About.

Language controls should sit near writing and archive surfaces rather than becoming a top-level nav item.

The homepage should avoid a generic resume hero. It should feel like a publication front page with author context.

Homepage structure:

```txt
Masthead / identity line
Featured writing
Latest writing
Selected category highlights
Project proof strip
About/positioning excerpt
```

Homepage priority:

1. Latest and featured writing.
2. Category browsing.
3. Search entry.
4. Project gallery preview.
5. About/positioning.

The homepage may include an interactive editorial discovery module, but the no-JavaScript baseline must still show meaningful writing and links to archive pages.

## Archive Controls And Search

First-launch interaction should serve reading.

Writing archive controls should support:

- Language filter: All / English / Chinese.
- Category filter: All / Growth, Marketing & Business / Culture, Art & Film / Misc.
- Chronological sort by default.
- Optional featured filter or featured section.
- Search entry backed by Pagefind.

Behavior:

- `/writing/` defaults to all languages.
- `/en/writing/` defaults to English.
- `/zh/writing/` defaults to Chinese.
- If a saved content-language preference exists, `/writing/` may apply it, but the selected filter must be visible and one-click reversible.
- Scoped routes should not be silently overridden by preference.
- No automatic redirects.
- A small notice for preference conflict with scoped routes is optional for launch.

Search requirements:

- Include Pagefind from launch.
- Index writing and project pages.
- Show language and category metadata on writing search results.
- Ship global search in first launch. Language and category result labels are required; search-result filtering is deferred.

No-JavaScript baseline:

- Archive pages render useful lists statically.
- Client-side filters enhance browsing but are not required to access content.
- `/en/writing/` and `/zh/writing/` provide static scoped alternatives.

## Projects And About

`/projects/` should be a visual proof gallery, not a full case-study system at launch.

Each project entry should support:

- Image or visual placeholder.
- Name.
- One-sentence description.
- Role or contribution.
- Optional link.
- Optional status/context.

The page should avoid fake depth. If launch content is thin, the presentation should make that feel intentional through selected work, visual previews, and links where available.

`/about/` should be an author and positioning page, not a full CV. It should answer:

- Who Promise is.
- What he writes about.
- What he builds or has built.
- Where to go next: writing, projects, contact or social links.

Do not ship `/cv/` in first launch unless there is a real public CV artifact. A later `/cv/` can exist as a structured resume page or downloadable PDF path.

## SEO And AEO

SEO and AEO should be built into the content system rather than patched on after launch.

First-launch SEO requirements:

- Canonical URL helper for every page.
- Title and description metadata.
- Open Graph and Twitter metadata.
- Sitemap.
- RSS feed for writing.
- `robots.txt`.
- Language labels on writing.
- `hreflang` only for true translation counterparts.
- Article structured data for writing pages.
- Basic Person and WebSite structured data where appropriate.

AEO means semantic clarity, provenance, entity consistency, and extractable structure without flattening the writing into generic SEO sludge.

AEO requirements:

- Each major page has an explicit purpose:
  - `/writing/`: complete writing archive.
  - Language-scoped archives: language-specific writing collections.
  - Category archive links or filtered states: topic-specific writing collections.
  - Article pages: one clear essay or article.
  - `/projects/`: selected project proof.
  - `/about/`: author identity and positioning.
- Article pages expose clean semantic structure:
  - one `h1`
  - clear description or dek
  - publish date and updated date
  - language
  - category
  - tags
  - canonical URL
  - external publication URL when applicable
  - author identity
  - structured headings
- Add schema only where accurate:
  - `Person`
  - `WebSite`
  - `Blog` or `CollectionPage` for archive surfaces
  - `Article` or `BlogPosting` for writings
  - `CreativeWork` or `SoftwareApplication` only when a project page supports it
  - `BreadcrumbList`
- Use descriptive internal links:
  - article to category
  - article to related writing
  - project to related writing when relevant
  - about to writing and projects
  - writing to external canonical source where applicable

Avoid:

- Inflated claims.
- Fake expertise schema.
- Hidden keyword stuffing.
- Duplicate English and Chinese pages pretending to be translations.
- Generic AI-written summaries that weaken the actual page.
- Forced key-takeaway blocks on essays where that damages the writing.

Optional article summary blocks are allowed only when editorially useful.

## Quality Gates

First-launch quality checks:

- Astro build passes.
- TypeScript and content schema validation pass.
- RSS and sitemap generate correctly.
- No article page depends on client JavaScript for readable content.
- Language-scoped routes render correct content.
- Pagefind indexing works after build.
- Basic responsive checks pass for homepage, archive, article, projects, and about pages.

## README Alignment

The README remains the long-term project charter and source of truth for stack decisions. After this spec is approved, update the README to distinguish:

- long-term roadmap
- first public launch slice
- deferred platform features

The README should keep the Cloudflare-native comment system as a later phase, not a launch blocker.
