// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import favicons from "astro-favicons";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";
import astroCompress from "gab-astro-compress";
import compressor from "astro-compressor";

// https://astro.build/config
export default defineConfig({
  site: "https://www.grantkeller.dev",
  integrations: [mdx(), favicons(), sitemap(), compressor(), astroCompress()],
  image: {
    // Emit <img srcset> from <Image widths={...}>. We intentionally do NOT set
    // a default `layout` here — the constrained layout applies CSS like
    // `height: auto` that collides with Tailwind's `h-full` / `object-cover`
    // on images that need to fill a sized parent (card masks, grid cells).
    // Per-image `layout` can still be opted into where appropriate.
    responsiveStyles: true,
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Prompt",
      weights: [300, 400, 500, 700, 900],
      cssVariable: "--font-prompt",
    },
    {
      provider: fontProviders.fontsource(),
      name: "IBM Plex Mono",
      weights: [200, 300, 400, 700],
      cssVariable: "--font-ibm_plex_mono",
    },
    {
      provider: fontProviders.fontsource(),
      name: "Manufacturing Consent",
      weights: [400],
      cssVariable: "--font-manufacturing_consent",
    },
  ],
  server: {
    port: 3111,
  },
  vite: {
    plugins: [...tailwindcss()],
    ssr: {
      noExternal: ["react-icons"],
    },
  },
  devToolbar: {
    enabled: false,
  },
});
