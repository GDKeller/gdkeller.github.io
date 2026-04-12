# Design Brief: Tactile Future

## Thesis

The aesthetic of hand-drafted precision engineering applied to a modern, minimal interface. Not retro nostalgia: the rigor of the drafting table carried forward into the digital present. Every mark on the page should feel like it was placed by an engineer who cares about craft: measured, intentional, physical.

**"Tactile hard sci-fi future with slight medieval twist."**

Hard sci-fi gives us the engineering rigor: specification sheets, registration grids, part numbers, measurement systems. The medieval twist gives us the human hand: ornamental lettering, ink strokes, stenciled marks, the warmth of authorship inside the machine. The tension between these two is the whole identity.

---

## Emotional Goals

A hiring design director should feel:

- **"This person thinks differently"**: the site itself is unlike anything they've seen this week. Not another dark-theme card grid. Something authored, physical, specific.
- **"I want to work with them"**: the craft signals care without pretension. Every detail serves the whole. Nothing is decoration.
- **"Wide breadth, deep roots"**: the range of projects demonstrates capability, while the design system demonstrates the ability to build and maintain a cohesive vision across complexity.

The site should make someone ask *"how was this made?"*: never *"which AI made this?"*

---

## Two Voices

The design operates on a tension between two registers that coexist on every surface:

### The Document Voice
Impersonal, systematic, rigorous. This is the infrastructure: the grid, the measurement system, the filing system that organizes everything. It says: *this is an engineering document, and you are paging through it.*

Thin drafting lines. Registration crosshairs. Part numbers in monospace. Film rebate with stock names and frame counters. Ruler ticks. Scale bars. All at low contrast: ink on vellum, not neon on black. The document voice whispers; it never shouts.

### The Author Voice
Human, hand-crafted, warm. This is Grant: the person who drafted the document. Ornamental display lettering at chapter headings. Stenciled plate numbers with real ink weight. The medieval twist: illuminated capitals that say *a person made this by hand, and they cared enough to make it beautiful.*

The author voice appears only where Grant is claiming authorship: section titles, hero headline, display statistics. It's the signature at the bottom of the blueprint.

### The Rule
These two voices must stay distinct. When the document voice picks up the author's pen, or the author starts speaking in monospace, the thesis collapses. The power is in the contrast.

---

## Visual Language

### The Specification Sheet
The site is structured as a single engineering document. Each major section is a "plate": a numbered page in a technical specification binder. The plates are sequential (PLATE 01 through PLATE 08), each with a section title and sheet count. This numbering system runs through the entire site as a quiet structural backbone.

### Film as Container
Project screenshots and content entries sit inside real film frames: not CSS borders, not card components. The film frame IS the container. Its rebate, stock name, frame counter, and edge grain provide the document-voice metadata for free. Each frame has unique wear, creating natural variation without a template.

This connects to the hero section's existing film-holder treatment and extends the metaphor: the portfolio is a contact sheet. Each project is a frame in the roll. The visitor is reviewing specimens under a loupe.

### The Substrate
Behind everything, a faint engineering grid: graph paper made from real crosshair marks, not CSS gradients. The grid recedes until you notice it, then it reframes the entire composition as something *drafted on a surface*, not rendered in a browser.

### Hand-Made Marks
Where the site needs dividers, labels, frames, or annotations, it uses real physical marks: ink brush strokes for section dividers, hand-drawn rectangles for content frames, stenciled text for plate numbers, handwritten words for document labels. These replace CSS-rendered equivalents everywhere possible. Real imperfection always beats `transform: rotate(1.5deg)`.

---

## Color

### Emerald is the identity: but it's rare
The engineering-document thesis demands visual austerity. Structural elements (borders, frames, rules, dividers) are white or gray at low opacity: drafting-line weight. Emerald appears only where something is interactive (hover, focus) or where the author is speaking (display headings, stat callouts). Fuchsia is maximum demand, used once or twice on the entire page.

The global `mix-blend-difference` overlay gives every neutral element a subtle color shift, so even gray marks pick up the site's personality without being explicitly colored.

### The palette is subtractive
Start with everything colorless. Add emerald only where removing it would lose information or interactivity. If a hiring director viewed the site in grayscale and it still read as cohesive and well-designed, the color is doing its job correctly.

---

## Typography

Four voices, each with a clear job:

**The illuminated voice**: ornamental display lettering for section titles, hero headlines, and statistics. This is the medieval twist: hand-cut, slightly lumpy, warm. It appears where Grant is claiming authorship.

**The modernist voice**: angular display lettering for entry titles and utility headings. The bridge between the ornamental and the technical.

**The body voice**: clean, neutral, comfortable body copy. Serves both registers without calling attention to itself.

**The technical voice**: monospace for part numbers, marginalia, film stock labels, tech stacks, and everything that belongs to the document system. Letter-spaced, small, uppercase. Never used for headings.

---

## Restraint as Discipline

### What NOT to do
- Don't use every asset. Five film frames, five ink strokes, a numeral set, and two stamps for the whole site.
- Don't decorate. Every element must measure, label, contain, authenticate, or annotate. If it's just "cool," it goes.
- Don't simulate in CSS what exists as a real asset. If there's real film grain, use it. Don't fake it with a gradient.
- Don't let the two voices merge. Keep the document voice distinct from the author voice.
- Don't overuse the film metaphor. It's a structural device, not a theme. When it stops serving clarity, pull it back.

### The test for every addition
"Does this feel like it belongs in the same document, or did someone tape it on because it looked cool?"

---

## Anti-References

These are the fingerprints of AI-generated portfolio design. If any of these show up, something has gone wrong:

- Emerald/cyan glow borders on dark backgrounds
- Glassmorphism used decoratively (blur for the sake of blur)
- Identical card grids (same size, same structure, repeated endlessly)
- CSS gradient "textures" pretending to be real materials
- Status pills with colored borders and rounded corners
- Three decorative overlay divs that produce no visible effect
- Every element glowing emerald on hover
- The hero metrics layout: big number, small label, supporting stats, gradient accent
- Uniform letter-spaced uppercase tech chip rows
- "Atmosphere" achieved by layering radial gradients with screen blend mode

---

## The Site IS the Portfolio Piece

The quality of the design and implementation demonstrates the skills being claimed. A hiring manager should be able to evaluate Grant's abilities just by experiencing the site: before reading any content. The design system itself is a case study in:

- **Craft**: real materials, hand-made marks, considered typography
- **Taste**: restraint, austerity, knowing what to leave out
- **Technical depth**: the engineering required to composite film frames, tile grids, manage blend modes, and maintain accessibility across the system
- **Range**: the ability to hold a cohesive vision across wildly different content types (case studies, statistics, timelines, passion projects)
- **Originality**: a design direction that belongs to Grant alone, not to a template or a trend
