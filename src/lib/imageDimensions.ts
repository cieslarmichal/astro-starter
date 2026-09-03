import sharp from 'sharp';
import { existsSync } from 'node:fs';
import path from 'node:path';

// Resolved from the project root (astro build/dev always run from there) rather
// than import.meta.url: Astro's build pipeline can execute this module from a
// relocated chunk under dist/, which would otherwise silently point publicDir
// at the wrong place.
const publicDir = path.join(process.cwd(), 'public');
const cache = new Map<string, { width: number; height: number }>();

/**
 * Real intrinsic pixel size of a file under public/, read once at build time
 * via sharp and cached. Used to set <img width height> so the browser can
 * reserve layout space before the image loads (prevents layout shift) - the
 * values only need to match the file's actual aspect ratio, not its on-page
 * display size, which is controlled by CSS regardless.
 */
export async function imageDimensions(publicPath: string): Promise<{ width: number; height: number }> {
  const cached = cache.get(publicPath);
  if (cached) return cached;

  const filePath = path.join(publicDir, publicPath.replace(/^\//, ''));
  if (!existsSync(filePath)) {
    console.warn(`[imageDimensions] missing file: ${publicPath}`);
    return { width: 0, height: 0 };
  }

  const meta = await sharp(filePath).metadata();
  const dims = { width: meta.width ?? 0, height: meta.height ?? 0 };
  cache.set(publicPath, dims);
  return dims;
}

/** Same as imageDimensions, but for a whole list at once (Promise.all). */
export async function imageDimensionsFor<T>(
  items: T[],
  getPath: (item: T) => string,
): Promise<Map<T, { width: number; height: number }>> {
  const entries = await Promise.all(items.map(async (item) => [item, await imageDimensions(getPath(item))] as const));
  return new Map(entries);
}
