/**
 * ============================================================================
 *  NAVIGATION — header + mobile menu + footer links.
 *  "#id" links point to homepage sections (ids in src/config/sections.ts).
 * ============================================================================
 */
export interface NavLink {
  label: string;
  href: string;
}

export const mainNav: NavLink[] = [
  { label: 'Proiecte', href: '#proiecte' },
  { label: 'Servicii', href: '#servicii' },
  { label: 'Paletă', href: '#paleta' },
  { label: 'Proces', href: '#proces' },
  { label: 'Ghiduri', href: '#ghiduri' },
  { label: 'Contact', href: '#contact' },
];
