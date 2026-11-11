import React from 'react';
import { BRAND_TOKENS } from '../../data/brandProtocol';

export function FloatingWhatsApp() {
  const whatsappUrl = `https://wa.me/${BRAND_TOKENS.whatsappRaw}?text=${encodeURIComponent(
    'السلام عليكم ورحمة الله وبركاته، أود الاستفسار عن خدمات الضيافة وحجز مراسم مناسبتنا.'
  )}`;

  return (
    <div className="no-print fixed bottom-5 left-5 sm:bottom-7 sm:left-7 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل معنا عبر واتساب المراسم"
        title="تواصل معنا عبر واتساب المراسم"
        className="group relative block rounded-full focus-visible:ring-2 focus-visible:ring-gold-champagne transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 active:scale-95"
      >
        {/* Medallion Button (Always pinned bottom-left on all screen sizes) */}
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-navy-elevated via-navy-royal to-navy-950 border-2 border-gold-royal shadow-palace flex items-center justify-center transition-all duration-300 group-hover:border-gold-champagne group-hover:shadow-foil">
          {/* Inner Hairline Ring */}
          <span className="absolute inset-1 rounded-full border border-gold-royal/30 pointer-events-none" />

          {/* Gold WhatsApp SVG */}
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-7 h-7 sm:w-8 sm:h-8 text-gold-champagne transition-transform duration-300 group-hover:scale-110"
            aria-hidden="true"
          >
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.79 14.01c-.24.68-1.41 1.3-1.95 1.38-.49.07-1.13.1-1.82-.12-.42-.13-.96-.31-1.65-.61-2.91-1.25-4.81-4.18-4.96-4.38-.15-.2-1.19-1.58-1.19-3.02 0-1.44.75-2.14 1.02-2.43.27-.29.59-.36.79-.36.2 0 .39 0 .56.01.18.01.42-.07.66.5.24.59.82 2.02.9 2.17.07.15.12.32.02.52-.1.2-.15.32-.29.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.61.17.29.77 1.27 1.65 2.06 1.14 1.01 2.09 1.33 2.39 1.48.29.15.47.12.64-.07.17-.2.74-.86.94-1.16.2-.3.4-.25.67-.15.27.1 1.73.82 2.02.97.3.15.49.22.56.34.07.12.07.71-.17 1.39z" />
          </svg>
        </div>

        {/* Absolute Tooltip Pill (Positioned out of layout flow so medallion stays at far left) */}
        <div
          aria-hidden="true"
          className="hidden lg:flex items-center px-3.5 py-2 rounded-sm bg-navy-950/95 border border-gold-royal/45 text-gold-champagne text-xs font-tajawal font-bold shadow-palace absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap"
        >
          <span>واتساب المراسم المباشر</span>
        </div>
      </a>
    </div>
  );
}

export default FloatingWhatsApp;
