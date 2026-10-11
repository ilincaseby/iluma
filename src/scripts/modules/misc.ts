/**
 * MISC INTERACTIONS
 *  • [data-swatch]  palette panels: tap/click opens one (mobile has no hover)
 *  • [data-flip]    Designer/DIY cards: tap toggles the 3D flip
 *  • video[data-autoplay]  plays muted while visible
 */
import { prefersReducedMotion } from '../utils';

export function initMisc() {
  const offs: Array<() => void> = [];

  /* Palette panels */
  const swatches = Array.from(document.querySelectorAll<HTMLElement>('[data-swatch]'));
  swatches.forEach((s) => {
    const open = () => swatches.forEach((o) => o.toggleAttribute('data-open', o === s));
    s.addEventListener('click', open);
    s.addEventListener('focus', open);
    offs.push(() => {
      s.removeEventListener('click', open);
      s.removeEventListener('focus', open);
    });
  });

  /* Flip cards */
  document.querySelectorAll<HTMLElement>('[data-flip]').forEach((card) => {
    const toggle = () => card.toggleAttribute('data-flipped');
    card.addEventListener('click', toggle);
    offs.push(() => card.removeEventListener('click', toggle));
  });

  /* Autoplay videos while visible */
  const videos = Array.from(document.querySelectorAll<HTMLVideoElement>('video[data-autoplay]'));
  let io: IntersectionObserver | undefined;
  if (videos.length && !prefersReducedMotion()) {
    io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        const v = e.target as HTMLVideoElement;
        e.isIntersecting ? v.play().catch(() => {}) : v.pause();
      }),
      { threshold: 0.4 },
    );
    videos.forEach((v) => io!.observe(v));
  }

  return () => {
    offs.forEach((fn) => fn());
    io?.disconnect();
  };
}
