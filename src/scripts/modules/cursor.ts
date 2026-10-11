/**
 * CURSOR — a thin ring that follows the pointer (desktop only).
 * It grows over links/buttons; elements with data-cursor-label="Intră" show
 * that word inside the ring. Toggle: src/config/site.ts → features.customCursor.
 */
import { hasFinePointer, lerp, prefersReducedMotion } from '../utils';

export function initCursor() {
  const ring = document.querySelector<HTMLElement>('.cursor-ring');
  const label = ring?.querySelector<HTMLElement>('[data-cursor-label]');
  if (!ring || !hasFinePointer() || prefersReducedMotion()) return;

  const root = document.documentElement;
  const mouse = { x: -100, y: -100 };
  const pos = { x: -100, y: -100 };
  let frame = 0;

  const move = (e: PointerEvent) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    root.classList.add('has-cursor');
    const target = e.target as Element | null;
    const labelled = target?.closest<HTMLElement>('[data-cursor-label]:not(.cursor-ring *)');
    const interactive = target?.closest('a, button, [role="tab"], summary, [data-cf-stage]');
    ring.toggleAttribute('data-hover', !!(labelled || interactive));
    if (label) {
      label.textContent = labelled?.dataset.cursorLabel ?? '';
      label.toggleAttribute('data-label', !!labelled);
    }
  };

  const loop = () => {
    pos.x = lerp(pos.x, mouse.x, 0.2);
    pos.y = lerp(pos.y, mouse.y, 0.2);
    ring.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    frame = requestAnimationFrame(loop);
  };
  frame = requestAnimationFrame(loop);

  const leave = () => root.classList.remove('has-cursor');
  window.addEventListener('pointermove', move, { passive: true });
  document.addEventListener('pointerleave', leave);

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener('pointermove', move);
    document.removeEventListener('pointerleave', leave);
  };
}
