---
type: task
status: in_progress
priority: 2
created: 2026-03-27
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
- [ ] Phase 1: Header + Nav
- [ ] Phase 2: Hero
- [ ] Phase 3: Skills
- [ ] Phase 4: Experience + Projects
- [ ] Phase 5: Talks
- [ ] Phase 6: FishHero
- [ ] Phase 7: Footer + Modal
- [ ] Follow-up: opacity-as-shade audit
- [ ] Follow-up: atmospheric glow/gradient reconciliation

## Files
- `src/styles/global.css`
- All component/page files with raw color references
