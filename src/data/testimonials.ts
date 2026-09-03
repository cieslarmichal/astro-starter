export interface Testimonial {
  name: string;
  role: string;
  text: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Anna Kowalska',
    role: 'Właścicielka, Studio Kowalska',
    text: 'Od pierwszego kontaktu do wdrożenia minęły trzy tygodnie i przez cały ten czas wiedzieliśmy dokładnie, na jakim etapie jesteśmy. Zero niedomówień.',
  },
  {
    name: 'Marek Nowicki',
    role: 'CEO, Nowicki Group',
    text: 'Polecam przede wszystkim za komunikację - odpowiedzi w tym samym dniu, jasne rekomendacje i realistyczne terminy, których dotrzymano.',
  },
  {
    name: 'Katarzyna Wiśniewska',
    role: 'Dyrektor operacyjna',
    text: 'Wdrożenie, które faktycznie coś zmieniło, nie tylko wyglądało dobrze na papierze. Efekty widać było już po pierwszym miesiącu.',
  },
];
