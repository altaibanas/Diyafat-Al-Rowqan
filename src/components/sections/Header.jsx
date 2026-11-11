import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Volume2, VolumeX, Sparkles, PhoneCall, Calendar, ArrowLeft } from 'lucide-react';
import OfficialBrandEmblem from '../vectors/OfficialBrandEmblem';
import { FoilButton } from '../ui/FoilButton';
import NajdiStar from '../vectors/NajdiStar';
import { BRAND_TOKENS } from '../../data/brandProtocol';
import { majlisAudio } from '../../utils/majlisAudio';

export function Header({ onOpenBeverageModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ambianceActive, setAmbianceActive] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const mobileMenuOpenRef = useRef(mobileMenuOpen);
  const progressBarRef = useRef(null);

  useEffect(() => {
    mobileMenuOpenRef.current = mobileMenuOpen;
  }, [mobileMenuOpen]);

  const toggleAmbiance = async () => {
    if (ambianceActive) {
      majlisAudio.stop();
      setAmbianceActive(false);
    } else {
      const started = await majlisAudio.start();
      setAmbianceActive(started);
    }
  };

  useEffect(() => {
    return () => {
      majlisAudio.stop();
    };
  }, []);

  // Single passive scroll listener attached once (zero listener churn / mobile lag)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (mobileMenuOpenRef.current && Math.abs(currentScrollY - lastScrollYRef.current) > 15) {
        setMobileMenuOpen(false);
      }

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const nextScrolled = currentScrollY > 30;
          setScrolled((prev) => (prev !== nextScrolled ? nextScrolled : prev));

          const nextVisible = !(currentScrollY > lastScrollYRef.current && currentScrollY > 80);
          setHeaderVisible((prev) => (prev !== nextVisible ? nextVisible : prev));

          if (progressBarRef.current) {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            const ratio = scrollable > 0 ? Math.min(Math.max(currentScrollY / scrollable, 0), 1) : 0;
            progressBarRef.current.style.transform = `scaleX(${ratio.toFixed(4)})`;
          }

          lastScrollYRef.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'طقوس الروقان', href: '#ceremony' },
    { label: 'المواصفات والتجهيزات', href: '#specifications' },
    { label: 'معرض الفعاليات', href: '#gallery' },
    { label: 'قائمة الضيافة', onClick: onOpenBeverageModal },
    { label: 'حجز المراسم الملكية', href: '#concierge' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          headerVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        } ${
          scrolled
            ? 'bg-navy-royal/98 shadow-palace border-b border-gold-royal/35 py-2.5 sm:py-3'
            : 'bg-gradient-to-b from-navy-950/95 via-navy-royal/85 to-transparent py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2">
            {/* Right: Official Brand Emblem (RTL) */}
            <a
              href="#"
              aria-label="العودة إلى أعلى الصفحة - ضيافة الروقان"
              className="flex items-center gap-2 sm:gap-3 group rounded-sm focus-visible:ring-2 focus-visible:ring-gold-champagne shrink-0"
            >
              <OfficialBrandEmblem
                variant="gold-on-navy"
                width={scrolled ? 120 : 140}
                animatedSteam={false}
                includeSubtitle={false}
                className="transition-all duration-300"
              />
              <div className="hidden lg:block text-right border-r border-gold-royal/30 pr-3 mr-1">
                <span className="font-amiri text-lg font-bold text-gold-champagne tracking-wide block leading-none">
                  ضِيَافَةُ الرَّوْقَانِ
                </span>
                <span className="text-[10px] font-tajawal text-alabaster-cotton/70 mt-1 block">
                  المراسم الملكية والقهوة السعودية
                </span>
              </div>
            </a>

            {/* Center: Desktop Navigation Links */}
            <nav aria-label="التنقل الرئيسي" className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link, idx) => (
                link.onClick ? (
                  <button
                    key={idx}
                    type="button"
                    onClick={link.onClick}
                    className="px-2.5 lg:px-3.5 py-1.5 rounded-sm text-xs lg:text-sm font-tajawal text-alabaster-cotton/85 hover:text-gold-champagne hover:bg-gold-royal/10 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer"
                  >
                    {link.label}
                  </button>
                ) : (
                  <a
                    key={idx}
                    href={link.href}
                    className="px-2.5 lg:px-3.5 py-1.5 rounded-sm text-xs lg:text-sm font-tajawal text-alabaster-cotton/85 hover:text-gold-champagne hover:bg-gold-royal/10 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  >
                    {link.label}
                  </a>
                )
              ))}
            </nav>

            {/* Left: Ambiance Sensory Indicator & CTA Button & Mobile Toggle */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Live Council Ambiance Mood Pill (Audible Web Audio Synthesizer) */}
              <button
                type="button"
                aria-pressed={ambianceActive}
                onClick={toggleAmbiance}
                className={`flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-full border text-[11px] transition-all duration-300 cursor-pointer min-h-[36px] ${
                  ambianceActive
                    ? 'bg-navy-elevated border-gold-royal text-gold-champagne shadow-foil'
                    : 'bg-navy-elevated/80 border-gold-royal/30 text-alabaster-cotton/85 hover:border-gold-royal/60 hover:text-gold-champagne'
                }`}
                title={ambianceActive ? 'إيقاف صوت أجواء المجلس' : 'تشغيل صوت أجواء المجلس والعود'}
                aria-label={ambianceActive ? 'إيقاف صوت أجواء المجلس' : 'تشغيل صوت أجواء المجلس'}
              >
                <div className="flex items-center gap-0.5" aria-hidden="true">
                  <span
                    className={`w-1 bg-gold-royal rounded-full transition-all duration-300 ${
                      ambianceActive ? 'h-3 animate-pulse' : 'h-1.5 opacity-45'
                    }`}
                  />
                  <span
                    className={`w-1 bg-gold-champagne rounded-full transition-all duration-300 delay-100 ${
                      ambianceActive ? 'h-4 animate-pulse' : 'h-2 opacity-45'
                    }`}
                  />
                  <span
                    className={`w-1 bg-gold-royal rounded-full transition-all duration-300 delay-200 ${
                      ambianceActive ? 'h-2.5 animate-pulse' : 'h-1 opacity-45'
                    }`}
                  />
                </div>
                <span className="hidden xl:inline font-tajawal">
                  أجواء المجلس: {ambianceActive ? 'عود ملكي وقهوة شقراء' : 'اضغط لتشغيل الصوت'}
                </span>
                <span className="hidden sm:inline xl:hidden font-tajawal">
                  {ambianceActive ? 'إيقاف الصوت' : 'صوت المجلس'}
                </span>
                {ambianceActive ? (
                  <Volume2 className="w-3.5 h-3.5 text-gold-champagne shrink-0" aria-hidden="true" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5 text-alabaster-cotton/60 shrink-0" aria-hidden="true" />
                )}
              </button>

              {/* Main Booking Foil CTA */}
              <FoilButton
                href="#concierge"
                variant="gold"
                size="sm"
                icon={Calendar}
                className="hidden sm:inline-flex text-xs"
              >
                حجز مراسم الضيافة
              </FoilButton>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-sm text-gold-champagne hover:bg-gold-royal/10 border border-gold-royal/35 transition-colors"
                aria-label="القائمة الرئيسية"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav-drawer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-gold-champagne" aria-hidden="true" /> : <Menu className="w-5 h-5 text-gold-champagne" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Subtle Metallic Shimmer & Scroll Progress Indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold-royal/30 to-transparent" />
        <div
          ref={progressBarRef}
          aria-hidden="true"
          className="absolute bottom-0 right-0 left-0 h-[2px] bg-gradient-to-l from-gold-champagne via-gold-royal to-gold-dark origin-right pointer-events-none"
          style={{ transform: 'scaleX(0)' }}
        />
      </header>

      {/* Mobile Drawer (with dedicated X Close Button & Auto-Close on Scroll) */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="قائمة التنقل الرئيسية"
          className="fixed inset-0 z-50 md:hidden bg-navy-950/98 flex flex-col justify-between border-b border-gold-royal/30 animate-fadeIn"
        >
          {/* Top Bar of Drawer with Dedicated X Close Button */}
          <div className="p-4 sm:p-6 border-b border-gold-royal/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <NajdiStar size={18} color="#C89B43" />
              <span className="font-amiri text-lg font-bold text-gold-champagne">
                ضِيَافَةُ الرَّوْقَانِ
              </span>
            </div>

            {/* Prominent X Close Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-full bg-navy-elevated border border-gold-royal/40 text-gold-champagne hover:bg-gold-royal/20 hover:scale-105 active:scale-95 transition-all shadow-sm"
              aria-label="إغلاق القائمة"
            >
              <X className="w-6 h-6 text-gold-champagne" aria-hidden="true" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="px-6 py-6 overflow-y-auto space-y-3">
            <div className="text-right pb-3 border-b border-gold-royal/10">
              <span className="text-xs font-tajawal text-gold-royal font-bold block">
                تصفح أقسام الصرح
              </span>
              <span className="text-[11px] font-tajawal text-alabaster-cotton/60">
                (تُغلق القائمة تلقائياً عند التمرير أو اختيار وجهتك)
              </span>
            </div>

            <nav className="flex flex-col space-y-1">
              {navLinks.map((link, idx) => (
                link.onClick ? (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      link.onClick();
                      setMobileMenuOpen(false);
                    }}
                    className="p-3 text-right font-tajawal text-base text-alabaster-cotton hover:text-gold-champagne hover:bg-gold-royal/10 rounded-sm border-b border-gold-royal/10 transition-colors flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <ArrowLeft className="w-4 h-4 text-gold-royal/60" />
                  </button>
                ) : (
                  <a
                    key={idx}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 text-right font-tajawal text-base text-alabaster-cotton hover:text-gold-champagne hover:bg-gold-royal/10 rounded-sm border-b border-gold-royal/10 transition-colors flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <ArrowLeft className="w-4 h-4 text-gold-royal/60" />
                  </a>
                )
              ))}
            </nav>
          </div>

          {/* Bottom Drawer Actions */}
          <div className="p-6 border-t border-gold-royal/20 bg-navy-elevated/60 space-y-3">
            <button
              type="button"
              aria-pressed={ambianceActive}
              onClick={toggleAmbiance}
              className="w-full py-2.5 px-4 rounded-sm border border-gold-royal/35 bg-navy-royal/90 flex items-center justify-between text-xs font-tajawal text-gold-champagne hover:border-gold-royal transition-colors"
            >
              <span>أجواء المجلس: {ambianceActive ? 'يعمل (عود وقهوة)' : 'متوقف — اضغط للتشغيل'}</span>
              {ambianceActive ? (
                <Volume2 className="w-4 h-4 text-gold-champagne" aria-hidden="true" />
              ) : (
                <VolumeX className="w-4 h-4 text-alabaster-cotton/60" aria-hidden="true" />
              )}
            </button>

            <FoilButton
              href="#concierge"
              variant="gold"
              size="md"
              className="w-full text-sm font-bold"
              onClick={() => setMobileMenuOpen(false)}
            >
              حجز مراسم الضيافة الملكية
            </FoilButton>

            <a
              href={`https://wa.me/${BRAND_TOKENS.whatsappRaw}?text=${encodeURIComponent('السلام عليكم ورحمة الله، أود الاستفسار عن خدمات ومراسم ضيافة الروقان')}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-sm border border-gold-royal/40 bg-navy-royal flex items-center justify-center gap-2 text-gold-champagne text-xs sm:text-sm font-tajawal font-bold hover:bg-navy-elevated transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>مستشار المراسم عبر واتساب المباشر</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
