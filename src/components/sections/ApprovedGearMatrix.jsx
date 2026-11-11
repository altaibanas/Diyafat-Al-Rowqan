import React, { useState } from 'react';
import { ShieldCheck, Compass, CheckCircle } from 'lucide-react';
import { APPROVED_GEAR_SPECS } from '../../data/brandProtocol';
import SaduFriezeDivider from '../vectors/SaduFriezeDivider';
import RoyalCornerOrnament from '../vectors/RoyalCornerOrnament';
import NajdiStar from '../vectors/NajdiStar';
import ScrollReveal from '../ui/ScrollReveal';

export function ApprovedGearMatrix() {
  const [selectedGearId, setSelectedGearId] = useState(APPROVED_GEAR_SPECS[0].id);
  const selectedGear = APPROVED_GEAR_SPECS.find((g) => g.id === selectedGearId) || APPROVED_GEAR_SPECS[0];

  return (
    <section id="specifications" className="py-24 bg-cotton-paper text-roast-espresso relative overflow-hidden">
      {/* Corner letterpress ornaments for full architectural paper feel */}
      <RoyalCornerOrnament position="top-right" size={54} color="#3B1E0A" className="absolute top-4 right-4 z-10" />
      <RoyalCornerOrnament position="top-left" size={54} color="#3B1E0A" className="absolute top-4 left-4 z-10" />
      <RoyalCornerOrnament position="bottom-right" size={54} color="#3B1E0A" className="absolute bottom-4 right-4 z-10" />
      <RoyalCornerOrnament position="bottom-left" size={54} color="#3B1E0A" className="absolute bottom-4 left-4 z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-alabaster-ivory border border-roast-espresso/20 text-xs text-roast-espresso font-tajawal mb-4 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-royal" />
            <span className="font-bold">تجهيزات ومستلزمات الضيافة</span>
          </div>

          <h2 className="font-amiri text-3xl sm:text-4xl lg:text-5xl font-bold text-roast-espresso">
            مَعْرِضُ التَّجْهِيزَاتِ.. <span className="gold-foil-on-cream font-amiri text-roast-espresso">وَأَدَوَاتِ التَّقْدِيم</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-roast-espresso/85 font-tajawal leading-relaxed">
            نحرص على أن تكون جميع أدوات التقديم والدلال والاستكانات والزي الرسمي للطاقم مرتبة ونظيفة ومتناسقة لتليق بمناسبتكم وضيوفكم.
          </p>

          <SaduFriezeDivider className="my-2" variant="roast" starCount={1} showLabel="أربعة محاور للتجهيز" />
        </ScrollReveal>

        {/* 4-Item Gear Selector Ribbon */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {APPROVED_GEAR_SPECS.map((gear) => {
            const isSelected = gear.id === selectedGearId;
            return (
              <button
                key={gear.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedGearId(gear.id)}
                className={`min-h-[44px] px-4 sm:px-6 py-2.5 sm:py-3 rounded-sm font-tajawal text-xs sm:text-sm font-bold border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-roast-espresso text-alabaster-cotton border-roast-espresso shadow-md scale-105'
                    : 'bg-alabaster-ivory/90 text-roast-espresso border-roast-espresso/25 hover:border-roast-espresso/60 hover:bg-alabaster-ivory'
                }`}
              >
                <span>{gear.name.split('(')[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Gear Technical Specification Blueprint Card */}
        <div
          key={selectedGear.id}
          className="animate-panel-in p-5 sm:p-8 lg:p-10 rounded-sm bg-alabaster-ivory border-2 border-gold-royal/40 shadow-letterpress relative overflow-hidden"
        >
            {/* Background Blueprint Grid Hairlines */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(#3B1E0A 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Right 8 Cols: Specs & Engineering Precision */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-roast-espresso text-alabaster-cotton text-xs font-montserrat font-bold">
                    {selectedGear.badge}
                  </span>
                  <span className="text-xs font-tajawal text-roast-espresso/85 font-medium">
                    الألوان المعتمدة: {selectedGear.pantone}
                  </span>
                </div>

                <div>
                  <h3 className="font-amiri text-2xl sm:text-3xl font-bold text-roast-espresso">
                    {selectedGear.name}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-roast-espresso/95 font-tajawal leading-relaxed">
                    {selectedGear.description}
                  </p>
                </div>

                {/* Material Specification Callout */}
                <div className="p-4 rounded bg-alabaster-cotton border border-gold-royal/30 space-y-1">
                  <span className="text-xs font-tajawal text-roast-espresso/85 font-bold block">
                    الوصف والخامة:
                  </span>
                  <span className="text-sm font-tajawal font-bold text-roast-espresso block">
                    {selectedGear.material}
                  </span>
                </div>

                {/* Detailed Standards List */}
                <div className="space-y-2 pt-2 border-t border-roast-espresso/15">
                  <span className="text-xs font-tajawal font-bold text-roast-espresso block">
                    أبرز المزايا في الخدمة:
                  </span>
                  {selectedGear.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-roast-espresso/90 font-tajawal">
                      <CheckCircle className="w-4 h-4 text-[#7A5616] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Left 4 Cols: Service Readiness Card */}
              <div className="lg:col-span-4 flex flex-col justify-between h-full p-6 rounded bg-alabaster-cotton border border-roast-espresso/15 text-center">
                <div className="my-auto py-6">
                  <div className="w-20 h-20 mx-auto rounded-full border-2 border-dashed border-gold-royal/60 flex items-center justify-center mb-4 bg-alabaster-ivory">
                    <Compass className="w-10 h-10 text-roast-espresso" aria-hidden="true" />
                  </div>
                  <span className="font-amiri text-xl font-bold text-roast-espresso block">
                    نظافة وترتيب دائم
                  </span>
                  <span className="text-xs font-tajawal text-roast-espresso/85 mt-1 block">
                    تجهيز كامل وتناسق يليق بمناسبتكم
                  </span>
                </div>

                <div className="pt-4 border-t border-roast-espresso/15 text-[11px] font-tajawal font-bold text-roast-espresso/85 space-y-1">
                  <div>جاهزية تامة لكل مناسبة</div>
                  <div>تغطية مدينة الرياض وضواحيها</div>
                </div>
              </div>

            </div>
        </div>

      </div>
    </section>
  );
}

export default ApprovedGearMatrix;
