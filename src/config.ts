/**
 * Single source of truth for this site's identity. Change these when you
 * start a new project from this starter - everything else (SEO tags,
 * structured data, footer, contact page) reads from here.
 *
 * The active environment is chosen at build time by the BUILD_ENV env var
 * (Docker build-arg -> ENV, see Dockerfile + fly-*.toml). Only
 * BUILD_ENV=production selects production - everything else (unset, local
 * `npm run build`, staging deploy) is staging, so production is opt-in and
 * can never be hit by accident.
 */
type Env = 'production' | 'staging';

const active: Env = process.env.BUILD_ENV === 'production' ? 'production' : 'staging';

/**
 * Values that differ between environments. Keep this list as short as
 * possible - everything env-agnostic belongs in `shared` below.
 */
type EnvConfig = {
  env: Env;
  siteUrl: string;
  // web3forms.com access key (free, no backend needed) - sign up and paste
  // your key here to make the contact form on /kontakt actually deliver mail.
  // Use a separate form per environment so staging test submissions don't
  // land in the same inbox as real leads.
  web3formsAccessKey: string;
  // Cloudflare Turnstile site key (dash.cloudflare.com -> Turnstile -> Add
  // widget) - the contact form uses it as a client-side gate only; the token
  // is NOT forwarded to web3forms (server-side captcha verification is a
  // web3forms PRO feature and free accounts 400 the moment `cf-turnstile-
  // response` is in the payload). The default below is Cloudflare's public
  // test key, which always passes - swap it for a real one per environment.
  turnstileSiteKey: string;
  // Cloudflare Web Analytics token (dash.cloudflare.com -> Analytics -> Web
  // Analytics -> Add site) - leave empty to disable the snippet entirely, or
  // swap the <script> in Layout.astro for Plausible/GA4/whatever you use.
  cloudflareAnalyticsToken: string;
};

const envConfigs = {
  production: {
    env: 'production',
    siteUrl: 'https://example.com',
    web3formsAccessKey: '',
    turnstileSiteKey: '1x00000000000000000000AA',
    cloudflareAnalyticsToken: '',
  },
  staging: {
    env: 'staging',
    siteUrl: 'https://staging.example.com',
    web3formsAccessKey: '',
    turnstileSiteKey: '1x00000000000000000000AA',
    cloudflareAnalyticsToken: '',
  },
} as const satisfies Record<Env, EnvConfig>;

const shared = {
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
} as const;

export const config = {
  ...shared,
  ...envConfigs[active],
} as const;
