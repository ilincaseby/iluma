/**
 * ============================================================================
 *  CLIENT ENTRY — boots every interactive module.
 * ----------------------------------------------------------------------------
 *  Each module exports init() and may return a cleanup function. Remove a
 *  module from the list to disable that effect; add your own in
 *  src/scripts/modules/ and register it here.
 *  With view transitions on, everything re-runs on `astro:page-load` and is
 *  cleaned up before each page swap.
 * ============================================================================
 */
import { initReveal } from './modules/reveal';
import { initCounters } from './modules/counters';
import { initMagnetic } from './modules/magnetic';
import { initSpotlight } from './modules/spotlight';
import { initHeader } from './modules/header';
import { initScrollProgress } from './modules/scroll-progress';
import { initCursor } from './modules/cursor';
import { initTilt } from './modules/tilt';
import { initMirror } from './modules/mirror';
import { initWalkthrough } from './modules/walkthrough';
import { initProgressScenes } from './modules/progress-scenes';
import { initCoverflow } from './modules/coverflow';
import { initTurn } from './modules/turn';
import { initMisc } from './modules/misc';

export type Cleanup = void | (() => void);

const modules: Array<[name: string, init: () => Cleanup]> = [
  ['reveal', initReveal],
  ['counters', initCounters],
  ['magnetic', initMagnetic],
  ['spotlight', initSpotlight],
  ['header', initHeader],
  ['scroll-progress', initScrollProgress],
  ['cursor', initCursor],
  ['tilt', initTilt],
  ['mirror', initMirror],
  ['walkthrough', initWalkthrough],
  ['progress-scenes', initProgressScenes],
  ['coverflow', initCoverflow],
  ['turn', initTurn],
  ['misc', initMisc],
];

let cleanups: Array<() => void> = [];

function teardown() {
  cleanups.forEach((fn) => {
    try {
      fn();
    } catch (err) {
      console.error(err);
    }
  });
  cleanups = [];
}

function boot() {
  teardown();
  document.documentElement.classList.remove('no-js');
  for (const [name, init] of modules) {
    try {
      const cleanup = init();
      if (typeof cleanup === 'function') cleanups.push(cleanup);
    } catch (err) {
      console.error(`[${name}]`, err);
    }
  }
}

if (document.documentElement.dataset.vt === 'true') {
  document.addEventListener('astro:page-load', boot);
  document.addEventListener('astro:before-swap', teardown);
} else if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
