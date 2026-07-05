# Article Co-Authors Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add optional linked co-authors to article content, article headers, and Article JSON-LD.

**Architecture:** Extend the existing Astro writing collection schema and pass that data directly through the existing article layout to the existing JSON-LD helper. Reuse the built-site metadata check for one end-to-end regression check; add no component or dependency.

**Tech Stack:** Astro 5, TypeScript, Zod, Node.js assertions

---

### Task 1: Add an end-to-end co-author fixture and failing metadata checks

**Files:**
- Modify: `src/content/writings/en/hello-publication.mdx`
- Modify: `scripts/check-detail-metadata.mjs`

- [ ] **Step 1: Add representative frontmatter**

```yaml
coAuthors:
  - name: "Linked Co-Author"
    link: "https://example.com/co-author"
  - name: "Unlinked Co-Author"
```

- [ ] **Step 2: Assert the visible metadata and JSON-LD**

Find the built `/en/writing/hello-publication/` page and assert that the co-author line occurs between its `<h1>` and publication metadata, the first name is linked, the second is plain text, and parsed Article JSON-LD contains Promise Xu plus both co-authors with the expected optional URL. Also assert that `/en/writing/growth-note/` has no co-author line.

- [ ] **Step 3: Run the check and verify RED**

Run:

```bash
npm run build && npm run check:metadata
```

Expected: the Astro build fails because `coAuthors` is not yet in the writing schema, or the new metadata assertion fails because rendering is absent.

### Task 2: Implement the smallest schema, rendering, and JSON-LD changes

**Files:**
- Modify: `src/content/config.ts`
- Modify: `src/layouts/ArticleLayout.astro`
- Modify: `src/lib/seo.ts`

- [ ] **Step 1: Extend the writing schema**

Add:

```ts
coAuthors: z.array(z.object({
  name: z.string().trim().min(1),
  link: z.string().trim().url().optional()
})).default([]),
```

- [ ] **Step 2: Render localized co-author metadata**

Immediately after the article `<h1>`, render a paragraph only when `entry.data.coAuthors.length > 0`. Use `Co-Authored by: ` with comma separators for English and `合著者：` with `、` separators for Chinese. Render an `<a>` only when `coAuthor.link` exists.

- [ ] **Step 3: Extend Article JSON-LD**

Add `coAuthors` to `articleJsonLd` input:

```ts
coAuthors?: Array<{ name: string; link?: string }>;
```

Return `author` as an array beginning with Promise Xu, followed by co-author `Person` objects. Include `url` only for linked co-authors. Pass `entry.data.coAuthors` from `ArticleLayout.astro`.

- [ ] **Step 4: Verify GREEN**

Run:

```bash
npm run check
npm run build
npm run check:metadata
```

Expected: all commands pass with no errors.

- [ ] **Step 5: Review the diff**

Run:

```bash
git diff --check
git diff -- src/content/config.ts src/layouts/ArticleLayout.astro src/lib/seo.ts src/content/writings/en/hello-publication.mdx scripts/check-detail-metadata.mjs
```

Expected: no whitespace errors and only the requested schema, rendering, structured-data, fixture, and regression-check changes.
