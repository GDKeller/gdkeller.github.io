---
type: task
status: done
priority: 2
created: 2026-03-27
completed: 2026-04-11
parent: EPIC-0001
blocked_by: TASK-0015
---

# Migrate to semantic color tokens

**Source:** NOTE-0008 §4b

Replace raw color class references (`text-emerald-200`, `border-emerald-400/20`, etc.) with semantic token names throughout the codebase.

## Token structure

Defined in `src/styles/global.css` via Tailwind v4's `@theme inline` block. Named by role along a single axis: **attention intensity**. Tailwind v4 strips the `--color-` prefix when generating utilities, so `--color-foundation` becomes `text-foundation`, `bg-foundation`, etc.

### Attention hierarchy (content wanting the user's eyes)
- `foundation` — emerald-100 — baseline reading copy
- `emphasis` (+hover) — emerald-200 / 100 — gentle lift above foundation
- `accent` (+hover) — emerald-400 / 300 — clearly prominent (buttons, active states)
- `highlight` (+hover) — fuchsia-500 / 300 — maximum demand ("the hammer")

### Structural (scaffolding, not competing for attention)
- `background` — black — the page backdrop
- `subtle` — emerald-700 — dividers, borders, decoration; never used on text

Hover variants exist only where the role implies interaction. `foundation`, `subtle`, and `background` have no hover variants.

## Naming principle

Tokens encode **decisions**, not **elements**. If changing the token should update every use of it together, it's a valid token. A name like `link` failed this test because a link's color depends on emphasis level, not link-ness. Role-named tokens (`foundation`, `emphasis`) avoid this trap.

## Migration approach
Phase by section to verify visually after each:
1. Header + Nav — [in progress]
2. Hero
3. Skills
4. Experience + Projects
5. Talks
6. FishHero
7. Footer + Modal

Per-file, three categories of raw references need different handling:
- **Hardcoded shades** (`text-emerald-200`, `bg-emerald-400`) — direct token substitution.
- **Shade-via-opacity** (`border-emerald-400/20`) — deferred; case-by-case audit to determine whether opacity is genuine translucency (keep) or a fake darker shade (replace with `subtle` or another opaque shade). Not part of initial phase passes.
- **Hardcoded glow rgbas** (`drop-shadow-[0_0_6px_rgba(16,185,129,0.5)]`, `text-shadow: var(--color-emerald-500)...`) — deferred entirely. These are atmospheric and tuned to specific values; if re-themed, they'll need independent tuning.

Style-block CSS variable references (`var(--color-emerald-300)` inside gradients or shadows) are also treated as atmospheric and deferred.

## Progress
- [x] Foundation: semantic tokens defined in `global.css`
- [x] `bg-black` → `bg-background` sitewide (10 files)
- [x] `Layout.astro` body defaults to `bg-background text-foundation`
- [x] `Link.astro` variants use `text-highlight` / `text-emphasis`
- [x] `@reference "../styles/global.css"` pattern proven for component style blocks (ProjectSingle, JobSingle)
- [x] Phase 1: Header + Nav
- [x] Phase 2: Hero
- [x] Phase 3: Skills
- [x] Phase 4: Experience + Projects
- [x] Phase 5: Talks (zero migrations — all atmospheric or off-palette)
- [x] Phase 6: FishHero (zero template migrations — intentional `text-fuchsia-400` on monster title, atmospheric gradients otherwise)
- [x] Phase 7: Footer + Modal (modal copy text deferred to TASK-0018 redesign)

## Spun-off follow-up tasks
- **TASK-0025** — Audit opacity-as-shade usages. Every `*-emerald-*/N` and `*-fuchsia-*/N` case-by-case: keep if genuine translucency, replace with opaque token/shade if intent was "dimmer".
- **TASK-0026** — Reconcile atmospheric glows and gradients with the token system. Decides whether hardcoded glows/gradients stay hardcoded, get their own token layer, or use `color-mix()` of palette tokens.
- **TASK-0027** — Introduce a secondary-emphasis token for the `emerald-300` role that kept appearing as a distinct intensity between `emphasis` and `accent`.

## Known outstanding raw references (by design, not oversight)
- **Modal copy in `index.astro`** — `text-emerald-300` heading + hover states; pending full redesign in TASK-0018.
- **Opacity-modified shades** — handled by TASK-0025.
- **Atmospheric effects** — handled by TASK-0026.
- **`text-fuchsia-400` on FishHero anglerfish title** — confirmed intentional (one shade dimmer than `highlight`, design choice).

## Files
- `src/styles/global.css`
- All component/page files with raw color references
