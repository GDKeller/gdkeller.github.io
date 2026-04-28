# CLAUDE.md - AI Assistant Context for Portfolio Project

## Project Overview

This is Grant Keller's professional portfolio website showcasing frontend development expertise, with special focus on creative technical implementations and business-technology translation abilities.

## Architecture

**Framework:** Astro 6.1.9 (static output)
**Key Technologies:** TypeScript, Tailwind v4 (CSS-config), Sass (sass-embedded), GSAP
**Deployment:** <https://www.grantkeller.dev> (configured in `astro.config.mjs`)
**Node:** >=22.12.0

## Project Structure

This file does not document the directory layout. To see project structure, use `tree`, `fd`, or `ls` directly (e.g. `tree -L 3 -I 'node_modules|dist' src`). Trees go stale; the filesystem is the source of truth.

A few non-obvious anchors:

- `src/content.config.ts` — Zod schemas for all content collections (lives at `src/`, NOT `src/content/`)
- `src/styles/global.css` — Tailwind v4 `@theme` blocks; this is where theme/tokens live (no `tailwind.config.*` exists)
- `src/styles/jade-theme.css` — imported by `global.css`; layered theme overrides
- `src/lib/animations/` — GSAP modules (hero, content, skills, anglerfish, nypost)
- `src/lib/dev-flags.ts` — build-time feature flags
- `src/pages/` — multi-page: `index.astro`, `playground.astro`, `styles.astro`, `nhmla-anglerfish.astro`
- `src/layouts/Layout.astro` — root document shell used by every page

## Content Collections

Five collections, all validated by Zod in `src/content.config.ts`:

- `jobs/` — `.md` only
- `projects/` — `.md` or `.mdx`
- `skills/` — `.md` only
- `featured/` — `.md` only (anglerfish story, etc.)
- `current/` — `.md` only ("currently building" cards). Schema includes `status` (live|beta|launching-soon), optional `brand: davant`, and `focal: true` to feature it.

## Design Context

### Users

Hiring managers and potential clients evaluating Grant's technical abilities. They're scanning quickly, comparing against other candidates, and looking for evidence of craft, range, and taste.

### Brand Personality

**Technical, Bold, Creative** — engineering depth with artistic confidence.

### Emotional Goals

- "They think differently" — surprise and curiosity through creative technical choices
- "I want to work with them" — approachability and collaborative energy beneath the polish
- "Wide breadth of skills, I trust them with any problem" — demonstrated range and reliability

### Aesthetic Direction

- **Theme:** Dark only — black backdrop with emerald as the dominant color, fuchsia as punctuation
- **Effects:** Neon glow text-shadows, glass morphism (translucent backgrounds with `backdrop-blur`), radial gradient bursts, blurred emerald scanlines on section headings
- **Fonts:** Prompt (display + body), IBM Plex Mono (mono), Manufacturing Consent (decorative). Loaded via Astro Fonts using Fontsource (see `astro.config.mjs`); CSS vars wired in `global.css`.
- **Type scale & theme:** Tailwind v4 has no JS config. All theme lives in `src/styles/global.css` inside `@theme` blocks. Add new tokens there, not in a `tailwind.config.*`.
- **Animation:** GSAP for complex sequences (ScrollTrigger, oscilloscope wave, scroll reveals); CSS transitions for simple hover/focus states
- **Anti-references:** Generic portfolio templates, cookie-cutter layouts, safe/corporate aesthetics
- **The current site IS the reference** — evolve and refine, don't reinvent

### Color tokens

Colors are expressed through semantic tokens defined in `src/styles/global.css`, named by role along a single axis — **attention intensity**. See the comment block in that file for the authoritative list; don't reach for raw `emerald-*` or `fuchsia-*` classes in new code.

**Attention hierarchy** (content the user should read/see):

