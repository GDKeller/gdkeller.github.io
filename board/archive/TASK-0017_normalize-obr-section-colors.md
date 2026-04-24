---
type: task
status: done
priority: 3
created: 2026-03-27
completed: 2026-04-11
parent: EPIC-0001
---

# Normalize OBR section to portfolio color system

**Source:** Critique #4, NOTE-0008 §4. Absorbs TASK-0012.

`OfflineBgRemover.astro` uses `sky-400`, `blue-950`, and a different visual language from the rest of the site. Adapt to the portfolio's color system using the new custom palette.

## What to change

- Replace `sky-400` subtitle with accent color
- Replace `blue-950` backgrounds with portfolio surface/gradient vocabulary
- Match CTA button to site's accent button style
- Add corner accent pattern if consistent with other sections

## Files

- `src/components/OfflineBgRemover.astro`
