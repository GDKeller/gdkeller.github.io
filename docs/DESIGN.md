# Design Brief: Tactile Future

## Thesis

The site is a classified dossier, viewed on a near-future CRT terminal.

The hero presents Grant as a person of interest: specimen photo, classification data, habitat. The rest of the page is the case file that follows. Evidence photos. Operational history. Field assignments. Active operations. Commendations. Capabilities. An analyst has annotated the file by hand.

**"Tactile hard sci-fi future with a Soviet spy/engineer bent."**

The reference is The Expanse, not Blade Runner. Functional, worn, utilitarian. Working infrastructure that's been running for decades. Not sleek consumer glass. Not cyberpunk neon. The CRT terminal isn't a gimmick or a skin. It's the medium the dossier is displayed on. The emerald-on-black palette, the scanlines, the glitch texture overlay: these aren't aesthetic choices, they're the properties of the display hardware.

---

## The Narrative

Every design element must serve the dossier story. If it doesn't have a role in the intelligence briefing, it doesn't belong on the page.

| Element | Narrative Role |
|---|---|
| Hero section | Person-of-interest file. Specimen photo, classification, habitat. |
| Film frames around content | Surveillance photos, evidence imagery in the case file |
| Part numbers (PLATE 01, 01.01) | Case file reference numbering system |
| Substrate grid | The CRT terminal's display pattern |
| Section inscriptions | Section headers in the intelligence briefing |
| Stenciled stamps (CLASSIFIED, EYES ONLY) | Operational security markings on the document |
| Hand-drawn annotations | The analyst's handwritten notes on the file |
| Ink brush strokes as dividers | Redaction bars or section breaks in a classified document |
| Emerald-on-black + scanlines + glitch | Properties of the CRT terminal displaying the dossier |
| Bokor headings | The way the terminal renders classified section headers. Ornamental because the system firmware is old, ritualistic, Soviet-era infrastructure still running future tech |

### Section Names (Dossier Language)

These are working names. The actual heading text can be more natural, but the conceptual framing should inform the design of each section:

| Section | Dossier Framing | Current Heading |
|---|---|---|
| Hero | Person of interest file | "Deep Space Deep Sea" |
| Currently Building | Active operations / current assets | "Currently Building" |
| Featured Work | Case files | "Featured Work" |
| Skills | Asset capabilities | (Skills Grid) |
| Experience | Field assignments / operational history | (Jobs) |
| Projects | Evidence / field reports | "Projects" |
| Awards | Commendations / citations | "Awards" |
| Talks | Intercepted transmissions / field appearances | (Talks) |
| Anglerfish | Deep cover operation | "Beyond the Screen" |

---

## Emotional Goals

A hiring design director should feel:

- **"This person thinks differently"**: the site is unlike anything they've seen this week. Not another dark-theme card grid. Something authored, physical, specific.
- **"I want to work with them"**: the craft signals care without pretension. Every detail serves the whole. Nothing is decoration.
- **"Wide breadth, deep roots"**: the range of projects demonstrates capability. The design system demonstrates the ability to build and maintain a cohesive vision across complexity.

The site should make someone ask *"how was this made?"* Never *"which AI made this?"*

---

## Two Voices

The design operates on a tension between two registers that coexist on every surface:

### The Terminal Voice (the document, the system)
The CRT display. The filing system. The infrastructure that organizes the dossier. Impersonal, systematic, rigorous.

Thin drafting lines. Registration crosshairs. Case file numbers in monospace. Film rebate with stock names and frame counters. All at low contrast: phosphor traces on a dark screen, not bright chrome. The terminal voice whispers; it never shouts.

### The Analyst Voice (the human, the author)
The person reviewing the dossier. Grant, claiming authorship. Ornamental display lettering at section headers, rendered by old terminal firmware that treats classified headings as ritualistic inscriptions. Stenciled plate numbers with real ink weight. Hand-drawn annotations in the margins.

The analyst voice appears where Grant is speaking directly: section titles, hero headline, display statistics, handwritten labels. It's the signature on the briefing.

### The Rule
These two voices must stay distinct. When the terminal starts rendering ornamental headings in monospace, or the analyst starts annotating in the system font, the narrative breaks. The power is in the contrast between the machine and the person using it.

---

## Visual Language

### The Dossier
The site is a single classified document, divided into numbered plates. Each major section is a plate (PLATE 01 through PLATE 08) with a section title and sheet count. The numbering system runs through the entire site as the filing backbone. Every content entry within a section gets a sub-reference (01.01, 01.02).

### Film Frames as Evidence
Project screenshots and content entries sit inside real film frames. Not CSS borders, not card components. The film frame IS the container. Its rebate, stock name, frame counter, and edge grain are the evidence metadata. Each frame has unique wear, so no two pieces of evidence look stamped from the same template.

