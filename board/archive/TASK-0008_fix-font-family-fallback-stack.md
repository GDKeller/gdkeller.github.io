---
type: task
status: done
priority: 2
created: 2026-03-27
---

# Fix font-family fallback stack

**Source:** Audit M4, Critique minor observations

## What to do

In `Layout.astro:92`, `html { font-family: system-ui, sans-serif }` is the base font. But `<main>` uses `font-prompt` (Tailwind class). If Google Fonts fails to load, the page falls back to system-ui with no Prompt in the chain.

Change to: `html { font-family: 'Prompt', system-ui, sans-serif }` so Prompt is the primary with system-ui as fallback.

## Files

- `src/layouts/Layout.astro`
