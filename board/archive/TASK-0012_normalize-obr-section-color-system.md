---
type: task
status: done
resolution: superseded
priority: 3
created: 2026-03-27
---

# Normalize OBR section to portfolio color system

**Source:** Critique #4

## What to do

`OfflineBgRemover.astro` uses `sky-400`, `blue-950`, and a completely different visual language from the rest of the site — no corner accents, no emerald, solid blue backgrounds. The blue CTA button is the only blue button on the entire page. It feels like a foreign component pasted from a different site.

Adapt to the portfolio's emerald color system:
- Replace `sky-400` with emerald accent
- Replace `blue-950` backgrounds with the emerald/teal gradient vocabulary
- Use the corner accent pattern from Talks cards
- Match the CTA button to the site's emerald button style (see Footer.astro CTA)

The content itself is strong — a Tauri v2 app with CoreML deserves to look like it belongs.

## Files
- `src/components/OfflineBgRemover.astro`