The hero already uses a film-holder/specimen-label treatment. The rest of the site extends this: the portfolio is a contact sheet of evidence. Each project is a frame in the roll. The visitor is an analyst reviewing specimens.

### The Terminal Display
Behind everything, a faint grid: the CRT's pixel structure made visible. Real crosshair marks from engineering graph paper, not CSS gradients. The grid recedes until you notice it, then it reframes the entire page as something displayed on hardware, not rendered in a browser.

The global overlay (scanlines, glitch texture, mix-blend-difference) is the CRT's display characteristics. Every color on the page passes through this filter. Neutral grays pick up a phosphor tint. This is a feature: the terminal processes everything uniformly.

### Physical Marks on the File
Where the dossier needs dividers, labels, frames, or annotations, it uses real physical marks: ink brush strokes for redaction bars / section breaks, hand-drawn rectangles for evidence frames, stenciled text for operational markings, handwritten words for analyst labels. Real imperfection from real materials. Never simulated in CSS when the actual asset exists.

---

## Color

### Emerald is the phosphor
The emerald-on-black palette isn't a brand choice. It's the color of the CRT phosphor. Everything displayed on the terminal is tinted by it. This means:

- Text naturally reads in emerald tones (the semantic color tokens: foundation, emphasis, accent)
- Structural elements (borders, frames, rules, dividers) are white/gray at low opacity: the terminal's trace lines, not colored UI chrome
- Bright emerald appears only on interactive states (hover, focus): the terminal responding to input
- Fuchsia is the one color that breaks the phosphor: maximum alert, used once or twice on the entire page

### The palette is subtractive
Start with everything in the terminal's default phosphor tint. Add explicit color only where removing it would lose information or interactivity. If someone viewed the site in grayscale and it still read as cohesive and well-designed, the color is doing its job correctly.

---

## Typography

Four voices, each with a role in the dossier:

**The classified header** (Bokor): ornamental display lettering for section titles, hero headlines, and statistics. Rendered by the terminal's legacy firmware, which treats classified document headers as ritualistic inscriptions. Soviet-era type design running on future hardware. Warm, hand-cut, slightly lumpy.

**The briefing header** (Bayon): angular display lettering for entry titles, utility headings, and subheadings. The modernist bridge between the ornamental headers and the system text. How the terminal renders operational subtitles.

**The report body** (Prompt): clean, neutral, comfortable body copy. The default display font for dossier text. Serves both registers without calling attention to itself.

**The system readout** (IBM Plex Mono): monospace for case file numbers, marginalia, film stock labels, tech stacks, and everything that belongs to the terminal's filing system. Letter-spaced, small, uppercase. The machine's native voice. Never used for headings.

---

## Restraint as Discipline

### What NOT to do
- Don't use every asset. A handful of film frames, ink strokes, and stamps for the whole site.
- Don't decorate. Every element must file, label, contain, authenticate, or annotate. If it's just "cool," it goes.
- Don't simulate in CSS what exists as a real asset. Real film grain beats a gradient.
- Don't let the two voices merge. The terminal and the analyst stay distinct.
- Don't overplay the dossier metaphor. It's a structural spine, not a costume. When it stops serving clarity, pull it back. The visitor should feel the narrative without being told it's a narrative.

### The test for every addition
"Would an analyst reviewing this file expect to see this mark, or did someone tape it on because it looked cool?"

---

## Anti-References

These are the fingerprints of AI-generated portfolio design. If any of these show up, something has gone wrong:

- Emerald/cyan glow borders on dark backgrounds
- Glassmorphism used decoratively (blur for the sake of blur)
- Identical card grids (same size, same structure, repeated endlessly)
- CSS gradient "textures" pretending to be real materials
- Status pills with colored borders and rounded corners
- Decorative overlay divs that produce no visible effect
- Every element glowing emerald on hover
- The hero metrics layout: big number, small label, supporting stats, gradient accent
- Uniform letter-spaced uppercase tech chip rows
- "Atmosphere" achieved by layering radial gradients with screen blend mode
- Full retro-terminal cosplay (100% green monospace, fake boot sequences, command-line gimmicks)

---

## The Site IS the Portfolio Piece

The quality of the design and implementation demonstrates the skills being claimed. A hiring manager should be able to evaluate Grant's abilities just by experiencing the site, before reading any content. The design system itself is a case study in:

- **Craft**: real materials, hand-made marks, considered typography
- **Taste**: restraint, austerity, knowing what to leave out
- **Narrative design**: a coherent story that gives every element a reason to exist
- **Technical depth**: compositing film frames, tiling grids, managing blend modes, maintaining accessibility across the system
- **Range**: holding a cohesive vision across wildly different content types (case studies, statistics, timelines, passion projects)
- **Originality**: a design direction that belongs to Grant alone, not to a template or a trend
