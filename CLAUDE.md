# CLAUDE.md - AI Assistant Context for Portfolio Project

## Project Overview

This is Grant Keller's professional portfolio website showcasing frontend development expertise, with special focus on creative technical implementations and business-technology translation abilities.

## Architecture

**Framework:** Astro 5.7.4 (Static Site Generator)
**Key Technologies:** TypeScript, Tailwind CSS, DaisyUI, GSAP animations
**Deployment:** GitHub Pages (https://gdkeller.github.io/portfolio)

## Key Directories & Files

```
src/
├── components/          # Astro components (19 total)
│   ├── Hero.astro      # Main landing section
│   ├── Projects.astro  # Project showcase grid
│   └── Jobs.astro      # Work experience timeline
├── content/            # Content collections (Astro's data layer)
│   ├── config.ts       # Zod schemas for type safety
│   ├── jobs/           # Professional experience entries
│   ├── projects/       # Featured project showcases
│   └── featured/       # Special content (anglerfish story, etc.)
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

### Performance Considerations
- Large background images need optimization (current: 5.6MB unoptimized)
- Use Astro's `<Image>` component for automatic optimization
- Implement lazy loading for below-fold content
- Current build size: ~21MB (needs reduction)

## Design System

### Colors
- Primary: Cyberpunk-inspired neon accents
- Background: Dark themes with texture overlays
- Text: High contrast for accessibility

### Typography
- Currently using 6+ fonts (needs consolidation)
- Target: 2-3 fonts maximum for performance

### Components Pattern
- Most components are self-contained Astro files
- Props passed via Astro.props
- TypeScript interfaces for type safety

## Known Issues & Improvements

### High Priority
- ✅ README.md replaced with professional documentation
- ✅ Content/misc/ renamed to content/featured/
- ✅ Generic headshot filenames renamed with descriptive names
- No testing infrastructure exists

### Performance
- Background images need WebP conversion
- CSS bundle needs purging (37KB → ~15KB possible)
- Font loading needs optimization

### Documentation
- ✅ Documentation structure unified (docs/ directory)
- Component documentation missing
- No JSDoc comments in components
- Architecture decision records needed

## Development Workflow

```bash
# Development
npm run dev          # Starts on port 3333

# Production Build
npm run build        # Type checks + builds to ./dist/

# Preview Production
npm run preview      # Test production build locally
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
Each content type has specific required fields:
- **Jobs:** title, company, dateRange, bullets
- **Projects:** title, description, image, tags
- **Skills:** name, category, proficiency

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