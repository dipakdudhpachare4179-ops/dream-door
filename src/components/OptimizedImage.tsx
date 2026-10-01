import { useState } from 'react';
import { getOptimizedImageUrl, getResponsiveSrcSet } from '../utils/imageOptimizer';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  width?: number | string;
  height?: number | string;
  quality?: number;
  widths?: number[];
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1200px',
  priority = false,
  width,
  height,
  quality = 75,
  widths = [480, 768, 1080, 1440, 1920],
  onClick,
  style
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Optimized base URL and responsive srcSet
  const optimizedSrc = getOptimizedImageUrl(src, 1200, quality, 'webp');
  const srcSet = getResponsiveSrcSet(src, widths, quality, 'webp');

  if (hasError) {
    return (
      <div
        className={`bg-[#2D1A12]/10 flex items-center justify-center p-4 text-[#8A6D56] text-xs ${className}`}
        style={style}
      >
        <span className="font-serif-luxury text-sm">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={optimizedSrc}
      srcSet={srcSet || undefined}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      referrerPolicy="no-referrer"
      onClick={onClick}
      onLoad={() => setIsLoaded(true)}
      onError={() => setHasError(true)}
      style={style}
      className={`transition-opacity duration-500 will-change-transform ${
        isLoaded || priority ? 'opacity-100' : 'opacity-0'
      } ${className}`}
    />
  );
}
