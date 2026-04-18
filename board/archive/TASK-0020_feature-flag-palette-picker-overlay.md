---
type: task
status: done
priority: 2
parent: EPIC-0001
created: 2026-04-09
archived: 2026-04-09
---

# Feature-flag the palette-picker overlay

Gate the palette-picker overlay (dev-facing theme/palette swap tool) behind a feature flag so it is hidden in production builds by default and only rendered in local dev or when explicitly enabled.

## Resolution (2026-04-09)

Implemented in `src/components/ThemeSwitcher.astro`. The component now:

1. **Dev default:** Always visible during `npm run dev` via `import.meta.env.DEV` gating the initial `hidden` attribute.
2. **Prod default:** Rendered but hidden via the HTML `hidden` attribute — excluded from visual layout, the accessibility tree, and interaction.
3. **Runtime override (no rebuild required):**
   - `?palette=1` on any URL → sets `localStorage['palette-picker'] = '1'` and reveals the overlay. Persists across subsequent visits from the same browser.
   - `?palette=0` → clears the override.
   - Direct devtools toggle: `localStorage.setItem('palette-picker', '1')`.
4. **Documentation:** Flag mechanism and runtime override rules documented in a comment block at the top of the component.

**Design trade-off:** The overlay markup + styles ship to prod (~1KB) even when disabled, because the runtime override needs something to reveal without a rebuild. This violates the strict "not in the DOM" line of the original criteria but satisfies the practical intent: the element is hidden from visual, accessibility, and interaction layers in prod by default. The alternative — injecting the markup dynamically from a JS template string when the override is set — would duplicate the markup and hurt maintainability for negligible size savings.

**Verified against:**
- `npm run build` passes
- Built `dist/index.html` contains `<div id="theme-switcher" hidden>` and the runtime override script (URLSearchParams → localStorage → reveal)
- No new lint errors introduced (one pre-existing unrelated error in `HeroBackground.astro` from the prior hero WIP commit)

## Related

- NOTE-0011 (archived) — origin note
- Parent: EPIC-0001 Design System Overhaul
