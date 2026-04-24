---
type: task
status: done
priority: 2
created: 2026-04-11
completed: 2026-04-11
---

# Fix NY Post section vertical scroll caused by spread image

The recently-restructured NY Post featured-work section is overflowing vertically because of the `NypSpread` image layout. The spread is positioned absolutely and scaled/translated in a way that pushes content outside the expected section bounds, introducing a vertical scroll where there shouldn't be one.

## Context

- Component: `src/components/Nypost.astro`
- Likely culprits: the absolutely-positioned `.nyp.browser` wrapper using `absolute top-0 right-0 -z-1 w-[60vw] translate-x-4 overflow-visible`
- The parent `.relative.isolate` container may not be constraining the image's bounding box
- Section wrapper uses `overflow-x-hidden` but not `overflow-y-hidden`

## Acceptance

- No vertical scroll introduced by the NY Post section
- Spread image still reads as a full-bleed visual anchor on the right
- Works across the responsive breakpoints already defined in the component
