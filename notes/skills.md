# Skills To Use Or Add

This project should stay light on skills. Use only high-ROI skills that directly improve the build.

## Already Available And Useful

### `github:github`

Use for repository inspection, issues, PRs, and GitHub coordination once the repo exists.

Why it matters:

- Useful for repo setup and future PR/review workflows.
- Keeps GitHub work structured instead of ad hoc.

### `github:yeet`

Use when publishing local changes to GitHub: commit, push, and open PRs.

Why it matters:

- Good fit once the project has a real repo and branch workflow.
- Avoids sloppy commit/push handling.

### `browser:control-in-app-browser`

Use for local visual testing after frontend changes.

Why it matters:

- Essential for checking responsive layout, interaction, and text overflow.
- Especially important because this site will have typography, bilingual content, and interactive surfaces.

### `seo-audit`

Use when auditing SEO/AEO basics after the site has real pages.

Why it matters:

- The site is explicitly intended to prove SEO/AEO competence.
- Helps catch metadata, schema, indexing, and content-structure issues.

### `schema`

Use when adding or auditing JSON-LD structured data.

Why it matters:

- Structured data will be part of the site architecture: Person, WebSite, Article, BreadcrumbList, CreativeWork, and project schemas.

### `copy-editing`

Use for editing portfolio and CV-facing copy.

Why it matters:

- The site is a positioning asset, not just a technical demo.
- Helps keep prose direct, proof-first, and non-generic.

## Worth Searching / Installing Later

Do not install these until the project reaches the relevant phase.

### Astro / Cloudflare deployment skill

Search when implementing Cloudflare deployment and Workers/D1 comments.

Search run on 2026-06-18:

- `npx skills find astro cloudflare`

High-signal results:

- `astrolicious/agent-skills@astro` - 8.5K installs
- `siviter-xyz/dot-agent@astroflare` - 83 installs
- `mindrally/skills@astro` - 525 installs

Recommendation:

- Install `astrolicious/agent-skills@astro` before the Astro implementation starts.
- Re-check `siviter-xyz/dot-agent@astroflare` before Cloudflare deployment; lower install count means it needs inspection before relying on it.
- Search again for `cloudflare workers d1` when implementing comments.

### Accessibility skill

Search before final UI polish.

Likely search terms:

```bash
npx skills find accessibility web
```

Status:

- Search attempted on 2026-06-18, but network access for additional skill searches hit the current Codex escalation/usage limit after the Astro search.

### Playwright / visual testing skill

Search before adding a formal visual regression workflow.

Likely search terms:

```bash
npx skills find playwright visual testing
```

Status:

- Search attempted on 2026-06-18, but network access for additional skill searches hit the current Codex escalation/usage limit after the Astro search.

## Not Needed Initially

- Heavy React/Next.js skills: this is not a Next.js app.
- Presentation/document skills: not relevant unless generating a portfolio PDF later.
- Broad marketing skills: useful for strategy, but not critical for the build.
- Database-heavy app skills: D1 comments are intentionally small.
