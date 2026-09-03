import type { APIRoute } from 'astro';
import { config } from '../config';
import { services } from '../data/services';

// A concise, plain-text index for AI assistants/crawlers that don't render
// JavaScript - see llmstxt.org. Worth having only because the rest of this
// starter prerenders real content for every route (see astro.config.mjs);
// without that, this file would just point crawlers at pages they can't
// read anyway.
export const GET: APIRoute = () => {
  const offerLines = services.map((s) => `- [${s.name}](${config.siteUrl}/oferta/${s.slug}): ${s.shortDescription}`).join('\n');

  const body = `# ${config.siteName}

> ${config.tagline}. Siedziba: ${config.address.city}, ${config.address.street}.

## Firma

- [Strona główna](${config.siteUrl}/)
- [O nas](${config.siteUrl}/o-nas)
- [Kontakt](${config.siteUrl}/kontakt)

## Oferta

- [Lista oferty](${config.siteUrl}/oferta)
${offerLines}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
