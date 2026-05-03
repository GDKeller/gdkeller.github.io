---
type: note
status: processed
created: 2026-04-09
archived: 2026-04-09
processed_into: TASK-0021
---

# Swap Hero Frame Graphic for New Split-Frame Assets

> **Processed:** Converted into TASK-0021 under EPIC-0001 on 2026-04-09. Upper/lower split is the primary approach; full-frame asset is fallback only. Archived.

## Summary

Replace the existing hero frame graphic (film-frame overlay in the hero section) with the new assets living in `src/images/hero_frame/`. The new art is provided in three variants:

- `hero_frame-full.{png,webp}` — single full-height frame
- `hero_frame-upper.{png,webp}` — top half only
- `hero_frame-lower.{png,webp}` — bottom half only

## The Interesting Choice

The upper + lower pair exists so that the frame can be **vertically fluid** — pin the upper piece to the top of the hero, pin the lower piece to the bottom, and let the middle stretch to match the viewport height. This avoids the fixed aspect-ratio problem the single full-frame asset would have at tall/short viewport sizes, and keeps the ornamentation anchored to the edges where it reads as a frame rather than getting squashed or cropped in the middle.

The `full` version is still useful as a fallback — e.g., for very short viewports where splitting would cause the halves to overlap, or as a simpler static treatment if the fluid approach causes trouble.

## Implementation Notes

- Lives in the hero area — touch `src/components/Hero.astro` (and possibly `src/components/HeroBackground.astro`, which is already modified on this branch)
- Prefer the `.webp` versions; keep `.png` only if a fallback is genuinely needed
- Use the upper/lower split as the default; keep `full` as a fallback for edge cases (very short viewports, print, reduced-motion?)
- Anchoring: `position: absolute; top: 0` for upper, `bottom: 0` for lower, both full-width, z-indexed above the background texture but below the text content
- Watch for: cumulative layout shift on load, interaction with the existing film-frame overlay work from commit `acf7e7b`, and whether the halves need to overlap slightly in the middle to hide a seam
- Test at several viewport heights (short laptop, tall external monitor, mobile portrait) to confirm the fluid behavior reads correctly

## Related

- Recent commit `acf7e7b` feat(design): redesign hero with layered texture backgrounds and film frame overlay — this task continues that work with the updated art
- Current working-tree changes already touch `Hero.astro` and `HeroBackground.astro`, so coordinate with whatever's in flight there before starting
