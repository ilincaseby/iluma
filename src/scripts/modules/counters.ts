/**
 * COUNTERS — animates numbers from 0 to their target when visible.
 *   <span data-counter="138">138</span>
 *   <span data-counter="4.9" data-decimals="1">4,9</span>
 * The final value is already in the HTML (good for SEO / no-JS).
 */
import { easeOutExpo, prefersReducedMotion } from '../utils';

const format = (value: number, decimals: number) =>
  value.toLocaleString('ro-RO', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

export function initCounters() {
  const els = document.querySelectorAll<HTMLElement>('[data-counter]');
  if (!els.length || prefersReducedMotion()) return;

  const frames = new Set<number>();

  const run = (el: HTMLElement) => {
    const target = Number(el.dataset.counter);
    const decimals = Number(el.dataset.decimals) || 0;
    const duration = 2000;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      el.textContent = format(target * easeOutExpo(t), decimals);
      if (t < 1) frames.add(requestAnimationFrame(tick));
    };
    frames.add(requestAnimationFrame(tick));
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        run(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.6 },
  );

  els.forEach((el) => {
    el.textContent = format(0, Number(el.dataset.decimals) || 0);
    observer.observe(el);
  });

  return () => {
    observer.disconnect();
    frames.forEach(cancelAnimationFrame);
  };
}
