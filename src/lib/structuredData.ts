import { config } from '../config';

/**
 * Schema.org JSON-LD helpers. Pass the return values (as an array) to
 * Layout.astro's `jsonLd` prop - it wraps them in one
 * `{'@context':'https://schema.org','@graph':[...]}` block per page.
 */

export function createOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: config.siteName,
    url: config.siteUrl,
    logo: `${config.siteUrl}/og-image.webp`,
    description: config.tagline,
    sameAs: Object.values(config.social).filter(Boolean),
  };
}

export function createLocalBusinessStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${config.siteUrl}/#local-business`,
    name: config.siteName,
    url: config.siteUrl,
    telephone: config.contact.phoneHref.replace('tel:', ''),
    email: config.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: config.address.street,
      addressLocality: config.address.city,
      postalCode: config.address.postalCode,
      addressCountry: config.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: config.address.lat,
      longitude: config.address.lng,
    },
    hasMap: config.address.mapsUrl,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [...config.hours.days],
        opens: config.hours.opens,
        closes: config.hours.closes,
      },
    ],
    sameAs: Object.values(config.social).filter(Boolean),
  };
}

export function createWebSiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: config.siteName,
    url: config.siteUrl,
    description: config.tagline,
  };
}

export function createWebPageStructuredData(params: {
  url: string;
  name: string;
  description: string;
  dateModified?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': params.url,
    url: params.url,
    name: params.name,
    description: params.description,
    inLanguage: 'pl-PL',
    ...(params.dateModified && { dateModified: params.dateModified }),
  };
}

export function createBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** For an offer/service detail page. */
export function createServiceStructuredData(params: { name: string; description: string; url: string; image?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: params.name,
    description: params.description,
    url: params.url,
    ...(params.image && { image: `${config.siteUrl}${params.image}` }),
    provider: {
      '@type': 'Organization',
      name: config.siteName,
      url: config.siteUrl,
    },
    areaServed: config.address.city,
  };
}

/** For a list page (e.g. the offer/services index). */
export function createItemListStructuredData(
  items: Array<{ name: string; url: string; image?: string; description?: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url,
      ...(item.image && { image: `${config.siteUrl}${item.image}` }),
      ...(item.description && { description: item.description }),
    })),
  };
}
