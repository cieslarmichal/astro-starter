/**
 * Example content - this is the data-driven "list page + detail page" pattern
 * the rest of the starter is built around (see src/pages/oferta/). Replace
 * these with your own offer, or copy this file's shape for other content
 * types (products, case studies, portfolio pieces, ...).
 */

export interface Service {
  slug: string;
  name: string;
  shortDescription: string;
  description: string[];
  image?: string;
  highlights: string[];
}

export const services: Service[] = [
  {
    slug: 'strategia',
    name: 'Strategia i doradztwo',
    shortDescription: 'Pomagamy ustalić priorytety, zanim zaczniemy cokolwiek budować.',
    image: '/service-1.webp',
    description: [
      'Zanim zaproponujemy rozwiązanie, chcemy zrozumieć problem. Zaczynamy od warsztatu, w którym wspólnie ustalamy cele, ograniczenia i to, co dla Ciebie faktycznie oznacza sukces.',
      'Z tego wychodzi konkretny plan działania - nie ogólnikowa prezentacja, tylko lista kroków z priorytetami, które można od razu zacząć realizować.',
    ],
    highlights: ['Warsztat odkrywający', 'Plan działania z priorytetami', 'Wsparcie we wdrożeniu'],
  },
  {
    slug: 'wdrozenie',
    name: 'Wdrożenie',
    shortDescription: 'Realizujemy to, co ustaliliśmy - bez niespodzianek po drodze.',
    image: '/service-2.webp',
    description: [
      'Pracujemy w krótkich iteracjach, żeby efekty były widoczne od pierwszego tygodnia, nie dopiero na koniec projektu.',
      'Każdy etap kończy się realnym, sprawdzalnym rezultatem, a nie tylko wewnętrzną dokumentacją.',
    ],
    highlights: ['Cotygodniowe postępy', 'Pełna transparentność kosztów', 'Wsparcie po zakończeniu'],
  },
  {
    slug: 'wsparcie',
    name: 'Wsparcie i rozwój',
    shortDescription: 'Zostajemy po starcie - monitorujemy, poprawiamy, rozwijamy.',
    image: '/service-3.webp',
    description: [
      'Uruchomienie to początek, nie koniec. Regularnie sprawdzamy, co działa, a co warto poprawić, i reagujemy zanim mały problem stanie się dużym.',
    ],
    highlights: ['Stały kontakt', 'Raporty miesięczne', 'Elastyczny zakres wsparcia'],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
