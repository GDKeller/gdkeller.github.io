---
type: task
status: done
priority: 2
created: 2026-03-27
archived: 2026-04-09
parent: EPIC-0001
---

# Eliminate border radius sitewide

> **Resolved 2026-04-09:** Verified against the current codebase. Sharp edges are in effect via a `border-radius: 0` reset in `global.css`, and all original scope items are clean except for intentional exceptions (see below). Archived.

**Source:** NOTE-0008 §1

Remove all `rounded-*` classes across the site. The sharp-edged look reinforces the cyberpunk/technical aesthetic.

## Scope (~25 instances across 10 files)

- `Hero.astro` — `rounded-xl` on hero card, headshot container, inner border
- `Header.astro` — `rounded-sm` on Resume and Contact buttons; `rounded` on LinkedIn icon
- `Footer.astro` — `rounded-lg` on both CTA buttons
- `index.astro` (modal) — `rounded-lg` on contact cards; `rounded-full` on icon circles
- `Nypost.astro` — `rounded-tl-md` on red banner
- `FishHero.astro` — `rounded-lg` on info box
- `OfflineBgRemover.astro` — `rounded-t-[3.5%]` on video; `rounded-md` on CTA
- `ProjectSingleImage.astro` — `rounded-lg` on images
- `Awards.astro` — `rounded-full` on count badges
- `global.css` — `border-radius: 4px` on `:focus-visible`

## Exceptions (keep round)

- `Header.astro` oscilloscope circle (`rounded-full`) — intentionally circular element
- `Header.astro` headshot logo (`rounded-full`) — circular avatar
- `Header.astro` GitHub icon (`rounded-full`) — circular brand mark
- `Header.astro` oscilloscope/logo containers and nav chevron (`rounded-sm`) — subtle rounding inside the header oscilloscope assembly, part of the intentional "header thing" aesthetic
- `OfflineBgRemover.astro` video container (`rounded-t-[3%]`) — intentional: contours the top edge of the MacBook screen frame in the OBR demo video
