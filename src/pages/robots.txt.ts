import type { APIRoute } from 'astro';
import { config } from '../config';

// Generated from src/config.ts at build time instead of a static public/
// file, so the domain can't drift out of sync between here and
// astro.config.mjs's `site` (which is what @astrojs/sitemap uses).
export const GET: APIRoute = () => {
  const body = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

Sitemap: ${config.siteUrl}/sitemap-index.xml
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
