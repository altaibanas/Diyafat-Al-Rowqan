import React, { useEffect } from 'react';
import { Printer, X } from 'lucide-react';
import OfficialBrandEmblem from '../vectors/OfficialBrandEmblem';
import NajdiStar from '../vectors/NajdiStar';
import RoyalCornerOrnament from '../vectors/RoyalCornerOrnament';
import { BRAND_TOKENS } from '../../data/brandProtocol';

export function PrintProposalModal({ isOpen, onClose, proposalData }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen || !proposalData) return null;

  const handlePrint = () => {
    window.print();
  };

  const {
    refNumber,
    clientName,
    clientPhone,
    selectedCity,
    eventDate,
    eventType,
    sectionType,
    guestCount,
    specialRequests,
  } = proposalData;

  const sectionLabel =
    sectionType === 'men'
      ? 'قسم الرجال'
      : sectionType === 'women'
      ? 'قسم السيدات (مضيفات)'
      : 'القسمين معاً (رجال وسيدات)';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="proposal-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/90 flex items-start justify-center p-3 sm:p-6 print:p-0 print:bg-white cursor-pointer"
    >
      {/* Modal Dialog Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-cotton-paper text-roast-espresso shadow-2xl border border-gold-royal/50 my-4 sm:my-8 print:my-0 print:border-none print:shadow-none animate-panel-in rounded-sm overflow-hidden cursor-auto"
      >
        {/* Sticky Modal Controls Bar (Hidden in Print) */}
        <div className="no-print sticky top-0 z-30 bg-navy-royal px-4 sm:px-6 py-3 border-b border-gold-royal/40 flex items-center justify-between gap-2 text-alabaster-cotton shadow-md">
          <div className="flex items-center gap-2 text-xs font-tajawal">
            <span className="font-amiri text-gold-champagne font-bold text-base">ضيافة الروقان</span>
            <span className="hidden sm:inline text-alabaster-cotton/70">|</span>
            <span className="hidden sm:inline">وثيقة اعتماد عرض الضيافة المبدئية</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handlePrint}
              type="button"
              className="min-h-[40px] px-3 sm:px-4 py-1.5 bg-gradient-to-r from-gold-dark via-gold-royal to-gold-champagne text-navy-950 font-tajawal font-bold text-xs flex items-center gap-1.5 rounded-sm hover:brightness-105 transition-all shadow-sm cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" aria-hidden="true" />
              <span>طباعة الوثيقة الرسمية</span>
            </button>
            <button
              onClick={onClose}
              type="button"
              className="min-w-[44px] min-h-[40px] px-3 py-1.5 rounded-sm bg-navy-elevated border border-gold-royal/50 text-gold-champagne hover:bg-gold-royal hover:text-navy-950 font-tajawal font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              aria-label="إغلاق نافذة المعاينة"
            >
              <X className="w-4 h-4" aria-hidden="true" />
              <span>خروج</span>
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-5 sm:p-8 md:p-12 relative print:p-8 bg-cotton-paper">
          
          {/* Corner Letterpress Ornaments */}
          <RoyalCornerOrnament position="top-right" size={48} color="#3B1E0A" className="absolute top-4 right-4 z-10" />
          <RoyalCornerOrnament position="top-left" size={48} color="#3B1E0A" className="absolute top-4 left-4 z-10" />
          <RoyalCornerOrnament position="bottom-right" size={48} color="#3B1E0A" className="absolute bottom-4 right-4 z-10" />
          <RoyalCornerOrnament position="bottom-left" size={48} color="#3B1E0A" className="absolute bottom-4 left-4 z-10" />

          {/* Double Hairline Border */}
          <div className="absolute inset-4 border border-roast-espresso/20 pointer-events-none print:inset-0" />
          <div className="absolute inset-6 border border-dashed border-gold-royal/35 pointer-events-none print:inset-2" />

          {/* Document Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b-2 border-gold-royal/40 gap-6 relative z-10">
            <div className="text-center sm:text-right">
              <span className="font-tajawal text-xs text-[#6B4810] font-bold block">
                الرياض — المملكة العربية السعودية
              </span>
              <h2 id="proposal-modal-title" className="font-amiri text-2xl sm:text-3xl font-bold text-roast-espresso mt-1">
                وَثِيقَةُ اعْتِمَادِ الضِّيَافَةِ المَلَكِيَّة
              </h2>
              <p className="font-tajawal text-xs text-roast-espresso/85 mt-1">
                إدارة البروتوكول والمراسم الميدانية — صالحة لمدة 14 يوماً من تاريخ الإصدار
              </p>
            </div>

            <div className="shrink-0">
              <OfficialBrandEmblem
                variant="espresso-on-cream"
                width={150}
                animatedSteam={false}
                includeSubtitle={false}
              />
            </div>
          </div>

          {/* Reference Meta Box */}
          <div className="my-6 p-4 bg-alabaster-ivory border border-roast-espresso/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-tajawal relative z-10">
            <div>
              <span className="block text-roast-espresso/60">رقم الوثيقة المرجعي:</span>
              <span className="font-montserrat font-bold text-roast-espresso tabular-nums">{refNumber}</span>
            </div>
            <div>
              <span className="block text-roast-espresso/60">تاريخ الإصدار:</span>
              <span className="font-montserrat font-bold text-roast-espresso">{eventDate}</span>
            </div>
            <div>
              <span className="block text-roast-espresso/60">المدينة المعتمدة:</span>
              <span className="font-bold text-roast-espresso">{selectedCity}</span>
            </div>
            <div>
              <span className="block text-roast-espresso/60">نوع المحفل:</span>
              <span className="font-bold text-gold-royal">{eventType}</span>
            </div>
          </div>

          {/* Client Details Section */}
          <div className="mb-6 relative z-10">
            <h3 className="font-amiri text-lg font-bold text-roast-espresso pb-2 border-b border-roast-espresso/15 flex items-center gap-2">
              <NajdiStar size={14} color="#C89B43" />
              <span>بيانات صاحب المناسبة والجهة الداعية</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3 text-xs font-tajawal">
              <div>
                <span className="block text-roast-espresso/60">الاسم الكريم:</span>
                <span className="font-bold text-roast-espresso text-sm">{clientName}</span>
              </div>
              <div>
                <span className="block text-roast-espresso/60">رقم التواصل:</span>
                <span className="font-montserrat font-bold text-roast-espresso text-sm dir-ltr text-right">{clientPhone}</span>
              </div>
              <div>
                <span className="block text-roast-espresso/60">قسم الضيافة:</span>
                <span className="font-bold text-roast-espresso text-sm">{sectionLabel}</span>
              </div>
            </div>
          </div>

          {/* Scope of Service Breakdown */}
          <div className="mb-6 relative z-10">
            <h3 className="font-amiri text-lg font-bold text-roast-espresso pb-2 border-b border-roast-espresso/15 flex items-center gap-2">
              <NajdiStar size={14} color="#C89B43" />
              <span>تفاصيل المناسبة ونطاق الضيافة المطلوب</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 text-xs font-tajawal">
              <div className="p-3 bg-alabaster-ivory rounded border border-roast-espresso/10">
                <span className="block text-roast-espresso/60">نظام الخدمة:</span>
                <span className="font-bold text-roast-espresso">تخصيص كامل للمناسبة</span>
              </div>
              <div className="p-3 bg-alabaster-ivory rounded border border-roast-espresso/10">
                <span className="block text-roast-espresso/60">النطاق التقديري للضيوف:</span>
                <span className="font-bold text-roast-espresso">{guestCount}</span>
              </div>
              <div className="p-3 bg-alabaster-ivory rounded border border-roast-espresso/10">
                <span className="block text-roast-espresso/60">الكادر الميداني:</span>
                <span className="font-bold text-roast-espresso">يُحدَّد بالتنسيق حسب القاعة</span>
              </div>
              <div className="p-3 bg-alabaster-ivory rounded border border-roast-espresso/10">
                <span className="block text-roast-espresso/60">موعد الحضور:</span>
                <span className="font-bold text-roast-espresso">قبل المناسبة بوقت كافٍ</span>
              </div>
            </div>
          </div>

          {/* Protocol Standards Table */}
          <div className="mb-8 relative z-10">
            <h3 className="font-amiri text-lg font-bold text-roast-espresso pb-2 border-b border-roast-espresso/15 flex items-center gap-2">
              <NajdiStar size={14} color="#C89B43" />
              <span>ملخص الضيافة وتفاصيل الخدمة</span>
            </h3>

            <table className="w-full mt-3 text-xs font-tajawal border-collapse">
              <thead>
                <tr className="bg-alabaster-ivory border-b border-roast-espresso/20 text-roast-espresso">
                  <th className="py-2.5 px-3 text-right">البند / التفاصيل</th>
                  <th className="py-2.5 px-3 text-center">الحالة</th>
                  <th className="py-2.5 px-3 text-left">ملاحظات التنفيذ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-roast-espresso/10">
                <tr>
                  <td className="py-2.5 px-3">
                    <strong>القهوة السعودية والمشروبات الساخنة</strong> — من أفضل أنواع البن في المملكة مع الهيل الأخضر الطازج والزعفران وتشكيلة الشاي
                  </td>
                  <td className="py-2.5 px-3 text-center font-bold text-roast-espresso">مشمول</td>
                  <td className="py-2.5 px-3 text-left text-roast-espresso/85">تحضير طازج يوم المناسبة</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3">
                    <strong>طاقم الصبابين والمضيفات بالزي الرسمي</strong> — أزياء مرتبة باللون الذهبي مع الالتزام بأصول السنع والضيافة
                  </td>
                  <td className="py-2.5 px-3 text-center font-bold text-roast-espresso">{sectionLabel}</td>
                  <td className="py-2.5 px-3 text-left text-roast-espresso/85">فريق ذو خبرة ولباقة</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3">
                    <strong>الدلال النحاسية والاستكانات والمباخر</strong> — صواني تقديم أنيقة ومباخر للعود الطبيعي متناسقة مع المناسبة
                  </td>
                  <td className="py-2.5 px-3 text-center font-bold text-roast-espresso">مشمول</td>
                  <td className="py-2.5 px-3 text-left text-roast-espresso/85">ترتيب وتنسيق متكامل</td>
                </tr>
                {specialRequests && (
                  <tr>
                    <td className="py-2.5 px-3">
                      <strong>المتطلبات والتشريفات الخاصة:</strong> {specialRequests}
                    </td>
                    <td className="py-2.5 px-3 text-center font-bold text-roast-espresso">حسب الطلب</td>
                    <td className="py-2.5 px-3 text-left text-roast-espresso/85">يُراجع مع مشرف المراسم</td>
                  </tr>
                )}
                <tr className="bg-alabaster-ivory/80 font-bold text-xs sm:text-sm border-t-2 border-roast-espresso/20">
                  <td className="py-3 px-3 text-roast-espresso">
                    اعتماد التكلفة والترتيبات النهائية
                  </td>
                  <td className="py-3 px-3 text-center font-montserrat">—</td>
                  <td className="py-3 px-3 text-left font-tajawal text-[#6B4810]">
                    تُحدَّد بالتنسيق المباشر مع إدارة المراسم
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Official Signatures & Seal */}
          <div className="pt-6 border-t-2 border-gold-royal/30 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
            <div className="text-center sm:text-right text-xs font-tajawal text-roast-espresso/70">
              <span className="font-bold text-roast-espresso block">إدارة المراسم والضيافة:</span>
              <span>ضيافة الروقان — الرياض، المملكة العربية السعودية</span>
              <span className="block mt-1 font-montserrat dir-ltr text-center sm:text-right">{BRAND_TOKENS.phoneDisplay}</span>
            </div>

            {/* Official Stamp Box */}
            <div className="w-36 h-24 border-2 border-gold-royal/50 rounded flex flex-col items-center justify-center p-2 text-center bg-alabaster-ivory">
              <NajdiStar size={16} color="#C89B43" />
              <span className="font-amiri text-sm font-bold text-gold-royal mt-1">الختم المعتمد</span>
              <span className="text-[10px] font-tajawal font-bold text-roast-espresso/75">ضيافة الروقان</span>
              <span className="text-[9px] font-tajawal text-roast-espresso/60">إدارة المراسم</span>
            </div>
          </div>

          {/* Bottom Dismiss Button (Hidden in Print) */}
          <div className="no-print mt-6 pt-4 border-t border-roast-espresso/15 flex justify-center relative z-10">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] px-8 py-2 rounded-sm border border-roast-espresso/30 bg-alabaster-ivory text-roast-espresso text-xs font-tajawal font-bold hover:bg-roast-espresso hover:text-alabaster-cotton transition-colors cursor-pointer flex items-center gap-2"
            >
              <X className="w-4 h-4" aria-hidden="true" />
              <span>إغلاق نافذة المعاينة</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PrintProposalModal;
