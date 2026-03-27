---
type: task
status: backlog
priority: 3
created: 2026-03-27
---

# Add museum-wall framing to anglerfish exhibit images

**Source:** NOTE-0008 §2

The exhibit photos in FishHero.astro currently float with no visual container. They should feel like they're mounted on a museum wall — formal, deliberate placement.

## Treatment
Wrap each image in a container with:
- Black background
- Generous padding (thick matte frame effect)
- Subtle border or shadow for depth
- Clean, formal gallery presentation

## Affected images
- `anglerfishDisplayClose` (~line 94)
- `anglerfishDisplayFront` (~line 148)
- `anglerfishDisplayFull` and `anglerfishSpecimen` (~lines 157-161)

## Files
- `src/components/FishHero.astro`
