---
type: note
status: inbox
created: 2026-04-11
---

# "Currently Building" section after hero

A new top-of-page section that surfaces in-flight personal work so visitors immediately see Grant actively shipping — before the polished Featured Work / resume material. Part of the ongoing reorder (see NOTE-0006): the hero sells the person, this section sells the velocity, then Featured Work proves depth.

## Placement

- Inserts directly after `<Hero />` + `<Header />`, before Featured Work.
- Full-bleed on its own stacking context so it can have a distinct atmosphere from the main content strip.
- Probably no `SectionDivider` between Hero and this section — they should feel adjacent, as if the hero hands off directly.

## Candidate entries

**Branding distinction:** OBR is legally a Davant product from a business standpoint, but it doesn't fit the outward-facing Davant brand and should be presented in this section as a standalone project, not lumped with Davant Studio / Magic Mirror. Davant Studio and Magic Mirror are the two products that carry the Davant brand publicly.

| # | Project | Badge | URL | Description |
|---|---------|-------|-----|-------------|
| 1 | Offline Background Remover | — | https://www.davantsystems.com/offline-background-remover/ | Tauri v2 macOS app for fully on-device AI background removal. Launching on the Mac App Store. Keeps its existing Featured Work section as the deep-dive case study; the Currently Building entry is the elevator pitch. Presented standalone — no Davant badge, even though it ships under Davant Systems as a business entity. |
| 2 | Davant Studio (v2) | Davant | https://www.davantsystems.com/davant-studio/ | "AI image tools for creative professionals" — real-time art & design assistant for Mac and Windows. **v1 is deprecated; v2 is closing in on a release candidate with a substantially nicer UI.** This makes Davant Studio the single most literally "currently building" entry in the section. **Ship with a "v2 launching soon" placeholder tile** — a device frame with a muted/redacted screen and a clear "launching soon" label — then swap in real v2 screenshots once the RC lands. Do NOT use the v1 marketing page screenshot at `davant-studio-source.png`. |
| 3 | Magic Mirror | Davant | https://www.davantsystems.com/photobooth/ | AI Photo Booth for events — captures a photo every 3 seconds and uses generative AI to transform guests in real-time (paper origami, felt puppets, comic book heroes, etc.). Southern California events + nationwide brand activations. |
| 4 | ChromaCurve | — | https://chromacurve.style/ | Parabolic saturation correction for monochromatic color palettes. A focused tool for designers working in single-hue systems. |
| 5 | NASA Picture | — | https://nasapicture.com/ | Static proxy of NASA's Astronomy Picture of the Day — a gallery-style display page plus an API for developers. |

**Source screenshots captured in `src/images/current/*-source.png`** — these are raw full-page grabs from the live sites and need to be cropped/resized + converted to WebP before shipping. Keep them as the starting point; don't re-fetch.

**Implication for workbench layout:** the Davant-branded entries (2, 3) can share a subtle visual grouping cue — same corner badge, tied-together shadow, a thin "Davant" watermark — while OBR, ChromaCurve, and NASA Picture sit as independent objects on the workbench. The grouping shouldn't be heavy-handed; the point is "these two carry the Davant label" not "these are in a bucket."

## Data & component strategy

**Decision: new `current` content collection.** Add a `current` entry to `src/content/config.ts` alongside `jobs` / `projects` / `skills` / `featured`, create `src/content/current/*.md` for each project, and write a new `CurrentlyBuilding.astro` component that reads from the collection.

Schema:

```ts
const current = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
    description: z.string(),             // one-line, ≤ 80 chars
    image: z.string().optional(),        // path under src/images/current/
    imageAlt: z.string().optional(),
    tech: z.array(z.string()).optional(),
    status: z.enum(["live", "beta", "launching-soon"]).optional(),
    brand: z.enum(["davant"]).optional(), // for the Davant grouping cue
    order: z.number().optional(),         // manual workbench placement control
  }),
});
```

Rationale: the section is inherently high-churn (entries rotate as projects ship), matches the site's existing content-collection pattern, and keeps layout concerns in the component while content lives as plain markdown Grant can edit without touching code. Schema includes `status` for the Davant Studio "launching soon" placeholder case and `brand` for the light grouping cue called out in the entry table.

## Visual treatment

**Direction: pseudo-workbench.** Each entry sits as a physical-feeling object on a shared surface — a mix of slight rotations, overlap, shadow depth, and scattered placement so the whole composition reads as "Grant's desk where these things are actively being made," not a grid of cards. Anchors the "active output" message in a diegetic way that lines up with the rest of the site's craft-over-convention ethos.

