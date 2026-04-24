---
type: task
status: done
priority: 2
created: 2026-03-27
---

# Clean up dead code and unused CSS variables

**Source:** Audit M7, L1, L3, L5, Critique minor observations

## What to do

1. **Hero.astro:** Remove ~40 lines of commented-out CTAs, skill badges, and billboard text (lines 40-44, 67-103, 116-121). Git history preserves old code.

2. **Layout.astro:80-88:** Remove unused `--accent`, `--accent-light`, `--accent-dark`, `--accent-gradient` CSS variables. No component references them.

3. **Footer.astro:58-62:** Remove "React" from the "Built with" tech list — there are zero React components in the codebase. Misleading for technical reviewers.

4. **SkillBadge.astro:** Add `interface Props { tag?: string; class?: string; }` — props are destructured without type safety.

## Files

- `src/components/Hero.astro`
- `src/layouts/Layout.astro`
- `src/components/Footer.astro`
- `src/components/SkillBadge.astro`
