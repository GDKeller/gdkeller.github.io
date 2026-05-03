---
type: note
status: inbox
created: 2026-04-18
---

# /styles reference page improvements

Candidate improvements for [src/pages/styles.astro](../../src/pages/styles.astro), captured after a first pass that got all 15 color tokens, 13 text sizes, and 4 spacing tokens rendering. Ranked by payoff.

## Higher-value (usefulness)

- **Pair hover tokens with their base.** Show `emphasis → emphasis-hover` as a single row with a hover-triggered transition so the state relationship is legible instead of appearing as two loose swatches. Same for `accent`, `highlight`. Tokens without hover variants (`foundation`, `subtle`, `background`, `reduced`, `faint`, secondary/gradient) should be visually distinguished as "not interactive" per the rule in global.css.
- **Show usage examples per token.** A sample button using `bg-accent`, heading using `text-emphasis`, body copy using `text-foundation`, demand/error state using `highlight`. Swatches alone don't answer "when do I reach for this?"
- **Print the utility class next to the token name.** e.g. `--color-accent` → `bg-accent / text-accent / border-accent`. Currently the CSS var is shown but not the class a consumer would actually type.
- **Contrast ratios against `background`.** Computed WCAG AA/AAA readout under each color swatch. Turns the page into an accessibility guardrail and catches palette regressions early.

## Maintenance

- **Generate token lists from global.css** instead of hand-syncing the frontmatter in styles.astro. A small Astro loader that parses the `@theme { … }` block would make drift impossible. Current setup relies on the comment at styles.astro:4 as the only contract.
- **Resolve `secondary-emphasis` / `secondary-faint`.** They aren't used anywhere in the codebase. Either document their intended role on this page or retire them. Related: TASK-0027_introduce-secondary-emphasis-token.md.
- **Reclassify `reduced`.** It's grouped under "structural" in styles.astro but applied to text (decorator labels). Either move to the attention hierarchy or introduce a "de-emphasis" subgroup. Current grouping contradicts the CLAUDE.md rule that structural tokens aren't used on text.
- **Add `--font-manufacturing_consent` to the font reference** (or retire the underscore-named token in favor of `--font-blackletter`). Currently surfaced only via the `blackletter` alias, so the raw token appears undocumented.

## Polish

- **Distinguish the `background` swatch.** It's literally invisible on the page — `#000` on a black backdrop. Wrap it in an inset frame or checkered backdrop so the "this is the page color" semantic is obvious without needing the label to carry the whole meaning.
- **Replace "Aa" in the type scale with a short real sentence.** Makes readability and line-height judgable at each size. "Aa" can't show tracking or leading.
- **Click-to-copy** the token name or utility class.
- **Spacing in context.** In addition to the bar, show `p-18` applied to a sample card so the value's lived impact is clear, not just its width.

## Meta

- The `@source inline(…)` force-emission block in global.css (added 2026-04-18) is load-bearing: without it, tokens not consumed elsewhere get tree-shaken and their CSS vars disappear, breaking the /styles page. Add a short comment pointing future-you at _why_ it exists so it doesn't get deleted during a cleanup pass.
- Consider whether /styles should be excluded from production builds or gated behind a dev flag (see NOTE-0013_dev-feature-flag-convention.md). Right now it ships as a public route, which may or may not be intentional.

## Suggested first slice

If tackling a minimum-useful subset: hover pairing + utility class labels + usage examples in one pass. Those three compound — each alone is a small win, together they turn the page from a swatch dump into a usable reference.
