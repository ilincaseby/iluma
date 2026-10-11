/**
 * ============================================================================
 *  GUIDES — "Înainte să cumperi…" series from Instagram. Each guide gets its
 *  own page at /ghiduri/<slug> (opened with a 3D "step into the mirror"
 *  page transition). Content transcribed from the carousels.
 *  ➕ Add a guide: copy an object (slug must be unique).
 * ============================================================================
 */
import type { ImagePath } from '../lib/images';

export interface GuideStep {
  title: string;
  text: string;
}

export interface Guide {
  slug: string;
  /** "Înainte să cumperi…" subject */
  title: string;
  icon: string;
  intro: string;
  steps: GuideStep[];
  checklist: string[];
  outro: string;
  /** Background color of the guide card */
  tint: string;
  image?: ImagePath;
}

export const guides: Guide[] = [
  {
    slug: 'oglinda',
    title: 'Oglinda',
    icon: 'scan',
    intro: 'O oglindă nu este doar un obiect decorativ. Dimensiunea, forma, poziționarea și chiar ceea ce reflectă pot schimba complet percepția unui spațiu.',
    steps: [
      { title: 'Dimensiunea', text: 'O oglindă prea mică poate părea pierdută pe un perete, iar una prea mare poate dezechilibra compoziția. Alege dimensiunea în funcție de mobilierul și peretele pe care va fi amplasată.' },
      { title: 'Forma', text: 'Rotundă, organică, dreptunghiulară sau arcuită? Formele organice aduc fluiditate, în timp ce formele geometrice oferă un aspect mai ordonat și contemporan.' },
      { title: 'Poziționarea', text: 'Nu te gândi doar la unde încape, ci la ce reflectă. O oglindă poate amplifica lumina și poate face spațiul să pară mai mare — dar dacă reflectă un colț aglomerat, va accentua exact acel lucru.' },
      { title: 'Rama', text: 'Lemn, metal, ramă minimalistă sau fără ramă — alegerea trebuie să țină cont de materialele, finisajele și stilul deja existente.' },
    ],
    checklist: ['dimensiunea potrivită pentru perete', 'proporția față de mobilier', 'forma potrivită stilului', 'ce va reflecta', 'rama și finisajul'],
    outro: 'O oglindă bună nu doar umple un perete. Poate schimba felul în care percepi întregul spațiu.',
    tint: '#e9e1d5',
  },
  {
    slug: 'masuta-de-cafea',
    title: 'Măsuța de cafea',
    icon: 'sofa',
    intro: 'Măsuța de cafea nu trebuie doar să fie frumoasă. Trebuie să fie potrivită. Dimensiunea, înălțimea, forma și distanța față de canapea pot schimba complet felul în care se simte un living.',
    steps: [
      { title: 'Proporția cu canapeaua', text: 'Măsuța nu ar trebui să pară nici pierdută în fața canapelei, nici prea masivă. Ca regulă generală, lungimea ei poate fi aproximativ ½–⅔ din lungimea canapelei.' },
      { title: 'Distanța dintre ele', text: 'Prea aproape = spațiu înghesuit. Prea departe = incomod și vizual „rupt”. Lasă aproximativ 35–45 cm între canapea și măsuță.' },
      { title: 'Înălțimea', text: 'Ideal, măsuța este aproximativ la nivelul șezutului canapelei sau puțin mai jos. O diferență prea mare poate face compoziția să pară dezechilibrată.' },
      { title: 'Forma, în funcție de spațiu', text: 'Rectangulară → canapele mari, spații lungi. Rotundă → sparge liniile drepte și e potrivită în spații mai compacte. Ovală → un compromis elegant între cele două.' },
    ],
    checklist: ['½–⅔ din lungimea canapelei', '35–45 cm distanță', 'la nivelul șezutului', 'forma potrivită spațiului'],
    outro: 'Before you buy, measure twice.',
    tint: '#d8ccbb',
  },
  {
    slug: 'covorul',
    title: 'Covorul',
    icon: 'layers',
    intro: 'Un covor poate schimba complet atmosfera unei încăperi — dar alegerea lui nu ar trebui să se rezume la model și culoare.',
    steps: [
      { title: 'Dimensiunea potrivită', text: 'Un covor prea mic poate face o încăpere să pară dezechilibrată. În living, cel puțin picioarele din față ale canapelei și fotoliilor ar trebui să fie pe covor. În dormitor, covorul ar trebui să depășească patul pe laterale și, ideal, și în partea de jos.' },
      { title: 'Nu alege doar după aspect', text: 'Lână — naturală, rezistentă și plăcută la atingere. Polipropilenă — practică și ușor de întreținut. Poliester — moale, în multe texturi și culori. Vâscoză — elegantă, dar mai pretențioasă.' },
      { title: 'Fir scurt sau lung?', text: 'Firul lung oferă un aspect cozy, dar e mai dificil de întreținut. Firul scurt este mai practic pentru zonele cu trafic intens.' },
      { title: 'Culoarea & modelul', text: 'Covorul ar trebui să dialogheze cu pardoseala, canapeaua, mobilierul și perdelele — fără să fie identic cu ele. Nu există regula „simplu = mai bine”. Important este echilibrul.' },
    ],
    checklist: ['dimensiunea', 'materialul', 'fir lung sau scurt, după trafic', 'textura', 'culoarea', 'modelul'],
    outro: 'Un covor frumos nu este neapărat și alegerea potrivită.',
    tint: '#b5c09d',
  },
  {
    slug: 'masa-de-dining',
    title: 'Masa de dining',
    icon: 'ruler',
    intro: 'Alegerea mesei de dining nu ține doar de câte persoane vrei să așezi la masă. Dimensiunea, forma și spațiul de circulație din jurul ei sunt esențiale.',
    steps: [
      { title: 'Cât spațiu per persoană?', text: 'Pentru o masă confortabilă, calculează aproximativ 60 cm / persoană: 2 persoane → ~120 cm, 4 → 120–140 cm, 6 → 160–180 cm, 8 → 200–220 cm.' },
      { title: 'Spațiul din jurul mesei', text: 'Lasă minimum 90 cm între marginea mesei și perete/mobilier, pentru a putea trage scaunul și a circula confortabil. Dacă spațiul permite, 100–120 cm.' },
      { title: 'Alegerea formei', text: 'Dreptunghiulară → spații lungi și familii numeroase. Rotundă → spații mici, atmosferă intimă. Ovală → flexibilitatea unei mese dreptunghiulare, cu margini mai fluide. Organică → punct de interes, dar atenție la spațiul real ocupat.' },
    ],
    checklist: ['~60 cm / persoană', 'min. 90 cm în jurul mesei', 'forma potrivită spațiului'],
    outro: 'O masă perfectă nu este cea mai mare masă care încape în cameră, ci cea care păstrează proporțiile și confortul spațiului.',
    tint: '#d2a77a',
  },
  {
    slug: 'sina-de-perdea',
    title: 'Șina de perdea & draperie',
    icon: 'blinds',
    intro: 'O perdea frumoasă începe cu un sistem ales corect. Lungimea, tipul de montaj, greutatea materialului și distanța dintre straturi fac diferența.',
    steps: [
      { title: 'Câte straturi?', text: 'Doar perdea → șină simplă. Perdea + draperie → șină dublă. Mai multe straturi → sistem cu 3 canale. Alege sistemul înainte de a comanda materialele.' },
      { title: 'Lungimea șinei', text: 'Șina ar trebui să depășească golul ferestrei pe ambele laterale. Astfel draperia poate fi trasă complet, iar fereastra pare mai mare și mai luminoasă.' },
      { title: 'Tavan sau perete?', text: 'Montaj în tavan → aspect minimalist, senzație de tavan mai înalt, look „floor to ceiling”. Montaj pe perete → util când nu poți fixa în tavan.' },
      { title: 'Standard sau WAVE?', text: 'Standard → falduri clasice. WAVE → glisiere speciale care păstrează materialul în pliuri uniforme, cu aspect de val: un look contemporan și elegant.' },
    ],
    checklist: ['numărul de straturi', 'lungimea șinei', 'tipul de montaj', 'greutatea materialului', 'standard sau WAVE', 'obstacolele din jurul ferestrei'],
    outro: 'O șină bine aleasă nu este doar un detaliu tehnic. Este baza unei draperii care cade perfect.',
    tint: '#efe7da',
  },
  {
    slug: 'calorifere',
    title: 'Caloriferul ascuns',
    icon: 'square-dashed',
    intro: 'Caloriferul este necesar, dar nu se integrează întotdeauna ușor în design. Vestea bună? Nu trebuie neapărat să-l lași la vedere.',
    steps: [
      { title: 'Mască decorativă', text: 'O mască din MDF, lemn sau metal perforat poate transforma caloriferul într-un element integrat în design.' },
      { title: 'Mobilier custom', text: 'Caloriferul poate fi integrat într-un corp de mobilier realizat la comandă — sub o poliță, o consolă sau într-un ansamblu continuu.' },
      { title: 'Aceeași culoare cu peretele', text: 'Vopsirea caloriferului în aceeași nuanță cu peretele îl face mult mai discret vizual. O soluție simplă și cu impact.' },
      { title: 'Perdea & draperie', text: 'Perdelele și draperiile până în podea pot camufla elegant caloriferul atunci când sunt trase.' },
    ],
    checklist: ['circulația aerului cald', 'acces pentru întreținere', 'ascuns · integrat · camuflat'],
    outro: 'Nu trebuie să alegi între funcționalitate și estetică.',
    tint: '#b5c09d',
  },
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
