import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import { config } from '../config';

// Eagerly imported so every lookup below is synchronous - Astro's asset
// pipeline already probed each file's real dimensions and content hash at
// build time, so localImage() is effectively free.
const images = import.meta.glob<{ default: ImageMetadata }>('/src/images/**/*.{webp,png,jpg,jpeg,svg,gif}', {
  eager: true,
});

/**
 * Resolve a public-style path (e.g. "/team-1.webp") to the ImageMetadata
 * Astro generated for the matching file under src/images/. Feed this into
 * <Image src={...}> - it carries the real intrinsic width/height, so no
 * manual CLS bookkeeping is needed. Throws at build time on a typo/missing
 * file rather than silently rendering a broken image.
 */
export function localImage(path: string): ImageMetadata {
  const key = `/src/images${path}`;
  const mod = images[key];
  if (!mod) {
    throw new Error(`[localImage] no image found for "${path}" (looked for ${key})`);
  }
  return mod.default;
}

/**
 * Optimized, site-relative URL (e.g. "/_astro/team-1.a1b2c3.webp") for
 * contexts that need a plain string rather than JSX.
 */
export async function optimizedImageSrc(path: string): Promise<string> {
  const optimized = await getImage({ src: localImage(path) });
  return optimized.src;
}

/**
 * Absolute URL for contexts that need a fully-qualified string - og:image /
 * twitter:image meta tags and JSON-LD image fields, which both require a
 * real fetchable URL, not the /public/-style path the data files store.
 */
export async function absoluteImageUrl(path: string): Promise<string> {
  return `${config.siteUrl}${await optimizedImageSrc(path)}`;
}
