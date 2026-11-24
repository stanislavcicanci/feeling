import { Coffee } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { BRAND_STATS } from '../data/brandStats';
import { LOCALES } from '../locales';
import { Language } from '../types';

interface AboutProps {
  lang: Language;
}

export function About({ lang }: AboutProps) {
  const t = LOCALES[lang].about;
  const shouldReduceMotion = useReducedMotion();
  const [largeError, setLargeError] = useState(false);
  const [smallError, setSmallError] = useState(false);

  return (
    <section id="about" className="py-20 sm:py-28 bg-[#F5F0E8] text-[#171310] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Top Editorial Header Spanning Full Width */}
        <div className="border-b border-[#D9C9B7] pb-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-3 flex items-center gap-3">
            <span className="font-mono text-xs tracking-widest text-[#A77B55]">
              {t.sectionIndex}
            </span>
            <span className="h-px w-8 bg-[#A77B55]" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[#38251D]">
              {t.kicker}
            </span>
          </div>

          <motion.h2
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-9 font-serif font-medium text-[#171310] leading-[1.05] tracking-tight"
            style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.85rem)', textWrap: 'balance' }}
          >
            {t.headline}
          </motion.h2>
        </div>

        {/* Asymmetric Magazine Composition: Arch Photo + Overlapping Inset + Prose & Monumental Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Layered Overlapping Photographic Composition */}
          <div className="lg:col-span-6 relative pb-12 sm:pb-16 pr-4 sm:pr-12">
            {/* Vertical Caption */}
            <div
              aria-hidden="true"
              className="hidden sm:block absolute -left-2 top-8 text-[10px] font-mono tracking-[0.26em] uppercase text-[#A77B55]"
              style={{ writingMode: 'vertical-rl' }}
            >
              {t.verticalLabel}
            </div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="sm:ml-6 overflow-hidden rounded-t-[180px] rounded-b-sm border border-[#D9C9B7] bg-[#38251D] aspect-[4/5] max-w-md"
            >
              {!largeError ? (
                <img
                  src="/assets/aistudio/image_a70ecaf7.png"
                  alt={t.largeImageAlt}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={() => setLargeError(true)}
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Coffee className="w-10 h-10 text-[#D9C9B7]/60" />
                </div>
              )}
            </motion.div>

            {/* Overlapping Foreground Craft Photograph */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 bottom-0 w-44 sm:w-60 aspect-[4/3] overflow-hidden rounded-sm border-[6px] border-[#F5F0E8] shadow-xl bg-[#D9C9B7]/40"
            >
              {!smallError ? (
                <img
                  src="/src/assets/images/about_roast_craft_1795260856013.jpg"
                  alt={t.smallImageAlt}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={() => setSmallError(true)}
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Coffee className="w-8 h-8 text-[#38251D]/50" />
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column: Editorial Prose + Monumental Network Numbers */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 lg:col-start-8 space-y-8"
          >
            <div className="space-y-5 text-base sm:text-lg text-[#38251D] leading-relaxed">
              <p className="first-letter:font-serif first-letter:text-4xl first-letter:font-semibold first-letter:text-[#171310] first-letter:mr-1.5 first-letter:float-left first-letter:leading-none">
                {t.paragraph1}
              </p>
              <p>{t.paragraph2}</p>
            </div>

            {/* Monumental Brand Statistics */}
            <div className="border-y border-[#D9C9B7] py-7 grid grid-cols-2 gap-6 divide-x divide-[#D9C9B7]">
              <div className="pr-4">
                <div
                  className="font-serif font-medium text-[#171310] leading-none tabular-nums"
                  style={{ fontSize: 'clamp(3.25rem, 6vw, 5rem)' }}
                >
                  {BRAND_STATS.openLocations}
                </div>
                <p className="mt-2.5 text-xs sm:text-sm font-medium text-[#38251D] leading-snug">
                  {t.statOpenLabel}
                </p>
              </div>

              <div className="pl-6">
                <div
                  className="font-serif font-medium text-[#A77B55] leading-none tabular-nums"
                  style={{ fontSize: 'clamp(3.25rem, 6vw, 5rem)' }}
                >
                  +{BRAND_STATS.comingSoonLocations}
                </div>
                <p className="mt-2.5 text-xs sm:text-sm font-medium text-[#38251D] leading-snug">
                  {t.statSoonLabel}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
