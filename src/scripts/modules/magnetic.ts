/**
 * MAGNETIC — buttons gently follow the cursor while hovered.
 *   <a data-magnetic><span data-magnetic-inner>…</span></a>
 * The outer element moves a little, the inner content a bit more,
 * which creates a subtle depth effect. Desktop only.
 */
import { hasFinePointer, prefersReducedMotion } from '../utils';

export function initMagnetic() {
  if (!hasFinePointer() || prefersReducedMotion()) return;
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-magnetic]'));
  const offs: Array<() => void> = [];

  els.forEach((el) => {
    const inner = el.querySelector<HTMLElement>('[data-magnetic-inner]');
    const strength = 0.25;

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
      if (inner) inner.style.transform = `translate3d(${x * strength * 0.5}px, ${y * strength * 0.5}px, 0)`;
    };
    const leave = () => {
      el.style.transform = '';
      if (inner) inner.style.transform = '';
    };

    el.style.transition = 'transform .6s cubic-bezier(.16,1,.3,1)';
    if (inner) inner.style.transition = 'transform .6s cubic-bezier(.16,1,.3,1)';

    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    offs.push(() => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    });
  });

  return () => offs.forEach((fn) => fn());
}
