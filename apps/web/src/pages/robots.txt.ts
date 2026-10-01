import { loadCatalog } from '../lib/catalog.js';

// robots.txt is generated, not static: the sitemap URL must follow the
// canonical site URL (pages.dev today, a custom domain tomorrow) without a
// hardcoded value drifting out of sync.
const DEFAULT_SITE = 'https://for-startups.pages.dev';

export function GET() {
  const { meta } = loadCatalog();
  const site = (typeof meta.site_url === 'string' && meta.site_url)
    ? meta.site_url.replace(/\/$/, '')
    : DEFAULT_SITE;
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
