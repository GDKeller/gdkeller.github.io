---
type: task
status: backlog
priority: 3
created: 2026-04-10
---

# Extract dev-flags to a cross-project library

Promote `src/lib/dev-flags.ts` from a copy-paste snippet into a standalone, versioned library that multiple of Grant's webview-based projects (portfolio, NASA Picture Proxy, OBR webview, future web/webview tools) can depend on via `npm install`. Trigger this task when a second project is actively using the convention and drift between copies starts causing friction — not before.

## Motivation

The convention is already shared across projects (see NOTE-0013), but the code is copy-pasted per project. Works fine at one consumer, will drift at two, becomes a maintenance problem at three. Extracting now while the surface is tiny (~80 lines) lets the abstraction shape itself around real second-consumer feedback before it ossifies.

The other reason to extract: the library should grow a **flag registry** and a **`logHelp()` console dump** (the "npm run for frontend flags" pattern). That's inherently registry-shaped work that benefits from a single shared API surface instead of N slightly-different per-project versions.

## Scope

- Webview / browser runtime only. No Node or Tauri-native bindings. Pure TS that runs in any browser webview.
- Framework-agnostic core. No React, no Svelte, no Astro imports. Vanilla DOM + localStorage + URLSearchParams.
- No UI overlay in v1. Console discoverability only (see `logHelp()` below).

## Distribution

GitHub repo installed by tag. Example: `npm install github:gdkeller/dev-flags#v0.1.0`.

- Zero registry infrastructure — no npm publish pipeline, no GitHub Packages setup.
- Versioned via git tags; consumers lock to a specific tag so upgrades are intentional.
- Graduate to a private npm scope (`@gdkeller/dev-flags` or similar) only if the library spreads beyond Grant's own projects or if consumer count grows enough that tag-based installs feel slow.
- Repo name TBD. Candidates: `dev-flags`, `devboard`, `flag-commander`. Keep it short and memorable.

## Public API (v0.1.0)

Keep the existing functions working (`getDevMode`, `getDevTools`, `hasTool`, `syncDevFlagsFromUrl`) for backwards compat during migration, and add:

```ts
import { defineFlags } from "dev-flags";

export const flags = defineFlags({
  modes: {
    stale: "Serve stale cached data instead of fetching fresh",
    "error-500": "Force the API layer to return 500s",
    offline: "Simulate offline mode",
  },
  tools: {
    palette: "Color theme switcher overlay (bottom-right)",
    grid: "Layout grid overlay",
    fps: "FPS counter",
  },
});

// At app bootstrap:
flags.syncFromUrl();
flags.logHelp();  // or gate behind `?help` or conditional

// In components:
if (flags.tools.palette) { /* reveal palette picker */ }
if (flags.mode === "stale") { /* serve from cache */ }
```

### Behaviors

- **Typed access.** `flags.tools.palete` (typo) is a TypeScript error, not a silent `false`. `flags.mode` is `"stale" | "error-500" | "offline" | null`.
- **Registry is the documentation.** The description strings passed to `defineFlags()` are what `logHelp()` prints. No separate README table to keep in sync.
- **`logHelp()` output shape.** Formatted `console.group` (or equivalent styled log) listing:
  - Each registered flag, its description, its current value
  - URL syntax to enable/clear each dimension
  - The `localStorage` escape hatch for devtools
- **`syncFromUrl()` unchanged** — same declarative "URL is full state, absent param leaves storage alone" semantics already documented in NOTE-0013.
- **`?tools=off` / `?dev=off` already normalized** — both clear their respective dimension (fixed 2026-04-10).

## Migration Plan

1. **Create the library repo.** Scaffold with `tsup` or similar (ESM-only build, declaration files, zero runtime deps). Copy current `src/lib/dev-flags.ts` as the starting point. Add `defineFlags()` + `logHelp()`.
2. **Publish v0.1.0 tag** on GitHub.
3. **Retrofit portfolio** — install via tag, replace the local `src/lib/dev-flags.ts` with the library import, move the flag registry into `src/lib/flags.ts` as the single declaration site. Verify the palette picker still gates correctly.
4. **Retrofit second project** (NASA Picture Proxy is the most likely candidate since it originated the `?dev=` mode pattern per NOTE-0013). This is where the real design validation happens — expect to reshape the API based on what the second consumer reveals.
5. **Tag v0.2.0** with whatever changes the second-consumer retrofit required.
6. **Document the convention in the library README** — NOTE-0013 becomes the README with minimal edits.
7. **Deprecate per-project copies** — remove `dev-flags.ts` from each consumer once they're installed via package.

## What This Task Explicitly Does Not Do

- **No UI overlay.** `logHelp()` console dump is the only discoverability surface in v1. If an overlay is wanted later, a follow-up task should layer it on top of `tweakpane` — not roll a custom CSS overlay, and not pick `leva` (React-only).
- **No integration with any enterprise feature-flag SDK** (LaunchDarkly, Unleash, Flagsmith, GrowthBook, PostHog). Different problem domain — those are for remote-config production flags with targeting rules, analytics, and user bucketing. Out of scope forever for this library.
- **No third dimension** for typed config values (`?config=delay:500`). Stay at the mode/tools two-dimension shape. Piggyback on mode names (`?dev=slow-500`) if structured config is needed, per NOTE-0013's existing guidance.
- **No runtime toggling UI inside the page.** Only URL edits and the localStorage escape hatch. Keep the surface tight.

## Acceptance Criteria

- Library repo exists, has a v0.1.0 tag, and builds to ESM + `.d.ts`
- `defineFlags()` and `logHelp()` exist with the API shape above
- Portfolio imports the library via tag and its palette picker gates correctly (test: `?tools=palette` reveals, `?tools=off` clears, fresh load defaults to hidden)
- At least one second project has adopted it and given feedback on the API
- `src/lib/dev-flags.ts` in portfolio is deleted in favor of the library import
- NOTE-0013's "Reference Implementation" section is updated to point to the library repo instead of `src/lib/dev-flags.ts`
- Library README contains the full convention doc

## Non-Goals / Deferred

- Publishing to public npm. Private GitHub install is fine until it isn't.
- Bikeshedding the repo name. Pick something and move on; the import path is the only user-facing surface.
- Writing exhaustive tests. The library is small enough that a smoke test in each consumer is sufficient; don't build a test infra for 80 lines of code.

## Related

- NOTE-0013 Dev Feature Flag Convention (cross-project) — the convention doc this library implements
- TASK-0020 (archived) — first consumer (portfolio palette picker); pre-convention `?palette=1` approach, retrofit to `?tools=palette` on 2026-04-09
- TASK-0022 — separate concern, lint glob fix

## Trigger

**Do not start this task until:**

1. A second project is actively using the convention (portfolio is #1; second is TBD — likely NASA Picture Proxy or OBR webview), AND
2. Drift or desync between the two copies has caused at least one real friction moment (a bug only in one copy, an API addition only in one copy, etc.).

Before both of those are true, the copy-paste is fine and premature extraction is wasted work.
