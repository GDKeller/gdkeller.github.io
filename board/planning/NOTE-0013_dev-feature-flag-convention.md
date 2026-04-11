---
type: note
status: inbox
created: 2026-04-09
---

# Dev Feature Flag Convention (Cross-Project)

A shared shape for dev feature flags across my projects, so tools like NASA Picture Proxy, this portfolio, and anything future can use the same query-param + localStorage vocabulary.

## The Distinction

Dev flags come in two fundamentally different shapes. Cramming both into one slot (like `?dev=X`) creates friction — modes steal the slot tools need, or tools pollute the modes dimension.

**Mode** — single-value render state. One at a time. Mutually exclusive.
Examples: `fallback`, `stale`, `slow`, `error-500`, `offline`.

**Tools** — set of independent helper overlays. Any combination on at once. Additive.
Examples: `palette`, `grid`, `outliner`, `fps`, `bbox`.

## The Convention

| Purpose | Query param | localStorage key | Shape | Example |
|---|---|---|---|---|
| Render mode | `?dev=<name>` | `dev-mode` | single value | `?dev=stale`, `?dev=off` |
| Helper tools | `?tools=<a,b,c>` | `dev-tools` | comma set | `?tools=palette,grid` |

### Semantics (declarative)

- The URL value is always the **complete desired state** for that dimension.
- **Modes:** `?dev=stale` replaces the current mode. `?dev=off` or `?dev=` clears it.
- **Tools:** `?tools=palette,grid` replaces the tool set entirely with `{palette, grid}`. `?tools=off` or `?tools=` clears it completely. (The `off` alias was added 2026-04-10 so both dimensions share the same clearing vocabulary — prior to that, only `?tools=` empty cleared the list, and `?tools=off` silently created a tool literally named "off".)
- If a query param is **absent** from the URL, the stored localStorage value is **left untouched** — you don't lose your dev state by navigating to a clean URL.
- Both dimensions persist to localStorage on sync, so the query param only needs to appear once per browser to "stick."

### Programmatic escape hatch

Direct devtools toggles, useful when you can't or don't want to modify the URL:

```js
localStorage.setItem("dev-mode", "stale");
localStorage.setItem("dev-tools", "palette,grid");
```

Clearing: `localStorage.removeItem("dev-mode")` / `localStorage.removeItem("dev-tools")`.

## Reference Implementation

Lives in this repo at `src/lib/dev-flags.ts`. Small enough to copy-paste across projects rather than publish as a package.

Exposes:

- `getDevMode(): string | null` — current mode, or null if none set
- `getDevTools(): Set<string>` — current enabled tool set
- `hasTool(name: string): boolean` — convenience check
- `syncDevFlagsFromUrl(): void` — read URL params, mirror into localStorage. Call once at the top of a client script before reading flags.

### Usage pattern

```ts
import { syncDevFlagsFromUrl, hasTool } from "../lib/dev-flags";

syncDevFlagsFromUrl();

if (hasTool("palette")) {
  // reveal the palette picker overlay
}
```

### Consumer guidance

- **No `isDev` escape hatch.** Let `hasTool()` / `getDevMode()` be the single source of truth in both dev and production. Bimodal gating (`isDev ? true : hasTool(...)`) means the flag has no effect in dev, which is exactly where it's most useful during iteration. ThemeSwitcher was refactored to drop this pattern on 2026-04-10 after it bit us — the palette picker was pinned visible in dev regardless of `?tools=off`.
- **Render the gated element into the DOM hidden by default.** This lets the runtime flag reveal it without a rebuild. Don't conditionally omit it from markup.
- **Call `syncDevFlagsFromUrl()` once per page load** in client script, before any `hasTool()` / `getDevMode()` reads. Astro components should do this in their `<script>` block.

## Prior Art / Projects Using This

- **NASA Picture Proxy** — originated the `?dev=fallback` / `?dev=stale` mode pattern. Should be retrofit to use the shared `dev-mode` storage key and `off` clear semantics when next touched.
- **Portfolio (this repo)** — palette picker overlay (TASK-0020) is the first tools consumer. Previously used `?palette=1` + `palette-picker` localStorage key; retrofit to `?tools=palette` + `dev-tools` on 2026-04-09.

## Future Reconciliation

When bringing a project into the convention:

1. Drop `src/lib/dev-flags.ts` (or equivalent location) into the project.
2. Replace ad-hoc query param names with `?dev=` or `?tools=`.
3. Replace ad-hoc localStorage keys with `dev-mode` or `dev-tools`.
4. Update any README or in-repo dev docs to point to this convention.

## Open Questions (for later)

- Should there be a third dimension for typed config values (e.g. `?config=delay:500,region:us-west`)? For now, piggyback on mode names like `?dev=slow-500` if needed — avoid premature dimension creep.
- Should modes and tools support multi-word values with separators (e.g. `?dev=error-500`)? Current parser treats the whole value as opaque, so yes — any non-empty string works.

## Package Extraction (TASK-0023)

**Status: planned, not started.**

When two or more projects are actively using the convention and the copy-paste is starting to drift, extract the library. See TASK-0023 for the full plan. Key decisions already made during discussion 2026-04-10:

- **Scope:** web/webview only (browser runtime). No Node or Tauri-native bindings. Framework-agnostic TS — works in Astro, React, vanilla, or any webview.
- **Distribution:** GitHub repo installed via tag (`npm install github:gdkeller/dev-flags#v0.1.0`). Zero registry infra, still versioned. Graduate to private npm scope only if the library spreads beyond personal projects.
- **Core API additions vs. the current `dev-flags.ts`:**
  - `defineFlags(registry)` — declarative registration with typed access and per-flag descriptions. Registry IS the documentation.
  - `logHelp()` — console-pretty dump of registered flags, current values, and how to enable/clear. The "npm run" discoverability surface, no UI needed.
- **UI overlay:** deferred. If/when built, layer on top of [`tweakpane`](https://tweakpane.github.io/docs/) rather than hand-rolled — framework-agnostic, ~12KB, has the panel/keyboard/persistence primitives already. Do not roll own CSS overlay from scratch.
- **Rejected:** enterprise feature-flag SDKs (LaunchDarkly, Unleash, Flagsmith, GrowthBook, PostHog flags) — wrong shape, all optimized for remote config and targeting rules we don't need. `leva` rejected because React-only.
- **Recommended first-consumer sequence:** portfolio (already using the convention) → second project (probably NASA Picture Proxy or OBR webview) as the first validation of the abstraction. Second consumer always reshapes the first design; don't over-build before that happens.
