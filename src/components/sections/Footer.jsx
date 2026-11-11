import React from 'react';
import { ArrowUp, Phone, MapPin } from 'lucide-react';
import OfficialBrandEmblem from '../vectors/OfficialBrandEmblem';
import NajdiStar from '../vectors/NajdiStar';
import SaduFriezeDivider from '../vectors/SaduFriezeDivider';
import { BRAND_TOKENS } from '../../data/brandProtocol';

function TikTokIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

function InstagramIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function WhatsAppIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.79 14.01c-.24.68-1.41 1.3-1.95 1.38-.49.07-1.13.1-1.82-.12-.42-.13-.96-.31-1.65-.61-2.91-1.25-4.81-4.18-4.96-4.38-.15-.2-1.19-1.58-1.19-3.02 0-1.44.75-2.14 1.02-2.43.27-.29.59-.36.79-.36.2 0 .39 0 .56.01.18.01.42-.07.66.5.24.59.82 2.02.9 2.17.07.15.12.32.02.52-.1.2-.15.32-.29.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.61.17.29.77 1.27 1.65 2.06 1.14 1.01 2.09 1.33 2.39 1.48.29.15.47.12.64-.07.17-.2.74-.86.94-1.16.2-.3.4-.25.67-.15.27.1 1.73.82 2.02.97.3.15.49.22.56.34.07.12.07.71-.17 1.39z" />
    </svg>
  );
}

function HarajIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="4.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M8.2 10.5C9.4 9.1 11.4 8.7 13.6 9.3C14.7 9.6 15.5 9.8 16.4 9.8L14.1 13.2C13.5 14.1 12.1 14.9 10.4 14.9C8.5 14.9 7.3 13.8 7.3 12.2C7.3 11.6 7.6 11 8.2 10.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M7.5 16.6H16.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      name: 'واتساب',
      href: BRAND_TOKENS.socials.whatsapp,
      icon: WhatsAppIcon,
      title: 'تواصل معنا مباشرة عبر واتساب',
    },
    {
      name: 'إنستغرام',
      href: BRAND_TOKENS.socials.instagram,
      icon: InstagramIcon,
      title: 'تابعنا على إنستغرام',
    },
    {
      name: 'تيك توك',
      href: BRAND_TOKENS.socials.tiktok,
      icon: TikTokIcon,
      title: 'شاهد تغطياتنا على تيك توك',
    },
    {
      name: 'حراج',
      href: BRAND_TOKENS.socials.haraj,
      icon: HarajIcon,
      title: 'حسابنا المعتمد في منصة حراج',
    },
  ];

  return (
    <footer className="bg-navy-950 text-alabaster-cotton relative overflow-hidden border-t border-gold-royal/30">
      {/* Lightweight background radial lighting */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle 380px at 50% 0%, rgba(200, 155, 67, 0.06) 0%, transparent 70%)',
        }}
      />

      {/* Sadu Top Divider */}
      <div className="pt-8">
        <SaduFriezeDivider starCount={3} showLabel="الرياض — المملكة العربية السعودية" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Col 1 (Right): Brand Emblem & Vision (5 cols) */}
          <div className="md:col-span-5 space-y-4 text-right">
            <OfficialBrandEmblem
              variant="gold-on-navy"
              width={170}
              animatedSteam={false}
              includeSubtitle={false}
            />
            <h2 className="font-amiri text-2xl font-bold text-gold-champagne mt-2">
              ضِيَافَةُ الرَّوْقَانِ
            </h2>
            <p className="text-xs sm:text-sm font-tajawal text-alabaster-cotton/85 leading-relaxed max-w-md">
              خدمة متكاملة لتقديم القهوة السعودية الأصيلة والشاي والعود في حفلات الزفاف
              والمجالس والفعاليات في مدينة الرياض، بعناية تامة بالتفاصيل وحفاوة الاستقبال.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-tajawal text-gold-champagne">
              <NajdiStar size={12} color="#C89B43" />
              <span>من أفضل أنواع البن في المملكة • طاقم محترف بالزي الرسمي المعتمد</span>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-3 text-right">
            <h2 className="font-amiri text-lg font-bold text-gold-royal border-b border-gold-royal/20 pb-2">
              أقسام الموقع
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm font-tajawal text-alabaster-cotton/85">
              <li>
                <a href="#ceremony" className="inline-block py-1 hover:text-gold-champagne transition-colors duration-300">
                  طقوس الروقان وتقديم القهوة
                </a>
              </li>
              <li>
                <a href="#specifications" className="inline-block py-1 hover:text-gold-champagne transition-colors duration-300">
                  تجهيزات وأدوات الضيافة
                </a>
              </li>
              <li>
                <a href="#gallery" className="inline-block py-1 hover:text-gold-champagne transition-colors duration-300">
                  معرض الفعاليات والتغطيات
                </a>
              </li>
              <li>
                <a href="#concierge" className="inline-block py-1 hover:text-gold-champagne transition-colors duration-300">
                  حجز وتنسيق الضيافة
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Protocol Contacts & Social Platforms (4 cols) */}
          <div className="md:col-span-4 space-y-4 text-right">
            <h2 className="font-amiri text-lg font-bold text-gold-royal border-b border-gold-royal/20 pb-2">
              المراسلات والمنصات الرسمية
            </h2>
            <div className="space-y-2.5 text-xs sm:text-sm font-tajawal text-alabaster-cotton/85">
              <a
                href={`tel:${BRAND_TOKENS.phone.replace(/\s+/g, '')}`}
                aria-label={`الاتصال المباشر على ${BRAND_TOKENS.phoneDisplay}`}
                className="flex items-center gap-3 group"
              >
                <div className="w-7 h-7 rounded-full bg-navy-elevated flex items-center justify-center text-gold-royal border border-gold-royal/20 group-hover:border-gold-champagne transition-colors shrink-0">
                  <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-[10px] text-alabaster-cotton/80 block">الاتصال المباشر:</span>
                  <span className="font-montserrat font-bold text-gold-champagne group-hover:text-gold-light dir-ltr block text-right transition-colors">
                    {BRAND_TOKENS.phoneDisplay}
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-navy-elevated flex items-center justify-center text-gold-royal border border-gold-royal/20 shrink-0">
                  <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-[10px] text-alabaster-cotton/80 block">المقر الرئيسي:</span>
                  <span className="text-alabaster-cotton/95">
                    {BRAND_TOKENS.address}
                  </span>
                </div>
              </div>
            </div>

            {/* Social Media & Platforms Icons */}
            <div className="pt-3 border-t border-gold-royal/15">
              <span className="text-[11px] font-tajawal text-gold-royal font-bold block mb-2.5">
                تابعنا وتواصل معنا عبر منصاتنا المعتمدة:
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.title}
                      aria-label={social.title}
                      className="min-h-[44px] group inline-flex items-center gap-2 px-3.5 py-2 rounded-sm bg-navy-elevated/90 border border-gold-royal/35 text-gold-champagne hover:border-gold-champagne hover:bg-gradient-to-br hover:from-gold-dark/30 hover:to-gold-royal/20 hover:shadow-foil transition-all duration-300"
                    >
                      <Icon className="w-4 h-4 text-gold-royal group-hover:text-gold-champagne group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-[11px] font-tajawal font-bold">{social.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-gold-royal/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-tajawal text-alabaster-cotton/80">
          <div>
            <span>كافة الحقوق محفوظة لـ <strong>ضيافة الروقان</strong> © {new Date().getFullYear()}</span>
            <span className="mx-2">•</span>
            <span>الرياض — المملكة العربية السعودية</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gold-champagne/90">
              الهوية البصرية المعتمدة
            </span>
            <button
              onClick={scrollToTop}
              type="button"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-sm bg-navy-elevated border border-gold-royal/30 text-gold-champagne hover:bg-gold-royal/10 transition-colors"
              aria-label="العودة لأعلى الصفحة"
            >
              <ArrowUp className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
