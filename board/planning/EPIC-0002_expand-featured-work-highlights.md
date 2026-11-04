---
type: epic
status: planning
created: 2026-10-20
tasks:
  - TASK-0033
  - TASK-0034
  - TASK-0035
  - TASK-0036
---

# Expand Featured Work highlights

Featured Work holds a single hand-built highlight today ([Nypost.astro](src/components/Nypost.astro)). Add more highlights so the section shows range beyond one role.

## Context

- The first highlight task to land establishes the reusable highlight pattern; the rest follow it.
- The `featured` content collection (`anglerfish.md`, `mvp.md`) exists but nothing renders it. Decide whether the new highlights use it or retire it.
- Related: [[TASK-0030_fix-featured-nyp-section]]. The NYP cleanup may inform the shared pattern.

## Tasks

- [[TASK-0033_add-nasa-jpl-featured-highlight]]
- [[TASK-0034_add-la-dph-featured-highlight]]
- [[TASK-0035_add-accessibility-cop-featured-highlight]]
- [[TASK-0036_add-awards-featured-highlight]]
