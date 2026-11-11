import React from 'react';

/**
 * <OfficialBrandEmblem />
 * Centerpiece: Traditional Saudi Najdi Dallah crowned with geometric neck engravings.
 * Integrated Calligraphy: The word «الروقان» fluidly woven inside the belly of the Dallah.
 * Left Element: Authentic Finjan with rising steam curves of serenity.
 * Halo: Overarching golden Sadu geometric arch studded with 8-pointed Najdi stars.
 * Signature Wordmark: "ضِيَافَةُ الرَّوْقَانِ" in vocalized calligraphic style, subtitled by "لخدمة تقديم القهوة في المناسبات والحفلات".
 * 
 * Clear Space Margin: X = 1x Finjan height (enforced around all 4 sides).
 * Minimum Digital Width: 140px (120px on mobile).
 */
export const OfficialBrandEmblem = ({
  variant = 'gold-on-navy', // 'gold-on-navy' | 'espresso-on-cream' | 'monochrome-gold'
  width = 180,
  animatedSteam = true,
  includeSubtitle = true,
  showClearSpace = false,
  className = '',
  onClick = null,
}) => {
  const isCream = variant === 'espresso-on-cream';
  const webpSrc = isCream ? '/assets/logo-cream.webp' : '/assets/logo-transparent.webp';
  const svgSrc = isCream ? '/assets/logo-cream.svg' : '/assets/logo-transparent.svg';
  const finalWidth = Math.max(120, width);

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex flex-col items-center justify-center select-none transition-all duration-300 ${className} ${
        onClick ? 'cursor-pointer hover:opacity-95' : ''
      }`}
      style={{ minWidth: `${finalWidth}px` }}
      title="ضيافة الروقان — الشعار الرسمي المعتمد"
    >
      {/* Clear Space Guide Overlay (Active when showClearSpace is true) */}
      {showClearSpace && (
        <div
          className="absolute inset-[-24px] pointer-events-none border border-dashed border-gold-royal/70 bg-gold-royal/10 flex flex-col justify-between z-30"
          aria-hidden="true"
        >
          <div className="flex justify-between items-center px-1.5 py-0.5 text-[9px] text-gold-royal font-tajawal font-bold">
            <span>مسافة الأمان = ارتفاع الفنجان</span>
            <span>حد أدنى للشاشات الصغيرة والكبيرة</span>
          </div>
          <div className="flex justify-between items-center px-1.5 py-0.5 text-[9px] text-gold-royal font-tajawal font-bold">
            <span>هوية معتمدة</span>
            <span>مسافة الحماية القياسية</span>
          </div>
        </div>
      )}

      {/* Main Vector Artwork Container */}
      <div className="relative flex items-center justify-center">
        {/* Animated Steam of Serenity Curves over Finjan position */}
        {animatedSteam && (
          <div
            className="absolute z-20 pointer-events-none"
            style={{
              top: '24%',
              right: '24%', // Positioned directly over the Finjan
              width: '32px',
              height: '40px',
            }}
          >
            <svg viewBox="0 0 32 40" fill="none" className="w-full h-full overflow-visible" aria-hidden="true">
              {/* Steam Ribbon 1 */}
              <path
                d="M10 32 C 14 24, 6 18, 12 8 C 15 4, 11 0, 14 -4"
                stroke={isCream ? '#C89B43' : '#E6C77B'}
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
                className="animate-steam-1"
              />
              {/* Steam Ribbon 2 */}
              <path
                d="M18 34 C 22 26, 14 20, 20 10 C 23 6, 19 2, 22 -2"
                stroke={isCream ? '#8C6B18' : '#FAF6EE'}
                strokeWidth="1.4"
                strokeLinecap="round"
                fill="none"
                className="animate-steam-2"
              />
              {/* Steam Ribbon 3 */}
              <path
                d="M6 30 C 8 24, 4 18, 7 12"
                stroke={isCream ? '#C89B43' : '#C5A059'}
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
                className="animate-steam-3"
              />
            </svg>
          </div>
        )}

        {/* Master Brand Emblem (Retina WebP primary + Illustrator SVG fallback) */}
        <picture>
          <source srcSet={webpSrc} type="image/webp" />
          <img
            src={svgSrc}
            alt="شعار ضيافة الروقان المعتمد"
            width={finalWidth}
            height={Math.round(finalWidth * 0.985)}
            className="block object-contain transition-transform duration-300"
            style={{ width: `${finalWidth}px`, height: 'auto', aspectRatio: '336 / 331' }}
            loading="eager"
            decoding="async"
          />
        </picture>
      </div>

      {/* Vocalized Subtitle if requested */}
      {includeSubtitle && (
        <p
          className={`mt-1.5 font-tajawal text-center text-[11px] sm:text-[12px] tracking-wide font-normal leading-relaxed ${
            isCream ? 'text-roast-espresso/80' : 'text-alabaster-cotton/80'
          }`}
        >
          لخدمة تقديم القهوة في المناسبات والحفلات
        </p>
      )}
    </div>
  );
};

export default OfficialBrandEmblem;
