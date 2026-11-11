import React, { useState, useMemo, useEffect } from 'react';
import {
  Calendar,
  Phone,
  User,
  Coffee,
  Printer,
  ChevronDown,
  Crown,
  Clock,
  Lock,
  PhoneCall,
  Send,
  ShieldCheck,
} from 'lucide-react';
import {
  BRAND_TOKENS,
  SAUDI_CITIES,
} from '../../data/brandProtocol';
import { sanitizeText, sanitizePhoneInput, isValidSaudiPhone } from '../../utils/sanitize';
import { FoilCard } from '../ui/FoilCard';
import { FoilButton } from '../ui/FoilButton';
import RoyalCornerOrnament from '../vectors/RoyalCornerOrnament';
import NajdiStar from '../vectors/NajdiStar';
import SaduFriezeDivider from '../vectors/SaduFriezeDivider';
import ScrollReveal from '../ui/ScrollReveal';

export function RoyalConciergeStudio({ presetRequest, onOpenPrintModal }) {
  // Form State
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [selectedCity, setSelectedCity] = useState(SAUDI_CITIES[0].name);
  const [eventDate, setEventDate] = useState('');
  const [eventType, setEventType] = useState('حفل زفاف / مناسبة عائلية');
  const [sectionType, setSectionType] = useState('both'); // 'men' | 'women' | 'both'
  const [guestCount, setGuestCount] = useState('100 - 300 ضيف (حفل متوسط)');
  const [specialRequests, setSpecialRequests] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [whatsappLinkReady, setWhatsappLinkReady] = useState('');

  useEffect(() => {
    if (!presetRequest) return;
    if (presetRequest.eventType) setEventType(presetRequest.eventType);
    if (presetRequest.specialRequests) {
      setSpecialRequests(sanitizeText(presetRequest.specialRequests, 250));
    }
  }, [presetRequest]);

  // Serial Reference Number for Protocol Inquiries (Arabic digits/prefix)
  const inquiryRefNumber = useMemo(() => {
    return `رقم-${Math.floor(100000 + Math.random() * 900000)}`;
  }, []);

  // WhatsApp Protocol Generator
  const handleSendInquiry = (e) => {
    if (e) e.preventDefault();

    const cleanedPhone = sanitizePhoneInput(clientPhone);
    if (cleanedPhone && !isValidSaudiPhone(cleanedPhone)) {
      setPhoneError('يرجى إدخال رقم جوال سعودي صحيح يبدأ بـ 05 ويتكون من 10 أرقام');
      return;
    }
    setPhoneError('');

    const safeName = sanitizeText(clientName, 80) || 'كريم المقام';
    const safePhone = cleanedPhone || 'غير محدد';
    const safeRequests = sanitizeText(specialRequests, 250);

    const sectionText =
      sectionType === 'men'
        ? 'قسم الرجال'
        : sectionType === 'women'
        ? 'قسم السيدات (مضيفات)'
        : 'القسمين معاً (رجال وسيدات)';

    const message = `*طلب حجز واستشارة مراسم ملكية — ضيافة الروقان*
━━━━━━━━━━━━━━━━━
*رقم القيد المرجعي:* ${inquiryRefNumber}
*صاحب المناسبة / الجهة:* ${safeName}
*رقم التواصل:* ${safePhone}
*المدينة المعتمدة:* ${selectedCity}
*تاريخ المناسبة:* ${eventDate || 'يحدد بالتنسيق'}
*طبيعة المحفل:* ${eventType}
*قسم الضيافة المطلوب:* ${sectionText}
*نطاق الضيوف التقديري:* ${guestCount}
${safeRequests ? `*المتطلبات والبروتوكول الخاص:* ${safeRequests}\n` : ''}━━━━━━━━━━━━━━━━━
*تعهد وضمانات الروقان:*
• من أفضل أنواع البن في المملكة وهيل طازج
• طاقم ضيافة مرتب بالزي الرسمي باللون الذهبي
• حضور مبكر وترتيب متكامل لركن الضيافة
━━━━━━━━━━━━━━━━━
نرجو التكرم بالتواصل لتأكيد الجاهزية وحجز موعد المناسبة.`;

    const url = `https://wa.me/${BRAND_TOKENS.whatsappRaw}?text=${encodeURIComponent(message)}`;
    setWhatsappLinkReady(url);
    window.open(url, '_blank', 'noopener,noreferrer');

    import('canvas-confetti')
      .then(({ default: confetti }) => {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#C89B43', '#E6C77B', '#FAF6EE', '#0E1E36'],
        });
      })
      .catch(() => {});
  };

  const handlePrintProposal = () => {
    if (onOpenPrintModal) {
      onOpenPrintModal({
        refNumber: inquiryRefNumber,
        clientName: sanitizeText(clientName, 80) || 'كريم المقام',
        clientPhone: sanitizePhoneInput(clientPhone) || '—',
        selectedCity,
        eventDate: eventDate || new Date().toLocaleDateString('ar-SA'),
        eventType,
        sectionType,
        guestCount: guestCount || '100 - 300 ضيف',
        specialRequests: sanitizeText(specialRequests, 250),
      });
    }
  };

  return (
    <section id="concierge" className="py-20 sm:py-28 bg-navy-royal relative overflow-hidden">
      {/* Lightweight background radial lighting */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle 360px at 75% 15%, rgba(200, 155, 67, 0.08) 0%, transparent 70%), radial-gradient(circle 380px at 25% 85%, rgba(59, 30, 10, 0.25) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-elevated border border-gold-royal/35 text-xs text-gold-champagne font-tajawal mb-4 shadow-sm">
            <Crown className="w-3.5 h-3.5 text-gold-royal" />
            <span>خدمة الحجز والتنسيق المباشر في الرياض</span>
          </div>

          <h2 className="font-amiri text-3xl sm:text-4xl lg:text-5xl font-bold text-alabaster-cotton leading-tight">
            حَجْزُ خَدَمَاتِ الضِّيَافَةِ.. <span className="gold-foil-text font-amiri font-bold">وَتَنْسِيقُ مُنَاسَبَتِكُم</span>
          </h2>

          <p className="mt-4 text-sm sm:text-lg text-alabaster-cotton/80 font-tajawal leading-relaxed">
            نوفر طواقم القهوجية والصبابين والمضيفات لحفلات الزفاف، المجالس، والفعاليات في مدينة الرياض. أرسل تفاصيل مناسبتك للتنسيق المباشر عبر الواتساب.
          </p>

          <SaduFriezeDivider className="my-2" starCount={1} showLabel="استمارة الحجز والاستفسار" />
        </ScrollReveal>

        {/* 2-Column Luxury Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* ===================== RIGHT 7 COLS: COTTON PAPER INQUIRY STUDIO ===================== */}
          <div className="lg:col-span-7 bg-cotton-paper text-roast-espresso p-6 sm:p-10 rounded-sm border-2 border-gold-royal/50 shadow-letterpress relative">
            {/* Corner Ornaments */}
            <RoyalCornerOrnament position="top-right" size={38} color="#3B1E0A" className="absolute top-2 right-2" />
            <RoyalCornerOrnament position="top-left" size={38} color="#3B1E0A" className="absolute top-2 left-2" />
            <RoyalCornerOrnament position="bottom-right" size={38} color="#3B1E0A" className="absolute bottom-2 right-2" />
            <RoyalCornerOrnament position="bottom-left" size={38} color="#3B1E0A" className="absolute bottom-2 left-2" />

            <form onSubmit={handleSendInquiry} className="space-y-6 relative z-10">
              
              {/* Form Title */}
              <div className="border-b border-roast-espresso/20 pb-4">
                <span className="text-[11px] font-tajawal font-bold text-roast-espresso/85 block">
                  استمارة الحجز الرسمية المعتمدة
                </span>
                <h3 className="font-amiri text-2xl font-bold text-roast-espresso mt-0.5">
                  استمارة اعتماد الضيافة والمناسبة
                </h3>
                <span className="text-xs font-tajawal text-roast-espresso/85 block mt-1">
                  رقم القيد المرجعي: <strong className="text-[#6B4810]">{inquiryRefNumber}</strong>
                </span>
              </div>

              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="concierge-name" className="block text-xs font-tajawal font-bold text-roast-espresso mb-1">
                    اسم صاحب المناسبة / الجهة الداعية
                  </label>
                  <div className="relative">
                    <input
                      id="concierge-name"
                      type="text"
                      maxLength={80}
                      value={clientName}
                      onChange={(e) => setClientName(sanitizeText(e.target.value, 80))}
                      placeholder="مثال: محمد العتيبي / اسم العائلة أو الجهة"
                      className="w-full px-3.5 py-2.5 bg-alabaster-ivory border border-roast-espresso/30 rounded-sm text-sm font-tajawal text-roast-espresso placeholder:text-roast-espresso/60 focus-visible:ring-2 focus-visible:ring-[#6B4810] focus:border-[#6B4810]"
                    />
                    <User className="w-4 h-4 text-roast-espresso/60 absolute left-3 top-3 pointer-events-none" aria-hidden="true" />
                  </div>
                </div>

                <div>
                  <label htmlFor="concierge-phone" className="block text-xs font-tajawal font-bold text-roast-espresso mb-1">
                    رقم الجوال للتواصل الرسمي
                  </label>
                  <div className="relative">
                    <input
                      id="concierge-phone"
                      type="tel"
                      maxLength={15}
                      value={clientPhone}
                      onChange={(e) => {
                        setClientPhone(sanitizePhoneInput(e.target.value));
                        setPhoneError('');
                      }}
                      placeholder="05XXXXXXXX"
                      className="w-full px-3.5 py-2.5 bg-alabaster-ivory border border-roast-espresso/30 rounded-sm text-sm font-montserrat text-roast-espresso placeholder:text-roast-espresso/60 focus-visible:ring-2 focus-visible:ring-[#6B4810] focus:border-[#6B4810] dir-ltr text-right"
                    />
                    <Phone className="w-4 h-4 text-roast-espresso/60 absolute left-3 top-3 pointer-events-none" aria-hidden="true" />
                  </div>
                  {phoneError && (
                    <span role="alert" className="text-[11px] text-red-700 font-tajawal block mt-1 font-semibold">
                      {phoneError}
                    </span>
                  )}
                </div>
              </div>

              {/* Row 2: City & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="concierge-city" className="block text-xs font-tajawal font-bold text-roast-espresso mb-1">
                    مدينة إقامة المحفل
                  </label>
                  <div className="relative">
                    <select
                      id="concierge-city"
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-alabaster-ivory border border-roast-espresso/30 rounded-sm text-sm font-tajawal text-roast-espresso focus-visible:ring-2 focus-visible:ring-[#6B4810] focus:border-[#6B4810] appearance-none cursor-pointer"
                    >
                      {SAUDI_CITIES.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-roast-espresso/60 absolute left-3 top-3 pointer-events-none" aria-hidden="true" />
                  </div>
                </div>

                <div>
                  <label htmlFor="concierge-date" className="block text-xs font-tajawal font-bold text-roast-espresso mb-1">
                    تاريخ المناسبة المرتقب
                  </label>
                  <div className="relative">
                    <input
                      id="concierge-date"
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-alabaster-ivory border border-roast-espresso/30 rounded-sm text-sm font-montserrat text-roast-espresso focus-visible:ring-2 focus-visible:ring-[#6B4810] focus:border-[#6B4810]"
                    />
                    <Calendar className="w-4 h-4 text-roast-espresso/60 absolute left-3 top-3 pointer-events-none" aria-hidden="true" />
                  </div>
                </div>
              </div>

              {/* Row 3: Occasion Type & Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="concierge-event-type" className="block text-xs font-tajawal font-bold text-roast-espresso mb-1">
                    نوع وطبيعة المناسبة
                  </label>
                  <select
                    id="concierge-event-type"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-alabaster-ivory border border-roast-espresso/30 rounded-sm text-sm font-tajawal text-roast-espresso focus-visible:ring-2 focus-visible:ring-[#6B4810] focus:border-[#6B4810] cursor-pointer"
                  >
                    <option value="حفل زفاف / مناسبة عائلية">حفل زفاف / مناسبة عائلية</option>
                    <option value="مجلس خاص / عزيمة">مجلس خاص / عزيمة</option>
                    <option value="مناسبة رسمية أو اجتماع شركة">مناسبة رسمية أو اجتماع شركة</option>
                    <option value="مأدبة عشاء أو غداء">مأدبة عشاء أو غداء</option>
                    <option value="افتتاح أو فعالية عامة">افتتاح أو فعالية عامة</option>
                  </select>
                </div>

                <fieldset>
                  <legend className="block text-xs font-tajawal font-bold text-roast-espresso mb-1">
                    قسم الضيافة
                  </legend>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'men', label: 'قسم الرجال' },
                      { id: 'women', label: 'قسم السيدات' },
                      { id: 'both', label: 'القسمين معاً' },
                    ].map((sec) => (
                      <button
                        key={sec.id}
                        type="button"
                        aria-pressed={sectionType === sec.id}
                        onClick={() => setSectionType(sec.id)}
                        className={`min-h-[42px] py-2 px-1 text-center text-xs font-tajawal font-bold rounded-sm border transition-all ${
                          sectionType === sec.id
                            ? 'bg-roast-espresso text-alabaster-cotton border-roast-espresso shadow-sm'
                            : 'bg-alabaster-ivory border-roast-espresso/25 text-roast-espresso hover:bg-alabaster-cotton'
                        }`}
                      >
                        {sec.label}
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>

              {/* Guest Count Range & Special Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="concierge-guests" className="block text-xs font-tajawal font-bold text-roast-espresso mb-1">
                    العدد التقديري للضيوف
                  </label>
                  <select
                    id="concierge-guests"
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-alabaster-ivory border border-roast-espresso/30 rounded-sm text-sm font-tajawal text-roast-espresso focus-visible:ring-2 focus-visible:ring-[#6B4810] focus:border-[#6B4810] cursor-pointer"
                  >
                    <option value="30 - 100 ضيف (مجلس خاص)">30 - 100 ضيف (مجلس خاص)</option>
                    <option value="100 - 300 ضيف (حفل متوسط)">100 - 300 ضيف (حفل متوسط)</option>
                    <option value="300 - 600 ضيف (حفل كبير)">300 - 600 ضيف (حفل كبير)</option>
                    <option value="أكثر من 600 ضيف (فعاليات كبرى)">أكثر من 600 ضيف (فعاليات كبرى)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="concierge-notes" className="block text-xs font-tajawal font-bold text-roast-espresso mb-1">
                    متطلبات خاصة أو تشريفات إضافية
                  </label>
                  <input
                    id="concierge-notes"
                    type="text"
                    maxLength={250}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(sanitizeText(e.target.value, 250))}
                    placeholder="ركن عود ملكي، دلال رسلان، ركن بخور..."
                    className="w-full px-3.5 py-2.5 bg-alabaster-ivory border border-roast-espresso/30 rounded-sm text-sm font-tajawal text-roast-espresso placeholder:text-roast-espresso/60 focus-visible:ring-2 focus-visible:ring-[#6B4810] focus:border-[#6B4810]"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-roast-espresso/20 space-y-3">
                <FoilButton
                  type="submit"
                  variant="gold"
                  size="lg"
                  icon={Send}
                  className="w-full text-base font-bold justify-center"
                >
                  اعتماد الطلب والتنسيق الفوري عبر واتساب التشريفات
                </FoilButton>

                {whatsappLinkReady && (
                  <div
                    role="status"
                    className="p-3 rounded-sm bg-navy-royal text-alabaster-cotton border border-gold-royal text-xs font-tajawal flex flex-col sm:flex-row items-center justify-between gap-2"
                  >
                    <span>تم تجهيز تفاصيل طلبك بالكامل. إن لم يُفتح التطبيق تلقائياً:</span>
                    <a
                      href={whatsappLinkReady}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-sm bg-gold-royal text-navy-950 font-bold hover:brightness-110 transition-all shrink-0"
                    >
                      فتح محادثة واتساب الآن
                    </a>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handlePrintProposal}
                  className="min-h-[44px] w-full py-2.5 px-4 rounded-sm border border-roast-espresso/35 bg-alabaster-ivory text-roast-espresso hover:bg-alabaster-cotton text-xs font-tajawal font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-[#6B4810]" aria-hidden="true" />
                  <span>معاينة وثيقة العرض المعتمدة وطباعتها</span>
                </button>
              </div>

            </form>
          </div>

          {/* ===================== LEFT 5 COLS: ROYAL PROTOCOL CHARTER & GUARANTEES ===================== */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Charter Box on Velvet Elevated */}
            <FoilCard theme="elevated" className="p-6 sm:p-8 border-2 border-gold-royal shadow-foil">
              <div className="text-center pb-5 border-b border-gold-royal/25">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-tajawal text-gold-champagne/90 font-bold">
                  <NajdiStar size={11} color="#C89B43" />
                  <span>المعايير والضمانات المعتمدة</span>
                  <NajdiStar size={11} color="#C89B43" />
                </div>
                <h3 className="font-amiri text-2xl font-bold text-gold-champagne mt-2">
                  التزامات ضيافة الروقان
                </h3>
                <p className="text-xs font-tajawal text-alabaster-cotton/85 mt-1">
                  أربعة مبادئ نلتزم بها لنجاح مناسبتكم وتشريف ضيوفكم
                </p>
              </div>

              {/* The 4 Guarantees */}
              <div className="py-5 space-y-4 text-xs font-tajawal">
                
                <div className="p-3.5 rounded bg-navy-royal/90 border border-gold-royal/20 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold-royal/10 border border-gold-royal/30 flex items-center justify-center text-gold-champagne shrink-0 mt-0.5">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-amiri text-base font-bold text-gold-champagne block">
                      الخصوصية واحترام المجالس
                    </span>
                    <span className="text-alabaster-cotton/80 leading-relaxed block mt-0.5">
                      الالتزام الكامل بخصوصية الحفلات العائلية والمجالس الخاصة والعمل بهدوء وأمانة.
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded bg-navy-royal/90 border border-gold-royal/20 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold-royal/10 border border-gold-royal/30 flex items-center justify-center text-gold-champagne shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-amiri text-base font-bold text-gold-champagne block">
                      حضور مبكر وترتيب مسبق
                    </span>
                    <span className="text-alabaster-cotton/80 leading-relaxed block mt-0.5">
                      تواجد الطاقم قبل بدء المناسبة بوقت كافٍ لتجهيز الدلال والاستكانات والمباخر.
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded bg-navy-royal/90 border border-gold-royal/20 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold-royal/10 border border-gold-royal/30 flex items-center justify-center text-gold-champagne shrink-0 mt-0.5">
                    <Coffee className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-amiri text-base font-bold text-gold-champagne block">
                      من أفضل أنواع البن في المملكة
                    </span>
                    <span className="text-alabaster-cotton/80 leading-relaxed block mt-0.5">
                      تحضير القهوة السعودية من أجود البن مع الهيل الأخضر الطازج والزعفران يوم مناسبتكم.
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded bg-navy-royal/90 border border-gold-royal/20 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold-royal/10 border border-gold-royal/30 flex items-center justify-center text-gold-champagne shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-amiri text-base font-bold text-gold-champagne block">
                      طواقم ضيافة مرتبة ولبقة
                    </span>
                    <span className="text-alabaster-cotton/80 leading-relaxed block mt-0.5">
                      قهوجية وصبابين ومضيفات بالزي الرسمي المرتب وباللون الذهبي، ولباقة تامة في الترحيب والتقديم.
                    </span>
                  </div>
                </div>

              </div>

              {/* Direct Hotline Box */}
              <div className="pt-4 border-t border-gold-royal/20 text-center space-y-2">
                <span className="text-xs font-tajawal text-alabaster-cotton/70 block">
                  للتنسيق العاجل أو الاستشارات الملكية المباشرة:
                </span>
                <a
                  href={`tel:${BRAND_TOKENS.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 text-gold-champagne font-montserrat text-lg font-bold hover:text-gold-light transition-colors dir-ltr"
                >
                  <PhoneCall className="w-4 h-4 text-gold-royal" />
                  <span>{BRAND_TOKENS.phoneDisplay}</span>
                </a>
              </div>
            </FoilCard>

          </div>

        </div>

      </div>
    </section>
  );
}

export default RoyalConciergeStudio;
