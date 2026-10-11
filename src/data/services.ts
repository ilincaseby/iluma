/**
 * ============================================================================
 *  SERVICES — what the studio offers (inferred from the Instagram content:
 *  open spaces, palettes, materials, custom furniture, curtains, lighting…).
 *  Each one renders as a 3D tilt card in the "Servicii" section.
 *  ➕ copy an object · ➖ delete or set hidden: true · ↕ reorder freely.
 * ============================================================================
 */

export interface Service {
  title: string;
  icon: string;
  text: string;
  /** Short bullet points */
  points: string[];
  hidden?: boolean;
}

const all: Service[] = [
  {
    title: 'Concept & design interior',
    icon: 'compass',
    text: 'Viziunea de ansamblu a spațiului: stil, atmosferă, funcțiuni și o poveste coerentă de la o cameră la alta.',
    points: ['Analiza spațiului și a nevoilor', 'Moodboard & direcție de stil', 'Concept pentru fiecare zonă'],
  },
  {
    title: 'Planuri & compartimentare',
    icon: 'ruler-dimension-line',
    text: 'Proporții, circulație și dimensiuni corecte, ca fiecare piesă să aibă loc să respire.',
    points: ['Plan de mobilare', 'Fluxuri de circulație', 'Open space living + bucătărie'],
  },
  {
    title: 'Paletă, materiale & finisaje',
    icon: 'palette',
    text: 'Construim spațiul pornind de la câteva nuanțe și texturi: lemn, piatră, textile, metal.',
    points: ['Paletă de culori', 'Selecție materiale & mostre', 'Continuitate vizuală'],
  },
  {
    title: 'Mobilier custom',
    icon: 'armchair',
    text: 'Piese gândite pe măsura spațiului, inclusiv soluții care integrează sau maschează elementele tehnice.',
    points: ['Corpuri la comandă', 'Măști pentru calorifere', 'Selecție mobilier & piese iconice'],
  },
  {
    title: 'Iluminat',
    icon: 'lamp',
    text: 'Temperatura luminii, corpurile și straturile de lumină care fac un spațiu cald și echilibrat.',
    points: ['Plan de iluminat', 'Lumină ambientală & accent', 'Corpuri de iluminat'],
  },
  {
    title: 'Textile, perdele & decor',
    icon: 'blinds',
    text: 'Perdele, draperii, covoare, oglinzi și accente alese corect: dimensiune, sistem, material.',
    points: ['Sisteme de perdele & WAVE', 'Covoare & oglinzi', 'Styling & accesorii'],
  },
];

export const services = all.filter((s) => !s.hidden);
