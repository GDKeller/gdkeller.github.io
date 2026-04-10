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
- **Tools:** `?tools=palette,grid` replaces the tool set entirely with `{palette, grid}`. `?tools=` clears it completely.
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
- Is a shared npm package worth it? Not yet — the file is ~30 lines and copy-paste keeps each project free to evolve independently. Revisit if three or more projects adopt it and drift becomes a problem.
