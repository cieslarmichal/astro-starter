import type { APIRoute } from 'astro';
import { config } from '../config';

// Generated from src/config.ts at build time instead of a static public/
// file, so the domain can't drift out of sync between here and
// astro.config.mjs's `site` (which is what @astrojs/sitemap uses).
//
// Staging (BUILD_ENV != production) gets a blanket Disallow and no Sitemap
// line, so search engines don't index staging.example.com as a full
// duplicate of production. Layout.astro also emits a noindex meta tag there.
export const GET: APIRoute = () => {
  const body =
    config.env === 'production'
      ? `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

Sitemap: ${config.siteUrl}/sitemap-index.xml
`
      : `# staging - keep this environment out of search indexes
User-agent: *
Disallow: /
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
