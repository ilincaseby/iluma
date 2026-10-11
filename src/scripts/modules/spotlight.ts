/**
 * SPOTLIGHT — a soft warm glow that follows the cursor inside a card.
 *   <div data-spotlight>  (the glow itself is the ::before in global.css)
 * We only update two CSS variables, so it's very cheap.
 */
import { hasFinePointer } from '../utils';

export function initSpotlight() {
  if (!hasFinePointer()) return;

  // One delegated listener for the whole page instead of one per card
  const move = (e: PointerEvent) => {
    const el = (e.target as Element | null)?.closest<HTMLElement>('[data-spotlight]');
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  document.addEventListener('pointermove', move, { passive: true });
  return () => document.removeEventListener('pointermove', move);
}
