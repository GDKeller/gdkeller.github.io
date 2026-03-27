---
type: task
status: done
priority: 1
created: 2026-03-27
---

# Fix OBR video reduced-motion selector

**Source:** Audit H4

## What was done

The `<script>` at the bottom of `OfflineBgRemover.astro` targeted `.video-frame video` — a CSS class that didn't exist. The reduced-motion pause never fired.

Fixed by adding `data-obr-video` attribute to the `<video>` element and selecting with `document.querySelector("video[data-obr-video]")`. Scoped and stable.

## Files
- `src/components/OfflineBgRemover.astro`
