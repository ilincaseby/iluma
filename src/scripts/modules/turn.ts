/**
 * TURN — cards that rotate in 3D (like a page / door turning) into place as
 * they scroll into view, then stay. Used on the guide pages.
 *   <article data-turn> (parent needs a CSS perspective)
 */
import { clamp, prefersReducedMotion, rafThrottle } from '../utils';

export function initTurn() {
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-turn]'));
  if (!els.length || prefersReducedMotion()) return;

  const update = () => {
    const vh = window.innerHeight;
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      // 0 when the card's top hits the bottom of the screen, 1 at 60% height
      const p = clamp((vh - r.top) / (vh * 0.45));
      const e = 1 - Math.pow(1 - p, 3);
      el.style.transform = `rotateY(${((1 - e) * -32).toFixed(2)}deg) translate3d(0, ${((1 - e) * 60).toFixed(1)}px, ${((1 - e) * -160).toFixed(1)}px)`;
      el.style.opacity = String(clamp(0.15 + e));
    });
  };

  const onScroll = rafThrottle(update);
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  return () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
  };
}
