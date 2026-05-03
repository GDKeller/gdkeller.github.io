---
type: task
status: done
priority: 3
created: 2026-04-11
completed: 2026-05-02
parent: EPIC-0001
---

# Introduce a secondary-emphasis token for the `emerald-300` role

During TASK-0016 migration, `emerald-300` kept showing up as a distinct role that doesn't fit cleanly into the current attention hierarchy (`foundation` = 100 / `emphasis` = 200 / `accent` = 400 / `highlight` = fuchsia-500). It sits _between_ emphasis and accent — bright enough to pop past body copy but not demanding action.

## Where it appears

- Secondary headings (e.g. modal "Let's Connect")
- Hover states for subtle links
- Date spans and timeperiod labels
- Decorative wave color in Header's oscilloscope animation
- Footer link hovers (pre-manual-cleanup)
- Nav-link hover glow gradients

The recurrence suggests a real role that deserves a name, not just drift.

## The decision

Does `emerald-300` represent:

- **(a)** A fourth rung between `emphasis` and `accent` — another step on the attention hierarchy?
- **(b)** The hover variant for something else (e.g. a "muted emphasis" base whose hover brightens to 300)?
- **(c)** An orthogonal role — "the color of text that's interactive but not a call-to-action", i.e. a subtle-link color?

Option (c) is the most defensible: interactive text that shouldn't read as a button (accent) or a screaming link (highlight) but should still clearly be clickable. The fact that it shows up primarily on hover states and secondary links supports this reading.

## Naming candidates

- `subtle-emphasis`
- `muted-accent`
- `interactive` (too broad)
- `secondary`
- `link` ← rejected in TASK-0016 because link color depends on context; revisit if (c) is the right read

## Scope

1. Pick a name that passes the "does every use of this token want to move together" test.
2. Add it to `global.css` `@theme inline` block.
3. Update CLAUDE.md color-tokens section.
4. Migrate the identified usages. `emerald-300` standalone (no opacity) appearances first; opacity-modified cases coordinate with TASK-0025.
