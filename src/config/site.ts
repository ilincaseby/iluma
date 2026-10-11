/**
 * ============================================================================
 *  SITE CONFIG — single source of truth for studio information.
 * ----------------------------------------------------------------------------
 *  Source: Instagram @ilumastudiodesign (bio: "Interior design & concept ·
 *  Spaces designed for balance and beauty · Based in Constanta | Romania").
 *
 *  Phone confirmed by the client. Anything left `null` (e.g. email) is
 *  hidden automatically on the site.
 * ============================================================================
 */

export interface SocialLink {
  name: string;
  /** Icon key, see src/components/ui/Icon.astro */
  icon: string;
  url: string;
  handle?: string;
}

export const site = {
  /* ------------------------------------------------------------------ */
  /* Identity                                                            */
  /* ------------------------------------------------------------------ */
  name: 'Iluma Studio Design',
  shortName: 'Iluma',
  /** Instagram bio line */
  tagline: 'Spaces designed for balance and beauty',
  /** Closing line from their palette reel */
  motto: 'De la o paletă de culori… la un spațiu care se simte ca acasă.',
  description:
    'Iluma Studio Design — design interior la comandă în Constanța, semnat Cristina. Proiectăm spații echilibrate, calde și coerente: de la paleta de culori și materiale până la mobilier, iluminat și ultimul detaliu.',
  /** Production URL — update after deploy (also in astro.config.mjs) */
  url: 'https://ilumastudiodesign.pages.dev',
  locale: 'ro_RO',
  lang: 'ro',

  /* ------------------------------------------------------------------ */
  /* Designer                                                            */
  /* ------------------------------------------------------------------ */
  designer: {
    name: 'Cristina',
    role: 'Interior designer & fondatoare',
    /** Short intro shown in the "Despre" section */
    bio: 'Sunt Cristina și fac design interior la comandă. Fiecare proiect pornește de la cum trăiești tu — nu de la un catalog — și ajunge într-un spațiu gândit pe măsura ta.',
  },

  /* ------------------------------------------------------------------ */
  /* Contact — set to null to hide                                       */
  /* ------------------------------------------------------------------ */
  phone: { display: '+40 762 412 004', e164: '+40762412004' } as { display: string; e164: string } | null,
  /** WhatsApp uses the same number; set to false to hide the WhatsApp button */
  whatsapp: true,
  whatsappMessage: 'Bună, Cristina! Aș dori un proiect de design interior.',
  email: null as string | null,
  city: 'Constanța, România',
  /** Areas served */
  area: 'Constanța și împrejurimi · proiecte și online',

  /* ------------------------------------------------------------------ */
  /* Social                                                              */
  /* ------------------------------------------------------------------ */
  instagram: {
    url: 'https://www.instagram.com/ilumastudiodesign/',
    handle: '@ilumastudiodesign',
    /** Instagram DM link — used as the main CTA while phone/email are empty */
    dm: 'https://ig.me/m/ilumastudiodesign',
  },
  socials: [
    { name: 'Instagram', icon: 'instagram', url: 'https://www.instagram.com/ilumastudiodesign/', handle: '@ilumastudiodesign' },
  ] satisfies SocialLink[],

  /* ------------------------------------------------------------------ */
  /* Feature flags — turn global effects on / off                        */
  /* ------------------------------------------------------------------ */
  features: {
    /** Custom cursor ring (desktop only) */
    customCursor: true,
    /** Thin progress bar at the top */
    scrollProgress: true,
    /** Smooth page transitions (zoom "into" the next page) */
    viewTransitions: true,
    /** Floating contact pill on mobile */
    floatingCta: true,
  },
} as const;

export type Site = typeof site;
