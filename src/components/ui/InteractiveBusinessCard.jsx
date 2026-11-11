import React, { useState } from 'react';
import { RotateCw, Phone, MapPin, Award, CheckCircle2, Sparkles } from 'lucide-react';
import OfficialBrandEmblem from '../vectors/OfficialBrandEmblem';
import RoyalCornerOrnament from '../vectors/RoyalCornerOrnament';
import NajdiStar from '../vectors/NajdiStar';
import { useFoilSpecular } from '../../hooks/useFoilSpecular';
import { BRAND_TOKENS } from '../../data/brandProtocol';

export function InteractiveBusinessCard({ className = '' }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { ref, glareStyle, tiltStyle, handlers } = useFoilSpecular({
    is3d: true,
    maxTilt: 10,
    glareOpacity: 0.5,
  });

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* 3D Perspective Card Wrapper */}
      <div
        ref={ref}
        {...handlers}
        style={tiltStyle}
        className="w-[280px] xs:w-[305px] sm:w-[330px] max-w-[92vw] h-[480px] sm:h-[530px] perspective-1000 cursor-pointer group mx-auto"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          style={{
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transition: 'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="relative w-full h-full transform-style-3d shadow-palace rounded-sm"
        >
          {/* ===================== FRONT SIDE: ROYAL NAVY VELVET ===================== */}
          <div
            aria-hidden={isFlipped}
            className="absolute inset-0 w-full h-full backface-hidden bg-velvet-navy border border-gold-royal/40 rounded-sm p-6 flex flex-col justify-between overflow-hidden"
          >
            {/* Dynamic Specular Gold Foil Reflection */}
            <div
              className="absolute inset-0 pointer-events-none mix-blend-overlay z-20"
              style={glareStyle}
            />

            {/* Corner Ornaments */}
            <RoyalCornerOrnament position="top-right" size={38} color="#C89B43" className="absolute top-2 right-2 z-10" />
            <RoyalCornerOrnament position="top-left" size={38} color="#C89B43" className="absolute top-2 left-2 z-10" />
            <RoyalCornerOrnament position="bottom-right" size={38} color="#C89B43" className="absolute bottom-2 right-2 z-10" />
            <RoyalCornerOrnament position="bottom-left" size={38} color="#C89B43" className="absolute bottom-2 left-2 z-10" />

            {/* Subtle Inner Double Hairline */}
            <div className="absolute inset-2 border border-gold-royal/20 pointer-events-none" />
            <div className="absolute inset-3 border border-gold-royal/10 pointer-events-none" />

            {/* Header: Kingdom & Authentication */}
            <div className="relative z-10 text-center pt-2">
              <span className="text-[11px] text-gold-champagne/85 font-tajawal block font-semibold">
                المملكة العربية السعودية
              </span>
              <span className="text-xs font-tajawal text-gold-royal block mt-0.5">
                الرياض — ضيافة وتقديم القهوة السعودية
              </span>
            </div>

            {/* Center: Master Brand Emblem */}
            <div className="relative z-10 my-auto flex flex-col items-center justify-center">
              <OfficialBrandEmblem
                variant="gold-on-navy"
                width={190}
                animatedSteam={true}
                includeSubtitle={false}
              />
              <div className="mt-4 text-center">
                <h2 className="font-amiri text-2xl font-bold text-gold-champagne gold-foil-text-static">
                  ضِيَافَةُ الرَّوْقَانِ
                </h2>
                <p className="text-[11px] font-tajawal text-gold-champagne/95 mt-1">
                  لخدمة تقديم القهوة في المناسبات والحفلات
                </p>
              </div>
            </div>

            {/* Footer: Gold Foil Stamped Standard */}
            <div className="relative z-10 text-center pb-1 border-t border-gold-royal/20 pt-3">
              <div className="flex items-center justify-center gap-2 text-[11px] text-gold-champagne/95 font-tajawal font-bold">
                <NajdiStar size={12} color="#C89B43" />
                <span>البطاقة الرسمية للضيافة</span>
                <NajdiStar size={12} color="#C89B43" />
              </div>
              <span className="text-[10px] text-alabaster-cotton/80 font-tajawal block mt-0.5">
                إدارة المراسم والتشريفات — الرياض
              </span>
            </div>
          </div>

          {/* ===================== BACK SIDE: 400gsm COTTON PAPER ===================== */}
          <div
            aria-hidden={!isFlipped}
            className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-cotton-paper text-roast-espresso border border-gold-royal/50 rounded-sm p-6 flex flex-col justify-between overflow-hidden shadow-letterpress"
          >
            {/* Dynamic Specular Glare */}
            <div
              className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-30 z-20"
              style={glareStyle}
            />

            {/* Letterpress Corner Ornaments */}
            <RoyalCornerOrnament position="top-right" size={38} color="#3B1E0A" className="absolute top-2 right-2 z-10" />
            <RoyalCornerOrnament position="top-left" size={38} color="#3B1E0A" className="absolute top-2 left-2 z-10" />
            <RoyalCornerOrnament position="bottom-right" size={38} color="#3B1E0A" className="absolute bottom-2 right-2 z-10" />
            <RoyalCornerOrnament position="bottom-left" size={38} color="#3B1E0A" className="absolute bottom-2 left-2 z-10" />

            {/* Recessed Hairline Border */}
            <div className="absolute inset-2 border border-roast-espresso/20 pointer-events-none" />
            <div className="absolute inset-3 border border-gold-royal/30 pointer-events-none" />

            {/* Header: Brand Name Letterpress */}
            <div className="relative z-10 text-center pt-2">
              <span className="text-[10px] text-roast-espresso/85 font-tajawal block font-bold">
                دار الضيافة والقهوة السعودية
              </span>
              <h2 className="font-amiri text-xl font-bold text-roast-espresso mt-0.5">
                بيانات التواصل والاعتماد الرسمي
              </h2>
            </div>

            {/* Middle: Details & Badges */}
            <div className="relative z-10 space-y-4 my-auto px-2">
              <a
                href={`tel:${BRAND_TOKENS.phone.replace(/\s+/g, '')}`}
                onClick={(e) => e.stopPropagation()}
                aria-label={`الاتصال المباشر على ${BRAND_TOKENS.phoneDisplay}`}
                className="flex items-center gap-3 p-2.5 bg-alabaster-ivory/80 rounded border border-gold-royal/20 hover:border-gold-royal/50 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-roast-espresso/10 flex items-center justify-center text-roast-espresso shrink-0">
                  <Phone className="w-4 h-4 text-roast-espresso" />
                </div>
                <div>
                  <span className="text-[10px] text-roast-espresso/85 font-tajawal block">الاتصال المباشر</span>
                  <span className="text-sm font-montserrat font-bold text-roast-espresso dir-ltr block text-right">
                    {BRAND_TOKENS.phoneDisplay}
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-3 p-2.5 bg-alabaster-ivory/80 rounded border border-gold-royal/20">
                <div className="w-8 h-8 rounded-full bg-roast-espresso/10 flex items-center justify-center text-roast-espresso shrink-0">
                  <MapPin className="w-4 h-4 text-roast-espresso" />
                </div>
                <div>
                  <span className="text-[10px] text-roast-espresso/85 font-tajawal block">نطاق الخدمة</span>
                  <span className="text-xs font-tajawal font-medium text-roast-espresso block">
                    الرياض وضواحيها
                  </span>
                </div>
              </div>

              {/* Three Quality Seals */}
              <div className="grid grid-cols-3 gap-1.5 pt-2 text-center">
                <div className="p-1.5 bg-roast-espresso/5 rounded border border-roast-espresso/10">
                  <Award className="w-3.5 h-3.5 mx-auto text-gold-royal mb-0.5" />
                  <span className="text-[9px] font-tajawal font-bold block">أفضل أنواع البن</span>
                </div>
                <div className="p-1.5 bg-roast-espresso/5 rounded border border-roast-espresso/10">
                  <CheckCircle2 className="w-3.5 h-3.5 mx-auto text-gold-royal mb-0.5" />
                  <span className="text-[9px] font-tajawal font-bold block">مضيفون معتمدون</span>
                </div>
                <div className="p-1.5 bg-roast-espresso/5 rounded border border-roast-espresso/10">
                  <Sparkles className="w-3.5 h-3.5 mx-auto text-gold-royal mb-0.5" />
                  <span className="text-[9px] font-tajawal font-bold block">دلال رسلان نحاس</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="relative z-10 text-center border-t border-roast-espresso/20 pt-2 pb-1">
              <span className="text-[10px] font-tajawal font-bold text-roast-espresso/80">
                دار الضيافة المعتمدة — مدينة الرياض
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Flip Hint Button */}
      <button
        onClick={() => setIsFlipped(!isFlipped)}
        type="button"
        aria-pressed={isFlipped}
        className="mt-4 min-h-[44px] inline-flex items-center gap-2 px-5 py-2 rounded-full bg-navy-elevated/95 hover:bg-navy-950 border border-gold-royal/40 text-gold-champagne text-xs font-tajawal shadow-sm transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <RotateCw className="w-3.5 h-3.5 text-gold-royal" />
        <span>انقر لقلب البطاقة الرسمية ({isFlipped ? 'الوجه الأمامي الكحلي' : 'الوجه الخلفي القطني'})</span>
      </button>
    </div>
  );
}

export default InteractiveBusinessCard;
