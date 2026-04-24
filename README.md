# Grant Keller Portfolio

A modern, performant portfolio website built with Astro, TypeScript, and Tailwind CSS showcasing frontend development expertise and creative technical projects.

## 🚀 Tech Stack

- **Framework:** [Astro](https://astro.build) v5.7.4
- **Language:** TypeScript
- **Styling:** Tailwind CSS + DaisyUI
- **Animation:** GSAP
- **Build Tool:** Vite
- **Deployment:** GitHub Pages

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/      # Reusable Astro components
│   ├── content/         # Content collections (jobs, projects, skills)
│   ├── images/          # Image assets
│   ├── layouts/         # Page layouts
│   ├── pages/           # Route pages
│   └── styles/          # Global styles
├── public/              # Static assets
├── docs/                # Project documentation
├── CLAUDE.md           # AI assistant context
└── tailwind.config.mjs  # Tailwind configuration
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Available Scripts

- `npm run dev` - Start development server on port 3333
- `npm run build` - Type check and build for production
- `npm run preview` - Preview production build locally
- `npm run astro check` - Run Astro type checking

## 📝 Content Management

Content is managed through Astro's content collections:

- **Jobs** (`src/content/jobs/`) - Professional experience
- **Projects** (`src/content/projects/`) - Featured work
- **Skills** (`src/content/skills/`) - Technical competencies
- **Featured** (`src/content/featured/`) - Special content pieces

## 🎨 Component Architecture

Components follow a modular architecture pattern:

- **Layout Components** - Page structure and navigation
- **Content Components** - Display content from collections
- **UI Components** - Reusable interface elements

## 🚦 Performance

- Static site generation for optimal performance
- Image optimization with Astro's Image component
- Lazy loading for below-fold content
- Minimal JavaScript bundle

## 📄 License

© 2025 Grant Keller. All rights reserved.
