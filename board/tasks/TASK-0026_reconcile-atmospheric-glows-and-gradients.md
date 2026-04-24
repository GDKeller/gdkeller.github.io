---
type: task
status: backlog
priority: 3
created: 2026-04-11
parent: EPIC-0001
---

# Reconcile atmospheric glows and gradients with the token system

TASK-0016 deferred every hardcoded atmospheric effect — text-shadows, drop-shadows, gradient stops in decorative elements, glow rgbas — because they're tuned to specific values that won't track cleanly with a palette shift.

This task decides what to do about them: keep them hardcoded forever, introduce a separate "atmosphere" token layer, or express them via `color-mix()` of existing tokens.

## The tension

Atmospheric effects are _intentionally specific_. A `drop-shadow-[0_0_6px_rgba(16,185,129,0.5)]` on an icon-link is 6px blur, 50% alpha, emerald-500 — each value chosen by eye for how that specific glow should look. If the accent color shifts from emerald-400 to emerald-300 to make buttons read better, should the glow follow automatically? Usually no — glows have their own visual weight and often need independent tuning. Which is why we deferred them.

But "deferred forever" means re-theming the site requires touching every glow. That's fine if re-theming is rare; painful if not.

## Options to evaluate

1. **Leave atmospheric effects hardcoded.** Accept the coupling cost at re-theme time. Simplest.
2. **Introduce an "atmosphere" token sub-layer.** Named values like `--glow-accent`, `--glow-highlight`, `--scanline-base` that map to rgbas at specific alphas. Tracks loosely with the palette but with one layer of indirection.
3. **Use `color-mix()` inline for every glow.** E.g. `drop-shadow-[0_0_6px_color-mix(in_oklch,var(--color-accent)_50%,transparent)]`. Ties glows to tokens without needing new ones — but the Tailwind syntax is painful.
4. **Hybrid.** Token-tied for glows that share values with palette colors (nav-link glow uses accent); hardcoded for glows that are tuned independently (noise/scanlines, specific rgba glows).

## Known hotspots

- Header: `drop-shadow-[0_0_6px_rgba(16,185,129,0.5)]` on icon-link hover/focus; radial gradient burst `::before` (uses `var(--color-emerald-400)` via color-mix already)
- Nav: `text-shadow: 0 0 8px color-mix(...var(--color-emerald-500)...)` on nav-link hover; `var(--color-fuchsia-500)` glow on active; radial gradient `::before`/`::after`
- Global: section-heading `::before`/`::after` gradients (emerald-600/400/200/500/700); list-custom bullet `::before`
- Hero: `hero__name::after` fuchsia-500 text-shadow glow
- HeroBackground: scanline color-mix with `--color-black`; noise SVG filter
- FishHero: monster-text-shadow rgbas, fish drop-shadows
- SkillsCard: shadow-emerald-400 box-shadow rgbas, gradient span
- Job/Project cards: `::before`/`::after` gradient lines, radial image halos
- Footer: `shadow-emerald-400/25` box-shadow, `hover:shadow-emerald-400/40`

## Decision output

- Either a written-down convention in CLAUDE.md clarifying how to express atmospheric effects going forward, or
- A new category of tokens in `global.css` with usage examples.

Whichever option is chosen, update TASK-0016 notes and CLAUDE.md to reflect the final convention.
