/**
 * MIRROR — "step into the mirror" scroll scene.
 * ----------------------------------------------------------------------------
 *   <section data-mirror style="height:260vh">  (tall pinned track)
 *     <div class="mirror-scene sticky …">       (writes --p here)
 *       <div class="mirror-arch" data-mirror-arch> …
 * --p goes 0 → 1 while the track scrolls past; CSS (global.css §6) turns it
 * into translateZ, scaling, fades and the final light flash.
 * Before scrolling, the arch tilts slightly toward the cursor (--tilt-x/y).
 */
import { clamp, hasFinePointer, prefersReducedMotion, rafThrottle } from '../utils';

export function initMirror() {
  const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-mirror]'));
  if (!sections.length) return;
  const reduce = prefersReducedMotion();
  const offs: Array<() => void> = [];

  sections.forEach((section) => {
    const scene = section.querySelector<HTMLElement>('.mirror-scene');
    const arch = section.querySelector<HTMLElement>('.mirror-arch');
    if (!scene) return;

    if (reduce) {
      // Static composition: no travel, no tall track
      section.style.height = 'auto';
      scene.style.position = 'relative';
      return;
    }

    const update = () => {
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      // Ease-in so the start is gentle and the "dive" accelerates
      const raw = clamp(-rect.top / travel);
      const p = raw * raw * (3 - 2 * raw);
      scene.style.setProperty('--p', p.toFixed(4));
    };

    const onScroll = rafThrottle(update);
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    offs.push(() => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    });

    // Cursor tilt (desktop)
    if (arch && hasFinePointer()) {
      const move = rafThrottle((e: PointerEvent) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        arch.style.setProperty('--tilt-x', x.toFixed(3));
        arch.style.setProperty('--tilt-y', y.toFixed(3));
      });
      window.addEventListener('pointermove', move, { passive: true });
      offs.push(() => window.removeEventListener('pointermove', move));
    }
  });

  return () => offs.forEach((fn) => fn());
}
