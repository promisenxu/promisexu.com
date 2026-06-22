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

```bash
npm run dev
npm run check
npm run build
npm run preview
```

`npm run build` runs the Astro static build and then Pagefind indexing against `dist`.
