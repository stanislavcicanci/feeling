import { Coffee, ExternalLink, Instagram as InstagramIcon } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { BRAND_STATS } from '../data/brandStats';
import { LOCALES } from '../locales';
import { Language } from '../types';

interface InstagramProps {
  lang: Language;
}

const INSTAGRAM_PHOTOS = [
  '/assets/aistudio/image_a70ecaf7.png',
  '/src/assets/images/exp_milk_coffee_1795260856776.jpg',
  '/src/assets/images/exp_espresso_1795260856316.jpg',
  '/src/assets/images/exp_pourover_1795260856411.jpg',
  '/src/assets/images/exp_cold_coffee_1795260856202.jpg',
  '/src/assets/images/exp_matcha_pastry_1795260856538.jpg',
];

export function Instagram({ lang }: InstagramProps) {
  const t = LOCALES[lang].instagram;
  const shouldReduceMotion = useReducedMotion();
  const [failedIdx, setFailedIdx] = useState<Record<number, boolean>>({});

  return (
    <section id="instagram" className="py-20 sm:py-28 bg-[#F5F0E8] text-[#171310]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="border-b border-[#D9C9B7] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl space-y-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs tracking-widest text-[#A77B55]">
                {t.sectionIndex}
              </span>
              <span className="h-px w-8 bg-[#A77B55]" aria-hidden="true" />
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#38251D]">
                {t.kicker}
              </p>
            </div>
            <h2
              className="font-serif font-medium text-[#171310] leading-[1.06] tracking-tight"
              style={{ fontSize: 'clamp(2.1rem, 3.8vw, 3.35rem)', textWrap: 'balance' }}
            >
              {t.headline}
            </h2>
            <p className="text-sm sm:text-base text-[#38251D] leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          <a
            href={BRAND_STATS.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-5 py-3 min-h-[44px] text-sm font-semibold text-white bg-[#171310] hover:bg-[#38251D] rounded-sm transition-colors whitespace-nowrap shrink-0 w-fit"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>{t.followCta}</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>

        {/* Staggered editorial 6-photo gallery */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:pb-6">
          {INSTAGRAM_PHOTOS.map((src, idx) => (
            <motion.a
              key={src}
              href={BRAND_STATS.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.45,
                delay: shouldReduceMotion ? 0 : idx * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`group relative aspect-[3/4] overflow-hidden rounded-sm border border-[#D9C9B7] bg-[#EBE3D6] block ${
                idx % 2 === 1 ? 'lg:translate-y-5' : ''
              }`}
            >
              {!failedIdx[idx] ? (
                <img
                  src={src}
                  alt={t.photoAlts[idx] ?? 'Feeling Coffee'}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={() => setFailedIdx((prev) => ({ ...prev, [idx]: true }))}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Coffee className="w-6 h-6 text-[#A77B55]" />
                </div>
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
