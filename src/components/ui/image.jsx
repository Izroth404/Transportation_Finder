import React from 'react';

export function Image({
  src,
  alt,
  className = '',
  fittingType = 'cover',
  style,
  ...props
}) {
  const objectFit = fittingType === 'fit' ? 'contain' : 'cover';

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{ objectFit, ...style }}
      {...props}
    />
  );
}

export default Image;

