# Design References

## Visual Direction

The site should feel clean, structured, and editorial. It should not use a heavy global background, strong global color wash, or theme treatment that forces every article/page to feel the same. Individual articles and sections should have room to carry their own tone through content, imagery, and local layout choices.

The current shell direction is a restrained sans-editorial system: sticky left rail on desktop, compact hamburger navigation on mobile, real search in navigation, and quiet row-based browsing surfaces.

## Reference Priority

1. Self Esteem: primary visual reference for a magazine-style editorial publication.
2. Fyrre: secondary reference for magazine/blog hierarchy and polished editorial surfaces.
3. Lipi: inspect before implementation; use only if its structure supports the approved IA.
4. Tone: technical reference for MDX, Pagefind, RSS, sitemap, JSON-LD, and token-based CSS.
5. Astro Sidey: inspect before implementation; use only for specific layout ideas if relevant.

## Borrow

- Editorial masthead clarity.
- Sticky left-rail discipline without app-sidebar heaviness.
- Mobile navigation that remains compact while preserving search access.
- Strong writing-first homepage hierarchy.
- Dense but readable archive treatment.
- Long-form typography rhythm.
- Clean project/work preview cards.
- Minimal JavaScript.
- Token-based spacing, typography, borders, and neutral colors.

## Reject

- Full-template adoption before auditing structure.
- Portfolio-first homepage patterns.
- Generic oversized personal hero.
- Luxury-brand spacing that delays browsing.
- Category links in the persistent global nav.
- Decorative global backgrounds.
- Strong global color themes that limit page-level tone.
- Visual gimmicks that weaken reading.
- IA that conflicts with `/writing/`, `/en/writing/`, and `/zh/writing/`.

## Implementation Rule

Use these themes as references, not as the application architecture. Build the approved content model and routes directly. Copy no large template surface unless the implementation worker first records why the copied pattern matches the approved spec.
