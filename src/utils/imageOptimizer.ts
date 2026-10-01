/**
 * Image optimization utilities for responsive WebP/AVIF delivery,
 * layout-shift prevention, and progressive loading.
 */

export function getCleanImageUrl(url: string): string {
  if (!url) return '';
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('unsplash.com')) {
      return `${parsed.origin}${parsed.pathname}`;
    }
  } catch {
    // If not a standard URL, return as-is
  }
  return url.split('?')[0];
}

export function getOptimizedImageUrl(
  url: string,
  width = 1200,
  quality = 75,
  format: 'webp' | 'avif' = 'webp'
): string {
  if (!url) return '';
  if (!url.includes('unsplash.com')) {
    return url;
  }
  const clean = getCleanImageUrl(url);
  return `${clean}?auto=format&fit=crop&w=${width}&q=${quality}&fm=${format}`;
}

export function getResponsiveSrcSet(
  url: string,
  widths: number[] = [480, 768, 1080, 1440, 1920],
  quality = 75,
  format: 'webp' | 'avif' = 'webp'
): string {
  if (!url || !url.includes('unsplash.com')) {
    return '';
  }
  const clean = getCleanImageUrl(url);
  return widths
    .map((w) => `${clean}?auto=format&fit=crop&w=${w}&q=${quality}&fm=${format} ${w}w`)
    .join(', ');
}
