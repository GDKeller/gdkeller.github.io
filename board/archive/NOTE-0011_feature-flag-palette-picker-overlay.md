---
type: note
status: processed
created: 2026-04-09
archived: 2026-04-09
processed_into: TASK-0020
---

# Feature-Flag the Palette-Picker Overlay

> **Processed:** Converted into TASK-0020 under EPIC-0001 on 2026-04-09. Archived.

## Idea

Put the palette-picker overlay (the dev/design tool for swapping color themes live on the site) behind a feature flag so it can be toggled on/off without code changes and kept out of production-facing builds by default.

## Why

- It's a development/exploration aid, not a visitor-facing feature — hiring managers shouldn't see it on the live site
- We still want it available in local dev and potentially on a preview/staging build while the design system is in flux
- A flag lets us enable it ad hoc (e.g., when showing someone the palette experiment) without reverting code
- Avoids the temptation to delete and re-add it as the palette work continues

## Implementation Sketch

- Gate rendering on a flag: env var (`PUBLIC_SHOW_PALETTE_PICKER`), URL query param (`?palette=1`), or localStorage toggle — pick whichever matches how the site already handles dev affordances
- Default: **off** in production builds, **on** in `npm run dev`
- Make sure the flag check happens at render time so the overlay and its associated JS/CSS can be tree-shaken or at least not mounted in prod
