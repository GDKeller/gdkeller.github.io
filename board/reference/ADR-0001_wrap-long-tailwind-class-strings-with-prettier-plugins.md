---
type: adr
status: active
context_date: 2026-05-02
created: 2026-05-02
---

# ADR-0001: Wrap long Tailwind class strings with prettier-plugin-classnames

## Context

Tailwind utility classes accumulate quickly on Astro components, producing single-attribute strings well past the project's 80-character `printWidth`. Stock Prettier treats a quoted attribute value as one unbreakable token and will not insert line breaks inside it, regardless of `printWidth`. The result: horizontal scrolling, unreadable diffs, and class lists that drift over time because no formatter touches them.

The existing setup was `prettier@3.8.3` with `prettier-plugin-astro` and `prettier-plugin-tailwindcss` (sort-on-save). Both worked, but neither addressed line length inside `class="..."` values. ESLint contributes nothing here either; the project's `eslint.config.js` has zero formatting rules.

## Considered Approaches

### Approach 1: Set `singleAttributePerLine: true`

Prettier's built-in option that puts each attribute on its own line.

- Pros: zero new dependencies, works out of the box.
- Cons: does not break inside the class string itself — a single 200-char `class=` still overflows. Also forces every multi-attribute element onto multiple lines, which is noisy for elements that fit fine on one line.
- Rejected: doesn't actually solve the wrap problem.

### Approach 2: Manually break class strings with `clsx`-style array literals

Refactor templates to express classes as multi-line arrays/joined strings so Prettier's normal indentation handles wrapping.

- Pros: no plugins, native Prettier behavior.
- Cons: invasive refactor across the entire codebase, adds runtime indirection in Astro components that just want a class attribute, fights the framework. Doesn't compose with `prettier-plugin-tailwindcss` sort.
- Rejected: high churn, low payoff.

### Approach 3: `prettier-plugin-classnames` + `prettier-plugin-merge`

Add a plugin that re-wraps long class attribute values at `printWidth`, paired with `prettier-plugin-merge` so it composes with `prettier-plugin-tailwindcss` (Prettier otherwise only runs the last plugin per parser).

- Pros: solves the actual problem, preserves Tailwind sort order, no source refactor, works for both `class` (Astro) and `className` (JSX) via `customAttributes`.
- Cons: two new dev dependencies; plugin order in `.prettierrc` is significant and easy to get wrong; one-time format pass produces a large diff.
- Selected.

## Decision

Adopted `prettier-plugin-classnames@0.10.1` and `prettier-plugin-merge@0.10.1` as dev dependencies.

`.prettierrc` plugin order is now:

```jsonc
"plugins": [
  "prettier-plugin-astro",
  "prettier-plugin-tailwindcss",
  "prettier-plugin-classnames",
  "prettier-plugin-merge"
]
```

Plus:

- `customAttributes: ["class", "className"]`
- `endingPosition: "absolute"` (measure wrapped output against full `printWidth` regardless of indent depth)

The order matters: `merge` runs each preceding plugin sequentially, so `tailwindcss` sorts first, then `classnames` wraps the sorted output. The reverse order causes `tailwindcss` to reflow the wrapped result back onto one line, silently undoing the wrap. CLI verification on `SkillsGrid.astro` confirmed long `class=` values now break at `printWidth`.

## Consequences

- Long class strings will wrap at 80 chars (120 in markdown/board overrides) on every save and in CI's `prettier --check`.
- A one-time `npm run format:fix` will produce a large repo-wide diff. Not run yet — should land as a single dedicated commit so future blame stays meaningful.
- Adds two transitive plugin dependencies to the dev tree. Small surface area; both plugins are at `latest`.
- VS Code's Prettier extension caches plugin resolutions per workspace; after future plugin changes, a "Developer: Reload Window" may be needed to pick them up.
- ESLint config is untouched and remains formatting-free; no conflict to manage.

## Spawned Items

- [[TASK-0028_run-format-fix-after-prettier-classnames-adoption]] — apply the new wrap rules across the repo as a single chore commit.
- No other follow-up needed.
