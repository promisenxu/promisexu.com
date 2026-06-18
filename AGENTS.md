# Agent Instructions

This repository is the source for `promisexu.com`.

## Read First

Before making plans or code changes, read `README.md` in the repository root. Treat it as the most important project document and the living source of truth for:

- product goals
- stack decisions
- build phases
- learning goals
- implementation order
- architectural constraints

If instructions in a task conflict with `README.md`, call out the conflict before changing direction.

## Current Project Shape

This is planned as an Astro + TypeScript + MDX portfolio and publishing system, deployed on Cloudflare with a minimal Cloudflare-native comment system using Turnstile and D1.

Do not replace this with a generic Next.js, WordPress, Webflow, or CMS-heavy architecture unless the user explicitly asks to revisit the stack decision.

## Working Rules

- Preserve asymmetric bilingual content support. English and Chinese writings do not need one-to-one counterparts.
- Keep content architecture, SEO/AEO, and maintainability ahead of visual effects.
- Add interactive effects as isolated Astro islands, not global JavaScript.
- Comments must not require GitHub login.
- Turnstile must be validated server-side.
- Keep comments moderated by default.
- Avoid committing secrets, unpublished private writing, or local-only generated artifacts.

