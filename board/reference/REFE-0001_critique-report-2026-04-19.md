---
type: reference
created: 2026-04-19
topic: design-critique
tags: [critique, design-system, ux]
---

# Portfolio critique — 2026-04-19

**Target:** main portfolio page (`src/pages/index.astro` + components)
**Reference:** `/styles` design-system page (tokens verified against live values)
**Thesis under review:** near-future Soviet spy/engineer classified dossier on a CRT terminal. Dark only. Emerald dominant, fuchsia punctuation.

---

## Design health score

| #         | Heuristic                   |     Score | Key issue                                                               |
| --------- | --------------------------- | --------: | ----------------------------------------------------------------------- |
| 1         | Visibility of system status |         3 | Oscilloscope + hero→headshot swap carry state well                      |
| 2         | Match system & real world   |         3 | Dossier metaphor consistent in Hero + CurrentlyBuilding; fades mid-page |
| 3         | User control & freedom      |         3 | Modal has ESC/backdrop dismiss; thumbnails reversible                   |
| 4         | Consistency & standards     |         2 | Four competing heading treatments for the same job                      |
| 5         | Error prevention            |         2 | Low surface area; no forms to validate                                  |
| 6         | Recognition over recall     |         3 | Sticky header, visible anchors, thumbnail strip                         |
| 7         | Flexibility & efficiency    |         2 | No skip link; only one path to Contact; mobile Contact is icon-only     |
| 8         | Aesthetic & minimalist      |         2 | Hero stacks 3 radial gradients + siren + glitch + noise + scanlines     |
| 9         | Error recovery              |         2 | N/A for static portfolio; neutral                                       |
| 10        | Help & documentation        |         3 | `/styles` page exists; content self-explanatory                         |
| **Total** |                             | **25/40** | **Good (lower end)**                                                    |

---

## Anti-patterns verdict

### LLM assessment

Not AI slop overall. The site clearly fights template defaults and mostly wins. Distinctive wins:

- **Type stack** — Bayon, Bokor, Karantina, Manufacturing Consent, Permanent Marker, IBM Plex Mono. Zero Inter/Roboto/Outfit/Plus Jakarta tells. (`src/layouts/Layout.astro:26`)
- **Hero ID-card Polaroid** with Operative / Assignment / Territory / Coordinates is on-thesis and memorable. (`src/components/Hero.astro:48-67`)
- **Oscilloscope SVG wave** with energy-modeled amplitude + pause-on-hidden. Craft-level detail. (`src/components/Header.astro:205-314`)
- **"Plate 001 ::: Active Operations"** callout with bracket marks is real art direction. (`src/components/CurrentlyBuilding.astro:73-99`)
- Palette is oklch-based semantic tokens (`src/styles/global.css:97-113`), not stock Tailwind.

**Slop patterns that do leak in (mid-page drift):**

- **Border-left accent stripe** on Job/Project cards — the single most overused template pattern. (`src/components/JobSingle.astro:77-79`, `src/components/ProjectSingle.astro:115-118`)
- **Purple/blue/indigo gradient blockquote** at `src/components/ProjectSingle.astro:146` (`from-purple-600/15 via-blue-800/25 to-indigo-700/20`). Directly violates the emerald+fuchsia thesis. Confirmed by the automated scan.
- **Generic emerald gradient card bg** on Talks (`src/components/Talks.astro:62`) reads as a safe gradient-card template rather than a dossier object.

**Verdict:** a design director would say _"a person with taste made this,"_ but the middle of the page (Featured Work → Jobs → Talks) reverts to portfolio-template shapes. The thesis is a costume the hero wears, not the architecture of the whole page.

### Deterministic scan

`npx impeccable --json src/pages src/components src/layouts` — exit 0, 9 findings.

**True positives worth acting on:**

- **ai-color-palette** `src/components/ProjectSingle.astro:146` — purple→blue→indigo pull-quote. Off-thesis.
- **pure-black-white** (×5) — raw `bg-black` in `CurrentlyBuilding.astro:73,86,95,185` and `FishHero.astro:37`. Tokenization gap: project defines `--color-background` (tinted black) but these bypass it.
- **bounce-easing** `src/components/CurrentlyBuilding.astro:228` — `animation-name: attention-bounce`. Worth a motion-review pass; bounce easing reads dated.

**False positive:**

- `index.astro:25` ai-color-palette hit is inside an HTML comment. Delete the commented code anyway for cleanliness.

**Grep sanity check:**

