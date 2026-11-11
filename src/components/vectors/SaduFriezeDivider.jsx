import React from 'react';
import NajdiStar from './NajdiStar';

export const SaduFriezeDivider = ({
  className = '',
  variant = 'gold', // 'gold' | 'roast' | 'subtle'
  starCount = 1,
  showLabel = null,
}) => {
  const isRoast = variant === 'roast';
  const starGold = isRoast ? '#8C6B18' : '#C89B43';

  return (
    <div className={`relative flex items-center justify-center py-6 w-full select-none ${className}`}>
      {/* Right geometric rule with Najdi triangles */}
      <div className="flex-1 flex items-center">
        <div className={`h-[1px] flex-1 ${isRoast ? 'bg-gradient-to-l from-roast-espresso/40 via-roast-espresso/15 to-transparent' : 'bg-gradient-to-l from-gold-royal/60 via-gold-royal/20 to-transparent'}`} />
        <svg width="40" height="12" viewBox="0 0 40 12" fill="none" className="shrink-0 opacity-80">
          <polygon points="0,6 6,0 12,6 6,12" fill={isRoast ? '#3B1E0A' : '#C89B43'} />
          <polygon points="14,6 20,0 26,6 20,12" fill={isRoast ? '#3B1E0A' : '#C89B43'} opacity="0.6" />
          <polygon points="28,6 34,2 40,6 34,10" fill={isRoast ? '#8C6B18' : '#E6C77B'} opacity="0.8" />
        </svg>
        <div className={`h-[1px] w-8 ${isRoast ? 'bg-roast-espresso/50' : 'bg-gold-royal/60'}`} />
      </div>

      {/* Central Star or Text Unit */}
      <div className="mx-4 flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-1.5">
          {Array.from({ length: starCount }).map((_, i) => (
            <NajdiStar key={i} size={i === 0 && starCount === 1 ? 22 : 16} color={starGold} />
          ))}
        </div>

        {showLabel && (
          <span
            className={`font-amiri text-xs md:text-sm tracking-widest px-3.5 py-1 border rounded-sm ${
              isRoast
                ? 'text-roast-espresso bg-alabaster-cotton border-roast-espresso/30'
                : 'text-gold-champagne bg-navy-950/80 border-gold-royal/40 shadow-sm'
            }`}
          >
            {showLabel}
          </span>
        )}

        {starCount > 1 && (
          <div className="flex items-center gap-1.5">
            {Array.from({ length: starCount }).map((_, i) => (
              <NajdiStar key={`r-${i}`} size={16} color={starGold} />
            ))}
          </div>
        )}
      </div>

      {/* Left geometric rule with matching Najdi triangles */}
      <div className="flex-1 flex items-center">
        <div className={`h-[1px] w-8 ${isRoast ? 'bg-roast-espresso/50' : 'bg-gold-royal/60'}`} />
        <svg width="40" height="12" viewBox="0 0 40 12" fill="none" className="shrink-0 opacity-80">
          <polygon points="0,6 6,2 12,6 6,10" fill={isRoast ? '#8C6B18' : '#E6C77B'} opacity="0.8" />
          <polygon points="14,6 20,0 26,6 20,12" fill={isRoast ? '#3B1E0A' : '#C89B43'} opacity="0.6" />
          <polygon points="28,6 34,0 40,6 34,12" fill={isRoast ? '#3B1E0A' : '#C89B43'} />
        </svg>
        <div className={`h-[1px] flex-1 ${isRoast ? 'bg-gradient-to-r from-roast-espresso/40 via-roast-espresso/15 to-transparent' : 'bg-gradient-to-r from-gold-royal/60 via-gold-royal/20 to-transparent'}`} />
      </div>
    </div>
  );
};

export default SaduFriezeDivider;
