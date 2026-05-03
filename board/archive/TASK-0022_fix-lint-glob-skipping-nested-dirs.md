---
type: task
status: done
priority: 2
created: 2026-04-09
archived: 2026-04-09
---

# Fix lint glob so it stops silently skipping nested directories

## Resolution (2026-04-09)

- `package.json` lint scripts now quote the glob (`eslint 'src/**/*.{ts,astro}'`) so ESLint expands `**` itself instead of relying on `/bin/sh` (which lacks `globstar`). Nested files like `src/lib/animations/*.ts` are now actually linted.
- `eslint.config.js` disables `no-undef` for TS files — TypeScript already resolves identifiers, and the rule was false-firing on type-only names from `lib.dom.d.ts` (e.g. `NodeListOf`).
- `src/env.d.ts` gets an inline `@typescript-eslint/triple-slash-reference` disable since the triple-slash is the Astro-generated convention.
- Removed unused locals: `fishBody` in `src/lib/animations/anglerfish.ts`, `heroContent` in `src/lib/animations/content.ts`.
- Verified: `npm run lint`, `npx eslint 'src/**/*.ts' 'src/**/*.astro'`, and `npm run build` all pass cleanly.

The `npm run lint` script uses a shell glob that only matches one directory level deep, which means everything under `src/lib/animations/` (and likely other nested TS/astro files in `src/content/`, etc.) has been silently skipped by ESLint. The gap was only discovered while working on TASK-0020 because the newly-added `src/lib/dev-flags.ts` happened to sit exactly at the level the glob was matching, which surfaced previously-hidden `no-undef` errors that would also apply to every animation module.

## Root Cause

`package.json` defines:

```json
"lint": "eslint src/**/*.{ts,astro}"
```

npm runs scripts under `/bin/sh`, which does **not** have `globstar` enabled by default. Without `globstar`, `**` behaves like a single `*`, so `src/**/*.{ts,astro}` only matches files one directory deep — `src/lib/dev-flags.ts`, `src/components/*.astro`, etc. Anything deeper like `src/lib/animations/hero.ts` or `src/content/jobs/*.md` falls outside the glob.

Confirmed by running `sh -c 'echo src/**/*.{ts,astro}'` and seeing the output omit every `src/lib/animations/*.ts` file.

## Evidence of the Gap

Running `npx eslint 'src/**/*.ts'` (with ESLint doing the glob expansion itself rather than sh) exposed **~45 pre-existing errors** across every animation module, most of them `no-undef` for browser globals (`document`, `window`, `HTMLElement`, `NodeListOf`, `Element`) that weren't caught because ESLint was never actually running on those files.

## Acceptance Criteria

- `npm run lint` lints every `.ts` and `.astro` file under `src/`, including nested directories like `src/lib/animations/`
- Either `package.json` delegates glob expansion to ESLint by quoting the pattern, or uses an explicit file list, or switches to a portable approach
- All newly-surfaced pre-existing errors in `src/lib/animations/*.ts` are fixed (most will be `no-undef` for browser globals, already addressed for `*.ts` files via `globals.browser` in `eslint.config.js` during TASK-0020 — the config fix is already in place, so running the expanded lint may be mostly clean on those files)
- Verify by running both `npm run lint` and `npx eslint 'src/**/*.ts' 'src/**/*.astro'` — both should produce the same (zero) errors
- Fix any other pre-existing lint errors that surface in other nested directories

## Recommended Fix

Quote the glob so ESLint expands it internally (ESLint supports proper `**` globstar):

```json
"lint": "eslint 'src/**/*.{ts,astro}'",
"lint:fix": "eslint 'src/**/*.{ts,astro}' --fix"
```

Alternative: pass `src` as a positional and let ESLint walk recursively by filetype. Either works; the quoted form is minimal and explicit.

## Implementation Notes

- The ESLint config already had browser globals added in TASK-0020 (`src/lib/dev-flags.ts` fix), so running the expanded lint on `src/lib/animations/*.ts` may surface fewer errors than the raw 45 observed during TASK-0020 investigation — many of the `no-undef` errors should now pass
- Any remaining errors will be genuine (unused vars, actual bugs, real type issues); fix them in this task rather than punting
- Watch for similar silent-skip bugs in other scripts in `package.json` (test runners, formatters, etc.) — same `sh`/`globstar` trap applies
- Consider whether `src/content/**` needs linting at all (those are mostly `.md` content files); may need a separate ignore pattern

## Related

- TASK-0020 (archived) — feature-flagged the palette picker, surfaced this gap during the lint run
- Branch of discovery: `feat/design-system-overhaul-phase-1`
