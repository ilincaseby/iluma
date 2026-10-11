/**
 * ============================================================================
 *  ICONIC CHAIRS — from the "Iconic Chairs · the stories behind timeless
 *  design" carousel. Rendered as a horizontal 3D carousel.
 * ============================================================================
 */
import type { ImagePath } from '../lib/images';

export interface Chair {
  name: string;
  designer: string;
  year: number;
  text: string;
  image: ImagePath;
}

export const chairs: Chair[] = [
  {
    name: 'Barcelona Chair',
    designer: 'Ludwig Mies van der Rohe',
    year: 1929,
    text: 'Creat pentru Pavilionul German de la Barcelona. Structura geometrică din oțel și pernele capitonate reflectă principiul lui Mies: „Less is more.”',
    image: 'chairs/chair-barcelona.jpg',
  },
  {
    name: 'Brno Chair',
    designer: 'Ludwig Mies van der Rohe',
    year: 1930,
    text: 'Creat pentru Villa Tugendhat, definit de structura cantilever care elimină picioarele posterioare. Structura devine însăși estetica piesei.',
    image: 'chairs/chair-brno.jpg',
  },
  {
    name: 'Wassily Chair',
    designer: 'Marcel Breuer',
    year: 1925,
    text: 'Unul dintre primele exemple celebre de mobilier din țeavă de oțel. Inspirat de cadrul unei biciclete, transformă un material industrial într-o siluetă ușoară.',
    image: 'chairs/chair-wassily.jpg',
  },
  {
    name: 'Cesca Chair',
    designer: 'Marcel Breuer',
    year: 1928,
    text: 'Lemn, trestie împletită și o structură tubulară continuă. Combină materialele tradiționale cu tehnologia industrială.',
    image: 'chairs/chair-cesca.jpg',
  },
  {
    name: 'CH24 Wishbone Chair',
    designer: 'Hans J. Wegner',
    year: 1949,
    text: 'Un simbol al designului danez. Spătarul în formă de Y și șezutul împletit manual îi dau o siluetă recognoscibilă, dar ușoară vizual.',
    image: 'chairs/chair-wishbone.jpg',
  },
  {
    name: 'Panton Chair',
    designer: 'Verner Panton',
    year: 1960,
    text: 'Primul scaun realizat dintr-o singură bucată de plastic, într-o formă continuă. Sculptural, îndrăzneț și complet diferit de limbajul tradițional.',
    image: 'chairs/chair-panton.jpg',
  },
  {
    name: 'Louis Ghost Chair',
    designer: 'Philippe Starck',
    year: 2002,
    text: 'O reinterpretare contemporană a scaunului medallion, din policarbonat transparent: o piesă prezentă vizual, fără să încarce spațiul.',
    image: 'chairs/chair-louis-ghost.jpg',
  },
  {
    name: 'Barcelona Stool',
    designer: 'Ludwig Mies van der Rohe',
    year: 1929,
    text: 'Din aceeași familie cu Barcelona Chair. Funcționează la fel de bine ca seating sau ca accent sculptural.',
    image: 'chairs/chair-barcelona-stool.jpg',
  },
];
