---
type: task
status: done
priority: 2
created: 2026-05-02
archived: 2026-05-02
---

# Run `format:fix` after prettier-plugin-classnames adoption

**Source:** ADR-0001

Adopting `prettier-plugin-classnames` + `prettier-plugin-merge` (see ADR-0001) means every file with a long Tailwind class string is now out of compliance with `prettier --check`. A one-time repo-wide reformat is required.

## Approach

- Run `npm run format:fix` from a clean working tree.
- Review the diff. It should be exclusively whitespace/wrapping inside `class=` attributes (and any `@apply` lists CSS-side). Anything else means a plugin is doing more than expected and needs investigation before committing.
- Land as a single dedicated commit, e.g. `chore(format): wrap long class strings via prettier-plugin-classnames`.
- Do not bundle this with semantic edits — keeping it isolated preserves blame on real changes.

## Done when

- Repo passes `npm run format` (the check, not `:fix`) with no diff.
- The reformat lives in one commit, separate from any feature/refactor work.
