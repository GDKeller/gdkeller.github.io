# Design Brief: Tactile Future

## Thesis

**"Tactile hard sci-fi future with slight medieval twist."**

The aesthetic of hand-drafted precision engineering applied to a modern, minimal interface. Not retro — the hand-crafted rigor of the drafting table applied to the digital present. Real texture from real materials: film stock, ink on vellum, stenciled part numbers, handwritten marginalia. Every mark is load-bearing or it goes.

The site should make a design director ask "how was this made?" — not "which AI made this?"

---

## Two Voices

The entire design system operates on a tension between two typographic/visual registers:

### The Document Voice (impersonal, systematic, rigorous)
- **Typography**: IBM Plex Mono — part numbers, scale bars, stamp captions, marginalia, tech stacks
- **Visual language**: thin drafting lines, registration crosshairs, corner brackets, film rebate numbers, ruler ticks
- **Color**: near-zero — white/gray at low opacity, ink-on-paper contrast
- **Role**: the system, the infrastructure, the scaffolding that says "this is an engineering document"

### The Author Voice (human, hand-crafted, warm)
- **Typography**: Bokor — section titles, display numerals, hero headline (the illuminated capital)
- **Typography**: Bayon — utility headings, entry titles (the modernist bridge)
- **Visual language**: Bokor's ornamental letterforms, hand-drawn frames, ink strokes, stenciled labels
- **Color**: the site's emerald/fuchsia palette — used sparingly, only where the author is claiming authorship
- **Role**: the maker, the human hand, the "this was crafted by a person who cared"

### The Bridge
- **Typography**: Prompt — body copy, descriptions (neutral, serves both registers)
- **Color tokens**: `foundation`, `emphasis`, `accent` — these live between the two voices

### The Rule
Never use a font outside its register. Plex Mono never renders a section heading. Bokor never shows up in a tech chip. The discipline is what makes the system read as intentional rather than maximalist.

---

## Typography System

| Register | Font | Role | Examples |
|---|---|---|---|
| Author — illuminated | **Bokor** | Display titles, hero, section headings, stat numerals | "Currently Building", "Featured Work", "391 million" |
| Author — modernist | **Bayon** | Utility headings, entry titles, subheadings | "OFFLINE BACKGROUND REMOVER", "DAVANT STUDIO" |
| Document — body | **Prompt** | Paragraphs, descriptions, body copy | Project descriptions, job descriptions |
| Document — technical | **IBM Plex Mono** | Part numbers, marginalia, rulers, stamps, tech stacks | "PLATE 01 / ACTIVE WORK / SHEET 01 OF 08", "TAURI V2 / RUST / REACT" |

**Permanent Marker** remains loaded but is currently unused in code. Reserved as a potential hand-annotation voice if the need arises — pencil notes on a draft. Don't force it in.

---

## Color Philosophy

### Emerald is rare and meaningful
The engineering-document thesis requires visual austerity. Emerald everywhere cancels the thesis. The section-level palette should feel like looking at a drafted sheet under fluorescent light.

- **Structural elements** (borders, rules, frames, dividers): white/gray at low opacity — drafting-line weight, ink on vellum
- **Text**: uses the site's semantic color tokens (`foundation`, `emphasis`) — these are emerald-tinted by definition, and that's fine; it's the site's identity
- **Interactive states only**: emerald appears on hover/focus as the signal that something is alive. This is the ONLY place emerald chrome shows up in structural elements
- **Fuchsia**: maximum demand, used at most once or twice per page — a stamp, a highlight, a "you should look at this" mark

### The global overlay shapes everything
The fixed `#bg__main` overlay (`mix-blend-difference` at 60%) with the glitch video texture sits on top of the entire page at z-50. Every color on the site passes through this filter. Neutral grays shift hue. The grid lines pick up tint. This is a feature, not a bug — it means we can use neutral source assets and the overlay gives them the site's characteristic color personality for free.

---

## The Part-Number System

Every section and every content entry gets a part number. The numbering is visible in corners, metadata lines, and section inscriptions. This is the single most unifying element of the document voice.

### Section Plates

| Plate | Section | Status |
|---|---|---|
| PLATE 00 | Hero / Title Block | — |
| PLATE 01 | Currently Building | ACTIVE WORK |
| PLATE 02 | Featured Work (Case Files) | — |
| PLATE 03 | Skills (Capabilities) | — |
| PLATE 04 | Experience (Project History) | — |
| PLATE 05 | Projects | — |
| PLATE 06 | Awards | — |
| PLATE 07 | Talks | — |
| PLATE 08 | Anglerfish (Beyond the Screen) | — |

### Entry References

