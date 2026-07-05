# Article Co-Authors Design

## Goal

Allow articles to declare multiple co-authors with optional links, display them between the article title and publication date, and include them in article structured data.

## Content Model

Writing frontmatter may include:

```yaml
coAuthors:
  - name: "Jane Doe"
    link: "https://example.com"
  - name: "李明"
```

`coAuthors` is optional and defaults to an empty array. Each name must be non-empty. Each supplied link must be a valid, non-empty URL.

## Article Rendering

Articles with co-authors render one localized line immediately after the title and before the publication date:

- English: `Co-Authored by: Jane Doe, 李明`
- Chinese: `合著者：Jane Doe、李明`

Each name is linked only when that co-author has a link. Articles without co-authors render no co-author line.

## Structured Data

Article JSON-LD uses an `author` array containing Promise Xu followed by every co-author. Each author is a `Person` with a `name`; a co-author with a link also receives a `url`.

## Scope

The change touches the writing schema, article layout, article JSON-LD helper, and the smallest runnable metadata check. Co-authors do not appear on archive cards, RSS, or unrelated pages.

## Verification

The metadata check covers linked, unlinked, and absent co-authors. `npm run check` and `npm run build` must also pass.
