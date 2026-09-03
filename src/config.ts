/**
 * Single source of truth for this site's identity. Change these when you
 * start a new project from this starter - everything else (SEO tags,
 * structured data, footer, contact page) reads from here.
 */
export const config = {
  siteUrl: 'https://example.com',
  siteName: 'Acme',
  legalName: 'Acme Sp. z o.o.',
  tagline: 'Robimy to, w czym jesteśmy najlepsi',

  contact: {
    email: 'kontakt@example.com',
    phone: '+48 000 000 000',
    phoneHref: 'tel:+48000000000',
  },

  address: {
    street: 'ul. Przykładowa 1',
    postalCode: '00-000',
    city: 'Warszawa',
    country: 'PL',
    // Approximate geo coordinates for LocalBusiness structured data - look
    // your real address up on openstreetmap.org/search and replace these.
    lat: 52.2297,
    lng: 21.0122,
    mapsUrl: 'https://maps.google.com',
  },

  hours: {
    opens: '09:00',
    closes: '17:00',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const,
  },

  legal: {
    nip: '000-000-00-00',
    regon: '000000000',
    krs: '0000000000',
  },

  social: {
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/',
    linkedin: 'https://linkedin.com/company/',
  },

  // Cloudflare Web Analytics token (dash.cloudflare.com -> Analytics -> Web
  // Analytics -> Add site) - leave empty to disable the snippet entirely, or
  // swap the <script> in Layout.astro for Plausible/GA4/whatever you use.
  cloudflareAnalyticsToken: '',

  // web3forms.com access key (free, no backend needed) - sign up and paste
  // your key here to make the contact form on /kontakt actually deliver mail.
  web3formsAccessKey: '',
} as const;
