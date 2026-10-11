/**
 * ============================================================================
 *  SECTION REGISTRY — maps names in src/config/sections.ts to components.
 *  New block: create it (props: id, tone, copy), import + register below,
 *  then add its name to SectionConfig['component'] and an entry in sections.ts.
 * ============================================================================
 */
import MirrorHero from './MirrorHero.astro';
import Manifesto from './Manifesto.astro';
import Walkthrough from './Walkthrough.astro';
import Services from './Services.astro';
import Palette from './Palette.astro';
import Doors from './Doors.astro';
import Chairs from './Chairs.astro';
import Process from './Process.astro';
import Guides from './Guides.astro';
import DesignerVsDiy from './DesignerVsDiy.astro';
import Contact from './Contact.astro';
import type { SectionConfig } from '../../config/sections';

export const sectionRegistry: Record<SectionConfig['component'], (props: any) => any> = {
  MirrorHero,
  Manifesto,
  Walkthrough,
  Services,
  Palette,
  Doors,
  Chairs,
  Process,
  Guides,
  DesignerVsDiy,
  Contact,
};
