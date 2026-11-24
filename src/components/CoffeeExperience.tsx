import { Coffee } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { LOCALES } from '../locales';
import { Language } from '../types';

interface CoffeeExperienceProps {
  lang: Language;
}

export function CoffeeExperience({ lang }: CoffeeExperienceProps) {
  const t = LOCALES[lang].experience;
  const shouldReduceMotion = useReducedMotion();
  const [failedMap, setFailedMap] = useState<Record<string, boolean>>({});

  const categories = t.categories;

  return (
    <section
      id="experience"
      className="py-20 sm:py-28 bg-[#FFFFFF] border-y border-[#D9C9B7]/70 text-[#171310]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end border-b border-[#D9C9B7]/80 pb-8">
          <div className="lg:col-span-7 space-y-3">
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
          </div>

          <p className="lg:col-span-5 text-sm sm:text-base text-[#38251D] leading-relaxed lg:pb-1">
            {t.subtitle}
          </p>
        </div>

        {/* Tier 1: Asymmetric Feature Pair (Espresso 7 cols overlaid + Milk 5 cols staggered) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 01. Espresso — Wide Overlaid Photographic Panel */}
          <motion.article
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 group relative overflow-hidden rounded-sm border border-[#D9C9B7] bg-[#171310] aspect-[16/11]"
          >
            {!failedMap['espresso'] ? (
              <img
                src="/src/assets/images/exp_espresso_1795260856316.jpg"
                alt={categories.espresso.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={() => setFailedMap((p) => ({ ...p, espresso: true }))}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Coffee className="w-10 h-10 text-[#D9C9B7]" />
              </div>
            )}

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#171310]/85 via-[#171310]/20 to-transparent"
            />

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-white space-y-1.5">
              <div className="font-mono text-xs tracking-widest text-[#D9C9B7]">
                {categories.espresso.index}
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium">
                {categories.espresso.title}
              </h3>
              <p className="text-sm text-[#F5F0E8]/90 max-w-md leading-relaxed">
                {categories.espresso.description}
              </p>
            </div>
          </motion.article>

          {/* 02. Milk-based Coffee — Offset Portrait Frame */}
          <motion.article
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 lg:mt-10 group space-y-4"
          >
            <div className="overflow-hidden rounded-sm border border-[#D9C9B7] bg-[#F5F0E8] aspect-[4/4]">
              {!failedMap['milk'] ? (
                <img
                  src="/src/assets/images/exp_milk_coffee_1795260856776.jpg"
                  alt={categories.milk.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={() => setFailedMap((p) => ({ ...p, milk: true }))}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Coffee className="w-8 h-8 text-[#A77B55]" />
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-[#D9C9B7] flex items-baseline justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-serif text-2xl font-semibold text-[#171310]">
                  {categories.milk.title}
                </h3>
                <p className="text-sm text-[#38251D] leading-relaxed">
                  {categories.milk.description}
                </p>
              </div>
              <span className="font-mono text-xs text-[#A77B55] shrink-0">
                {categories.milk.index}
              </span>
            </div>
          </motion.article>
        </div>

        {/* Tier 2: Staggered 3-Column Vertical Trio (Pour-over, Cold Coffee, Matcha) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:pt-4 items-start">
          {(
            [
              {
                key: 'pourover',
                img: '/src/assets/images/exp_pourover_1795260856411.jpg',
                offsetClass: '',
              },
              {
                key: 'cold',
                img: '/src/assets/images/exp_cold_coffee_1795260856202.jpg',
                offsetClass: 'md:mt-8',
              },
              {
                key: 'matcha',
                img: '/src/assets/images/exp_matcha_pastry_1795260856538.jpg',
                offsetClass: 'md:mt-16',
              },
            ] as const
          ).map((item, idx) => {
            const copy = categories[item.key];
            return (
              <motion.article
                key={item.key}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: shouldReduceMotion ? 0 : idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`${item.offsetClass} group space-y-4`}
              >
                <div className="overflow-hidden rounded-sm border border-[#D9C9B7] bg-[#F5F0E8] aspect-[4/5]">
                  {!failedMap[item.key] ? (
                    <img
                      src={item.img}
                      alt={copy.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedMap((p) => ({ ...p, [item.key]: true }))
                      }
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Coffee className="w-8 h-8 text-[#A77B55]" />
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-[#D9C9B7] flex items-baseline justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#171310]">
                      {copy.title}
                    </h3>
                    <p className="text-sm text-[#38251D] leading-relaxed">
                      {copy.description}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-[#A77B55] shrink-0">
                    {copy.index}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
