---
type: task
status: backlog
priority: 2
created: 2026-03-27
---

# Delete orphaned components and pages

**Source:** Audit H2, H5, L4

## What to do

Delete these files — none are imported by any page or component:

1. `src/components/Highlights.astro` — dead code, also has wrong alt texts
2. `src/components/HighlightSingle.astro` — dead code
3. `src/components/HireMe.astro` — duplicate of modal already inlined in `index.astro`
4. `src/components/TextBillboard.astro` — dead code
5. `src/pages/skills-mockup.astro` — orphaned page accessible at `/skills-mockup` but never linked
