import React, { useState, useEffect, useCallback } from 'react';
import {
  Camera,
  Coffee,
  Maximize2,
  X,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Send,
  ExternalLink,
} from 'lucide-react';
import { BRAND_TOKENS, ROYAL_GALLERY_ITEMS } from '../../data/brandProtocol';
import { FoilCard } from '../ui/FoilCard';
import { FoilButton } from '../ui/FoilButton';
import ScrollReveal from '../ui/ScrollReveal';
import SaduFriezeDivider from '../vectors/SaduFriezeDivider';
import NajdiStar from '../vectors/NajdiStar';

const GALLERY_FILTERS = [
  { id: 'all', label: 'كافة التغطيات' },
  { id: 'pour', label: 'مراسم الصب والزي' },
  { id: 'trays', label: 'الصواني والاستكانات' },
  { id: 'oud', label: 'أجواء العود والبخور' },
  { id: 'majlis', label: 'القهوة والمجالس' },
];

export function RoyalEventGallery({ onOpenBeverageModal, onRequestSimilar }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxItemId, setLightboxItemId] = useState(null);

  const filteredItems =
    activeFilter === 'all'
      ? ROYAL_GALLERY_ITEMS
      : ROYAL_GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  const lightboxIndex =
    lightboxItemId !== null
      ? filteredItems.findIndex((item) => item.id === lightboxItemId)
      : -1;
  const activeLightboxItem = lightboxIndex >= 0 ? filteredItems[lightboxIndex] : null;

  const closeLightbox = useCallback(() => {
    setLightboxItemId(null);
  }, []);

  const showPrevItem = useCallback(() => {
    if (lightboxIndex < 0 || filteredItems.length === 0) return;
    const prevIdx = (lightboxIndex - 1 + filteredItems.length) % filteredItems.length;
    setLightboxItemId(filteredItems[prevIdx].id);
  }, [lightboxIndex, filteredItems]);

  const showNextItem = useCallback(() => {
    if (lightboxIndex < 0 || filteredItems.length === 0) return;
    const nextIdx = (lightboxIndex + 1) % filteredItems.length;
    setLightboxItemId(filteredItems[nextIdx].id);
  }, [lightboxIndex, filteredItems]);

  useEffect(() => {
    if (!activeLightboxItem) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      // In RTL: ArrowLeft advances forward visually, ArrowRight steps back
      if (e.key === 'ArrowLeft') showNextItem();
      if (e.key === 'ArrowRight') showPrevItem();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxItem, closeLightbox, showNextItem, showPrevItem]);

  const handleChooseSetup = (item) => {
    setLightboxItemId(null);
    if (onRequestSimilar) {
      onRequestSimilar({
        eventType: item.suggestedOccasion,
        specialRequests: item.suggestedNote,
      });
    }
  };

  return (
    <section id="gallery" className="py-24 bg-velvet-navy text-alabaster-cotton relative overflow-hidden">
      {/* Ambient Radial Highlights */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle 400px at 15% 22%, rgba(200, 155, 67, 0.08) 0%, transparent 70%), radial-gradient(circle 380px at 85% 82%, rgba(230, 199, 123, 0.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-elevated border border-gold-royal/35 text-xs text-gold-champagne font-tajawal mb-4 shadow-sm">
            <Camera className="w-3.5 h-3.5 text-gold-royal" aria-hidden="true" />
            <span>معرض الفعاليات الملكية — توثيق من قلب المناسبات</span>
          </div>

          <h2 className="font-amiri text-3xl sm:text-4xl lg:text-5xl font-bold text-alabaster-cotton">
            مَعْرِضُ الفَعَالِيَّاتِ.. <span className="gold-foil-text font-amiri">وَتَغْطِيَاتُ المَجَالِس</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-alabaster-cotton/85 font-tajawal leading-relaxed">
            لأن كل مناسبة لها طابعها وتجهيزها الخاص؛ نصمّم الضيافة والطاقم حسب متطلبات موقعك وضيوفك بكل مرونة واحترافية — استلهم من تغطياتنا للمجالس والقصور وحفلات الزفاف.
          </p>

          <SaduFriezeDivider className="my-2" starCount={1} showLabel="تجهيزات ميدانية مصممة حسب الطلب" />
        </ScrollReveal>

        {/* Category Filter Tabs & Beverage Menu Trigger */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="تصنيف صور المعرض">
            {GALLERY_FILTERS.map((tab) => {
              const isSelected = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => {
                    setActiveFilter(tab.id);
                    setLightboxItemId(null);
                  }}
                  className={`min-h-[44px] px-4 py-2 rounded-sm text-xs sm:text-sm font-tajawal font-medium transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer focus-visible:ring-2 focus-visible:ring-gold-champagne ${
                    isSelected
                      ? 'bg-gold-royal text-navy-950 font-bold shadow-foil'
                      : 'bg-navy-elevated/85 text-alabaster-cotton/90 border border-gold-royal/25 hover:border-gold-royal/60'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onOpenBeverageModal}
            className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-navy-elevated border border-gold-royal/40 text-gold-champagne text-xs sm:text-sm font-tajawal hover:bg-gold-royal/10 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer focus-visible:ring-2 focus-visible:ring-gold-champagne"
          >
            <Coffee className="w-4 h-4 text-gold-royal" aria-hidden="true" />
            <span>استعراض قائمة المشروبات والمرافقات الملكية</span>
          </button>
        </div>

        {/* Architectural Gallery Grid */}
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredItems.map((item) => (
              <FoilCard
                key={item.id}
                theme="elevated"
                is3d={false}
                className="group flex flex-col justify-between rounded-sm border border-gold-royal/30 hover:border-gold-champagne/60 hover:-translate-y-1 hover:shadow-foil transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
              >
                <div>
                  {/* Framed 4:3 Editorial Image */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-navy-950 border-b border-gold-royal/25">
                    <img
                      src={item.image}
                      alt={`${item.title} — ${item.venueTag}`}
                      width={item.width}
                      height={item.height}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />

                  {/* Gradient overlay for high contrast pills */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/15 to-transparent pointer-events-none"
                  />

                  {/* Top-Left Lightbox Trigger */}
                  <button
                    type="button"
                    onClick={() => setLightboxItemId(item.id)}
                    aria-label={`معاينة صورة: ${item.title}`}
                    className="min-w-[44px] min-h-[44px] absolute top-3 left-3 flex items-center justify-center rounded-sm bg-navy-950/85 border border-gold-royal/45 text-gold-champagne hover:bg-gold-royal hover:text-navy-950 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-gold-champagne"
                  >
                    <Maximize2 className="w-4 h-4" aria-hidden="true" />
                  </button>

                  {/* Bottom Venue Tag Pill */}
                  <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between gap-2 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-navy-950/90 border border-gold-royal/35 text-[11px] font-tajawal font-bold text-gold-champagne">
                      <NajdiStar size={10} color="#C89B43" />
                      <span>{item.venueTag}</span>
                    </span>
                  </div>
                </div>

                {/* Card Copy & Technical Tags */}
                <div className="p-5 sm:p-6 space-y-3">
                  <span className="text-[11px] font-tajawal font-medium text-gold-royal block">
                    {item.categoryLabel}
                  </span>

                  <h3 className="font-amiri text-xl sm:text-2xl font-bold text-alabaster-cotton leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-tajawal text-alabaster-cotton/85 leading-relaxed">
                    {item.caption}
                  </p>

                  {/* Highlights Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.highlights.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-sm bg-navy-royal/90 border border-gold-royal/25 text-[11px] font-tajawal text-alabaster-cotton/90"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Action Footer */}
              <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-gold-royal/20 flex items-center gap-2.5">
                <FoilButton
                  variant="gold"
                  size="sm"
                  icon={Send}
                  onClick={() => handleChooseSetup(item)}
                  className="flex-1 min-h-[44px]"
                >
                  طلب تجهيز مماثل
                </FoilButton>

                <button
                  type="button"
                  onClick={() => setLightboxItemId(item.id)}
                  className="min-h-[44px] px-3.5 py-2 rounded-sm border border-gold-royal/35 bg-navy-royal text-gold-champagne text-xs font-tajawal font-bold hover:border-gold-champagne hover:bg-navy-elevated transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-gold-champagne"
                >
                  تكبير
                </button>
              </div>
            </FoilCard>
          ))}
          </div>
        </ScrollReveal>

        {/* Social Feeds Strip */}
        <div className="mt-12 p-5 sm:p-6 rounded-sm bg-navy-elevated/85 border border-gold-royal/30 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-right">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-tajawal font-bold text-gold-champagne">
              <Sparkles className="w-4 h-4 text-gold-royal" aria-hidden="true" />
              <span>تغطيات حيّة يومية من داخل المحافل والمجالس</span>
            </div>
            <p className="text-xs sm:text-sm font-tajawal text-alabaster-cotton/85">
              شاهد أحدث المقاطع والتغطيات الميدانية لحفلاتنا وتجهيزاتنا عبر حسابات ضيافة الروقان الرسمية:
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 shrink-0">
            {[
              { label: 'إنستغرام', href: BRAND_TOKENS.socials.instagram },
              { label: 'تيك توك', href: BRAND_TOKENS.socials.tiktok },
              { label: 'منصة حراج', href: BRAND_TOKENS.socials.haraj },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-navy-royal border border-gold-royal/40 text-gold-champagne text-xs font-tajawal font-bold hover:border-gold-champagne hover:bg-gold-royal/10 transition-colors focus-visible:ring-2 focus-visible:ring-gold-champagne"
              >
                <span>{social.label}</span>
                <ExternalLink className="w-3.5 h-3.5 text-gold-royal" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      {activeLightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-lightbox-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          <div
            onClick={closeLightbox}
            className="fixed inset-0 bg-navy-950/95"
            aria-hidden="true"
          />

          <div className="animate-panel-in relative z-10 w-full max-w-4xl bg-velvet-navy border border-gold-royal/50 rounded-sm shadow-palace overflow-hidden">
            {/* Top Bar */}
            <div className="px-4 sm:px-6 py-3 bg-navy-950 border-b border-gold-royal/25 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-tajawal text-gold-champagne">
                <NajdiStar size={12} color="#C89B43" />
                <span>{activeLightboxItem.venueTag}</span>
                <span className="text-alabaster-cotton/50">•</span>
                <span className="font-montserrat tabular-nums">
                  {lightboxIndex + 1} / {filteredItems.length}
                </span>
              </div>

              <button
                type="button"
                onClick={closeLightbox}
                aria-label="إغلاق معاينة الصورة"
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-navy-elevated border border-gold-royal/40 text-gold-champagne hover:bg-gold-royal/15 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-gold-champagne"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Image Display with Prev/Next Controls */}
            <div className="relative bg-navy-950">
              <img
                src={activeLightboxItem.image}
                alt={activeLightboxItem.title}
                width={activeLightboxItem.width}
                height={activeLightboxItem.height}
                className="w-full max-h-[60vh] object-contain mx-auto"
              />

              {filteredItems.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={showPrevItem}
                    aria-label="الصورة السابقة"
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-navy-950/85 border border-gold-royal/50 text-gold-champagne hover:bg-gold-royal hover:text-navy-950 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-gold-champagne"
                  >
                    <ChevronRight className="w-5 h-5" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={showNextItem}
                    aria-label="الصورة التالية"
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-navy-950/85 border border-gold-royal/50 text-gold-champagne hover:bg-gold-royal hover:text-navy-950 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-gold-champagne"
                  >
                    <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>

            {/* Caption & CTA Bar */}
            <div className="p-5 sm:p-6 bg-navy-elevated/90 border-t border-gold-royal/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1.5 text-right">
                <h3 id="gallery-lightbox-title" className="font-amiri text-xl sm:text-2xl font-bold text-alabaster-cotton">
                  {activeLightboxItem.title}
                </h3>
                <p className="text-xs sm:text-sm font-tajawal text-alabaster-cotton/85 leading-relaxed max-w-2xl">
                  {activeLightboxItem.caption}
                </p>
              </div>

              <FoilButton
                variant="gold"
                size="md"
                icon={Send}
                onClick={() => handleChooseSetup(activeLightboxItem)}
                className="shrink-0 w-full sm:w-auto min-h-[44px]"
              >
                طلب نفس التجهيز لمناسبتك
              </FoilButton>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default RoyalEventGallery;
