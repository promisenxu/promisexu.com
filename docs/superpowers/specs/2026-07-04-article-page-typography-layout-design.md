# Article Page Typography and Layout

## Scope

Refine all individual article pages through the shared article layout and global prose styles.

## Design

- Remove the article shell's narrow width cap so its canvas matches the writing archive.
- Keep article prose capped at its existing readable line length.
- Align the article category with the desktop `PROMISE XU` brand by removing the article-only top offset on desktop.
- Match the article title's responsive font-size range to archive row titles.
- Add vertical margins between adjacent prose paragraphs. MDX source paragraphs remain separated by blank lines; presentation belongs in CSS.
- Add an explicit `.image-description` class for MDX authors. It centers text and uses the same font size and color as `.meta`.
- Underline links in article prose, co-author metadata, and the external-publication line without changing language-switch controls.
- Render published and updated dates as English abbreviated dates such as `Aug 9, 2023`, while preserving ISO values in `<time datetime>`.

## MDX Usage

```mdx
<p class="image-description">Image description</p>
```

## Verification

- Run Astro type/content checks and the production build.
- Inspect an article page at desktop and mobile widths.
- Confirm archive-width canvas, rail alignment, title scale, paragraph separation, image-description styling, and date output.

## Non-goals

- No automatic caption inference.
- No per-article spacing overrides.
- No change to archive layout or content schema.
