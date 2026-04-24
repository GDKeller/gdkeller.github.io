---
type: note
status: inbox
created: 2026-03-27
---

# Design Direction Refinements

User feedback captured 2026-03-27.

## 1. Eliminate Border Radius

Border radius feels like it's working against the cyberpunk/technical vibe. Remove it sitewide.

**Affected locations (~25 instances across 10 files):**

- `Hero.astro` — `rounded-xl` on hero card, headshot container, and inner border overlay
- `Header.astro` — `rounded-full` on oscilloscope, headshot logo, GitHub icon; `rounded` on LinkedIn icon; `rounded-sm` on Resume and Contact buttons
- `Footer.astro` — `rounded-lg` on both CTA buttons
- `index.astro` (contact modal) — `rounded-lg` on all 4 contact cards; `rounded-full` on icon circles
- `Nypost.astro` — `rounded-tl-md` on red banner
- `FishHero.astro` — `rounded-lg` on info box
- `OfflineBgRemover.astro` — `rounded-t-[3.5%]` on video container; `rounded-md` on CTA button
- `ProjectSingleImage.astro` — `rounded-lg` on project images
- `Awards.astro` — `rounded-full` on count badges
- `global.css` — `border-radius: 4px` on `:focus-visible`

**Exception to consider:** The oscilloscope circle and headshot in the header are intentionally circular (`rounded-full`) — these may want to stay round since they represent actual circular objects.

## 2. Anglerfish Section Image Treatment

The exhibit photos in FishHero.astro currently float with no visual container. They should feel like they're mounted on a museum wall.

**Suggested treatment:** Wrap each image in a container with:

- Black background
- Generous padding (like a thick matte frame)
- Maybe a subtle border or shadow to create depth
- Think museum gallery — clean, formal, deliberate placement

**Affected images in FishHero.astro:**

- `anglerfishDisplayClose` (line ~94)
- `anglerfishDisplayFront` (line ~148)
- `anglerfishDisplayFull` and `anglerfishSpecimen` (lines ~157-161)

## 3. DaisyUI Removal → Radix Primitives

User has moved away from DaisyUI. Replace with Radix primitives.

**Current DaisyUI usage:**

- `modal`, `modal-box`, `modal-backdrop` — contact modal in `index.astro` (the primary DaisyUI dependency)
- `btn`, `btn-circle`, `btn-ghost`, `btn-sm` — modal close button
- `stat`, `stat-title` — NYPost stats in `Nypost.astro`
- `divider`, `divider-neutral` — Skills section divider in `SkillsGrid.astro`
- DaisyUI plugin loaded in `tailwind.config.mjs`
- Referenced in `package.json` devDependencies
- Mentioned in Footer.astro "Built with" list
- Listed in `davant-systems-lead-software-engineer.md` job entry tech stack

**Migration plan:**

- Modal → Radix Dialog primitive (or native `<dialog>` since it's already using `<dialog>`)
- Buttons → replace DaisyUI `btn` classes with Tailwind utilities
- Stats → replace with plain Tailwind layout
- Divider → replace with Tailwind border or custom utility
- Remove `daisyui` from `tailwind.config.mjs` plugins and `package.json`
- Remove DaisyUI from Footer "Built with" list

**Important:** This is a dependency swap, not a redesign. The visual output should remain essentially unchanged — just removing the DaisyUI dependency and replacing its utility classes with equivalent Tailwind or Radix primitives.

**Note:** Since the modal already uses the native `<dialog>` element, Radix Dialog may be unnecessary. Could just style with Tailwind directly.

## 4. Custom Color Palette & Semantic Tokens

Stock Tailwind colors are recognizable to anyone who's used Tailwind. Two-part fix:

### Part A: Hue Shift

Shift the emerald, teal, fuchsia, and other palette hues slightly so they don't read as stock Tailwind. This can be done in `tailwind.config.mjs` by overriding the color scales with custom HSL values.

**Current color usage (203 occurrences across 18 files):**

- `emerald-*` — dominant (text, borders, backgrounds, glows, gradients)
- `teal-*` — secondary (gradients, accents)
- `fuchsia-*` / `pink-*` / `rose-*` — accent (name, active states, links)
- `blue-950` — OBR section (already flagged for normalization in TASK-0012)
- `purple-*` / `indigo-*` — FishHero color grading
- `green-500` / `slate-*` — FishHero overlays

### Part B: Semantic Tokens

Move from raw color references to semantic CSS custom properties:

```css
:root {
  --color-bg: ...; /* black base */
  --color-surface: ...; /* elevated surfaces */
  --color-text-primary: ...; /* emerald-200 equivalent */
  --color-text-muted: ...; /* emerald-200/70 equivalent */
  --color-accent: ...; /* emerald-400 equivalent */
  --color-accent-glow: ...; /* for text-shadow/box-shadow */
  --color-highlight: ...; /* fuchsia equivalent */
  --color-border: ...; /* emerald-400/20 equivalent */
}
```

Then reference these tokens in Tailwind config via `theme.extend.colors` so classes like `text-accent` and `bg-surface` work throughout.

**This is a large refactor** — 203 color references across 18 files. Consider doing it in phases:

1. Define tokens and shifted palette in `tailwind.config.mjs`
2. Migrate one section at a time (header → hero → skills → etc.)
3. Verify each section visually before moving to the next
