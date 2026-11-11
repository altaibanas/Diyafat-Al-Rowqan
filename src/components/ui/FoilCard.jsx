import React from 'react';
import { useFoilSpecular } from '../../hooks/useFoilSpecular';
import { cn } from '../../utils/cn';

export function FoilCard({
  children,
  className = '',
  theme = 'navy', // 'navy' | 'cotton' | 'elevated'
  is3d = true,
  maxTilt = 7,
  glareOpacity = 0.45,
  onClick,
}) {
  const { ref, glareStyle, tiltStyle, handlers } = useFoilSpecular({
    is3d,
    maxTilt,
    glareOpacity,
  });

  const baseTheme = {
    navy: 'bg-velvet-navy text-alabaster-cotton border border-gold-royal/25 shadow-palace',
    elevated: 'bg-velvet-elevated text-alabaster-cotton border border-gold-royal/35 shadow-card-elevated',
    cotton: 'bg-cotton-paper text-roast-espresso border border-gold-royal/40 shadow-letterpress',
  }[theme] || 'bg-velvet-navy text-alabaster-cotton border border-gold-royal/25';

  return (
    <div
      ref={ref}
      style={tiltStyle}
      {...handlers}
      onClick={onClick}
      className={cn(
        'relative overflow-hidden transition-shadow duration-500 rounded-sm',
        baseTheme,
        className
      )}
    >
      {/* Dynamic Specular Gold Foil Reflection Layer */}
      <div
        className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay"
        style={glareStyle}
      />

      {/* Recessed Hairline Border for Tactile Craftsmanship */}
      <div className="absolute inset-1 pointer-events-none border border-gold-royal/15 rounded-sm" />

      {/* Inner Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
