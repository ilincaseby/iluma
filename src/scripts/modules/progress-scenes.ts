/**
 * PROGRESS SCENES — generic "write scroll progress to --p" helper used by:
 *   [data-doors]     wardrobe doors swing open (CSS .door-left/.door-right)
 *   [data-drawline]  the Process timeline draws itself
 * --p = 0 when the element's track starts, 1 when it ends.
 *
 * For tall pinned tracks (doors) progress covers the whole track; for normal
 * elements (drawline) it runs while the element crosses the viewport.
 */
import { clamp, prefersReducedMotion, rafThrottle } from '../utils';

export function initProgressScenes() {
  const doors = Array.from(document.querySelectorAll<HTMLElement>('[data-doors]'));
  const lines = Array.from(document.querySelectorAll<HTMLElement>('[data-drawline]'));
  if (!doors.length && !lines.length) return;

  if (prefersReducedMotion()) {
    doors.forEach((d) => d.style.setProperty('--p', '1'));
    lines.forEach((l) => l.style.setProperty('--p', '1'));
    return;
  }

  const update = () => {
    const vh = window.innerHeight;
    doors.forEach((el) => {
      const r = el.getBoundingClientRect();
      const travel = Math.max(1, el.offsetHeight - vh);
      // Open during the middle 70% of the track, fully open before the end
      const raw = clamp((-r.top / travel - 0.1) / 0.7);
      el.style.setProperty('--p', (raw * raw * (3 - 2 * raw)).toFixed(4));
    });
    lines.forEach((el) => {
      const r = el.getBoundingClientRect();
      const p = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.35));
      el.style.setProperty('--p', p.toFixed(4));
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
