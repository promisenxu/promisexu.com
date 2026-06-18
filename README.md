# promisexu.com

Personal portfolio, writing system, and lightweight Cloudflare-backed publishing product for Promise Xu.

## Goal

Build `promisexu.com` as a serious content and proof system:

- Bilingual/asymmetric writing in English and Chinese.
- Tagged writings, published works, MulanIFF writing archive, project case studies, and CV.
- SEO/AEO-friendly static pages with structured metadata.
- A minimal Cloudflare-native anonymous comment system.
- Selective interactive/visual components that show frontend skill without slowing down the writing experience.

## Stack Decision

- Framework: Astro
- Language: TypeScript
- Content: MDX + Astro content collections
- Editing: direct MDX first, Keystatic after schema stabilizes
- Hosting: Cloudflare Pages or Cloudflare Workers static assets
- Comments API: Cloudflare Worker / Pages Function
- Comment storage: Cloudflare D1
- Spam protection: Cloudflare Turnstile
- Search: Pagefind
- Styling: Tailwind CSS or CSS Modules, to be decided during implementation

## Initial Content Sources

- CV and positioning material from `/Users/promisexu/career-ops`
- Previous writings for Mulan International Film Festival
- Published works
- First project case study: Valhalla

## Working Principles

- Content architecture first, visual effects second.
- Static HTML by default; hydrate JavaScript only where it proves something.
- English and Chinese posts do not need one-to-one counterparts.
- Use canonical URLs and `hreflang` only when they are true.
- Comments are moderated by default.
- Turnstile must be validated server-side, never client-side only.
- Keep the site maintainable enough that Promise can understand and professionally discuss the stack.

## Build Phases

### Phase 1 - Astro Foundation

Deliverables:

- Astro project skeleton.
- Core routes: `/`, `/writing/`, `/zh/writing/`, `/projects/`, `/cv/`, `/about/`.
- Shared layout, navigation, typography, metadata helpers.
- Sitemap, RSS, robots, canonical domain configuration for `promisexu.com`.

Learning goals:

- Astro routing.
- Static generation vs server rendering.
- Why static HTML helps SEO/AEO.
- How canonical URLs, `hreflang`, sitemap, RSS, and Open Graph metadata fit together.

Problems to watch for:

- Pages that depend on client JavaScript before content is readable.
- Missing canonical URLs.
- Chinese and English pages treated as duplicates.
- Pretty pages with weak metadata.

### Phase 2 - Content Model

Deliverables:

- `writings`, `projects`, and `cv` content collections.
- Typed frontmatter schema.
- Support for asymmetric bilingual content.
- Translation linking through `translationKey`, without requiring a counterpart.

Suggested writing frontmatter:

```yaml
title: ""
description: ""
lang: "en"
date: "2026-06-18"
updated: "2026-06-18"
categories: []
tags: []
translationKey: ""
canonicalUrl: ""
publishedAtExternalUrl: ""
comments: true
featured: false
```

Learning goals:

- How MDX becomes typed content.
- How content metadata becomes product infrastructure.
- Difference between `lang`, `translationKey`, `canonicalUrl`, and `publishedAtExternalUrl`.
- How categories and tags support discovery.

Problems to watch for:

- Forcing every post to have a translation.
- Uncontrolled tag sprawl.
- Duplicate SEO problems from republished external work.
- Frontmatter growing without schema validation.

### Phase 3 - Import Real Content

Deliverables:

- CV page from career-ops source material.
- First Valhalla project case study.
- 3-5 initial writings from MulanIFF / published work / existing essays.
- Proper canonical handling for externally published pieces.

Learning goals:

- Content provenance.
- Canonical source handling.
- Excerpt vs full republication.
- Difference between a project link and a real case study.

Problems to watch for:

- Copying full published works without canonical attribution.
- Project pages becoming link dumps.
- CV page reading like an unedited resume instead of positioning.

### Phase 4 - Editing Workflow

Deliverables:

- Direct MDX editing workflow documented.
- Keystatic added only after content schema is stable.
- Draft and published states.
- Preview/deploy workflow.

Learning goals:

- Git-backed CMS concepts.
- Content-as-files vs database CMS content.
- Draft, preview, and publish workflow.
- How to recover from a bad content edit.

Problems to watch for:

- CMS schema diverging from Astro collection schema.
- Content edits requiring layout code changes.
- No draft/preview path.
- Images missing alt text or stable dimensions.

### Phase 5 - Visual And Interactive Layer

Deliverables:

