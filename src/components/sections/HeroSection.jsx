import React from 'react';
import { Sparkles, Compass, MessageSquare } from 'lucide-react';
import { FoilButton } from '../ui/FoilButton';
import InteractiveBusinessCard from '../ui/InteractiveBusinessCard';
import NajdiStarWatermark from '../vectors/NajdiStarWatermark';
import NajdiStar from '../vectors/NajdiStar';
import { BRAND_TOKENS } from '../../data/brandProtocol';

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-36 sm:pt-40 lg:pt-44 pb-16 sm:pb-20 lg:pb-28 overflow-hidden bg-velvet-navy flex items-center justify-center">
      {/* Lightweight GPU Radial Ambient Lighting */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle 420px at 78% 28%, rgba(200, 155, 67, 0.09) 0%, transparent 70%), radial-gradient(circle 360px at 15% 85%, rgba(230, 199, 123, 0.05) 0%, transparent 70%)',
        }}
      />

      {/* Subtle Najdi Star Watermarks in Background */}
      <NajdiStarWatermark
        size={520}
        opacity={0.03}
        className="absolute top-12 -right-32 text-gold-royal"
      />
      <NajdiStarWatermark
        size={440}
        opacity={0.025}
        className="absolute bottom-0 -left-20 text-gold-royal"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* ===================== RIGHT 7 COLUMNS: EDITORIAL AUTHORITY ===================== */}
          <div className="lg:col-span-7 text-right">
            {/* Architectural Eyebrow */}
            <div className="inline-flex items-center gap-2 sm:gap-3 mb-6 px-3 sm:px-3.5 py-1.5 rounded-full bg-navy-elevated/90 border border-gold-royal/35 shadow-sm max-w-full">
              <div className="w-6 sm:w-8 h-[2px] bg-gradient-to-l from-gold-champagne to-gold-royal shrink-0" />
              <NajdiStar size={13} color="#C89B43" className="shrink-0" />
              <span className="text-[11px] sm:text-sm font-tajawal font-medium text-gold-champagne tracking-wide truncate">
                الرياض — خدمة ضيافة وتقديم القهوة السعودية
              </span>
            </div>

            {/* Monumental Amiri Display Headline (Immediate paint for sub-second LCP) */}
            <h1 className="font-amiri text-3xl sm:text-5xl lg:text-6xl font-bold text-alabaster-cotton leading-[1.35] sm:leading-[1.3] lg:leading-[1.25] tracking-tight">
              حَفَاوَةُ المَجْلِس..
              <br />
              <span className="gold-foil-text font-amiri font-bold">
                وَأَصَالَةُ القَهْوَةِ السُّعُودِيَّةِ
              </span>
              <br />
              فِي أَبْهَى حُلَّة
            </h1>

            {/* Poetic Protocol Subheadline */}
            <p className="mt-5 sm:mt-6 text-sm sm:text-lg text-alabaster-cotton/90 font-tajawal font-normal leading-relaxed max-w-2xl">
              ننتقي بعناية فائقة من أفضل أنواع البن في المملكة، ونقدمه مع الهيل الطازج
              والزعفران في دلال نحاسية وفناجين باللون الذهبي، عبر طواقم قهوجية وصبابين
              ومضيفات بالزي الرسمي المرتب لتشريف حفلات الزفاف، المجالس، والمناسبات في مدينة الرياض.
            </p>

            {/* Dual Tactile Actions */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <FoilButton
                href="#concierge"
                variant="gold"
                size="lg"
                icon={Sparkles}
                className="w-full sm:w-auto text-sm sm:text-base justify-center"
              >
                حجز مراسم وضيافة مناسبتك الآن
              </FoilButton>

              <FoilButton
                href="#specifications"
                variant="outline"
                size="lg"
                icon={Compass}
                className="w-full sm:w-auto text-sm sm:text-base justify-center"
              >
                دليل التجهيزات المعتمد
              </FoilButton>

              <a
                href={`https://wa.me/${BRAND_TOKENS.whatsappRaw}?text=${encodeURIComponent('السلام عليكم، أرغب في حجز مستشار ضيافة ملكي لمناسبتنا القادمة.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[48px] inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-sm bg-navy-elevated/85 hover:bg-navy-elevated border border-gold-royal/35 text-xs sm:text-sm text-gold-champagne font-tajawal transition-colors duration-200 w-full sm:w-auto text-center"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                <span>واتساب المراسم المباشر</span>
              </a>
            </div>
          </div>

          {/* ===================== LEFT 5 COLUMNS: 3D VERTICAL MONOLITH ===================== */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative w-full pt-4 lg:pt-0">
            {/* Lightweight Spotlight behind the Card */}
            <div
              aria-hidden="true"
              className="absolute inset-0 m-auto w-72 h-96 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(200, 155, 67, 0.14) 0%, transparent 70%)',
              }}
            />
            
            {/* The Interactive 3D Business Card */}
            <InteractiveBusinessCard />
          </div>

        </div>
      </div>

      {/* Decorative Bottom Sadu Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-gold-royal/40 to-transparent" />
      </div>
    </section>
  );
}

export default HeroSection;
