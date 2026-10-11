/**
 * REVEAL — adds `.is-visible` to [data-reveal] elements as they enter the
 * viewport. The actual animation is pure CSS (see global.css §4).
 *
 *  data-reveal="up|down|left|right|zoom|blur|clip|split|fade"
 *  data-reveal-immediate        → animate on page load (hero content)
 *  data-stagger="80" (parent)   → children get 0, 80, 160… ms delays
 */
import { prefersReducedMotion } from '../utils';

export function initReveal() {
  const items = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (!items.length) return;

  // Apply stagger delays to children of [data-stagger] containers
  document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((group) => {
    const step = Number(group.dataset.stagger) || 80;
    const children = Array.from(group.querySelectorAll<HTMLElement>(':scope > [data-reveal], :scope > * > [data-reveal]'));
    children.forEach((child, i) => {
      if (!child.style.getPropertyValue('--reveal-delay')) {
        child.style.setProperty('--reveal-delay', `${i * step}ms`);
      }
    });
  });

  // Reduced motion: show everything immediately
  if (prefersReducedMotion()) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  // Hero/above-the-fold content animates right away (next frame so the
  // initial hidden state is painted first and the transition runs)
  const immediate = items.filter((el) => el.hasAttribute('data-reveal-immediate'));
  requestAnimationFrame(() => requestAnimationFrame(() => immediate.forEach((el) => el.classList.add('is-visible'))));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
  );

  items.filter((el) => !el.hasAttribute('data-reveal-immediate')).forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}
