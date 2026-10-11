/**
 * SCROLL PROGRESS — thin accent bar at the top that fills as you scroll.
 * Toggle in src/config/site.ts → features.scrollProgress.
 */
import { on, rafThrottle } from '../utils';

export function initScrollProgress() {
  const bar = document.querySelector<HTMLElement>('.scroll-progress');
  if (!bar) return;

  const update = rafThrottle(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.setProperty('--progress', String(max > 0 ? window.scrollY / max : 0));
  });
  update();

  const offScroll = on(window, 'scroll', update, { passive: true });
  const offResize = on(window, 'resize', update);
  return () => {
    offScroll();
    offResize();
  };
}