- `foundation` — baseline reading copy
- `emphasis` (+hover) — gentle lift above foundation (headings, labels, decorators)
- `accent` (+hover) — clearly prominent (buttons, active states, interactive elements)
- `highlight` (+hover) — fuchsia, maximum demand; used sparingly

**Structural** (scaffolding, not competing for attention):

- `background` — the page backdrop
- `subtle` — dividers, borders, decoration; never used on text

Tokens encode _decisions_, not _elements_. If changing a token's value should update every use of it together, it's a valid token. Avoid element-named tokens like `button-bg` or `link-color` — they collapse the moment the same element needs different values in different contexts.

### Design Principles

1. **Craft over convention** — Every interaction should feel intentional and hand-built, not templated
2. **Atmosphere first** — Use glow, depth, and texture to create a sense of place, not just a page
3. **Accessible by default** — Full `prefers-reduced-motion` support, WCAG 2.2 focus indicators, `prefers-contrast: high`, semantic HTML, sr-only labels
4. **Show, don't tell** — The site itself is the portfolio piece; the quality of the code and interactions demonstrates the skills being claimed
5. **Emerald is the identity** — Emerald neon on black is the signature; fuchsia is the punctuation mark, not the sentence

## Known Issues

- No testing infrastructure exists (no test runner, no test files)
- `src/images/` still holds raw `.jpg`/`.png` assets that haven't been converted to WebP/AVIF. Hero backgrounds already pipe through `<Picture>` with AVIF+WebP, but the long tail (job/project/skill imagery) does not.
- `dist/_astro/Layout.*.css` is ~124KB. Worth investigating before optimizing the smaller per-page bundles.

## Development Workflow

```bash
# Development
npm run dev          # Starts on port 3111

# Production Build
npm run build        # Type checks + builds to ./dist/

# Preview Production
npm run preview      # Test production build locally

# Type-check only (no build)
npm run typecheck    # astro check && tsc --noEmit

# Code Quality
npm run lint         # ESLint on src/**/*.{ts,astro}
npm run lint:fix     # Auto-fix ESLint issues
npm run format       # Prettier check
npm run format:fix   # Prettier write
npm run knip         # Detect dead code/exports/deps
npm run knip:fix     # Apply knip's safe fixes

# Color guard — fails if any oklch() value falls outside sRGB
npm run check:colors      # see scripts/check-oklch.mjs
npm run check:colors:fix

# Lighthouse against preview server (port 3112)
npm run lighthouse
```

## Content Guidelines

### Frontmatter Requirements

Each content type has specific required fields (see `src/content.config.ts` for full schemas):

- **Jobs:** company, position (+ optional: startMonthYear, endMonthYear, tech, companyLogo, order)
- **Projects:** title, projectName, client (+ optional: clientLogo, timeperiod, tags, image, tech)
- **Skills:** title (+ optional: tags, image)
- **Featured:** title (+ optional: description, tags, image)
- **Current:** title, description (+ optional: url, type, image, video, tech, status, brand, focal, order)

## AI Assistant Notes

- Multi-page: index is the main scrollable page, but `/playground`, `/styles`, and `/nhmla-anglerfish` are real routes — don't assume SPA.
- Content is managed through Astro's content collections for type safety
- Performance is a current concern - always consider bundle size impact
- The design aesthetic is creative/cyberpunk - maintain visual consistency
- Professional tone required - this showcases to potential employers
- The `/styles` page renders every semantic token utility; the `@source inline(...)` block at the top of `global.css` exists to force-emit those classes. If you add a token, add it to that inline list too or it will be tree-shaken.

## Project Board

This project uses a structured board system for project management.

- **Ask before creating new board files** — don't auto-create tasks, ADRs, etc.
- Follow the board system spec for all documentation artifacts
- Use `/board:board-show` to see current board state
- Use `/board:board-add` to create new items
- Use `/board:board-update` after completing significant work to reconcile the board
- Use `/board:board-check` when starting work to find related board context