**Surface:** dark brushed-metal / workshop steel — near-black base with subtle linear brushed texture, faint micro-scratches, and a cold emerald rim-light bleeding in from the edges (consistent with the site's neon-on-black palette). NOT wood, paper, or fabric — those skew cozy and clash with the cyberpunk-adjacent aesthetic. The surface should recede: the project objects read as the foreground, the surface as the context. A subtle vignette at the corners pulls focus toward the center cluster.

Design directions:

- Slight `rotate-[-1deg]` / `rotate-[2deg]` variation per entry for the hand-placed feel (sourced from the `order` field + a per-entry rotation, or deterministic from the index).
- Drop shadows tuned to feel like raised objects on a steel surface, not floating UI — short, tight, dark shadows rather than long diffuse ones.
- One entry is larger and slightly center-weighted (the "focal" object) with the others clustered around it — natural focal hierarchy. OBR likely sits as the featured centerpiece given its shipping status and the existing Featured Work deep dive.
- Davant Studio (v2 launching soon) is a redacted device frame — screen blurred/darkened with a "launching soon" label in the same Permanent Marker handwritten tag style as the section label. Signals presence without misrepresenting.
- Entries are real `<a>` wrappers, so the whole object is the tap target. Hover: subtle lift (2–3px translate), shadow intensifies, optional faint emerald rim-light on the object edge — reinforces the "pickable" feel.
- Reduced-motion users still get the composition and rotation — just no hover lift, no animated surface rim-light.

Constraints: must survive responsive collapse. On mobile the workbench flattens — entries stack vertically as single cards, still with slight rotation but drastically reduced overlap. The brushed-steel surface carries through; the rim-light shifts to framing the stacked cards rather than cornering the horizontal composition.

## Heading / label

**"Currently Building"** — straightforward, action-present-tense, no cleverness needed. The workbench treatment does the personality work; the label just names what you're looking at.

**Transition from hero:** keep the heading, but style it smaller and more intimate than the grand `section-heading` used elsewhere — think a hand-labeled tag on the edge of the workbench rather than a section title. Permanent Marker font (already loaded per `CLAUDE.md`) fits: visually reads as Grant's own handwriting labeling his desk, consistent with the diegetic intent. No subheading, no sell copy. The objects on the workbench speak for themselves.

Implementation sketch: small `font-permanent-marker` label anchored to the top-left of the surface, angled slightly, in emerald — like a taped-on tag. No `SectionDivider` between Hero and this section; they should feel adjacent.

## Interaction with existing sections

- **OBR featured section** (`OfflineBgRemover.astro`): **keep as-is.** It works, it's recently built, and the two surfaces do different jobs — "Currently Building" names OBR as active Davant work alongside Magic Mirror, while the Featured Work section remains the polished case study. OBR gets two surfaces, which is appropriate for Grant's flagship shipping product.
- **Projects collection** (`src/content/projects/`): these are historical client projects. "Currently Building" is personal/active work under Davant Systems. Different collections, different framing — no overlap.
- **Section reorder commit `8edaf08`**: the new "Currently Building" section slots in above Featured Work, unchanged otherwise.

## Per-entry content requirements

Each entry needs:

- **Title** (display name)
- **URL** (external link — opens in new tab)
- **One-line description** (≤ 80 chars, punchy)
- **Thumbnail/hero image** (consistent aspect ratio; store in `src/images/current/`)
- **Optional tech chips** (3–5 max — Tauri, React, Swift, etc.)
- **Optional status pill** ("Beta", "Launching soon", "Live") — only if meaningful

## Accessibility & responsive notes

- Cards need real `<a>` wrappers with descriptive accessible names, not onClick handlers.
- Images need alt text — not decorative.
- Marquee (if chosen) must respect `prefers-reduced-motion`.
- External links: `target="_blank" rel="noopener noreferrer"`.
- Tap targets ≥ 44×44 on mobile.

## Open questions / decisions

1. ~~Davant structure~~ — **Resolved:** Davant is the brand; Davant Studio and Magic Mirror are its two outward-facing products. OBR is a Davant product from a business standpoint but is presented standalone here.
2. ~~Magic Mirror details~~ — **Resolved:** AI Photo Booth at https://www.davantsystems.com/photobooth/ (live, booking for events).
3. ~~Keep the existing OBR featured section~~ — **Resolved:** keep as-is.
4. ~~Content collection or inline~~ — **Resolved:** new `current` content collection with the schema above.
5. ~~Visual treatment~~ — **Resolved:** pseudo-workbench on dark brushed-metal surface.
6. ~~Section label~~ — **Resolved:** "Currently Building".
7. ~~Heading/subheading treatment~~ — **Resolved:** Permanent Marker hand-tag label on the workbench edge, no subheading, no `SectionDivider` between Hero and this section.
8. ~~Surface texture~~ — **Resolved:** dark brushed-metal / workshop steel with emerald rim-light.
9. ~~Davant Studio v2 launch timing~~ — **Resolved:** ship with a "v2 launching soon" placeholder tile for Davant Studio; swap in real screenshots once the v2 RC lands.

All decisions locked. Ready to build.

## Rough build sequence (once decisions are made)

1. Resolve TBDs above — get descriptions, screenshots, final URLs for each entry.
2. Create `src/content/current/` collection and schema (if going with option 2).
3. Drop entry markdown files into `src/content/current/`.
4. Build `src/components/CurrentlyBuilding.astro` with the chosen visual treatment.
5. Mount in `src/pages/index.astro` between `<Header />` and the Featured Work section.
6. Verify responsive + reduced-motion + keyboard nav in Chrome.
7. Decide OBR featured section fate; execute if retiring.
</invoke>