---
type: task
status: backlog
priority: 2
created: 2026-05-02
---

# Fix the featured NYP section

[Nypost.astro](src/components/Nypost.astro) is the hand-built "featured" callout for the New York Post role. It has accumulated layout fragility and Tailwind-convention violations and needs a cleanup pass.

## Known issues

- **Arbitrary values everywhere.** `lg:h-[calc(60vw*896/1026)]`, `leading-[0.6em]`, `-tracking-[0.125em]`, `max-w-92`, `w-[40vw]`, `lg:max-w-1/2`. Per project convention, stick to Tailwind system values; the big-number stats in particular should use type-scale tokens, not arbitrary leading/tracking.
- **Absolutely-positioned spread image** (`browser` div) overflows the column with `translate-x-4` and `-z-1`. Layered against the content box it stacks unpredictably across breakpoints; the spread sometimes sits awkwardly behind the stats on mid-range widths.
- **Big-number markup is fragile.** The "391 million" / "65 million" stats split digits across `<span>`s with manual negative tracking and `sr-only` non-breaking spaces. Read it once and decide whether the visual effect justifies the markup, or whether a simpler approach (variable font, font-feature-settings, or a single span with letter-spacing) lands the same look.
- **Heading is `sr-only`.** Worth deciding whether the NYP logo alone carries the section identity or whether a visible heading should anchor it (the rest of the page uses `HeadingSection` for this).
- **Inline `<style>` block** with hardcoded rgba shadow on `.content-box` and `.browser` predates the atmospheric-effects convention. Either keep as intentional atmosphere (consistent with other cards) or migrate.
- **Responsive seams.** The `lg:flex-row` switch flips the whole layout; review behavior at the boundary (around 1024px) and below `sm` where the stats stack.

## Acceptance

- No arbitrary Tailwind values where a system value or token works.
- Stats render cleanly without manual tracking hacks, or the hacks are documented as intentional and visually verified across breakpoints.
- Spread image positioning is stable from 320px through 1920px; no overlap that obscures copy.
- Visual parity (or improvement) with the current treatment, screenshotted and confirmed via Chrome DevTools MCP per project convention.

## Files

- [src/components/Nypost.astro](src/components/Nypost.astro)
