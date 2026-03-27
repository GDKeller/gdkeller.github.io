---
type: task
status: done
priority: 2
created: 2026-03-27
parent: EPIC-0001
---

# Remove DaisyUI dependency

**Source:** NOTE-0008 §3

Replace DaisyUI utility classes with equivalent Tailwind or native HTML. This is a visual parity swap — the output should look essentially unchanged.

## Current DaisyUI usage
- `modal`, `modal-box`, `modal-backdrop` — contact modal in `index.astro` (already uses native `<dialog>`)
- `btn`, `btn-circle`, `btn-ghost`, `btn-sm` — modal close button in `index.astro`
- `stat`, `stat-title` — NYPost stats in `Nypost.astro`
- `divider`, `divider-neutral` — skills section in `SkillsGrid.astro`

## Cleanup
- Remove `require('daisyui')` from `tailwind.config.mjs` plugins
- Remove `daisyui` from `package.json` devDependencies
- Remove DaisyUI from Footer.astro "Built with" list
- Run `npm install` to clean lockfile

## Files
- `src/pages/index.astro`
- `src/components/Nypost.astro`
- `src/components/SkillsGrid.astro`
- `tailwind.config.mjs`
- `package.json`
- `src/components/Footer.astro`
