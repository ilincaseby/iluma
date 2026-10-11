/**
 * ============================================================================
 *  SMALL HELPERS shared by components.
 * ============================================================================
 */
import { site } from '../config/site';

/** URL relative to the configured base (works with sub-folder deploys) */
export const url = (path = '/') => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
};

/** "#servicii" → "/#servicii" so in-page links also work from sub-pages */
export const navHref = (href: string) => (href.startsWith('#') ? url(`/${href}`) : href);

/**
 * Primary contact link: phone → email → Instagram DM (first available).
 * Keeps every "Hai să vorbim" button working even before contact data exists.
 */
export const contactHref = () => {
  if (site.phone) return `tel:${site.phone.e164}`;
  if (site.email) return `mailto:${site.email}`;
  return site.instagram.dm;
};

/** True when the primary contact opens an external site (needs target=_blank) */
export const contactIsExternal = () => !site.phone && !site.email;

/** Label for the primary contact button */
export const contactLabel = () => (site.phone ? `Sună: ${site.phone.display}` : site.email ? 'Scrie-ne' : 'Scrie-ne pe Instagram');

/** WhatsApp deep link (same number as the phone) — null when disabled */
export const whatsappHref = () =>
  site.phone && site.whatsapp
    ? `https://wa.me/${site.phone.e164.replace(/\D/g, '')}?text=${encodeURIComponent(site.whatsappMessage)}`
    : null;
