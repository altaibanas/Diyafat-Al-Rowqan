import React, { useEffect } from 'react';
import { X, Coffee, ShieldCheck } from 'lucide-react';
import { BEVERAGE_LEDGER } from '../../data/brandProtocol';
import NajdiStar from '../vectors/NajdiStar';
import RoyalCornerOrnament from '../vectors/RoyalCornerOrnament';

export function BeverageModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="beverage-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      >
        {/* Backdrop */}
        <div
          onClick={onClose}
          className="fixed inset-0 bg-navy-950/88"
        />

        {/* Modal Window Container */}
        <div className="animate-panel-in relative w-full max-w-4xl bg-velvet-navy border border-gold-royal/40 rounded-sm shadow-palace p-6 sm:p-8 z-10 my-8 overflow-hidden">
          {/* Corner Ornaments */}
          <RoyalCornerOrnament position="top-right" size={36} color="#C89B43" className="absolute top-2 right-2" />
          <RoyalCornerOrnament position="top-left" size={36} color="#C89B43" className="absolute top-2 left-2" />
          <RoyalCornerOrnament position="bottom-right" size={36} color="#C89B43" className="absolute bottom-2 right-2" />
          <RoyalCornerOrnament position="bottom-left" size={36} color="#C89B43" className="absolute bottom-2 left-2" />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center absolute top-4 left-4 p-2 rounded-full bg-navy-elevated border border-gold-royal/30 text-gold-champagne hover:bg-gold-royal/10 transition-colors z-20"
            aria-label="إغلاق نافذة قائمة المشروبات"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>

          {/* Modal Header */}
          <div className="text-center pb-6 border-b border-gold-royal/20">
            <NajdiStar size={20} color="#C89B43" className="mx-auto mb-2" />
            <span className="text-[11px] font-tajawal text-gold-champagne block font-bold">
              قائمة المشروبات والمرافقات
            </span>
            <h2 id="beverage-modal-title" className="font-amiri text-2xl sm:text-3xl font-bold text-alabaster-cotton mt-1">
              قَائِمَةُ المَشْرُوبَاتِ.. وَمُرَافَقَاتُ الضِّيَافَة
            </h2>
            <p className="text-xs sm:text-sm font-tajawal text-alabaster-cotton/85 mt-1">
              نُعد القهوة السعودية والشاي والمرافقات طازجة يوم المناسبة لتناسب ذائقة ضيوفكم
            </p>
          </div>

          {/* Beverage Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 max-h-[60vh] overflow-y-auto px-1">
            {BEVERAGE_LEDGER.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded bg-navy-elevated/70 border border-gold-royal/25 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-amiri text-xl font-bold text-gold-champagne">
                      {item.title}
                    </h3>
                    <span className="text-xs font-tajawal text-gold-royal block">
                      {item.sub}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gold-royal/10 border border-gold-royal/30 flex items-center justify-center text-gold-champagne shrink-0">
                    <Coffee className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-2 text-xs font-tajawal text-alabaster-cotton/80 border-t border-gold-royal/15 pt-2">
                  <div>
                    <span className="text-gold-royal font-bold block">المصدر والأساس:</span>
                    <span className="text-alabaster-cotton/90">{item.beans}</span>
                  </div>
                  <div>
                    <span className="text-gold-royal font-bold block">الخلطة والمطيبات:</span>
                    <span className="text-alabaster-cotton/90">{item.spices}</span>
                  </div>
                  <div>
                    <span className="text-gold-royal font-bold block">طريقة ودرجة التقديم:</span>
                    <span className="text-alabaster-cotton/90">{item.serving}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-gold-royal/20 flex flex-wrap items-center justify-between gap-4 text-xs font-tajawal text-alabaster-cotton/70">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold-royal" />
              <span>مكونات طبيعية وطازجة مختارة بعناية دون أي إضافات صناعية</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-sm bg-gold-royal text-navy-950 font-bold hover:brightness-110 transition-all"
            >
              إغلاق القائمة
            </button>
          </div>
        </div>
      </div>
  );
}

export default BeverageModal;
