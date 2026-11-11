import React from 'react';

export const NajdiStarWatermark = ({
  size = 320,
  opacity = 0.04,
  className = '',
  color = '#C89B43',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={`pointer-events-none select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      {/* Outer concentric decorative Najdi ring */}
      <circle cx="100" cy="100" r="95" stroke={color} strokeWidth="1" strokeDasharray="4 4" />
      <circle cx="100" cy="100" r="88" stroke={color} strokeWidth="0.75" />
      
      {/* 8-pointed Najdi Star */}
      <polygon
        points="100,10 125,75 190,100 125,125 100,190 75,125 10,100 75,75"
        stroke={color}
        strokeWidth="1.5"
      />
      {/* Inner Rotated Square */}
      <polygon
        points="100,35 165,100 100,165 35,100"
        stroke={color}
        strokeWidth="1"
        strokeDasharray="2 3"
      />
      {/* Central Diamond Core */}
      <polygon
        points="100,65 135,100 100,135 65,100"
        fill={color}
        fillOpacity="0.3"
        stroke={color}
        strokeWidth="1"
      />
    </svg>
  );
};

export default NajdiStarWatermark;
