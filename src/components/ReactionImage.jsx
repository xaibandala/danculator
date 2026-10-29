import { useState } from 'react';

/**
 * Shows a reaction image, falling back to an emoji if the image
 * path is empty or the file is missing / fails to load.
 */
export default function ReactionImage({ src, fallbackEmoji, alt, className = '' }) {
  const [failedSrc, setFailedSrc] = useState(null);

  if (!src || failedSrc === src) {
    return (
      <span className={`reaction-image reaction-image--emoji ${className}`} role="img" aria-label={alt}>
        {fallbackEmoji}
      </span>
    );
  }

  return (
    <img
      className={`reaction-image ${className}`}
      src={src}
      alt={alt}
      draggable={false}
      onError={() => setFailedSrc(src)}
    />
  );
}
