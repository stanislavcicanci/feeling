import { ArrowDown, ArrowRight, Coffee, MapPin } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import { LOCALES } from '../locales';
import { Language } from '../types';

interface HeroProps {
  lang: Language;
}

export function Hero({ lang }: HeroProps) {
  const t = LOCALES[lang].hero;
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [imgError, setImgError] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', shouldReduceMotion ? '0%' : '16%']);
  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1.02, shouldReduceMotion ? 1.02 : 1.09]
  );

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-[#171310] text-white"
    >
      {/* Asymmetric Background Photo Composition (right-weighted on desktop, full on mobile) */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0 lg:left-[24%] will-change-transform"
      >
        {!imgError ? (
          <img
            src="/src/assets/images/hero_espresso_bar_1795260856003.jpg"
            alt={t.imageAlt}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#38251D] to-[#171310] flex items-center justify-center">
            <Coffee className="w-16 h-16 text-[#D9C9B7]/40" />
          </div>
        )}
      </motion.div>

      {/* Directional & Bottom Scrims for Seamless Blend + WCAG AA Contrast */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#171310] via-[#171310]/80 lg:via-[#171310]/55 to-[#171310]/20"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#171310]/90 via-transparent to-[#171310]/45"
      />

      {/* Vertical Editorial Label on Desktop Right Edge */}
      <div
        aria-hidden="true"
        className="hidden xl:flex absolute right-6 top-1/2 -translate-y-1/2 z-10 items-center gap-3 text-[11px] font-mono tracking-[0.25em] uppercase text-[#D9C9B7]/80"
        style={{ writingMode: 'vertical-rl' }}
      >
        <span>FEELING COFFEE · CHIȘINĂU</span>
      </div>

      {/* Top Spacer for Fixed Navbar */}
      <div className="h-20 sm:h-24" aria-hidden="true" />

      {/* Main Overlapping Editorial Typography Block */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 my-auto py-8 sm:py-12">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl space-y-6 sm:space-y-8"
        >
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-[#A77B55]" aria-hidden="true" />
            <p className="text-xs sm:text-sm font-medium tracking-[0.18em] uppercase text-[#D9C9B7]">
              {t.eyebrow}
            </p>
          </div>

          <h1
            className="font-serif font-medium tracking-tight text-white leading-[1.03]"
            style={{ fontSize: 'clamp(2.75rem, 6vw, 5.25rem)', textWrap: 'balance' }}
          >
            {t.headlineLine1}{' '}
            <em className="italic font-normal text-[#D9C9B7]">{t.headlineItalic}</em>{' '}
            {t.headlineLine2}
          </h1>

          <div className="h-px w-24 bg-[#D9C9B7]/35" aria-hidden="true" />

          <p className="text-base sm:text-xl text-[#F5F0E8]/90 leading-relaxed max-w-lg">
            {t.subtitle}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="#experience"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 min-h-[48px] text-sm sm:text-base font-semibold text-[#171310] bg-[#F5F0E8] hover:bg-white rounded-sm transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span>{t.discoverCta}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#locations"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] text-sm sm:text-base font-medium text-white bg-transparent hover:bg-white/10 border border-white/35 rounded-sm transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <MapPin className="w-4 h-4 text-[#D9C9B7]" />
              <span>{t.locationCta}</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Editorial Strip */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10">
        <div className="border-t border-white/15 pt-5 flex flex-wrap items-center justify-between gap-4">
          <a
            href="#about"
            className="inline-flex items-center gap-2.5 text-xs font-medium tracking-[0.18em] uppercase text-[#D9C9B7] hover:text-white transition-colors"
          >
            <span>{t.scrollLabel}</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>

          <p className="text-xs font-mono tracking-wide text-[#D9C9B7]/85">
            {t.editorialCaption}
          </p>
        </div>
      </div>
    </section>
  );
}
