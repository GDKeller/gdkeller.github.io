---
type: task
status: backlog
priority: 2
created: 2026-05-02
---

# Create a mobile menu

Below `md` the header drops GitHub, LinkedIn, and the Resume link entirely (`hidden md:flex` / `hidden md:block`), leaving only the section nav and the Contact button. Mobile users have no path to GitHub, LinkedIn, or the resume PDF — they have to scroll to the footer. Add a proper mobile menu surface that exposes those affordances without bloating the small-screen header.

## Approach

- Add a hamburger / toggle button that appears only below `md`, sitting in the same row slot the icons currently occupy.
- Open into a panel (sheet, drawer, or full-screen overlay — pick what reads as part of the dossier/CRT aesthetic, not generic "mobile nav") that contains:
  - The section nav links (mirroring `navLinks` in [Nav.astro](src/components/Nav.astro))
  - GitHub, LinkedIn icon links
  - Resume PDF link
  - Contact action (consider whether it stays in the header or moves into the panel)
- Section nav can stay inline in the header on mobile or move into the panel — decide based on header density once the toggle is in.
- Use existing semantic tokens (`accent`, `emphasis`, `subtle`, `background-dark`, etc.). No raw `emerald-*/N` opacity-as-shade.
- Reuse the modal open/close plumbing in [Overlays.astro](src/components/Overlays.astro) if it fits, otherwise wire a dedicated toggle.

## Acceptance

- All header affordances (section nav, GitHub, LinkedIn, Resume, Contact) reachable on a 375px viewport.
- Toggle is keyboard-accessible (focus trap inside the open panel, Esc to close, focus returns to the toggle).
- `prefers-reduced-motion` honored on any transition.
- No layout shift on the existing `md+` header.

## Files

- [src/components/Header.astro](src/components/Header.astro) — toggle button, conditional rendering by breakpoint
- [src/components/Nav.astro](src/components/Nav.astro) — possibly extract `navLinks` so the mobile panel can import the same source
- Possibly a new `src/components/MobileMenu.astro` if the panel is heavy enough to warrant its own file