- `bg-clip-text`: **0 hits** (no gradient-text crime).
- `border-l-[n]` / `border-r-[n]` accent-width: **0 hits** (no arbitrary accent stripes — but Tailwind's default `border-l-*` utilities are still in use on the cards noted above).
- Diffuse `teal→blue-950` atmospheric washes exist in `SkillsCard`, `JobSingle`, `SkillBadge`, `FishHero` at 10–40% opacity. Technically off a strict "emerald only" reading; in practice they read as depth, not AI blue. Decide whether the thesis allows blue-950 as a deep-atmosphere neutral.

---

## Cognitive load — 4 / 8 fail

- (c) **Inconsistent patterns** — four heading treatments: `section-heading`, `section-heading__center`, inverted emerald slab, plain `font-bokor`.
- (d) **Unclear primary action** — no CTA in the hero; Contact button is the same visual weight as GitHub/LinkedIn/Resume in the sticky header.
- (f) **Similar-looking elements, different behaviors** — Contact (button → modal), Resume (anchor → PDF), GitHub/LinkedIn (external anchors) share identical styling. (`src/components/Header.astro:81-122`)
- (h) **Competing focal points** in hero — headshot card + Karantina kinetic type + secondary tagline + siren animation + logo carousel all fight for first-scroll attention.

Passes: decision density (a), text chunking (b), jargon anchoring (e), progressive disclosure (g — `<details>` on secondary skills).

**4 failures = moderate load.**

---

## Emotional journey

**Peak lands at first scroll.** The hero's Polaroid + Karantina ultracondensed "Deep space / deep sea" + siren pulse is genuinely "whoa." CurrentlyBuilding sustains the dossier identity with thumbnail strip, inverted slab, corner brackets.

**Valley hits at Featured Work.** NY Post section collapses to two huge numbers ("391 million," "65 million"), a screenshot, a prose block, and a "Technologies:" list. The dossier thesis evaporates; it reads as a standard case-study card. The purple pull-quote gradient is the moment a reviewer thinks _"oh, this is just a portfolio after all."_

**Dead-scroll in Jobs** (~800–1200px of similar cards with the same border-left stripe). Awards recovers energy (gold drop-shadows, counters). Talks is flat. The anglerfish finale is undersold by a plain `font-bokor` "Beyond the Screen" heading with no scanline or slab treatment.

**Peak-end rule: the end does not land as hard as the open.**

---

## What's working

1. **Hero Polaroid ID card** (`src/components/Hero.astro:32-72`) — signature moment. Distinctive, on-brand, hand-built.
2. **Oscilloscope wave in header** (`src/components/Header.astro:205-314`) — energy-modeled amplitude + pause-on-hidden is the kind of detail a hiring manager notices in devtools.
3. **CurrentlyBuilding viewer + thumbnail pattern** (`src/components/CurrentlyBuilding.astro:86-216`) — strongest art direction after the hero. Plate metadata, corner brackets, interactive panel switching.

---

## Priority issues

### [P0] No primary CTA in the hero

- **Why it matters:** a 30-second hiring manager has no visible "next step" after the hero. Contact is buried in a top-right stack of four visually identical controls.
- **Fix:** add one dominant dossier-styled CTA inside `Hero.astro` below the tagline. "TRANSMIT," "OPEN FILE," "Begin briefing" — something on-thesis. Make it the single clearest action on first viewport.
- **Suggested commands:** `/clarify` → `/bolder`

### [P1] Jobs/Projects cards revert to generic portfolio template

- **Why it matters:** the emerald→teal→blue left-border stripe on `JobSingle.astro:77-83` and `ProjectSingle.astro:115-121` is the most recognizable template pattern in AI-generated portfolios. Plus the purple/blue/indigo gradient blockquote at `ProjectSingle.astro:146` literally inverts the thesis.
- **Fix:** replace the stripe with a dossier gesture — manila-tab corners, redaction bars, a classification stamp, a left-margin typewritten file number. Delete the purple gradient; replace with emerald or fuchsia wash at low opacity.
- **Suggested commands:** `/shape` (re-design the card) → `/colorize`

### [P1] Heading system is inconsistent across sections

- **Why it matters:** four treatments (`section-heading`, `section-heading__center`, inverted slab, plain `font-bokor`) fragment the visual language. The strongest and most on-thesis is the inverted emerald slab used in CurrentlyBuilding. Passion Projects and Beyond the Screen look unfinished by comparison.
- **Fix:** make the inverted slab the primary section header everywhere; demote the scanline `section-heading` to a secondary tier; remove the plain `font-bokor` one-offs.
- **Suggested commands:** `/typeset` → `/polish`

### [P2] Hero has atmospheric overload

- **Why it matters:** three radial gradients (`Hero.astro:130-138`) + siren animation + glitch overlay + noise + scanline frames (`index.astro:101-117`) stack into visual noise that competes with the type. On low-end machines this thrashes the compositor.
- **Fix:** pick one atmospheric device per layer — siren OR glitch, noise OR frame, not both. Let the Karantina type breathe. Check reduced-motion fallbacks.
- **Suggested commands:** `/quieter` → `/optimize`

### [P2] Featured Work container dilutes two unrelated pieces

- **Why it matters:** "Featured Work" groups the NY Post traffic-number brag with the OBR Tauri+CoreML macOS product. OBR is the more differentiated work but gets buried second. The container heading flattens both.
- **Fix:** split into "Featured Case Study" (one piece) and promote OBR either to its own section or to a position adjacent to the hero. A shipping macOS product is a stronger opening move than traffic numbers.
- **Suggested commands:** `/layout` → `/distill`

---

## Persona red flags

**Skimming hiring manager (30s, desktop).** Lands, peaks on hero at 8s, engages with CurrentlyBuilding thumbnails 10s, scrolls past Featured Work in 5s. **Red flags:** no visible CTA before Jobs; Contact button is indistinguishable from three neighbors in the header; doesn't know if Grant is available. Closes tab without converting.

**Engineering manager looking for depth (2-3min, desktop).** Opens devtools out of curiosity, finds the energy-modeled GSAP oscilloscope — positive signal. **Red flags:** `SkillsGrid` lists "ThreeJS," "TUI," "ESP32," "Stable Diffusion / ComfyUI" as equal-weight flat tags — can't tell if Grant shipped a ThreeJS scene or tried it once. Needs tier / depth signal per skill.

**Recruiter on mobile (1min, iPhone).** Sticky header eats vertical real estate while the hero is still on screen. `Hero.astro:80-91` sizes Karantina at `lg:text-[12vw]` which may render off-viewport on narrow screens. **Red flags:** `Header.astro:107` hides the "Contact" label below `sm` — on mobile the Contact control is icon-only with no visible affordance. Recruiter may not realize it's the contact button.

---

## Minor observations

- `src/pages/index.astro:22` — `<Footer>` and fixed bg live _outside_ `<main>`. Works, but unusual.
- `src/pages/index.astro:24-25` — delete commented-out gradient overlays.
- `src/components/Hero.astro:84` — the "to" span is both `sr-only` and styled as a visible pill. Pick one.
- `src/components/Nypost.astro:116-120` — `<style>` nested inside the JSX content block rather than at component scope. Brittle.
- `src/layouts/Layout.astro:95` — `background: #13151a` hardcoded on `html` doesn't match `--color-background`. Align or remove.
- `src/components/SkillsGrid.astro:109` — raw `emerald-400/30`, `emerald-950/40`. Violates the CLAUDE.md rule against raw `emerald-*` classes; migrate to tokens (`text-emphasis`, `bg-subtle`, etc.).
- `src/components/Passion.astro` heading has no scanline treatment unlike peers — looks unfinished.
- `bg-black` → should be `bg-background` to pick up the tinted-black token (`CurrentlyBuilding.astro:73,86,95,185`, `FishHero.astro:37`).

---

## Questions to consider

1. **What if the entire page were one continuous dossier, not a portfolio with a dossier hero?** Every section heading as a stamped classification marker ("PLATE 002 — PRIOR POSTINGS"), every card a tabbed manila folder, every tech tag a typewritten annotation. The thesis is currently a costume the hero wears — could it be the architecture?
2. **What if Contact weren't a button at all** but a terminal-prompt input that accepts an email? A dossier "request briefing" interaction. Would turn the weakest conversion moment into the strongest delight moment.
3. **Is "Currently Building" actually the lead?** A shipping Tauri + CoreML macOS product is a stronger opening move than "worked on a site with big traffic." Consider promoting OBR above or adjacent to Featured Work.

---

## Recommended action sequence

Priority-ordered, to be run one at a time, after the user confirms direction:

1. `/impeccable:clarify` — add a dossier-styled hero CTA + resolve the Contact button's identity against its siblings.
2. `/impeccable:shape` → `/impeccable:colorize` — redesign Job/Project cards away from border-left stripe; kill the purple/blue/indigo blockquote gradient.
3. `/impeccable:typeset` — unify section-heading system on the inverted-slab primary.
4. `/impeccable:quieter` → `/impeccable:optimize` — thin hero atmospheric stack; audit motion + paint cost.
5. `/impeccable:layout` → `/impeccable:distill` — restructure Featured Work; promote OBR.
6. `/impeccable:polish` — final pass: tokenize `bg-black`, align Layout html bg, scrub `emerald-*` raw classes, delete commented code.

Re-run `/impeccable:critique` after fixes to measure score delta.
