---
type: task
status: backlog
priority: 2
created: 2026-03-27
parent: EPIC-0001
blocked_by: TASK-0015
---

# Migrate to semantic color tokens

**Source:** NOTE-0008 §4b

Replace raw color class references (`text-emerald-200`, `border-emerald-400/20`, etc.) with semantic token names throughout the codebase.

## Token structure
Define CSS custom properties in `:root`, then wire into Tailwind config:

```
--color-bg           (black base)
--color-surface      (elevated surfaces, e.g. cards)
--color-text-primary (main text, currently emerald-200)
--color-text-muted   (secondary text, currently emerald-200/70)
--color-accent       (interactive elements, currently emerald-400)
--color-accent-glow  (text-shadow/box-shadow values)
--color-highlight    (emphasis, currently fuchsia)
--color-border       (borders, currently emerald-400/20)
```

## Migration approach
Phase by section to verify visually after each:
1. Header + Nav
2. Hero
3. Skills
4. Experience + Projects
5. Talks
6. FishHero
7. Footer + Modal

## Scope
203 color references across 18 files.

## Files
- `src/styles/global.css` or new `src/styles/tokens.css`
- `tailwind.config.mjs`
- All 18 component/page files with color references
