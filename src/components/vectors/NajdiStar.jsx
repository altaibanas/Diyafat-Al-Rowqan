import React from 'react';

export const NajdiStar = ({
  size = 24,
  className = '',
  color = '#C89B43',
  secondaryColor = '#E6C77B',
}) => {
  const gradId = `starGrad-${size}-${Math.random().toString(36).substring(2, 7)}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`inline-block select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="50%" stopColor={color} />
          <stop offset="100%" stopColor="#9A7228" />
        </linearGradient>
      </defs>
      {/* 8-pointed polygon composed of two overlapping squares rotated 45 deg */}
      <polygon
        points="50,0 64,36 100,50 64,64 50,100 36,64 0,50 36,36"
        fill={`url(#${gradId})`}
        stroke="rgba(230, 199, 123, 0.4)"
        strokeWidth="1.5"
      />
      {/* Inner faceted diamond core */}
      <polygon
        points="50,22 62,50 50,78 38,50"
        fill="#FAF6EE"
        opacity="0.25"
      />
      <circle cx="50" cy="50" r="4" fill="#FFFFFF" opacity="0.6" />
    </svg>
  );
};

export default NajdiStar;
