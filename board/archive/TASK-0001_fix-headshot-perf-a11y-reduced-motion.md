---
type: task
status: done
priority: 1
created: 2026-03-27
---

# Fix Headshot component performance, accessibility, and reduced-motion

**Source:** Audit C1, C2, H1

## What to do

1. **Performance (C1):** Only load the primary headshot (`grant-matched.jpg`) eagerly. Defer the 13 animation images — either use `loading="lazy"` or load them via JS after page load. Consider reducing from 13 to 4-5 images.

2. **Alt texts (C2):** Set primary image to `alt="Grant Keller headshot"`. Set all 13 animation overlay images to `alt=""` (they are decorative).

3. **Reduced motion (H1):** Add `@media (prefers-reduced-motion: reduce)` block that sets `animation: none` and `opacity: 0` on all `.animate-headshot-*` classes. The global CSS `animation-duration: 0.01ms` workaround causes rapid flash-through which is worse than the smooth animation.

## Files

- `src/components/Headshot.astro`
