# Portfolio UX Improvement Plan

**Created:** December 5, 2025
**Status:** Phase 1 Complete
**Goal:** Transform portfolio from "creative showcase" to "hireable professional" while maintaining distinctive character

---

## Executive Summary

The portfolio demonstrates strong technical skills but suffers from **inverted information architecture**—the most impressive work appears too late, while a passion project (anglerfish exhibit) dominates the scroll journey. This plan restructures content priority, strengthens the value proposition, and optimizes performance to improve employer conversion.

**Target Outcome:** A hiring manager spending 30 seconds on the site should immediately understand:
1. What Grant does (Senior Frontend Engineer)
2. Proof of impact (300M+ pageviews at NY Post)
3. How to hire him (prominent CTAs)

---

## Phase 1: Critical Fixes ✅ COMPLETE

**Objective:** Make the portfolio hireable for conservative employers
**Estimated Effort:** ~7 hours
**Branch:** `feature/ux-improvements`
**Commit:** `a3cec1f`

### Task 1.1: Restructure Page Layout ✅
- [x] Move anglerfish section to bottom of page
- [x] Add "Beyond the Screen" header for passion projects
- [x] Rename "Highlights" → "Featured Work"
- [x] Move Skills section up (now position #3)
- [x] Update navigation links (`Work`, `Skills`, `Experience`, `Projects`)

**Files Changed:**
- `src/pages/index.astro`
- `src/components/Nav.astro`

### Task 1.2: Strengthen Hero Value Proposition ✅
- [x] Replace vague tagline with specific problem-solving statement
- [x] Update title: "Senior Frontend Engineer"
- [x] Add quantified achievement: "300M+ monthly pageviews"
- [x] Update bullet points with concrete skills
- [x] Update pills: `React / TypeScript`, `Accessibility`, `Performance`

**Before:**
> "Software professional dissolving barriers between digital machines and humans"

**After:**
> "I build accessible, high-performance web applications that scale to millions of users."

**Files Changed:**
- `src/components/Hero.astro`

### Task 1.3: Add Prominent CTAs ✅
- [x] Hero: "View My Work" button (scroll to featured)
- [x] Hero: "Let's Talk" button (opens contact modal)
- [x] Footer: "Get in Touch" button
- [x] Footer: "Download Resume" button
- [x] Add availability statement in footer

**Files Changed:**
- `src/components/Hero.astro`
- `src/components/Footer.astro`

### Task 1.4: Optimize Performance ✅
- [x] Remove unused fonts (Kings, MedievalSharp)
- [x] Reduce Prompt font weights (18 → 5)
- [x] Convert `bg_video_glitch.jpg` to WebP (5.6MB → 756KB)
- [x] Convert `water-reflections.jpg` to WebP (2.1MB → 1.1MB)
- [x] Convert `texture-ripped1.jpg` to WebP (3.0MB → 820KB)
- [x] Update image imports to use WebP versions

**Results:**
| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Background image | 5.6MB | 756KB | 87% smaller |
| Build size | ~21MB | 9.1MB | 57% smaller |
| Fonts loaded | 6 | 4 | 2 removed |
| Font weights | 18 | 5 | 72% fewer |

**Files Changed:**
- `tailwind.config.mjs`
- `src/layouts/Layout.astro`
- `src/pages/index.astro`
- `src/components/FishHero.astro`
- `src/images/*.webp` (3 new files)

---

## Phase 2: Content Improvements

**Objective:** Add proof and credibility
**Estimated Effort:** ~6.5 hours
**Status:** Not Started

### Task 2.1: Add Testimonials Section
- [ ] Create `Testimonials.astro` component
- [ ] Collect 2-3 quotes from managers/colleagues/clients
- [ ] Include name, title, company for each
- [ ] Position after Skills or before Projects
- [ ] Style to match site aesthetic

**Example Format:**
```
"Grant is the most thoughtful frontend engineer I've worked with. His attention
to accessibility and performance is unmatched."
— Jane Doe, Engineering Manager at NY Post
```

### Task 2.2: Expand Job Descriptions with STAR Format
- [ ] Review each job entry in `src/content/jobs/`
- [ ] Add quantified achievements (metrics, percentages, scale)
- [ ] Use STAR format: Situation → Task → Action → Result
- [ ] Add specific dates (Month Year format)
- [ ] Consider adding company logos

**Example Transformation:**
```
Before: "Led frontend development"
After: "Led frontend architecture for mobile web, achieving 62M monthly visits
       and 95+ Lighthouse performance score"
```

### Task 2.3: Write NY Post Case Study
- [ ] Create detailed case study (1-2 paragraphs)
- [ ] Structure: Challenge → Approach → Implementation → Results
- [ ] Include technical details (React, performance optimizations)
- [ ] Add business metrics (pageviews, load time improvements)
- [ ] Option: Create separate case study page or expand inline

### Task 2.4: Add Availability Information
- [ ] Add "Currently Seeking" section to footer or about area
- [ ] Specify: role type (full-time/contract)
- [ ] Specify: location preference (remote/hybrid/location)
- [ ] Specify: specializations
- [ ] Add expected response time

---

## Phase 3: Design Polish

**Objective:** Stand out from other senior engineers
**Estimated Effort:** ~7 hours + ongoing
**Status:** Not Started

### Task 3.1: Consider Light Mode / Adaptive Design
- [ ] Evaluate if cyberpunk aesthetic is helping or hurting
- [ ] Option A: Add light mode toggle (demonstrates UX thinking)
- [ ] Option B: Create more neutral professional variant
- [ ] Option C: Keep dark but reduce neon intensity
- [ ] Test with 5+ people outside tech for feedback

### Task 3.2: Improve Visual Hierarchy
- [ ] Audit heading sizes and spacing
- [ ] Implement consistent 8px grid system
- [ ] Add more breathing room around content
- [ ] Improve section dividers
- [ ] Review contrast ratios for accessibility

### Task 3.3: Add Micro-Interactions
- [ ] Subtle hover effects on project cards
- [ ] Smooth scroll animations (respect `prefers-reduced-motion`)
- [ ] Loading states if fetching data
- [ ] Tasteful GSAP enhancements

### Task 3.4: Add Calendar Booking
- [ ] Set up Calendly or similar
- [ ] Add "Schedule a 15-minute intro call" link
- [ ] Integrate into contact modal
- [ ] Reduces friction for interested employers

---

## Phase 4: Thought Leadership

**Objective:** Demonstrate expertise beyond code
**Estimated Effort:** Ongoing
**Status:** Not Started

### Task 4.1: Add Blog/Writing Section
- [ ] Create blog post capability (Astro content collection)
- [ ] Write 2-3 technical articles
- [ ] Topics: Accessibility, Performance, React patterns
- [ ] Option: Link to external platforms (Dev.to, Medium)

### Task 4.2: Document Open Source Contributions
- [ ] List significant OSS contributions
- [ ] Include GitHub stats if impressive
- [ ] Highlight any maintained packages

### Task 4.3: Add Speaking/Presentations
- [ ] List any conference talks
- [ ] Include meetup presentations
- [ ] Add links to slides/recordings if available

---

## New Page Flow (Post Phase 1)

```
┌─────────────────────────────────────────────────────────────┐
│  HERO                                                       │
│  - Name, title, headshot                                    │
│  - "Senior Frontend Engineer"                               │
│  - Value prop + quantified achievements                     │
│  - [View My Work] [Let's Talk] CTAs                        │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  FEATURED WORK: NY Post                                     │
│  - 331M pageviews stat (lead with best)                    │
│  - Company context + role                                   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  SKILLS                                                     │
│  - Tech stack grid (visible early)                         │
│  - React, TypeScript, Node.js, Python, etc.                │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  EXPERIENCE                                                 │
│  - Job history with STAR achievements                      │
│  - Company logos (optional)                                │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  PROJECTS                                                   │
│  - Technical projects with GitHub/demo links               │
│  - Employer-relevant work                                  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  BEYOND THE SCREEN (Passion Projects)                      │
│  - Anglerfish exhibit (condensed)                          │
│  - Shows creativity without dominating                     │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  FOOTER                                                     │
│  - "Ready to build something great?"                       │
│  - [Get in Touch] [Download Resume] CTAs                   │
│  - Availability statement                                  │
└─────────────────────────────────────────────────────────────┘
```

---

## Success Metrics

### Qualitative
- [ ] 5 hiring managers review site and understand role within 30 seconds
- [ ] Feedback confirms "hireable professional" impression
- [ ] Anglerfish is seen as "interesting bonus" not "main focus"

### Quantitative
- [ ] Lighthouse Performance: 95+
- [ ] Build size: < 10MB ✅ (Currently 9.1MB)
- [ ] First Contentful Paint: < 1.5s
- [ ] Time to Interactive: < 3s

---

## Files Reference

### Modified in Phase 1
| File | Changes |
|------|---------|
| `src/pages/index.astro` | Layout restructure, WebP import |
| `src/components/Hero.astro` | New copy, CTAs, pills |
| `src/components/Footer.astro` | CTA section, availability |
| `src/components/Nav.astro` | Updated link labels |
| `src/components/FishHero.astro` | WebP import |
| `src/layouts/Layout.astro` | Font optimization |
| `tailwind.config.mjs` | Removed unused fonts |

### New Assets
| File | Size | Purpose |
|------|------|---------|
| `src/images/bg_video_glitch.webp` | 756KB | Optimized background |
| `src/images/water-reflections.webp` | 1.1MB | Optimized water effect |
| `src/images/texture-ripped1.webp` | 820KB | Optimized texture |

---

## Notes

- Original JPG files retained for backwards compatibility
- WebP has ~95% browser support; Astro handles fallbacks
- Animation system (`src/lib/animations/`) may need updates for new section order
- Contact modal unchanged; working well
