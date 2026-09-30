import { defineConfig } from 'astro/config';

// Static output: the daily pipeline regenerates a data file and the site is
// rebuilt, then published as an immutable release served by a static server.
// ASTRO_OUT_DIR lets tests build into a temporary directory instead of the
// real dist/ used by the production publish step.
export default defineConfig({
  output: 'static',
  outDir: process.env.ASTRO_OUT_DIR || 'dist',
  build: { format: 'directory' },
  compressHTML: true,
});