Within each plate, entries are numbered `XX.YY`:
- `01.01` Offline Background Remover
- `01.02` Davant Studio
- `01.03` Magic Mirror
- `01.04` ChromaCurve
- `01.05` NASA Picture
- `02.01` NY Post
- `02.02` OBR Featured
- `04.01` First job, `04.02` Second job, etc.

### Inscription Template

Each section heading follows the same duet pattern:

```
[thin gray rule]
PLATE 01 / ACTIVE WORK / SHEET 01 OF 08     ← IBM Plex Mono, small, letter-spaced, dim
Currently Building                            ← Bokor, large display, full emphasis
```

The mono line is marginalia. The Bokor line does the talking. Together they're a drafting inscription.

---

## Film Frames as Content Containers

The hero section already uses a film-holder/specimen-label treatment. This extends to the rest of the site: **project screenshots and content entries sit INSIDE real film frames** instead of CSS card borders.

### Why this works
- The white rectangle in each frame IS where the content goes — the frame becomes the card border
- Film rebate, stock names, and frame numbers provide document-voice metadata for free
- Each frame has unique edge wear, grain, and marginalia — automatic variation without a template
- Connects directly to the hero's existing film-holder concept
- The global `mix-blend-difference` overlay gives the frames the site's color personality

### Asset Mapping: Currently Building

| Entry | Frame Source | Rationale |
|---|---|---|
| OBR (focal) | Large-format single frame (Film_126 or Film_177 HABS) | Big, archival, imposing — the flagship specimen |
| Davant Studio (placeholder) | Blue negative (Film_191) or NASA STS-105 frame (Film_186) | An unexposed/undeveloped frame literally says "not ready yet" — the placeholder concept expressed in the medium |
| Magic Mirror | Individual LUMINA strip frame (Film_198) | Clean, modern film stock, square format |
| ChromaCurve | Individual LUMINA strip frame (Film_198, different cell) | Same stock, different frame number — cohesive but not identical |
| NASA Picture | Individual frame from 4-up contact sheet (Film_131) | The "DIRECT FORMAT FILM 5400" text adds incidental document voice |

### Asset Mapping: Sitewide (Future)

| Use | Frame Source | Notes |
|---|---|---|
| Projects grid | 10-up proof sheet (Film_124) | Each project in a contact-sheet cell |
| Logo carousel / Talks | 35mm strip (Film_125) | Horizontal strip with sprocket holes |
| Job entries | Large blank negatives (Film_128, Film_149) | Section-level background texture |
| Section backgrounds | Dark exposed negatives with edge marginalia | Low-opacity atmospheric layer |

### Processing Requirements

For each frame to use:
1. Cut the white/light center out as transparent (alpha mask)
2. Keep the full frame edges, rebate, marginalia, tape, grain — that IS the value
3. Export as PNG with alpha, ~1200–1500px wide
4. The component composites the project screenshot BEHIND the frame overlay
5. The global `mix-blend-difference` overlay handles color integration

---

## Hand-Drawn Asset Library

Source: TextureLabs ink/paint packs. These replace CSS-rendered elements with real physical marks.

### Numerals (Composable Digit System)
**Source**: InkPaint_207L — hand-drawn 0–9 plus dot, dash, slash on white background.

Cut each glyph as an individual transparent PNG. Compose any part number dynamically by laying glyphs side-by-side. Used for:
- Stenciled plate numbers in section headers (replacing mono text where the physical mark reads better)
- Large display numbers (stat callouts, award counts)
- Entry reference numbers at physical scale

### Stenciled Labels
**Source**: Details_183 slices — "PLATE 25", "R162 044", "AS BUILT", "INFORMATION ONLY", "DECLASSIFIED"

Use sparingly — maximum 2 stamps on the entire page:
- **Hero**: faint "AS BUILT" or "INFORMATION ONLY" stamp in the corner — sets the document framing
- **Footer**: matching "END OF DOCUMENT" closure stamp

### Ink Brush Strokes (Section Dividers)
**Source**: InkPaint_209XL — horizontal strokes of varying weight and texture.

One unique stroke per section boundary, replacing the current `SectionDivider` component. Each stroke is different (varied weight, texture, length) — real ink, not a repeated asset.

### Hand-Drawn Rectangles (Card Frames)
**Source**: InkPaint_210XL — hand-drawn boxes in various styles (thick charcoal, thin line, sketchy, heavy).

Alternative to film frames for specific contexts:
- Annotation boxes around callouts
- Highlight frames for featured content
- May not be needed if film frames carry the full card-border load

### Hand-Drawn Ellipses/Circles
**Source**: InkPaint_211XL — various sizes, pen weights.

Annotation highlights:
- Circle an award count
- Ring a stat number
- Mark the focal project on the workbench

