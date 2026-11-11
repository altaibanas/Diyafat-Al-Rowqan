import React from 'react';

/**
 * Architectural interlocking double-line corner frames
 * Recreated from the official Diyafat Al-Rowqan business card & letterpress specs
 */
export const RoyalCornerOrnament = ({
  position = 'top-right',
  size = 48,
  color = '#C89B43',
  className = '',
}) => {
  const getRotation = () => {
    switch (position) {
      case 'top-left':
        return 'rotate(-90 25 25)';
      case 'bottom-left':
        return 'rotate(180 25 25)';
      case 'bottom-right':
        return 'rotate(90 25 25)';
      case 'top-right':
      default:
        return 'rotate(0 25 25)';
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      className={`pointer-events-none select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform={getRotation()}>
        {/* Outer sharp corner rule */}
        <path
          d="M2 48 V 10 Q 2 2 10 2 H 48"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="square"
          opacity="0.85"
        />
        {/* Inner parallel hairline */}
        <path
          d="M8 48 V 14 Q 8 8 14 8 H 48"
          stroke={color}
          strokeWidth="0.8"
          strokeDasharray="2 2"
          opacity="0.55"
        />
        {/* Micro Najdi diamond corner rivet */}
        <polygon
          points="8,8 11,5 8,2 5,5"
          fill={color}
          opacity="0.9"
        />
        {/* Corner starlet */}
        <circle cx="8" cy="8" r="1.5" fill="#FAF6EE" />
      </g>
    </svg>
  );
};

export const RoyalFrameBox = ({
  children,
  className = '',
  cornerSize = 36,
  variant = 'navy',
}) => {
  const isNavy = variant === 'navy';
  const cornerColor = isNavy ? '#C89B43' : '#3B1E0A';

  return (
    <div
      className={`relative p-6 sm:p-8 ${
        isNavy ? 'bg-velvet-navy text-alabaster-cotton' : 'bg-cotton-paper text-roast-espresso'
      } ${className}`}
    >
      <RoyalCornerOrnament
        position="top-right"
        size={cornerSize}
        color={cornerColor}
        className="absolute top-2 right-2"
      />
      <RoyalCornerOrnament
        position="top-left"
        size={cornerSize}
        color={cornerColor}
        className="absolute top-2 left-2"
      />
      <RoyalCornerOrnament
        position="bottom-right"
        size={cornerSize}
        color={cornerColor}
        className="absolute bottom-2 right-2"
      />
      <RoyalCornerOrnament
        position="bottom-left"
        size={cornerSize}
        color={cornerColor}
        className="absolute bottom-2 left-2"
      />
      {children}
    </div>
  );
};

export default RoyalCornerOrnament;
