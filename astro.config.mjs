import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import { config } from './src/config.ts';

// https://astro.build/config
export default defineConfig({
  site: config.siteUrl,
  output: 'static',
  build: {
    // Flat <route>.html files instead of <route>/index.html - see
    // nginx/nginx.conf's comment for why (avoids nginx's automatic
    // directory-needs-a-trailing-slash redirect on every route).
    format: 'file',
  },
  integrations: [
    icon(),
    // Generates dist/sitemap-index.xml + dist/sitemap-0.xml from the actual
    // pages Astro built, so it can never drift out of sync with the real
    // route list the way a hand-maintained sitemap.xml eventually does.
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
