---
type: task
status: done
priority: 1
created: 2026-03-27
---

# Add lazy loading to below-fold images

**Source:** Audit H3, M6

## What was done

Set `loading="lazy"` on all images below the hero fold:

- **Awards.astro:** 4 award images changed from `loading="eager"` to `lazy`
- **FishHero.astro:** All 9 images (anglerfish, water x2, fish-ball, NHMLA logo, 4 exhibit photos) — changed to `lazy`
- **LogoCarousel.astro:** Kept as `loading="eager"` — the carousel is above the fold, immediately visible after the hero

## Files

- `src/components/Awards.astro`
- `src/components/FishHero.astro`
