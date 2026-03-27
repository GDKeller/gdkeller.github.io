---
type: task
status: done
priority: 3
created: 2026-03-27
---

# Fix logo carousel duplicate image sizing

**Source:** Audit M1, Critique minor observations

## What to do

In `LogoCarousel.astro`, primary logos use `max-h-12 md:max-h-14` but the duplicated logos (for seamless scroll) use `max-h-16 md:max-h-24`. The duplicates render visibly larger during the scroll animation.

Match the duplicate set to the primary set's sizing classes.

## Files
- `src/components/LogoCarousel.astro`
