---
type: note
status: inbox
created: 2026-03-27
---

# Impeccable Audit Feedback

**Source:** `/impeccable:audit`
**Date:** 2026-03-27

## Executive Summary

| Severity | Count |
|----------|-------|
| Critical | 2 |
| High | 7 |
| Medium | 8 |
| Low | 6 |
| **Total** | **23** |

**Top 5 issues:**
1. 14 headshot images loaded eagerly in the hero (critical performance)
2. Headshot alt texts are meaningless ("AI1", "AI3", etc.)
3. 4 orphaned/dead components never imported anywhere
4. No `lazy` loading on any below-fold images except Talks iframes
5. Headshot animation has no `prefers-reduced-motion` support

---

## Critical Issues

### C1. Headshot.astro loads 14 full-resolution images eagerly
- **Location:** `src/components/Headshot.astro`
- **Category:** Performance
- **Description:** 14 headshot images (each likely 100-500KB) are all loaded at page load with no lazy loading. Only one is visible at a time via CSS animation. This adds potentially 2-7MB to the initial page load for a purely decorative effect.
- **Impact:** Dramatically increases LCP and total page weight. On mobile/slow connections, the hero will be sluggish before the user sees anything.
- **Recommendation:** Load only the primary headshot eagerly. Load animation images lazily or defer them via JS after the page has loaded. Consider reducing to 4-5 images instead of 13 for the animation cycle.
- **Command:** `/impeccable:optimize`

### C2. Headshot alt texts are inaccessible gibberish
- **Location:** `src/components/Headshot.astro:22-86`
- **Category:** Accessibility (WCAG 1.1.1)
- **Description:** Alt texts are "Grant", "AI1", "AI3", "AI4", "AI5", "AI6", "AI7", "AI8", "AI10", "AI12", "AI15", "AI20", "AI22_2", "AI25". These are internal variable names, not descriptions.
- **Impact:** Screen reader users hear "AI1", "AI3" etc. — meaningless and confusing. Since these are decorative animation variants of the same headshot, they should all be `alt=""` except the primary.
- **Recommendation:** Set the primary image to `alt="Grant Keller headshot"`. Set all animation overlays to `alt=""` since they're decorative.
- **Command:** `/impeccable:harden`

---

## High-Severity Issues

### H1. Headshot animation ignores `prefers-reduced-motion`
- **Location:** `src/components/Headshot.astro:89-264`
- **Category:** Accessibility (WCAG 2.3.3)
- **Description:** 13 CSS animations cycle headshot images in a 52-second loop with no `prefers-reduced-motion: reduce` override. The global CSS reduces durations to `0.01ms` but that still causes rapid flash-through of all 13 images in ~0.13ms total, which is worse than the smooth animation.
- **Impact:** Users with motion sensitivity see rapidly flickering images. The global reduction actually makes it more jarring.
- **Recommendation:** Add `@media (prefers-reduced-motion: reduce)` that sets `animation: none` and `opacity: 0` on all animation variants, showing only the primary headshot.
- **Command:** `/impeccable:harden`

### H2. Four orphaned components never used anywhere
- **Location:** `Highlights.astro`, `HighlightSingle.astro`, `HireMe.astro`, `TextBillboard.astro`
- **Category:** Performance / Code quality
- **Description:** These four components are never imported by any page or component. They are dead code inflating the codebase. `HireMe.astro` is a duplicate of the modal already inlined in `index.astro`. `Highlights.astro` has wrong alt texts (React logo says "WordPress logo").
- **Impact:** Confusion for future maintainers. No runtime impact (Astro tree-shakes), but code bloat.
- **Recommendation:** Delete all four files. The modal lives in `index.astro` now.
- **Command:** `/impeccable:distill`

### H3. No lazy loading on below-fold images
- **Location:** Multiple components
- **Category:** Performance
- **Description:** Only `Talks.astro` iframes use `loading="lazy"`. The anglerfish section (`FishHero.astro`) loads 6 large images eagerly. `Awards.astro` marks all images `loading="eager"`. Logo carousel marks all 38 logos (19 + 19 duplicates) as `loading="eager"`.
- **Impact:** Everything below the fold loads immediately, competing with the hero for bandwidth.
- **Recommendation:** Set `loading="lazy"` on all images below the hero fold. Awards and logo carousel are near the hero but could still benefit from lazy loading on mobile.
- **Command:** `/impeccable:optimize`

### H4. `OfflineBgRemover.astro` video has no `prefers-reduced-motion` support
- **Location:** `src/components/OfflineBgRemover.astro:42-49`
- **Category:** Accessibility (WCAG 2.3.1)
- **Description:** The video auto-plays with `autoplay muted loop`. The JS at the bottom attempts to pause it for reduced motion, but targets `.video-frame video` — a class that doesn't exist in the component. The actual video has no such parent class.
- **Impact:** The reduced-motion pause never fires. Users who've requested reduced motion still see a looping autoplaying video.
- **Recommendation:** Fix the selector to match the actual DOM, or use a simpler inline check.
- **Command:** `/impeccable:harden`

