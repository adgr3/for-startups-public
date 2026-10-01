import { loadCatalog } from '../lib/catalog.js';

const DEFAULT_SITE = 'https://for-startups.pages.dev';

export function GET() {
  const { items, meta } = loadCatalog();
  const SITE = (typeof meta.site_url === 'string' && meta.site_url)
    ? meta.site_url.replace(/\/$/, '')
    : DEFAULT_SITE;
  const staticPaths = ['/', '/historia/'];
  const opportunityPaths = items
    .filter((item) => item.slug)
    .map((item) => `/opportunities/${item.slug}/`);

  const urls = [...new Set([...staticPaths, ...opportunityPaths])]
    .map((path) => `  <url>\n    <loc>${SITE}${path}</loc>\n  </url>`)
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
