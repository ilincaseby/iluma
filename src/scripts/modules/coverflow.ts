/**
 * COVERFLOW — 3D chair carousel.
 *   [data-coverflow]   root (focusable; ←/→ keys)
 *   [data-cf-stage]    drag / swipe area
 *   [data-cf-card="i"] cards, transformed by their offset from the active one
 *   [data-cf-text="i"] story text, data-active on the current chair
 *   [data-cf-prev] / [data-cf-next] buttons (anywhere inside the section)
 * Autoplays gently while visible; pauses on hover / interaction.
 */
import { prefersReducedMotion } from '../utils';

export function initCoverflow() {
  const roots = Array.from(document.querySelectorAll<HTMLElement>('[data-coverflow]'));
  const offs: Array<() => void> = [];

  roots.forEach((root) => {
    const section = root.closest('section') ?? document;
    const stage = root.querySelector<HTMLElement>('[data-cf-stage]')!;
    const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-cf-card]'));
    const texts = Array.from(root.querySelectorAll<HTMLElement>('[data-cf-text]'));
    const prev = section.querySelector<HTMLButtonElement>('[data-cf-prev]');
    const next = section.querySelector<HTMLButtonElement>('[data-cf-next]');
    const n = cards.length;
    let index = Math.floor(n / 2) - 1;
    let timer = 0;
    let visible = false;

    const render = () => {
      const narrow = window.innerWidth < 768;
      const gap = narrow ? 150 : 230;
      cards.forEach((card, i) => {
        // shortest signed distance on a loop
        let d = i - index;
        if (d > n / 2) d -= n;
        if (d < -n / 2) d += n;
        const abs = Math.abs(d);
        const x = d * gap;
        const z = -abs * 180;
        const ry = d === 0 ? 0 : d > 0 ? -38 : 38;
        card.style.transform = `translate3d(${x}px, ${abs * 18}px, ${z}px) rotateY(${ry}deg)`;
        card.style.opacity = abs > 3 ? '0' : String(1 - abs * 0.18);
        card.style.filter = d === 0 ? 'none' : `saturate(${1 - abs * 0.25}) brightness(${1 - abs * 0.06})`;
        card.style.zIndex = String(100 - abs);
        card.toggleAttribute('data-active', d === 0);
        card.setAttribute('aria-hidden', d === 0 ? 'false' : 'true');
      });
      texts.forEach((t, i) => t.toggleAttribute('data-active', i === index));
    };

    const go = (to: number) => {
      index = (to + n) % n;
      render();
    };

    const schedule = () => {
      clearInterval(timer);
      if (!visible || prefersReducedMotion()) return;
      timer = window.setInterval(() => go(index + 1), 4200);
    };

    // Buttons & keyboard
    const onPrev = () => { go(index - 1); schedule(); };
    const onNext = () => { go(index + 1); schedule(); };
    prev?.addEventListener('click', onPrev);
    next?.addEventListener('click', onNext);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    root.addEventListener('keydown', onKey);

    // Click a side card to bring it to front
    const onClick = (e: MouseEvent) => {
      const card = (e.target as Element).closest<HTMLElement>('[data-cf-card]');
      if (card && !card.hasAttribute('data-active')) { go(Number(card.dataset.cfCard)); schedule(); }
    };
    stage.addEventListener('click', onClick);

    // Drag / swipe
    let startX = 0;
    let dragging = false;
    const down = (e: PointerEvent) => { dragging = true; startX = e.clientX; clearInterval(timer); };
    const up = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
      schedule();
    };
    stage.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);

    // Pause on hover, autoplay only while visible
    const enter = () => clearInterval(timer);
    const leave = () => schedule();
    root.addEventListener('pointerenter', enter);
    root.addEventListener('pointerleave', leave);
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; schedule(); }, { threshold: 0.3 });
    io.observe(root);

    const onResize = () => render();
    window.addEventListener('resize', onResize);
    render();

    offs.push(() => {
      clearInterval(timer);
      io.disconnect();
      prev?.removeEventListener('click', onPrev);
      next?.removeEventListener('click', onNext);
      root.removeEventListener('keydown', onKey);
      stage.removeEventListener('click', onClick);
      stage.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      root.removeEventListener('pointerenter', enter);
      root.removeEventListener('pointerleave', leave);
      window.removeEventListener('resize', onResize);
    });
  });

  return () => offs.forEach((fn) => fn());
}
