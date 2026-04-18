---
type: task
status: done
resolution: superseded
priority: 3
created: 2026-03-27
---

# Redesign contact modal to reduce AI-slop appearance

**Source:** Critique #3

## What to do

The contact modal (in `index.astro`) has four identical cards with rounded icon circles, identical borders, and identical hover states — textbook AI-generated pattern. This is the last thing a hiring manager interacts with; it should feel crafted.

Suggested approach:
- Break the grid symmetry — make email the primary action (larger, different treatment)
- Stack LinkedIn/GitHub as secondary with less visual weight
- Resume could be a simple text link instead of a card
- Add scanline or noise texture to the modal background to match the hero's atmosphere
- Consider the emerald corner-accent pattern used in Talks cards

## Files
- `src/pages/index.astro` (modal at lines 109-261)
