---
type: task
status: backlog
priority: 1
created: 2026-03-27
---

# Fix OBR video reduced-motion selector

**Source:** Audit H4

## What to do

The `<script>` at the bottom of `OfflineBgRemover.astro` targets `.video-frame video` — a CSS class that doesn't exist in the component. The reduced-motion pause never fires.

Fix the selector to match the actual DOM structure, or replace with a simpler approach like querying the video element directly.

## Files
- `src/components/OfflineBgRemover.astro`
