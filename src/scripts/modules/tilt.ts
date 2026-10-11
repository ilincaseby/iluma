/**
 * TILT — 3D tilt toward the cursor (desktop). Children with .tilt-pop float
 * forward in Z (global.css). <div data-tilt="7"> = max degrees.
 */
import { hasFinePointer, prefersReducedMotion } from '../utils';

export function initTilt() {
  if (!hasFinePointer() || prefersReducedMotion()) return;
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-tilt]'));
  const offs: Array<() => void> = [];

  els.forEach((el) => {
    const max = Number(el.dataset.tilt) || 6;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`;
    };
    const leave = () => (el.style.transform = '');
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    offs.push(() => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    });
  });

  return () => offs.forEach((fn) => fn());
}
