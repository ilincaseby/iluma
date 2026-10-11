/**
 * ============================================================================
 *  PALETTE — the autumn palette carousel ("5 culori de toamnă") + the
 *  "natural / calde / echilibrate" palette from the reel.
 *  Each color becomes a full-bleed texture panel that expands on hover.
 * ============================================================================
 */
import type { ImagePath } from '../lib/images';

export interface Swatch {
  name: string;
  mood: string;
  hex: string;
  texture: ImagePath;
}

export const swatches: Swatch[] = [
  { name: 'Terracotta', mood: 'caldă, pământie și plină de personalitate', hex: '#a24a28', texture: 'textures/tex-terracotta.jpg' },
  { name: 'Verde oliv', mood: 'natural, calm și atemporal', hex: '#59603a', texture: 'textures/tex-verde-oliv.jpg' },
  { name: 'Bej cald', mood: 'soft, versatil și perfect pentru un spațiu cozy', hex: '#d8c2a6', texture: 'textures/tex-bej-cald.jpg' },
  { name: 'Maro ciocolatiu', mood: 'elegant, profund și sofisticat', hex: '#4a3022', texture: 'textures/tex-maro-ciocolatiu.jpg' },
  { name: 'Burgundy', mood: 'bogat, rafinat și perfect ca accent', hex: '#5f1a1f', texture: 'textures/tex-burgundy.jpg' },
];

/** Line shown under the palette — from the same carousel */
export const paletteNote =
  'Le poți introduce prin perne, textile, covoare, obiecte decorative, artă sau chiar o piesă de mobilier. Nu ai nevoie de mult — câteva accente bine alese sunt suficiente.';
