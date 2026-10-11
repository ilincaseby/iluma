/**
 * ============================================================================
 *  HOMEPAGE SECTIONS — rendered in this order by src/pages/index.astro.
 *  ↕ reorder · ⏻ enabled:false to hide · 🎨 tone: paper | stone | dark
 *  ✏️ edit `copy` texts · ➕ new block → create the component, register it in
 *  src/components/sections/registry.ts, then add an entry here.
 * ============================================================================
 */

export interface SectionCopy {
  eyebrow?: string;
  title?: string;
  /** Words in the title rendered in italic accent */
  accent?: string;
  intro?: string;
  [key: string]: unknown;
}

export type Tone = 'paper' | 'stone' | 'dark';

export interface SectionConfig {
  component:
    | 'MirrorHero'
    | 'Manifesto'
    | 'Walkthrough'
    | 'Services'
    | 'Palette'
    | 'Doors'
    | 'Chairs'
    | 'Process'
    | 'Guides'
    | 'DesignerVsDiy'
    | 'Contact';
  id?: string;
  enabled: boolean;
  tone?: Tone;
  copy?: SectionCopy;
}

export const homeSections: SectionConfig[] = [
  {
    component: 'MirrorHero',
    id: 'acasa',
    enabled: true,
    tone: 'paper',
    copy: {
      eyebrow: 'Design interior la comandă · Constanța',
      title: 'Spații gândite pentru echilibru și frumusețe',
      accent: 'echilibru frumusețe',
      hint: 'Derulează ca să intri în oglindă',
    },
  },
  {
    component: 'Manifesto',
    id: 'despre',
    enabled: true,
    tone: 'paper',
    copy: {
      eyebrow: 'Despre Iluma · Cristina',
      title: 'Designul bun înseamnă mai mult decât obiecte frumoase',
      accent: 'mai mult',
      intro:
        'Proporții, funcționalitate, materiale, lumină și detalii. Fiecare alegere contribuie la felul în care se simte un spațiu. Iar casa ta nu trebuie să fie perfectă. Trebuie să fie a ta.',
    },
  },
  {
    component: 'Walkthrough',
    id: 'proiecte',
    enabled: true,
    tone: 'dark',
    copy: {
      eyebrow: 'Plimbă-te prin spații',
      title: 'Intră, cameră cu cameră',
      accent: 'cameră',
    },
  },
  {
    component: 'Services',
    id: 'servicii',
    enabled: true,
    tone: 'paper',
    copy: {
      eyebrow: 'Servicii',
      title: 'De la o idee la un spațiu coerent',
      accent: 'coerent',
      intro: 'Design interior la comandă: te însoțesc pe tot parcursul proiectului sau doar acolo unde ai nevoie.',
    },
  },
  {
    component: 'Palette',
    id: 'paleta',
    enabled: true,
    tone: 'stone',
    copy: {
      eyebrow: 'Paleta de culori',
      title: 'Totul începe cu o paletă',
      accent: 'paletă',
      intro:
        'O amenajare coerentă începe înainte de alegerea mobilierului: cu câteva nuanțe, texturi și atmosfera pe care vrei să o creezi.',
    },
  },
  {
    component: 'Doors',
    enabled: true,
    tone: 'dark',
    copy: {
      eyebrow: 'Mobilier custom',
      title: 'Deschide ușile',
      accent: 'ușile',
      inside: 'Fiecare piesă, gândită pe măsura spațiului.',
    },
  },
  {
    component: 'Chairs',
    id: 'iconic',
    enabled: true,
    tone: 'paper',
    copy: {
      eyebrow: 'Iconic chairs',
      title: 'Poveștile din spatele designului atemporal',
      accent: 'atemporal',
      intro:
        'Pentru noi, designul bun înseamnă să înțelegi proporția, materialul, forma și funcția din spatele unei piese.',
    },
  },
  {
    component: 'Process',
    id: 'proces',
    enabled: true,
    tone: 'stone',
    copy: {
      eyebrow: 'Cum lucrăm',
      title: 'Un proces calm, pas cu pas',
      accent: 'calm',
    },
  },
  {
    component: 'Guides',
    id: 'ghiduri',
    enabled: true,
    tone: 'paper',
    copy: {
      eyebrow: 'Înainte să cumperi…',
      title: 'Ghiduri ca să alegi corect',
      accent: 'corect',
      intro: 'Ce merită să verifici înainte de a lua o decizie. Intră în oglindă pentru fiecare ghid.',
    },
  },
  {
    component: 'DesignerVsDiy',
    enabled: true,
    tone: 'dark',
    copy: {
      eyebrow: 'Designer sau DIY?',
      title: 'Ce se potrivește pentru tine',
      accent: 'tine',
    },
  },
  {
    component: 'Contact',
    id: 'contact',
    enabled: true,
    tone: 'paper',
    copy: {
      eyebrow: 'Hai să începem',
      title: 'Spune-mi despre spațiul tău',
      accent: 'spațiul tău',
    },
  },
];
