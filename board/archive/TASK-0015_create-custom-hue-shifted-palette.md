---
type: task
status: done
priority: 2
created: 2026-03-27
archived: 2026-04-11
parent: EPIC-0001
---

# Create custom hue-shifted color palette

**Source:** NOTE-0008 §4a

Stock Tailwind colors (emerald, teal, fuchsia) are instantly recognizable. Shift the hues slightly so the palette reads as custom.

## Approach

- Take the current emerald, teal, fuchsia, pink, and rose scales
- Shift each hue by a few degrees in HSL space
- Define the full shifted scales in `tailwind.config.mjs` under `theme.extend.colors` (or `theme.colors` to fully override)
- Verify the shifted palette still meets WCAG AA contrast on black backgrounds

## Current palette usage (203 references across 18 files)

- `emerald-*` — dominant (text, borders, backgrounds, glows)
- `teal-*` — secondary (gradients, accents)
- `fuchsia-*` / `pink-*` / `rose-*` — highlight (name, active states)
- `blue-950` — OBR section (will be normalized in TASK-0017)
- `purple-*` / `indigo-*` / `green-*` / `slate-*` — FishHero color grading

## Files

- `tailwind.config.mjs`