### H5. Duplicate contact modal code
- **Location:** `index.astro:109-261` and `HireMe.astro:20-108`
- **Category:** Code quality
- **Description:** The contact modal markup is fully duplicated — once inlined in `index.astro` (the one actually rendered) and once in the orphaned `HireMe.astro` component. They have minor text differences ("Let's build something great" vs "Ready to build something extraordinary?").
- **Impact:** If someone updates the wrong file, changes won't appear. Maintenance confusion.
- **Recommendation:** Delete `HireMe.astro` (covered in H2).
- **Command:** `/impeccable:distill`

### H6. Global overlay image (`bg_video_glitch.webp`) is `z-50` with `pointer-events-none`
- **Location:** `index.astro:97-105`
- **Category:** Accessibility / Performance
- **Description:** A fixed full-viewport overlay at `z-50` with `mix-blend-difference` covers the entire page. While `pointer-events-none` prevents click blocking, this creates a compositing layer that the GPU must blend on every frame of scrolling.
- **Impact:** Continuous GPU compositing overhead. On lower-end devices, this could cause scroll jank. The `z-50` also means it renders above the sticky header (`z-40`), potentially causing visual artifacts.
- **Recommendation:** Consider whether this effect is visible enough to justify the performance cost. If kept, reduce z-index below the header. Consider applying only to the hero section rather than the full page.
- **Command:** `/impeccable:optimize`

### H7. `hire_me_modal` referenced via global `onclick` string
- **Location:** `Header.astro:103`, `Footer.astro:16`, `index.astro` modal
- **Category:** Accessibility
- **Description:** Buttons use `onclick="hire_me_modal.showModal()"` and `onclick="document.getElementById('hire_me_modal').showModal()"` — inconsistent approaches. The first relies on implicit global ID-to-variable mapping, a fragile browser behavior.
- **Impact:** Could break in stricter CSP environments. Inconsistent patterns are maintenance-prone.
- **Recommendation:** Standardize on `document.getElementById('hire_me_modal').showModal()` or add a small script with event delegation.
- **Command:** `/impeccable:harden`

---

## Medium-Severity Issues

### M1. Logo carousel duplicate images have different sizes than originals
- **Location:** `LogoCarousel.astro:71-93`
- **Category:** Visual consistency
- **Description:** Primary logos: `max-h-12 md:max-h-14`. Duplicate logos: `max-h-16 md:max-h-24`. Duplicates render larger during animation.
- **Recommendation:** Match sizes across primary and duplicate sets.
- **Command:** `/impeccable:polish`

### M2. `SectionDivider` has no visual content
- **Location:** `src/components/SectionDivider.astro`
- **Category:** Visual design
- **Description:** The component renders an empty div with padding. No line, gradient, or visual separator.
- **Recommendation:** Add a subtle emerald scanline gradient matching the section heading treatment.
- **Command:** `/impeccable:polish`

### M3. Three body copy typos
- **Location:** `Awards.astro:62`, `FishHero.astro:79`, `FishHero.astro:139`
- **Category:** Content quality
- **Description:** "multidisiciplinary" → "multidisciplinary", "it's tissue" → "its tissue", "wa able" → "was able"
- **Command:** `/impeccable:clarify`

### M4. `html` font-family set to `system-ui, sans-serif` conflicts with Prompt
- **Location:** `Layout.astro:92`
- **Category:** Theming
- **Description:** The `<html>` base font is system-ui, but `<main>` uses `font-prompt`. If Google Fonts fails to load, the site falls back to system fonts with no Prompt in the stack.
- **Recommendation:** Set `html { font-family: 'Prompt', system-ui, sans-serif }`.
- **Command:** `/impeccable:normalize`

### M5. FishHero section has no ARIA landmarks
- **Location:** `FishHero.astro`
- **Category:** Accessibility
- **Description:** A ~250-line section with scrollytelling narrative content has no `aria-label`, heading hierarchy issues (jumps to `h3` inside a `section` that already has `h2` in the parent), and images inside the narrative have no contextual alt text for the storytelling flow.
- **Recommendation:** Add `aria-label="Anglerfish Exhibit at NHMLA"` to the outer section. Ensure heading hierarchy is logical.
- **Command:** `/impeccable:harden`

### M6. Awards section eagerly loads images that could be lazy
- **Location:** `Awards.astro:74`
- **Category:** Performance
- **Description:** All 4 award images use `loading="eager"` despite being below the hero fold.
- **Recommendation:** Change to `loading="lazy"`.
- **Command:** `/impeccable:optimize`

