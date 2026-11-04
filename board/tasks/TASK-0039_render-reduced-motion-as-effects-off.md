---
type: task
status: backlog
priority: 1
created: 2026-11-04
---

# Render reduced motion as Effects: Off (fix showAllElementsImmediately override bug)

## Problem

When `prefers-reduced-motion` is on (e.g. Windows Settings > Accessibility > Visual effects > Animation effects OFF), the site renders incorrectly. The reduced-motion fallback `showAllElementsImmediately()` (`src/lib/animations/utils.ts:22`, called from `initAllAnimations` in `src/lib/animations/index.ts:20`; minified as `g()` in the Layout bundle) runs:

```js
document.querySelectorAll(".hero__name, .hero__text p, .hero__text li, h2, .skill-item, .project-card, .entry-frame, .stat, .browser, .sticky, .fish-hero__image, img, p, footer, .relative.z-0.pt-64").forEach(e => { e.style.opacity = "1"; e.style.transform = "none" })
```

The blanket `img` / `p` / `.sticky` selectors put inline `opacity: 1` on elements that rely on Tailwind opacity classes, overriding them:

- Hero texture `img.opacity-15` (mix-blend layer): washes out hero background
- Hero texture `img.opacity-10 w-[150vw]`: washes out hero background
- `p.text-fainter.opacity-30` (coordinate text)
- Topbar "STX \x02 0x47 0x4B" ghost text `p.opacity-20`: renders at full strength

Also, simple mode (Effects toggle) and reduced motion are separate systems, so reduced-motion users get a broken half state instead of the clean simple-mode render.

## Fix

1. Remove `showAllElementsImmediately()` and the `prefersReducedMotion()` branch in `initAllAnimations`. Gate GSAP reveals (`initSectionHeadingAnimations`, `initJobAnimations`, `initFooterAnimations`; minified `v`, `A`, `P`) on the simple-mode flag instead of a separate `matchMedia` check. With reduced motion, nothing is hidden by GSAP, so nothing needs restoring.
2. Make localStorage `portfolio:simple-mode` tri-state: `"on"` | `"off"` | unset. Unset follows `prefers-reduced-motion`.
   - Head inline script (`is:inline`, before paint): set `html[data-simple-mode="on"]` if stored `=== "on"`, or stored `!== "off"` and reduced motion matches.
   - Toggle script: on click, apply the new state; if it matches the OS default, `removeItem`, otherwise store `"on"` / `"off"`. Listen to `matchMedia` change and `storage` events, re-resolve.
   - Keep `aria-pressed` and tooltip `data-state` in sync.
3. Pause CSS animations in simple mode (logo marquee, any other keyframe motion) via `html[data-simple-mode="on"]` rules alongside the existing noise/scanline/glow rules.
4. If any reveal targets are hidden in CSS before JS runs, gate that initial hidden state behind `@media (prefers-reduced-motion: no-preference)` and not simple mode.

## Acceptance criteria

- With reduced motion ON and no stored pref: page renders identically to Effects: Off (no noise/scanlines/glow, Prompt fonts, no marquee motion, no GSAP reveals), and toggle shows `aria-pressed="true"`.
- With reduced motion ON, user can toggle effects back on, and the choice persists across reloads.
- With reduced motion OFF: no change from current behavior.
- No element gets inline opacity/transform from a reduced-motion fallback.
- Hero textures stay at 0.15 / 0.10 and STX ghost text at 0.2 in every mode where effects are on.

## Test

- Chrome DevTools > Cmd+Shift+P > "Rendering" > Emulate `prefers-reduced-motion: reduce`, reload, compare against Effects: Off with emulation cleared.
- Verify on Zen5 by toggling Windows Animation effects (restart browser after changing).
