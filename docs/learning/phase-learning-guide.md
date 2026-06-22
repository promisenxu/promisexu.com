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
