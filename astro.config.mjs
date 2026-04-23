// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import favicons from 'astro-favicons';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://gdkeller.github.io',
  // base: 'Portfolio',
  integrations: [mdx(), favicons()],
  image: {
    // Emit <img srcset> from <Image widths={...}>. We intentionally do NOT set
    // a default `layout` here — the constrained layout applies CSS like
    // `height: auto` that collides with Tailwind's `h-full` / `object-cover`
    // on images that need to fill a sized parent (card masks, grid cells).
    // Per-image `layout` can still be opted into where appropriate.
    responsiveStyles: true,
  },
  server: {
    port: 3111,
  },
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ["react-icons"],
    },
  },
});
