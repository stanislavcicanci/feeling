import { ArrowRight, ExternalLink, Instagram, MapPin, Phone } from 'lucide-react';
import { BRAND_STATS } from '../data/brandStats';
import { LOCALES } from '../locales';
import { Language } from '../types';

interface ContactProps {
  lang: Language;
}

export function Contact({ lang }: ContactProps) {
  const t = LOCALES[lang].contact;

  return (
    <section
      id="contact"
      className="py-20 sm:py-28 bg-[#171310] text-[#F5F0E8] border-t border-[#38251D]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs tracking-widest text-[#A77B55]">
                {t.sectionIndex}
              </span>
              <span className="h-px w-8 bg-[#A77B55]" aria-hidden="true" />
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#D9C9B7]">
                {t.kicker}
              </p>
            </div>

            <h2
              className="font-serif font-medium text-white leading-[1.04] tracking-tight"
              style={{ fontSize: 'clamp(2.35rem, 4.4vw, 4rem)', textWrap: 'balance' }}
            >
              {t.headline}
            </h2>

            <p className="text-base sm:text-lg text-[#D9C9B7] leading-relaxed max-w-xl">
              {t.subtitle}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#locations"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 min-h-[48px] text-sm sm:text-base font-semibold text-[#171310] bg-[#F5F0E8] hover:bg-white rounded-sm transition-colors whitespace-nowrap shrink-0"
              >
                <span>{t.directionsBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={BRAND_STATS.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 min-h-[48px] text-sm sm:text-base font-medium text-white bg-transparent hover:bg-white/10 border border-[#D9C9B7]/35 rounded-sm transition-colors whitespace-nowrap shrink-0"
              >
                <span>{t.instagramBtn}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-[#38251D] pt-8 lg:pt-0 lg:pl-10 space-y-6">
            <div className="font-serif text-2xl font-medium text-white">
              Feeling Coffee
            </div>

            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-3 pb-4 border-b border-[#38251D]">
                <MapPin className="w-4 h-4 text-[#A77B55] mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#A77B55]">
                    {t.cityLabel}
                  </div>
                  <div className="mt-0.5 font-medium text-[#F5F0E8]">
                    {BRAND_STATS.city}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pb-4 border-b border-[#38251D]">
                <Phone className="w-4 h-4 text-[#A77B55] mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#A77B55]">
                    {t.phoneLabel}
                  </div>
                  <a
                    href={BRAND_STATS.phoneHref}
                    className="mt-0.5 inline-block font-mono text-base font-medium text-white hover:text-[#D9C9B7] transition-colors tabular-nums"
                  >
                    {BRAND_STATS.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Instagram className="w-4 h-4 text-[#A77B55] mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#A77B55]">
                    {t.instagramLabel}
                  </div>
                  <a
                    href={BRAND_STATS.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 inline-block font-medium text-white hover:text-[#D9C9B7] transition-colors"
                  >
                    {BRAND_STATS.instagramHandle}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
