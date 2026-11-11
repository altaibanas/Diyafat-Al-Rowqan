import React, { useState } from 'react';
import { Wind, Coffee, Users, Sparkles, Check } from 'lucide-react';
import { CEREMONY_STAGES } from '../../data/brandProtocol';
import SaduFriezeDivider from '../vectors/SaduFriezeDivider';
import NajdiStar from '../vectors/NajdiStar';
import { FoilCard } from '../ui/FoilCard';
import ScrollReveal from '../ui/ScrollReveal';

export function CeremonyTimeline() {
  const [activeStageId, setActiveStageId] = useState(CEREMONY_STAGES[0].id);
  const activeStage = CEREMONY_STAGES.find((s) => s.id === activeStageId) || CEREMONY_STAGES[0];

  const stageIcons = {
    'roast-blend': Coffee,
    'oud-incense': Wind,
    'pour-protocol': Sparkles,
    'field-tranquility': Users,
  };

  return (
    <section id="ceremony" className="py-24 bg-velvet-elevated relative overflow-hidden">
      {/* Lightweight background radial lighting */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle 340px at 66% 12%, rgba(200, 155, 67, 0.06) 0%, transparent 70%), radial-gradient(circle 400px at 25% 90%, rgba(59, 30, 10, 0.18) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-royal border border-gold-royal/30 text-xs text-gold-champagne font-tajawal mb-4">
            <NajdiStar size={12} color="#C89B43" />
            <span>أصول التقديم والضيافة السعودية</span>
          </div>
          
          <h2 className="font-amiri text-3xl sm:text-4xl lg:text-5xl font-bold text-alabaster-cotton">
            طُقُوسُ الرَّوْقَانِ.. <span className="gold-foil-text font-amiri">وَفَلْسَفَةُ الفِنْجَان</span>
          </h2>
          
          <p className="mt-4 text-base sm:text-lg text-alabaster-cotton/80 font-tajawal leading-relaxed">
            الضيافة الأصيلة لدينا تجربة متكاملة تبدأ من تجهيز القهوة والعود الطيب وتكتمل بحفاوة الاستقبال وترتيب المجلس لراحة ضيوفكم.
          </p>

          <SaduFriezeDivider className="my-2" starCount={1} showLabel="أربع خطوات لتكامل الضيافة" />
        </ScrollReveal>

        {/* 4-Stage Timeline Stepper Controls */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {CEREMONY_STAGES.map((stage) => {
            const Icon = stageIcons[stage.id] || Coffee;
            const isActive = stage.id === activeStageId;

            return (
              <button
                key={stage.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveStageId(stage.id)}
                className={`relative p-4 sm:p-5 text-right rounded-sm border transition-all duration-300 group cursor-pointer ${
                  isActive
                    ? 'bg-navy-royal border-gold-royal shadow-foil'
                    : 'bg-navy-elevated/70 border-gold-royal/20 hover:border-gold-royal/50 hover:bg-navy-royal/60'
                }`}
              >
                {/* Active Indicator Top Line */}
                {isActive && (
                  <div className="absolute -top-[1px] left-0 right-0 h-[2px] bg-gradient-to-r from-gold-dark via-gold-champagne to-gold-royal" />
                )}

                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div
                    className={`w-7 sm:w-9 h-7 sm:h-9 rounded-sm flex items-center justify-center transition-colors duration-300 ${
                      isActive
                        ? 'bg-gradient-to-br from-gold-royal to-gold-dark text-navy-950 font-bold'
                        : 'bg-navy-royal text-gold-royal border border-gold-royal/30'
                    }`}
                  >
                    <Icon className="w-4 sm:w-5 h-4 sm:h-5" aria-hidden="true" />
                  </div>
                  <span className="font-montserrat text-[10px] sm:text-xs tracking-wider text-gold-champagne/90 font-bold">
                    المرحلة {stage.num}
                  </span>
                </div>

                <h3 className={`font-amiri text-base sm:text-lg font-bold transition-colors ${isActive ? 'text-gold-champagne' : 'text-alabaster-cotton'}`}>
                  {stage.title}
                </h3>
                <p className="text-[10px] sm:text-[11px] font-tajawal text-alabaster-cotton/80 mt-0.5 sm:mt-1 line-clamp-1">
                  {stage.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Showcase Card */}
        <div key={activeStage.id} className="animate-panel-in">
          <FoilCard theme="navy" className="p-5 sm:p-8 lg:p-10 border border-gold-royal/40">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Right 7 Cols: Description & Highlights */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="font-montserrat text-2xl font-bold text-gold-royal px-3 py-1 bg-navy-elevated rounded border border-gold-royal/30">
                      {activeStage.num}
                    </span>
                    <div>
                      <h3 className="font-amiri text-2xl sm:text-3xl font-bold text-alabaster-cotton">
                        {activeStage.title}
                      </h3>
                      <span className="text-xs font-tajawal text-gold-champagne block">
                        {activeStage.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Aromatic Profile Pill */}
                  <div className="p-3.5 rounded bg-navy-elevated/90 border border-gold-royal/25 text-xs text-gold-champagne flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-gold-royal shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold font-tajawal block text-gold-royal mb-0.5">البصمة العطرية والنكهة:</span>
                      <span className="text-alabaster-cotton/85 font-tajawal">{activeStage.aroma}</span>
                    </div>
                  </div>

                  <p className="text-base text-alabaster-cotton/85 font-tajawal leading-relaxed">
                    {activeStage.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2.5 pt-2 border-t border-gold-royal/20">
                    <span className="text-xs font-tajawal text-gold-royal font-bold block">
                      تفاصيل التنفيذ في هذه المرحلة:
                    </span>
                    {activeStage.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-alabaster-cotton/80 font-tajawal">
                        <Check className="w-4 h-4 text-gold-champagne shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Left 5 Cols: Ritual Visual & Amiri Quote */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full bg-navy-elevated/70 p-5 rounded border border-gold-royal/30 text-center relative overflow-hidden group">
                  {/* Photo Container */}
                  <div className="relative w-full h-52 sm:h-60 rounded overflow-hidden border border-gold-royal/30 mb-4 shadow-md">
                    <img
                      src={activeStage.image}
                      alt={`${activeStage.title} — ${activeStage.subtitle}`}
                      width={activeStage.imageWidth || 840}
                      height={activeStage.imageHeight || 627}
                      className="w-full h-full object-cover transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent" />
                    
                    <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-xs text-gold-champagne font-tajawal">
                      <span className="px-2.5 py-1 rounded bg-navy-950/90 border border-gold-royal/30 font-tajawal font-bold">
                        المرحلة {activeStage.num}
                      </span>
                      <span className="px-2.5 py-1 rounded bg-navy-950/90 border border-gold-royal/30">
                        خدمة متكاملة
                      </span>
                    </div>
                  </div>

                  <div className="my-auto py-2">
                    <NajdiStar size={20} color="#C89B43" className="mx-auto mb-2" />
                    <blockquote className="font-amiri text-base sm:text-lg italic text-gold-champagne leading-relaxed px-2">
                      {activeStage.ritualQuote}
                    </blockquote>
                    <span className="block mt-2 text-[11px] font-tajawal text-alabaster-cotton/80">
                      — ضيافة الروقان، الرياض
                    </span>
                  </div>

                  <div className="pt-3 border-t border-gold-royal/20 flex items-center justify-between text-xs text-gold-champagne font-tajawal">
                    <span>أصالة الضيافة السعودية</span>
                    <span>ترتيب والتزام متكامل</span>
                  </div>
                </div>

              </div>
            </FoilCard>
        </div>

      </div>
    </section>
  );
}

export default CeremonyTimeline;