- Selective interactive components using Astro islands.
- Possible `/lab/` section for typography, animation, browser-language demos, and small experiments.
- Motion accessibility support.

Learning goals:

- Astro island hydration.
- `client:load` vs `client:idle` vs `client:visible`.
- How animations affect Core Web Vitals.
- How to show skill without bloating every page.

Problems to watch for:

- Large JavaScript bundles on writing pages.
- Effects blocking readability.
- Animations ignoring reduced-motion settings.
- Homepage polish outrunning content quality.

### Phase 6 - Cloudflare Deployment

Deliverables:

- Cloudflare project.
- `promisexu.com` domain configuration.
- Preview and production deployments.
- Environment variables.
- Search Console and analytics setup.

Learning goals:

- DNS records.
- Static assets vs serverless functions.
- Build output.
- Environment variables and secrets.
- Preview vs production deployment.

Problems to watch for:

- `www` and apex domain splitting SEO signals.
- Secrets committed to Git.
- Preview and production configs mixed.
- Broken redirects after slug changes.

### Phase 7 - Minimal Cloudflare-Native Comments

Deliverables:

- Comment form.
- Turnstile widget.
- `/api/comments` endpoint.
- Server-side Turnstile validation.
- D1 schema and migrations.
- Moderated comment flow.

Architecture:

```txt
Astro comment form
  -> Turnstile token
  -> POST /api/comments
  -> Worker validates Turnstile
  -> D1 stores pending comment
  -> moderation
  -> approved comments render on page
```

Initial tables:

```sql
comments
comment_moderation_events
comment_rate_limits
```

Learning goals:

- HTTP form submission.
- Server-side Turnstile validation.
- Cloudflare D1 basics.
- SQL schema design.
- Moderation workflow.
- Rate limiting for anonymous systems.

Problems to watch for:

- Turnstile validated only client-side.
- Comments publishing immediately.
- Raw HTML accepted in comments.
- Contact details displayed publicly.
- No rate limiting.
- No delete/moderation path.

### Phase 8 - Admin And Moderation

Deliverables:

- Simple protected moderation workflow.
- Approve/reject/delete actions.
- Email or notification path for new comments.
- Audit trail.

Learning goals:

- Authentication boundary.
- Admin-only routes.
- Audit trails.
- Operational maintenance.

Problems to watch for:

- Admin UI exposed publicly.
- Moderation actions implemented as unsafe GET requests.
- No moderation history.
- No backup/export path.

### Phase 9 - Search And Recommendations

Deliverables:

- Pagefind search.
- Related-writing component.
- Language-aware recommendation logic.

Recommendation signals:

- Same language first.
- Shared tags/categories.
- Same translation group excluded.
- Recency.
- Featured/manual priority.
- Fallback by browser language only when useful.

Learning goals:

- Static indexing.
- Ranking heuristics.
- Content discovery UX.
- Difference between recommendation and user tracking.

Problems to watch for:

- Recommendations requiring personal tracking.
- Chinese search quality ignored.
- Recommendations reduced to latest posts.
- Tags too broad to support discovery.

### Phase 10 - Quality Gates

Deliverables:

- TypeScript checks.
- Astro build.
- Content schema validation.
- Broken-link checks.
- Sitemap inspection.
- Lighthouse pass.
- Structured data validation.
- Comment API tests.
- Turnstile failure tests.
- D1 migration tests.

Learning goals:

- CI basics.
- Build-time validation.
- Smoke tests.
- Migration discipline.

Problems to watch for:

- "Works locally" but deploy fails.
- Schema errors discovered after publishing.
- Comment database changes made manually and undocumented.
- SEO metadata manually duplicated per page.

## What Promise Should Be Able To Explain

By the end, Promise should be able to explain:

- Why Astro is static-first.
- How MDX content becomes pages.
- How bilingual routing works without forcing translations.
- How SEO metadata is generated.
- How Cloudflare serves static assets.
- How Workers handle API routes.
- How Turnstile is validated.
- How D1 stores comments.
- How moderation prevents spam.
- How interactive islands avoid bloating the whole site.
- How to add a new writing, project, tag, or page.
- How to debug a failed deploy.

## First Implementation Order

1. Astro skeleton.
2. Content schema.
3. Import CV, Valhalla, and 3 writings.
4. SEO/AEO metadata.
5. Deploy to Cloudflare.
6. Add search.
7. Add Turnstile-protected comments.
8. Add Keystatic.
9. Add visual/interactive polish.
10. Add admin moderation.

