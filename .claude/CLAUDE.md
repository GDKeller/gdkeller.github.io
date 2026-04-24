# CLAUDE.md - AI Assistant Context for Portfolio Project

## Project Overview

This is Grant Keller's professional portfolio website showcasing frontend development expertise, with special focus on creative technical implementations and business-technology translation abilities.

## Architecture

**Framework:** Astro 5.16.4 (Static Site Generator)
**Key Technologies:** TypeScript, Tailwind CSS, DaisyUI, GSAP animations
**Deployment:** GitHub Pages (https://gdkeller.github.io/portfolio)

## Key Directories & Files

```
src/
├── components/          # Astro components (27 total)
│   ├── Hero.astro      # Main landing section
│   ├── Projects.astro  # Project showcase grid
│   ├── Jobs.astro      # Work experience timeline
│   ├── Header.astro    # Site header with GSAP oscilloscope animation
│   └── ...             # Nav, Footer, Awards, Talks, LogoCarousel, etc.
├── content/            # Content collections (Astro's data layer)
│   ├── config.ts       # Zod schemas for type safety
│   ├── jobs/           # Professional experience entries
│   ├── projects/       # Featured project showcases
│   ├── skills/         # Skill entries
│   └── featured/       # Special content (anglerfish story, etc.)
├── lib/
│   └── animations/     # GSAP animation modules (hero, content, skills, etc.)
├── pages/
│   └── index.astro     # Single-page application entry
└── styles/
    └── global.css      # Global styles and CSS variables
```

## Common Tasks

### Adding New Content

- **Jobs:** Create `.md` file in `src/content/jobs/`
- **Projects:** Create `.md` file in `src/content/projects/`
- All content uses Zod-validated frontmatter schemas defined in `src/content/config.ts`

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
- **Fonts:** Bayon (display), Bokor (decorative), Permanent Marker (handwritten accent), Prompt (body) — loaded via Google Fonts
- **Type scale:** Custom display/heading/body sizes defined in `tailwind.config.mjs`
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

- No testing infrastructure exists
- Background images need WebP conversion
- CSS bundle needs purging (37KB → ~15KB possible)
- Font loading needs optimization

## Development Workflow

```bash
# Development
npm run dev          # Starts on port 3111

# Production Build
npm run build        # Type checks + builds to ./dist/

# Preview Production
npm run preview      # Test production build locally

# Code Quality
npm run lint         # ESLint on src/**/*.{ts,astro}
npm run lint:fix     # Auto-fix ESLint issues
npx prettier --check .   # Check formatting
npx prettier --write .   # Fix formatting
```

## Component Conventions

### Naming

- PascalCase for component files
- Descriptive names (avoid generic like "Card")
- Group by function when possible

### Props

- Define TypeScript interfaces
- Use Zod for runtime validation where needed
- Document required vs optional props

### Styling

- Tailwind utilities preferred
- Component-scoped styles when needed
- Avoid inline styles

## Content Guidelines

### Frontmatter Requirements

Each content type has specific required fields (see `src/content/config.ts` for full schemas):

- **Jobs:** company, position (+ optional: startMonthYear, endMonthYear, tech, companyLogo, order)
- **Projects:** title, projectName, client (+ optional: clientLogo, timeperiod, tags, image, tech)
- **Skills:** title (+ optional: tags, image)
- **Featured:** title (+ optional: description, tags, image)

### Image Assets

- Store in `src/images/` with logical subdirectories
- Use descriptive filenames
- Optimize before committing (WebP preferred)

## AI Assistant Notes

- The site is a single-page application (SPA) - all content loads on index.astro
- Content is managed through Astro's content collections for type safety
- Performance is a current concern - always consider bundle size impact
- The design aesthetic is creative/cyberpunk - maintain visual consistency
- Professional tone required - this showcases to potential employers

## Project Board

This project uses a structured board system for project management.

- **Ask before creating new board files** — don't auto-create tasks, ADRs, etc.
- Follow the board system spec for all documentation artifacts
- Use `/board:board-show` to see current board state
- Use `/board:board-add` to create new items
- Use `/board:board-update` after completing significant work to reconcile the board
- Use `/board:board-check` when starting work to find related board context
