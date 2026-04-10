---
type: task
status: backlog
priority: 2
parent: EPIC-0001
created: 2026-04-09
---

# Feature-flag the palette-picker overlay

Gate the palette-picker overlay (dev-facing theme/palette swap tool) behind a feature flag so it is hidden in production builds by default and only rendered in local dev or when explicitly enabled.

## Why

The palette picker is a development aid for the ongoing design system overhaul, not a visitor-facing feature. Hiring managers and clients visiting the live site should not see it, but it should remain easy to turn on when iterating on the palette or demoing the experiment to someone. A flag also avoids deleting and re-adding the component as the work continues.

## Acceptance Criteria

- Palette picker overlay does not render in production builds by default
- Palette picker renders automatically during `npm run dev`
- An explicit override exists to enable it in production (env var, URL query param, or localStorage toggle — pick whichever matches existing patterns in the codebase)
- When disabled, the overlay's component code and styles are not mounted (ideally tree-shaken, at minimum not in the DOM)
- Toggling the flag requires no code changes

## Implementation Notes

- Check existing conventions for dev-only affordances in the repo before choosing a flag mechanism
- Astro's `import.meta.env.DEV` is the simplest build-time gate for the dev/prod split
- Add a secondary runtime toggle (e.g., `?palette=1` query param or localStorage key) so the overlay can be shown on a deployed preview without rebuilding
- Document the override mechanism briefly in a comment at the flag check site

## Related

- NOTE-0011 Feature-Flag the Palette-Picker Overlay (origin note — can be archived once this task lands)
- Parent: EPIC-0001 Design System Overhaul
