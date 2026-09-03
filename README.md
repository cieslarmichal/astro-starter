# Astro Starter — strona wizytówka

Generyczny starter pod strony typu "wizytówka firmy": landing page, o nas,
oferta (lista + strony szczegółowe), kontakt z działającym formularzem. Zero
frameworka JS wysyłanego do przeglądarki poza kilkoma inline'owanymi
skryptami (menu mobilne, formularz kontaktowy) - reszta to statyczny
HTML/CSS generowany na buildzie.

Wyciągnięty z pełnej migracji realnej strony firmowej z React SPA na Astro -
zachowuje całą infrastrukturę SEO/deploymentu, którą warto mieć w każdym
takim projekcie, bez konkretnych danych tamtej firmy.

## Co tu jest

- **Astro + Tailwind v4**, statyczny output (`output: 'static'`,
  `build.format: 'file'` → płaskie pliki `<trasa>.html`, nie
  `<trasa>/index.html` - patrz komentarz w `nginx/nginx.conf` dlaczego).
- **SEO od razu poprawnie**: unikalne `title`/`description`/`canonical` na
  każdej stronie, Open Graph + Twitter Card, JSON-LD (`Organization`,
  `LocalBusiness`, `WebSite`, `BreadcrumbList`, `Service`, `ItemList` - patrz
  `src/lib/structuredData.ts`), automatyczna sitemapa
  (`@astrojs/sitemap` - nigdy nie wyjdzie z synchronizacji z realnymi
  trasami, w przeciwieństwie do ręcznie utrzymywanej), `robots.txt` i
  `llms.txt` generowane z tego samego configu co reszta strony.
- **Zero layout shift**: `src/lib/imageDimensions.ts` czyta realny rozmiar
  pliku przez `sharp` na buildzie i wstawia `width`/`height` na `<img>` -
  nie trzeba tego liczyć ręcznie.
- **Formularz kontaktowy**, który realnie wysyła maila (web3forms.com, darmowe,
  bez własnego backendu) + honeypot antyspamowy, bez CAPTCHA.
- **Analityka**: miejsce na Cloudflare Web Analytics (prywatne, bez
  cookies) - albo podmień na cokolwiek innego, nic więcej od tego nie zależy.
- **nginx + Docker** gotowe do wdrożenia - cache dla assetów, nagłówki
  bezpieczeństwa, przekierowania www→apex i bez końcowego slasha, prawdziwe
  404 (nie soft-404 zwracające 200).
- Wzorzec **lista + strona szczegółowa napędzana danymi**
  (`src/data/services.ts` + `src/pages/oferta/`) - skopiuj ten kształt pod
  własne produkty, case studies, cokolwiek.

## Zacznij tutaj

1. `npm install`
2. **`src/config.ts`** - nazwa firmy, adres, kontakt, social media, klucze do
   formularza/analityki. Jedno miejsce, z którego czyta cała reszta strony.
   Rzeczy zależne od środowiska (`siteUrl`, klucz web3forms, token analityki)
   są w `envConfigs` - osobno dla `staging` i `production` (patrz
   [Deployment](#deployment)).
3. **`astro.config.mjs`** - `site` czyta się z `config.ts`, więc wystarczy
   zmienić to raz.
4. Podmień placeholdery w `public/*.webp` (wygenerowane jako kolorowe
   plakietki z podpisem "podmień") na prawdziwe zdjęcia - zachowaj te same
   nazwy plików albo zaktualizuj ścieżki w `src/pages/index.astro`,
   `src/pages/o-nas.astro` i `src/data/services.ts`.
5. `src/data/services.ts` / `src/data/testimonials.ts` - Twoja oferta i
   opinie.
6. `nginx/nginx.conf` - podmień `example.com` na swoją domenę (dwa miejsca).
7. Kolor marki: klasy `orange-*` w komponentach i stronach to zwykły
   Tailwind - podmień na inny kolor z palety (albo zdefiniuj własną w
   `src/index.css`).
8. `npm run dev`.

## Formularz kontaktowy

Domyślnie wysyła przez [web3forms.com](https://web3forms.com) (darmowy plan,
bez rejestracji karty). Załóż konto, wklej swój `access key` do
`config.web3formsAccessKey` - i tyle, formularz na `/kontakt` zaczyna
dostarczać maile. Chcesz inny provider (Formspree, własny endpoint) -
podmień `fetch()` w `<script>` na dole `src/pages/kontakt.astro`, reszta
(walidacja, stan sukcesu/błędu) zostaje bez zmian.

## Komendy

| Komenda | Co robi |
| --- | --- |
| `npm run dev` | Lokalny serwer deweloperski |
| `npm run build` | `astro check` + build produkcyjny do `dist/` |
| `npm run preview` | Podgląd zbudowanej wersji |
| `npm run lint` | ESLint (`.ts` + `.astro`) |

## Deployment

`Dockerfile` buduje stronę i serwuje ją przez nginx (`nginx/nginx.conf`) -
działa na dowolnym hoście uruchamiającym kontenery (Fly.io, Railway,
DigitalOcean App Platform, VPS z Dockerem...). Bez zmian w kodzie aplikacji,
tylko podmień domenę w `nginx/nginx.conf`.

### Dwa środowiska: staging i production

Aktywne środowisko wybiera build-arg `BUILD_ENV` (Docker `ARG` → `ENV` →
`process.env.BUILD_ENV` w `src/config.ts`). Tylko `BUILD_ENV=production`
wybiera production - wszystko inne (lokalny `npm run build`, CI, staging) to
staging, więc production jest opt-in i nie da się w nie trafić przypadkiem.
Per-środowiskowe wartości (`siteUrl`, klucz web3forms, token analityki)
siedzą w `envConfigs` w `src/config.ts`; reszta configu jest wspólna.

Staging jest w całości `noindex, nofollow` (meta w `Layout.astro`) i ma
`robots.txt` z `Disallow: /` bez linii `Sitemap:` - żeby
`staging.example.com` nigdy nie konkurował w wynikach z produkcją.

### Fly.io

Dwa osobne configi, jeden Dockerfile:

| Plik | App | `BUILD_ENV` |
| --- | --- | --- |
| `fly-staging.toml` | `astro-starter-staging` | `staging` |
| `fly-production.toml` | `astro-starter` | `production` |

Pierwszy setup:

1. Podmień `app = '...'` w obu `fly-*.toml` na nazwy swoich aplikacji.
2. `fly apps create <nazwa>` i `fly apps create <nazwa>-staging`.
3. `fly tokens create deploy` → wrzuć jako sekret repo `FLY_TOKEN`
   (Settings → Secrets and variables → Actions).
4. Ręczny deploy: `flyctl deploy -c fly-staging.toml` /
   `flyctl deploy -c fly-production.toml`.

### GitHub Actions

- **`.github/workflows/cicd.yml`** - na każdy PR i push do `main`: build +
  lint. Na push do `main` dodatkowo automatyczny deploy na **staging**.
- **`.github/workflows/deploy-production.yml`** - deploy na **production**
  wyłącznie ręcznie (Actions → Deploy to Production → Run workflow).

Oba wymagają sekretu `FLY_TOKEN`.
