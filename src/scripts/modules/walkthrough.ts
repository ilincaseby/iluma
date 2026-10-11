/**
 * WALKTHROUGH — first-person 3D walk past the studio's rooms.
 * ----------------------------------------------------------------------------
 *   [data-walk]                 section
 *   [data-walk-track]           tall scroll track (height set in markup)
 *   [data-walk-world]           the 3D world (moved/rotated as the "camera")
 *   [data-walk-plane="i"]       room image i, placed along a corridor
 *   [data-walk-caption="i"]     caption, gets data-active for the room in focus
 *   [data-walk-dot="i"]         progress dot
 *
 * Geometry: rooms hang on alternating walls of a corridor — even rooms on the
 * right wall, odd rooms on the left — each `SPACING` deeper in Z and turned
 * to face the corridor. The camera walks forward and, for each room, steps
 * in front of it and turns its head (yaw) until the room faces it squarely;
 * then walks on and turns to the other wall. The camera transform is applied
 * as the exact inverse of "stand at (cx, cz) and look with angle yaw", so the
 * room in focus always ends up centered and flat on screen.
 *
 * Desktop only (≥768px) and not for reduced motion — mobile uses a list.
 */
import { clamp, prefersReducedMotion, rafThrottle } from '../utils';

const SPACING = 1300; // px between rooms along the corridor (Z)
const WALL_X = 620; // distance of each wall from the corridor centre (px)
const VIEW_DIST = 140; // extra distance in front of a room (the CSS perspective adds ~900px)
const TURN = 62; // how much the head turns toward a wall (deg)

const rad = (d: number) => (d * Math.PI) / 180;

export function initWalkthrough() {
  const section = document.querySelector<HTMLElement>('[data-walk]');
  if (!section) return;
  const track = section.querySelector<HTMLElement>('[data-walk-track]');
  const world = section.querySelector<HTMLElement>('[data-walk-world]');
  const planes = Array.from(section.querySelectorAll<HTMLElement>('[data-walk-plane]'));
  const captions = Array.from(section.querySelectorAll<HTMLElement>('[data-walk-caption]'));
  const dots = Array.from(section.querySelectorAll<HTMLElement>('[data-walk-dot]'));
  if (!track || !world || !planes.length || prefersReducedMotion()) return;

  const mq = window.matchMedia('(min-width: 768px)');
  const n = planes.length;
  let active = -1;

  /** Room i: position on its wall and the yaw that makes it face the corridor */
  const room = (i: number) => {
    const side = i % 2 === 0 ? 1 : -1; // +1 right wall, -1 left wall
    return { side, x: side * WALL_X, z: -i * SPACING - SPACING * 0.5, yaw: side * TURN };
  };

  /** Camera pose that looks squarely at room i from VIEW_DIST in front of it */
  const poseFor = (i: number) => {
    const r = room(i);
    // The room's normal points back toward the corridor, rotated by yaw
    const nx = -Math.sin(rad(r.yaw));
    const nz = Math.cos(rad(r.yaw));
    return { x: r.x + nx * VIEW_DIST, z: r.z + nz * VIEW_DIST, yaw: r.yaw };
  };

  const layout = () => {
    planes.forEach((plane, i) => {
      const r = room(i);
      // Each room faces the corridor: rotate opposite to the look direction
      plane.style.transform = `translate3d(${r.x}px, 0, ${r.z}px) rotateY(${-r.yaw}deg)`;
    });
  };

  const update = () => {
    if (!mq.matches) return;
    const rect = track.getBoundingClientRect();
    const travel = Math.max(1, track.offsetHeight - window.innerHeight);
    const p = clamp(-rect.top / travel);

    // Stepped progress: pause in front of each room, then walk to the next
    const raw = p * (n - 1);
    const base = Math.min(n - 1, Math.floor(raw));
    const f = raw - base;
    const hold = f < 0.22 ? 0 : f > 0.82 ? 1 : (f - 0.22) / 0.6;
    const t = hold * hold * (3 - 2 * hold);

    const a = poseFor(base);
    const b = poseFor(Math.min(n - 1, base + 1));
    // Between rooms the head swings through "straight ahead" (yaw 0)
    const yaw = t < 0.5 ? a.yaw * (1 - t * 2) : b.yaw * ((t - 0.5) * 2);
    const cx = a.x + (b.x - a.x) * t;
    const cz = a.z + (b.z - a.z) * t;

    // View transform: move the world by -camera position, then rotate it by
    // +yaw so the direction the camera looks at maps onto the screen's -Z axis.
    world.style.transform = `rotateY(${yaw.toFixed(3)}deg) translate3d(${(-cx).toFixed(1)}px, 0, ${(-cz).toFixed(1)}px)`;

    const idx = t < 0.5 ? base : Math.min(n - 1, base + 1);
    planes.forEach((plane, i) => {
      // Hide rooms already passed, softly fade far ones
      const d = i - (base + t);
      plane.style.opacity = String(d < -0.6 ? 0 : d > 2.2 ? 0 : clamp(1.6 - Math.max(0, d) * 0.55));
    });

    if (idx !== active) {
      active = idx;
      captions.forEach((c, i) => c.toggleAttribute('data-active', i === idx));
      dots.forEach((d, i) => d.toggleAttribute('data-active', i === idx));
    }
  };

  const onScroll = rafThrottle(update);
  const onResize = rafThrottle(() => {
    layout();
    update();
  });

  layout();
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);
  mq.addEventListener('change', onResize);

  return () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
    mq.removeEventListener('change', onResize);
  };
}