### Handwritten Words
**Source**: InkPaint_212XL — "Reference", "File", "Evidence", "Classified", "Log", "Date", "Original", "Research", "Entry", etc.

Pre-made labels for the document system. Use as image elements positioned alongside content:
- "File" next to a project entry
- "Log" next to the experience timeline
- "Evidence" next to awards
- "Reference" next to the skills grid

### Film Reel Marginalia
**Source**: InkPaint_413XL — handwritten cue sheet annotations: "RESTRICTED EYES ONLY", "NEXT REEL", "ADVANCE", "START TIME", "END REEL", reel numbers, scene markers.

Ghost text scattered in page margins at very low opacity, like notes from a different document bleeding through. Ultra-subtle atmospheric detail — the visitor doesn't read them consciously, but they contribute to the sense that this is a real working document with history.

---

## Substrate Grid

**Source**: Details_177 grid tile (square, light-on-dark, seamless)

The graph paper behind the entire site. Applied as a tiled `background-image` on section backgrounds.

Current settings (tuned by hand):
```css
.substrate {
  background-size: 50vw auto;
  background-repeat: repeat;
  opacity: 0.15;
}
```

The grid sits under the global `mix-blend-difference` overlay, which gives the neutral gray lines a slight color shift — this is intentional and contributes to cohesion.

---

## Section-by-Section Application

### Hero (PLATE 00)
Already has the film-holder frame, specimen label ("Specimen: Grant Keller / Capacity: Design Engineer"), and frame numbers. This is the reference point — the rest of the site should feel like it belongs to the same document.

**Potential additions**: faint "AS BUILT" stamp in corner, substrate grid behind the hero background.

### Currently Building (PLATE 01)
The workbench. Project entries sit in film frames on the substrate grid. The inscription (mono marginalia + Bokor title) labels the plate. Reference numbers on each entry.

**Status**: in progress — basic grid layout built, substrate grid working, inscription heading established. Film frames not yet integrated (pending asset processing).

### Featured Work (PLATE 02)
NY Post and OBR as deep-dive case studies. These already have their own rich layouts (Nypost.astro with the spread image, OfflineBgRemover.astro with the app video).

**Potential additions**: plate inscription header, film-frame treatment on the NYP spread image, ink stroke divider between NYP and OBR.

### Skills (PLATE 03)
Grid of capability areas.

**Potential additions**: plate inscription, hand-drawn rectangle frames around skill groups, "CAPABILITIES" handwritten label.

### Experience (PLATE 04)
Job timeline.

**Potential additions**: plate inscription, film-frame treatment on job logos, "LOG" handwritten label, vertical ink stroke as timeline connector.

### Projects (PLATE 05)
Client project grid.

**Potential additions**: contact-sheet layout (proof sheet Film_124 as the background frame), plate inscription, each project in a contact-sheet cell.

### Awards (PLATE 06)
Recognition showcase.

**Potential additions**: plate inscription, hand-drawn circle around award counts, "EVIDENCE" handwritten label, ink stroke dividers.

### Talks (PLATE 07)
Conference appearances and podcast embeds.

**Potential additions**: plate inscription, 35mm film strip (Film_198) as horizontal layout frame for the talk entries.

### Anglerfish / Beyond the Screen (PLATE 08)
Passion project deep dive. Currently very long — planned to be extracted to its own page.

**Potential additions**: plate inscription. Keep minimal since this section is being restructured.

---

## Design Constraints

### Restraint is the discipline
- Don't use all the assets. Pick 5–6 film frames, 5–6 ink strokes, the numeral set, and 2 stamps for the whole site.
- If an element doesn't serve the document voice OR the author voice, it's decoration and it goes.
- Every mark must do a job: measure, label, contain, authenticate, or annotate.

### Minimal over maximal
- Grant's instinct is to add. The thesis demands subtraction.
- The engineering-document aesthetic works because of austerity, not abundance.
- Each asset added should be evaluated: "Does this feel like it belongs in the same document, or did someone tape it on because it looked cool?"

### Real over synthetic
- Real texture (film grain, ink weight, paper tooth) always beats CSS gradients.
- Real imperfection (uneven ink strokes, off-angle handwriting) always beats `rotate(1.5deg)`.
- If we have the real asset, use it. Don't simulate it in CSS.

### The site IS the portfolio piece
- The quality of the implementation demonstrates the skills being claimed.
- The design system itself is a case study in craft, taste, and technical execution.
- A hiring manager should be able to evaluate Grant's abilities just by experiencing the site, before reading any content.

---

## Anti-Patterns to Avoid

These are the fingerprints of AI-generated design from 2024–2025. If any of these show up, fix them immediately:

