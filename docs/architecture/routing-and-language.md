# Routing And Language

## Route Contract

```txt
/                         publication-style homepage
/en/                     English-only homepage
/zh/                     Chinese-only homepage
/writing/                 canonical all-writing archive
/writing/category/[category]/ static category archive for approved category slugs
/en/writing/              English-only archive
/en/writing/[slug]/       English article
/zh/writing/              Chinese-only archive
/zh/writing/[slug]/       Chinese article
/projects/                project gallery
/en/projects/             English-only project gallery
/zh/projects/             Chinese-only project gallery
/projects/[slug]/         internal project detail page
/about/                   author positioning page
/en/about/                English-only about page
/zh/about/                Chinese-only about page
/search/                  Pagefind search results and no-JS fallback
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
- Homepage, projects, and about language controls have static scoped routes and work without JavaScript.
- UI localization is deferred.
- The homepage `View / All / EN / 中文` control is a content-view preference, not a UI language switch.
- Desktop writing archive language controls live in the rail; mobile language controls remain visible above archive content.
- Category controls live in archive page content, not the global rail.
- Global search submits to `/search/?q=<query>`, and `/search/` consumes that query through Pagefind.
- Chinese and English writings do not need counterparts.
- `hreflang` applies only when a true translation counterpart exists.
- Saved content-language preference can enhance homepage browsing, but explicit scoped routes should not be silently overridden.
