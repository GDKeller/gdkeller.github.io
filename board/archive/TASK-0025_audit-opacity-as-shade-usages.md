---
type: task
status: done
priority: 3
created: 2026-04-11
completed: 2026-05-02
parent: EPIC-0001
---

# Audit opacity-as-shade usages across the codebase

After TASK-0016 landed the semantic token system, one category was deferred: any `border-emerald-400/20`, `bg-emerald-950/30`, `text-emerald-200/70`, etc. where opacity is being used as a lazy way to darken a base color rather than to achieve genuine translucency.

**The principle:** opacity should mean _"I want to see what's behind this"_, not _"I want this dimmer"_. If the intent is a darker shade, it should be a flat opaque color — ideally a semantic token like `subtle` (emerald-700) or an additional token we introduce for a durable role.

## Scope

Every `*-emerald-*/N` and `*-fuchsia-*/N` Tailwind class across `src/`. Case-by-case decision per usage:

- **Keep as-is** if genuine translucency — the class needs to blend with whatever's behind it (e.g. glass panels over the main bg, overlays that reveal content underneath).
- **Replace with opaque token/shade** if the intent was just "dimmer color" — typical of static borders, static backgrounds on solid panels, static secondary text.

Expect to introduce one or more new semantic tokens during this pass (e.g. a third-tier text role currently expressed as `text-emerald-200/70`, or an intermediate border color currently expressed as `border-emerald-400/20`). Name by role along the attention-intensity axis established in TASK-0016.

## Known hotspots

- Header: icon button borders/bgs, Resume/Contact button chrome (`border-emerald-400/30`, `bg-emerald-900/20`, `hover:bg-emerald-400/10`)
- Skills: `border-emerald-400/30`, `bg-emerald-950/40`, `text-emerald-400/80`, `text-emerald-200/60`, `text-emerald-300/50`
- Modal (will be handled by TASK-0018 if it redesigns): `border-emerald-400/20`, `bg-emerald-950/20`, `text-emerald-300/80`, `text-emerald-200/70/80`
- Footer: `border-emerald-400/50`, `border-emerald-400/10`, `text-emerald-400/30`, `shadow-emerald-400/25`
- JobSingle/ProjectSingle style blocks: `from-emerald-400/20 via-teal-500/15` gradient lines (these are atmospheric, keep)

## Exclusions

Gradient stops with mix-blend effects (HeroBackground scanlines, SkillsCard shadow gradients, FishHero water overlays, job-card side-bar gradients) are treated as atmospheric and remain out of scope — covered by TASK-0026 instead.