- Emerald/cyan glow borders on dark backgrounds
- Glassmorphism (`backdrop-filter: blur`) used decoratively
- Identical card grids (same size, same structure, same spacing)
- CSS gradient "textures" pretending to be real materials
- Colored status pills with rounded borders
- Hero metric layouts (big number + small label + gradient)
- Uniform tech chip rows
- Three decorative overlay divs doing nothing perceptible
- `mix-blend-mode: screen` layered on top of `radial-gradient` for "atmosphere"
- Every interactive element having an emerald glow on hover

---

## Asset Inventory

### In Project (`src/images/ui/`)
- `grid-tile.webp` — substrate grid tile (Details_177 slice, square, light-on-dark, seamless)
- `substrate-grid.png` / `.webp` — original crosshair registration grid (Details_176, transparent, 3000x2102)

### Prepped / Ready to Cut (`~/Desktop/prep/`)
- `details_183/slices/` — stenciled labels ("PLATE 25", "R162 044")
- `details_177-grid-details/slices/` — grid variants

### Source Assets (`~/Downloads/_Images/assets/`)

**Film Frames** (`film/`):
- `Film_124L` — 10-up color proof sheet (3 rows, pink "C2289 29OCT 69")
- `Film_125XL` — 35mm strip with sprocket holes, 3 frames ("DUAL STND FILM")
- `Film_126XL` — large-format negative pair ("7711-1 Copy 2 Nov 71")
- `Film_128XL` — dark exposed negative with edge marginalia
- `Film_131L` — 4-up contact sheet ("DIRECT FORMAT FILM 5400", "C39 41")
- `Film_149L` — blank vellum with scratches and edge writing
- `Film_152XL` — blank paper with tape at top, archival feel
- `Film_177XL` — large-format with "HABS No. PA-1097 A-3"
- `Film_178XL` — large-format with "HAER 2-33-44"
- `Film_186XL` — NASA medium-format, STS-105, blue digital numbering
- `Film_191XL` — blue negative quad, "COPY GAVELLA FILM", deep teal
- `Film_198XL` — LUMINA 400RCT-7 strip, 3 square frames

**Details / HUD / Diagrams** (`details-elements-hud-diagram/`):
- `Details_174XL` — rulers, file numbers, scale bars, ink stamps
- `Details_175XL` — additional detail elements
- `Details_176XL` — crosshair registration grid (used as substrate)
- `Details_177XL` — clean grid (used as tile)
- `Details_182XL` — electrical schematic with symbol legend
- `Details_183XL` — declassified stamps ("PLATE 25", "AS BUILT", "INFORMATION ONLY", "HEXAGON SECRET")
- `Details_185XL` — scattered file numbers ("C6614", "SYMBOL LEGEND", "RESEARCH CENTER", scale bars)

**Ink/Paint Elements** (`details-elements-hud-diagram/`):
- `InkPaint_207L` — hand-drawn numerals 0–9 + dot/dash/slash
- `InkPaint_209XL` — horizontal ink brush strokes (section dividers)
- `InkPaint_210XL` — hand-drawn rectangle frames (8 variants)
- `InkPaint_211XL` — hand-drawn ellipses/circles (12+ variants)
- `InkPaint_212XL` — handwritten words ("Reference", "File", "Evidence", "Classified", etc.)
- `InkPaint_413XL` — film reel cue sheet marginalia ("RESTRICTED EYES ONLY", "NEXT REEL", etc.)

**Atmosphere** (root `assets/`):
- `Atmosphere_*` — lightning/energy textures
- `Glass_*` — screen moiré patterns (in `screen-moire/`)
- `Grunge_*` — various distressed textures
- `Paper_*` — paper grain textures
- `LensFX_*` — lens flare/light leak textures
- `Sky_*` — space/star fields (in `space/`)
- `Water_*` — water/liquid textures

---

## Next Steps (Priority Order)

1. **Cut individual numerals** (0–9 + dot/dash/slash) from InkPaint_207L as transparent PNGs — foundation for the composable part-number system
2. **Cut 5 film frames** for Currently Building cards (1 large-format for OBR focal, 3 LUMINA strip frames for small cards, 1 blue negative for Davant placeholder) — each with transparent center
3. **Cut 5–6 ink brush strokes** from InkPaint_209XL — replace SectionDivider sitewide
4. **Cut "PLATE" stencil** from Details_183 — pairs with numerals for section inscriptions
5. **Integrate film frames** into CurrentlyBuilding.astro — replace CSS callout-frame with real frame overlays
6. **Replace SectionDivider** with ink stroke component
7. **Roll inscription pattern** (mono marginalia + Bokor title) to all 8 section plates
8. **Add substrate grid** to additional sections (or the entire page body)
9. **Second pass**: stamps, handwritten labels, film reel marginalia, annotation circles
