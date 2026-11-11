import React, { useState, useEffect } from 'react';
import NajdiStar from '../vectors/NajdiStar';

export function CeremonialCurtain({ onComplete }) {
  const [phase, setPhase] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return 'done';
    }
    return 'parting';
  });

  useEffect(() => {
    if (phase === 'done') return;
    const t = setTimeout(() => {
      setPhase('done');
      if (onComplete) onComplete();
    }, 2600);
    return () => clearTimeout(t);
  }, [phase, onComplete]);

  if (phase === 'done') return null;

  return (
    <div
      dir="rtl"
      aria-hidden="true"
      className="fixed inset-0 z-50 pointer-events-none overflow-hidden flex"
    >
      {/* Right Velvet Curtain Half (Parts smoothly rightward) */}
      <div
        className="w-1/2 h-full bg-velvet-navy border-l border-gold-royal/50 shadow-2xl"
        style={{
          willChange: 'transform, opacity',
          animation: 'curtainPartRight 2.45s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        }}
      />

      {/* Left Velvet Curtain Half (Parts smoothly leftward) */}
      <div
        className="w-1/2 h-full bg-velvet-navy border-r border-gold-royal/50 shadow-2xl"
        style={{
          willChange: 'transform, opacity',
          animation: 'curtainPartLeft 2.45s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        }}
      />

      {/* Centered Golden Crest that welcomes then fades softly as the curtains open */}
      <div
        className="fixed top-1/2 left-1/2 z-10 text-center pointer-events-none select-none"
        style={{
          willChange: 'transform, opacity',
          animation: 'curtainCrestFade 2.0s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        }}
      >
        <div className="px-6 py-4 rounded-sm bg-navy-950/90 border border-gold-royal/50 shadow-foil flex flex-col items-center gap-2">
          <NajdiStar size={20} color="#C89B43" />
          <span className="font-amiri text-2xl sm:text-3xl font-bold gold-foil-text whitespace-nowrap">
            ضِيَافَةُ الرَّوْقَانِ
          </span>
          <span className="text-[11px] font-tajawal text-gold-champagne/90 whitespace-nowrap">
            حفاوة المجلس وأصالة القهوة السعودية
          </span>
        </div>
      </div>
    </div>
  );
}

export default CeremonialCurtain;
