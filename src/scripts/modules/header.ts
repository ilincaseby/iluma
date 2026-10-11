/**
 * HEADER — scroll states, mobile menu and active-section highlighting.
 *  • .is-scrolled  → frosted background after 40px
 *  • .is-hidden    → slides up when scrolling down, back when scrolling up
 *  • [data-floating] CTA appears after the first screen
 *  • [data-nav-link] gets data-active when its section is in view
 */
import { lockScroll, on, rafThrottle } from '../utils';

export function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  const floating = document.querySelector<HTMLElement>('[data-floating]');
  const offs: Array<() => void> = [];

  /* ---------- Scroll states ---------- */
  let lastY = window.scrollY;
  const onScroll = rafThrottle(() => {
    const y = window.scrollY;
    const menuOpen = menu?.hasAttribute('data-open');
    header?.classList.toggle('is-scrolled', y > 40);
    // Hide on scroll down (after the first 400px), show on scroll up
    header?.classList.toggle('is-hidden', !menuOpen && y > 400 && y > lastY + 2);
    if (y < lastY - 2) header?.classList.remove('is-hidden');
    floating?.toggleAttribute('data-visible', y > window.innerHeight * 0.8);
    lastY = y;
  });
  onScroll();
  offs.push(on(window, 'scroll', onScroll, { passive: true }));

  /* ---------- Mobile menu ---------- */
  const setMenu = (open: boolean) => {
    if (!menu || !toggle) return;
    menu.toggleAttribute('data-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Închide meniul' : 'Deschide meniul');
    lockScroll(open);
  };

  if (toggle && menu) {
    offs.push(on(toggle, 'click', () => setMenu(!menu.hasAttribute('data-open'))));
    menu.querySelectorAll<HTMLElement>('[data-menu-close]').forEach((link) => {
      offs.push(on(link, 'click', () => setMenu(false)));
    });
    offs.push(
      on(document, 'keydown', (e) => {
        if (e.key === 'Escape' && menu.hasAttribute('data-open')) setMenu(false);
      }),
    );
    // Close if resized to desktop
    offs.push(on(window, 'resize', () => window.innerWidth >= 1024 && setMenu(false)));
  }

  /* ---------- Active section in nav ---------- */
  const links = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-link]'));
  const sections = links
    .map((l) => document.getElementById(l.dataset.navLink!))
    .filter((s): s is HTMLElement => !!s);

  let observer: IntersectionObserver | undefined;
  if (sections.length) {
    // Track which nav sections currently cross the middle band of the screen;
    // the first one (in page order) is highlighted, none if we're in between.
    const inView = new Set<string>();
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) inView.add(entry.target.id);
          else inView.delete(entry.target.id);
        });
        const active = sections.find((s) => inView.has(s.id))?.id;
        links.forEach((l) => l.toggleAttribute('data-active', l.dataset.navLink === active));
      },
      // A section is "active" when it crosses the middle of the screen
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => observer!.observe(s));
  }

  return () => {
    offs.forEach((fn) => fn());
    observer?.disconnect();
    lockScroll(false);
  };
}
