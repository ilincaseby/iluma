/**
 * ============================================================================
 *  ROOMS / SPACES — the scenes of the 3D "walk-through" section and the
 *  project gallery. Images are the studio's own renders (Instagram).
 *  `image` = path in src/assets/images. Add a room → it appears in both.
 * ============================================================================
 */
import type { ImagePath } from '../lib/images';

export interface Room {
  title: string;
  /** Small label above the title */
  label: string;
  text: string;
  image: ImagePath;
  /** Palette swatches (hex) shown next to the room */
  palette: string[];
}

export const rooms: Room[] = [
  {
    label: 'Living · lemn natur & olive',
    title: 'Un spațiu care se simte ca acasă',
    text: 'Lemn natur, tonuri de piatră și accente olive: o paletă caldă și echilibrată, construită înainte de orice piesă de mobilier.',
    image: 'rooms/room-living-olive.jpg',
    palette: ['#d8ccbb', '#66734c', '#b98656', '#c9bfb0'],
  },
  {
    label: 'Open space · living + bucătărie',
    title: 'Două funcțiuni, o singură poveste',
    text: 'Fiecare zonă își păstrează personalitatea, dar culorile, materialele și lumina creează continuitate.',
    image: 'rooms/room-open-space.jpg',
    palette: ['#e9e1d5', '#9a6a3f', '#2a201a', '#b9ab98'],
  },
  {
    label: 'Prima casă · terracotta',
    title: 'Casa ta nu trebuie să fie perfectă. Trebuie să fie a ta.',
    text: 'Forme organice, arcade, terracotta și accente de culoare: personalitate fără să urmezi toate trendurile.',
    image: 'rooms/room-living-terracotta.jpg',
    palette: ['#f4efe7', '#c45e22', '#2f4b9a', '#d2a77a'],
  },
  {
    label: 'Detalii · ferestre & textile',
    title: 'Soluții frumoase și pentru ce nu poți elimina',
    text: 'Calorifere camuflate, perdele până în podea și sisteme alese corect: designul bun e în detalii.',
    image: 'rooms/room-curtains.jpg',
    palette: ['#efe7da', '#8c9a6f', '#9a6a3f', '#d8ccbb'],
  },
];
