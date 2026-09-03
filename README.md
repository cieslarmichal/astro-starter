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
