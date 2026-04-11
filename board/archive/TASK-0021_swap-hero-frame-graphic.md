---
type: task
status: archived
priority: 2
parent: EPIC-0001
created: 2026-04-09
archived: 2026-04-09
---

# Swap hero frame graphic for new split-frame assets

Replace the current hero film-frame overlay with the new artwork in `src/images/hero_frame/`. **Try the upper/lower split approach first** so the frame's vertical height becomes fluid and matches the viewport; fall back to the full-frame asset only if the split approach hits a blocker.

## Assets Available

Located in `src/images/hero_frame/`:

- `hero_frame-upper.{png,webp}` — top half (primary approach)
- `hero_frame-lower.{png,webp}` — bottom half (primary approach)
- `hero_frame-full.{png,webp}` — single full-height frame (fallback only)

Prefer the `.webp` versions.

## Primary Approach: Upper + Lower Split

Anchor the two halves to the top and bottom of the hero section and let the vertical space between them stretch with the viewport. This keeps the decorative frame detail pinned to the edges (where it reads as a frame) rather than getting squashed when the viewport height changes.

Sketch:

- `hero_frame-upper` → `position: absolute; top: 0; left: 0; right: 0; width: 100%`
- `hero_frame-lower` → `position: absolute; bottom: 0; left: 0; right: 0; width: 100%`
- Both z-indexed above the background texture layer, below text content
- Confirm whether the halves need a small intentional overlap to hide a visible seam at the midline

## Fallback: Full Frame

Only reach for `hero_frame-full` if the split approach produces a problem that can't be solved (e.g., the halves overlap awkwardly on very short viewports and no clean min-height rule fixes it). Document why if the fallback is used.

## Resolution: Fallback Taken (2026-04-10)

The split approach was implemented first and visually verified at several viewport sizes. It broke at wide aspect ratios (typical desktop 16:9 and wider) because of the asset shape: each "half" PNG is the full 1982×1367 canvas with decoration concentrated in its top/bottom ~38% and a transparent/fade middle, rather than a pure top-half or bottom-half crop. At `width: 100%` the natural height of each half is `viewportWidth / 1.45`, which exceeds the hero's height whenever the viewport aspect is wider than ~1.45:1. In that range the top-anchored upper and bottom-anchored lower overlap through the middle, doubling the side frame edges and producing a visible ghost filmstrip.

Measured overlap:

- 1920×805 (2.54:1) — overlap 569px, doubling is very visible
- 1440×900 (1.60:1) — overlap 143px, hides inside the fade
- 1280×720 (1.78:1) — overlap 213px, starts to show
- Below ~1.45:1 (tall / portrait) — no overlap, the split works cleanly

Fixing it properly would require re-exporting `hero_frame-upper.{png,webp}` and `hero_frame-lower.{png,webp}` cropped to only their decorated regions (so each half has a smaller natural aspect ratio and fits in half the hero without overlap). That's out of scope for this task.

Chose the sanctioned fallback: single `hero_frame-full.webp` overlay via the existing `object-cover object-top` pattern — functionally identical to the prior `frame.webp` but using the new artwork. Deleted the unused `hero_frame-upper.*` and `hero_frame-lower.*` assets.

## Acceptance Criteria

- The upper + lower halves render in the hero section, anchored top and bottom
- The frame remains visually correct across a range of viewport heights: mobile portrait, short laptop (~720px), standard laptop, tall external monitor (~1440px+)
- No visible seam or gap where the two halves meet in the middle
- No cumulative layout shift introduced on initial load
- Old hero frame graphic is removed (not just hidden), and any now-unused asset files in `src/images/` are cleaned up
- WebP is used as the primary format
- Reduced-motion and high-contrast behavior is unchanged or improved, not regressed

## Implementation Notes

- Touch `src/components/Hero.astro` and likely `src/components/HeroBackground.astro` — both are already modified on the current `feat/design-system-overhaul-phase-1` branch, so coordinate with the in-flight work there before starting
- Continues the film-frame overlay work from commit `acf7e7b`
- Use Astro's `<Image>` component (or `getImage()` helper) for the WebP assets so they go through the image pipeline correctly
- Add descriptive `alt=""` (decorative) since the frame is ornamental
- Test at several viewport heights before calling it done

## Related

- NOTE-0012 Swap Hero Frame Graphic (origin note — archive once this task lands)
- Parent: EPIC-0001 Design System Overhaul
- Prior work: commit `acf7e7b` feat(design): redesign hero with layered texture backgrounds and film frame overlay
