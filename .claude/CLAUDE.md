# Portfolio

Grant Keller's portfolio website (Astro static site).

## Project structure

This file does not document the directory layout. Use `tree`, `fd`, or `ls` to see structure (e.g. `tree -L 3 -I 'node_modules|dist' src`); the filesystem is the source of truth.

Non-obvious anchors:

- `src/content.config.ts` — Zod schemas for all content collections (lives at `src/`, NOT `src/content/`)
- `src/styles/theme.css` — Tailwind v4 `@theme` blocks and `@source inline(...)` force-emit list; theme/tokens live here (no `tailwind.config.*` exists). When you add a token, add it to the `@source inline(...)` list too or it will be tree-shaken.

## Design

The authoritative design brief lives in `docs/DESIGN.md`:

@docs/DESIGN.md

### Coding conventions

Colors are expressed through semantic tokens defined in `src/styles/theme.css`. Don't reach for raw `emerald-*` or `fuchsia-*` classes in new code.

Tokens encode _decisions_, not _elements_. If changing a token's value should update every use of it together, it's a valid token. Avoid element-named tokens like `button-bg` or `link-color` — they collapse the moment the same element needs different values in different contexts.

## Known issues

- No testing infrastructure exists (no test runner, no test files).
- Image format conversion is in progress; hero backgrounds use `<Picture>` (AVIF + WebP), but the job/project/skill long tail is still mixed `.jpg`/`.png`.
- `dist/_astro/Layout.*.css` is the largest CSS bundle; worth investigating before optimizing the smaller per-page bundles.

## Project board

- Ask before creating new board files (tasks, ADRs, etc.).
- ADRs live in `board/reference/`, not `board/planning/` (planning is for actionable items). Standard `ADR-NNNN_kebab-title.md` filename and `type: adr` frontmatter.
