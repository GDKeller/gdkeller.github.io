---
type: task
status: backlog
priority: 1
created: 2026-03-27
---

# Add lazy loading to below-fold images

**Source:** Audit H3, M6

## What to do

Set `loading="lazy"` on all images below the hero fold:

- **Awards.astro:** 4 award images currently set to `loading="eager"` — change to `lazy`
- **FishHero.astro:** 6 large images (anglerfish, water, fish-ball, NHMLA logo, exhibit photos) — all loaded eagerly
- **LogoCarousel.astro:** 38 logos (19 primary + 19 duplicates) all `loading="eager"` — at minimum, lazy-load the duplicates

Only the hero headshot and hero background need eager loading.

## Files
- `src/components/Awards.astro`
- `src/components/FishHero.astro`
- `src/components/LogoCarousel.astro`
