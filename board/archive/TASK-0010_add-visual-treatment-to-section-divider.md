---
type: task
status: done
resolution: wontfix
priority: 3
created: 2026-03-27
---

# Add visual treatment to SectionDivider

**Source:** Audit M2, Critique #1

## What to do

`SectionDivider.astro` renders an empty div with only padding — no visible content. Sections bleed together, especially Skills → Experience → Projects which all use the same emerald card patterns.

Add a subtle horizontal emerald scanline gradient matching the `.section-heading` pseudo-elements already used throughout the site. A single blurred emerald line using the existing gradient vocabulary (`from-emerald-400/20 via-teal-500/15 to-transparent` with `filter: blur(20px)`) would create visual punctuation without introducing new design elements.

## Files

- `src/components/SectionDivider.astro`
