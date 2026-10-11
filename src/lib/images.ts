/**
 * ============================================================================
 *  IMAGE RESOLVER
 * ----------------------------------------------------------------------------
 *  Lets data files reference images with a simple string path instead of
 *  manual imports. Drop a file into  src/assets/images/<folder>/<file>.jpg
 *  and reference it as  'folder/file.jpg'  from any file in src/data/.
 *
 *  Astro will still optimize the image (resize, WebP/AVIF, lazy-loading)
 *  because we hand <Image>/<Picture> the real ImageMetadata object.
 * ============================================================================
 */
import type { ImageMetadata } from 'astro';

// Eagerly import every image under src/assets/images at build time.
const modules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/**/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

const PREFIX = '/src/assets/images/';

/** Path relative to src/assets/images, e.g. "barbershop/tunsoare-mid-fade.jpg" */
export type ImagePath = string;

/**
 * Resolve an image path to Astro ImageMetadata.
 * Throws a clear build-time error if the file doesn't exist,
 * so typos are caught before deploying.
 */
export function img(path: ImagePath): ImageMetadata {
  const mod = modules[PREFIX + path.replace(/^\/+/, '')];
  if (!mod) {
    const available = Object.keys(modules)
      .map((k) => k.replace(PREFIX, ''))
      .join('\n  • ');
    throw new Error(`[img] Image "${path}" not found in src/assets/images.\nAvailable:\n  • ${available}`);
  }
  return mod.default;
}

/** Same as img() but returns undefined instead of throwing (for optional photos). */
export function maybeImg(path?: ImagePath | null): ImageMetadata | undefined {
  if (!path) return undefined;
  return modules[PREFIX + path.replace(/^\/+/, '')]?.default;
}
