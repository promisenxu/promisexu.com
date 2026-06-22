# Routing And Language

## Route Contract

```txt
/                         publication-style homepage
/writing/                 canonical all-writing archive
/writing/category/[category]/ static category archive for approved category slugs
/en/writing/              English-only archive
/en/writing/[slug]/       English article
/zh/writing/              Chinese-only archive
/zh/writing/[slug]/       Chinese article
/projects/                project gallery
/about/                   author positioning page
/search/                  Pagefind search
```

Generated utility routes:

```txt
/rss.xml                  writing RSS feed
/robots.txt               crawler rules and sitemap pointer
/sitemap-index.xml        generated sitemap index
/sitemap-0.xml            generated sitemap entries
```

## Rules

- `/writing/` is the canonical archive across languages.
- `/writing/category/[category]/` is the no-JS category archive surface for approved writing categories.
- `/en/writing/` and `/zh/writing/` are language-scoped archive views.
- Article URLs are language-scoped.
- Route language means content language.
- UI localization is deferred.
- Chinese and English writings do not need counterparts.
- `hreflang` applies only when a true translation counterpart exists.
- Saved content-language preference can enhance `/writing/`, but scoped routes should not be silently overridden.
