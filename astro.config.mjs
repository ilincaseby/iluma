// @ts-check
/**
 * Astro configuration
 * ---------------------------------------------------------------------------
 * • `site` — production URL (canonical / social previews). Keep in sync with
 *            `url` in src/config/site.ts.
 * • Tailwind CSS v4 runs as a Vite plugin; tokens live in src/styles/global.css.
 */
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://ilumastudiodesign.pages.dev',
  output: 'static',
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  image: { responsiveStyles: true },
  vite: { plugins: [tailwindcss()] },
});
