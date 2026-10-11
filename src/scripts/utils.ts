/**
 * Shared helpers for animation modules.
 */

/** True when the user asked the OS to minimise motion */
export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** True on devices with a precise pointer that can hover (desktop) */
export const hasFinePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/** Linear interpolation */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Clamp a value between min and max */
export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

/** Easing used for counters etc. */
export const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Add an event listener and get back a function that removes it —
 * keeps module cleanups to one line.
 */
export function on<K extends keyof WindowEventMap>(
  target: Window,
  type: K,
  handler: (e: WindowEventMap[K]) => void,
  options?: AddEventListenerOptions,
): () => void;
export function on<K extends keyof DocumentEventMap>(
  target: Document,
  type: K,
  handler: (e: DocumentEventMap[K]) => void,
  options?: AddEventListenerOptions,
): () => void;
export function on<K extends keyof HTMLElementEventMap>(
  target: HTMLElement,
  type: K,
  handler: (e: HTMLElementEventMap[K]) => void,
  options?: AddEventListenerOptions,
): () => void;
export function on(target: EventTarget, type: string, handler: (e: any) => void, options?: AddEventListenerOptions) {
  target.addEventListener(type, handler, options);
  return () => target.removeEventListener(type, handler, options);
}

/**
 * Runs `fn` at most once per animation frame — ideal for scroll/resize.
 * Returns the throttled function.
 */
export function rafThrottle<T extends (...args: any[]) => void>(fn: T) {
  let frame = 0;
  return (...args: Parameters<T>) => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      fn(...args);
    });
  };
}

/** Lock / unlock page scroll (used by modals) */
export const lockScroll = (locked: boolean) => document.documentElement.classList.toggle('is-locked', locked);
