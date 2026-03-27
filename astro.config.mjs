// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import favicons from 'astro-favicons';

// https://astro.build/config
export default defineConfig({
  site: 'https://gdkeller.github.io',
  // base: 'Portfolio',
  integrations: [favicons()],
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
