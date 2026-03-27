---
type: task
status: backlog
priority: 3
created: 2026-03-27
parent: EPIC-0001
blocked_by: TASK-0013, TASK-0014
---

# Redesign contact modal

**Source:** Critique #3, NOTE-0008. Absorbs TASK-0011.

The contact modal has four identical cards — textbook AI-generated pattern. Redesign after DaisyUI removal and border radius elimination are complete.

## Approach
- Break the grid symmetry — make email the primary action (larger, different treatment)
- Stack LinkedIn/GitHub as secondary with less visual weight
- Resume as a simple text link, not a card
- Add atmospheric texture (scanline, noise) to match the hero
- Use new semantic tokens for colors
- No border radius (per TASK-0013)
- No DaisyUI classes (per TASK-0014)

## Files
- `src/pages/index.astro` (modal section)
