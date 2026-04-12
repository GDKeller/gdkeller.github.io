---
type: epic
status: current
created: 2026-03-27
---

# Design System Overhaul

**Source:** NOTE-0008, TASK-0011, TASK-0012

Strip the portfolio's visual system of stock Tailwind tells, DaisyUI dependency, and generic border radius. Replace with a custom hue-shifted palette, semantic tokens, and sharp-edged aesthetic that matches the cyberpunk identity.

## Goals
- Eliminate recognizable stock Tailwind colors
- Remove DaisyUI entirely (visual parity, not a redesign)
- Kill border radius sitewide (with exceptions for intentionally circular elements)
- Establish semantic color tokens for maintainability
- Normalize OBR section and contact modal into the unified system

## Sub-tasks
- TASK-0013: Eliminate border radius sitewide
- TASK-0014: Remove DaisyUI dependency
- TASK-0015: Create custom hue-shifted color palette
- TASK-0016: Migrate to semantic color tokens
- TASK-0017: Normalize OBR section to portfolio colors
- TASK-0018: Redesign contact modal

## Sequencing
1. Border radius (independent, no dependencies)
2. DaisyUI removal (independent, but modal redesign depends on it)
3. Custom palette + semantic tokens (TASK-0015 then TASK-0016, tightly coupled)
4. OBR normalization (depends on new palette)
5. Contact modal redesign (depends on DaisyUI removal + border radius + new palette)