### M7. Commented-out code throughout Hero.astro
- **Location:** `Hero.astro:40-44, 67-103, 116-121`
- **Category:** Code quality
- **Description:** ~40 lines of commented-out CTAs, skill badges, and billboard text. Signals indecision and clutters the codebase.
- **Recommendation:** Remove. Git history preserves old code.
- **Command:** `/impeccable:distill`

### M8. `Highlights.astro` has wrong alt texts on images
- **Location:** `Highlights.astro:55-63`
- **Category:** Accessibility (dead code, but still)
- **Description:** React logo has `alt="WordPress logo"`, TypeScript logo has `alt="WordPress Gutenberg logo"`. Component is orphaned (see H2) but demonstrates sloppy copy-paste.
- **Recommendation:** Delete the file (covered in H2).

---

## Low-Severity Issues

### L1. `--accent` CSS variables in Layout.astro appear unused
- **Location:** `Layout.astro:80-88`
- **Category:** Code quality
- **Description:** `--accent`, `--accent-light`, `--accent-dark`, `--accent-gradient` are defined but no component references them. The actual color system uses Tailwind classes.
- **Recommendation:** Remove unused variables.

### L2. Resume filename contains spaces
- **Location:** `Header.astro:81`, `Footer.astro:29`
- **Description:** `/Grant Keller Senior UX Engineer Resume 2025.pdf` — spaces in URLs require encoding and can cause issues.
- **Recommendation:** Rename to kebab-case: `grant-keller-senior-ux-engineer-resume-2025.pdf`.

### L3. Footer claims "React" but no React components exist
- **Location:** `Footer.astro:58-62`
- **Description:** Footer tech stack lists React, but the entire site is Astro components with zero React imports.
- **Recommendation:** Remove React from the footer list, or add React islands if React is truly part of the stack.

### L4. `skills-mockup.astro` is an orphaned page
- **Location:** `src/pages/skills-mockup.astro`
- **Description:** An alternative page that's accessible at `/skills-mockup` but not linked anywhere. Likely a WIP prototype.
- **Recommendation:** Delete or move to a drafts folder.

### L5. `SkillBadge` has no TypeScript interface for props
- **Location:** `SkillBadge.astro:2`
- **Description:** Props destructured without an interface: `const { tag, class: className } = Astro.props`.
- **Recommendation:** Add `interface Props { tag?: string; class?: string; }`.

### L6. `HeroBackground.astro` noise animation runs continuously
- **Location:** `HeroBackground.astro:205-250`
- **Description:** The `noise-shift` animation runs at `0.2s steps(10) infinite`. Even though it's only 3% opacity, it creates continuous GPU repaints.
- **Recommendation:** Consider using a static noise texture instead.
- **Command:** `/impeccable:optimize`

---

## Positive Findings

1. **Excellent reduced-motion coverage** — 9 files handle `prefers-reduced-motion`. The global CSS, HeroBackground, Nav, LogoCarousel, and Header all properly disable animations. The logo carousel even converts to a static wrapped grid.

2. **Strong focus indicators** — WCAG 2.2 compliant focus-visible outlines with emerald glow and `prefers-contrast: high` override in `global.css`. Better than most production sites.

3. **Good semantic HTML** — `sr-only` labels on icon links, `aria-label` on regions, `role="separator"` on dividers, `role="presentation"` on decorative elements.

4. **Smart performance patterns** — Oscilloscope pauses on `visibilitychange`, scroll handlers use `{ passive: true }`, nav uses `requestAnimationFrame` throttling.

5. **Consistent design language** — Corner accents, emerald gradients, and the section heading scanline effect create a cohesive visual vocabulary across Skills, Jobs, Projects, and Talks.

---

## Recommendations by Priority

| Priority | Action | Issues Addressed | Command |
|----------|--------|-----------------|---------|
| **Immediate** | Fix headshot image loading + alt texts | C1, C2, H1 | `/impeccable:optimize` + `/impeccable:harden` |
| **Immediate** | Fix OBR video reduced-motion selector | H4 | `/impeccable:harden` |
| **Short-term** | Delete 4 orphaned components + mockup page | H2, H5, L4 | `/impeccable:distill` |
| **Short-term** | Add lazy loading to below-fold images | H3, M6 | `/impeccable:optimize` |
| **Short-term** | Fix typos | M3 | `/impeccable:clarify` |
| **Medium-term** | Normalize font stack + remove unused CSS vars | M4, L1 | `/impeccable:normalize` |
| **Medium-term** | Clean commented-out code | M7 | `/impeccable:distill` |
| **Medium-term** | Fix logo carousel sizing + section divider | M1, M2 | `/impeccable:polish` |
| **Long-term** | Reduce global overlay GPU cost | H6, L6 | `/impeccable:optimize` |
