import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { MENU_DRINKS, POUR_OVER_PROCESSING } from '../data/menu';
import { LOCALES } from '../locales';
import { Language, MenuCategoryId, MenuDrink } from '../types';

interface MenuProps {
  lang: Language;
}

const FEATURE_IMAGES: Record<MenuCategoryId, string> = {
  all: '/src/assets/images/exp_espresso_1795260856316.jpg',
  espresso: '/src/assets/images/exp_espresso_1795260856316.jpg',
  pourover: '/src/assets/images/exp_pourover_1795260856411.jpg',
  blended: '/src/assets/images/exp_cold_coffee_1795260856202.jpg',
};

export function Menu({ lang }: MenuProps) {
  const t = LOCALES[lang].menu;
  const shouldReduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<MenuCategoryId>('all');

  const espressoDrinks = MENU_DRINKS.filter((d) => d.category === 'espresso');
  const pourOverDrinks = MENU_DRINKS.filter((d) => d.category === 'pourover');
  const blendedDrinks = MENU_DRINKS.filter((d) => d.category === 'blended');

  const tabs: { id: MenuCategoryId; label: string }[] = [
    { id: 'all', label: t.tabs.all },
    { id: 'espresso', label: t.tabs.espresso },
    { id: 'pourover', label: t.tabs.pourover },
    { id: 'blended', label: t.tabs.blended },
  ];

  const renderDrinkRow = (drink: MenuDrink) => {
    const desc = t.drinks[drink.id as keyof typeof t.drinks];
    return (
      <li
        key={drink.id}
        className="py-3.5 border-b border-[#D9C9B7]/60 last:border-b-0 group"
      >
        <div className="flex items-baseline gap-3">
          <h4 className="font-serif text-lg sm:text-xl font-semibold text-[#171310] group-hover:text-[#A77B55] transition-colors shrink-0">
            {drink.name}
          </h4>
          <span
            aria-hidden="true"
            className="flex-1 border-b border-dotted border-[#D9C9B7] min-w-[20px]"
          />
          <span className="font-mono text-xs sm:text-sm font-medium text-[#38251D] tabular-nums whitespace-nowrap shrink-0">
            {drink.volume}
          </span>
        </div>
        {desc && (
          <p className="mt-1 text-xs sm:text-sm text-[#38251D]/80 leading-snug">
            {desc}
          </p>
        )}
      </li>
    );
  };

  const showEspresso = activeCategory === 'all' || activeCategory === 'espresso';
  const showPourOver = activeCategory === 'all' || activeCategory === 'pourover';
  const showBlended = activeCategory === 'all' || activeCategory === 'blended';

  return (
    <section id="menu" className="py-20 sm:py-28 bg-[#F5F0E8] text-[#171310]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Editorial Header + Sharp Tab Bar */}
        <div className="border-b border-[#D9C9B7] pb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
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

          <div
            role="group"
            aria-label="Menu category filter"
            className="flex flex-wrap items-center gap-1 p-1 bg-[#EBE3D6] border border-[#D9C9B7] rounded-sm w-fit"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3.5 py-1.5 min-h-[38px] text-xs sm:text-sm font-medium rounded-sm transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-[#171310] text-white'
                    : 'text-[#38251D] hover:text-[#171310]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Broadsheet Layout: Supporting Editorial Photo Strip + Menu Sheets */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Featured Photo & Processing Note */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-5">
            <div className="overflow-hidden rounded-sm border border-[#D9C9B7] bg-[#FFFFFF] aspect-[4/5] relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeCategory}
                  src={FEATURE_IMAGES[activeCategory]}
                  alt={t.headline}
                  initial={shouldReduceMotion ? false : { opacity: 0.4, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0.4 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </AnimatePresence>
            </div>

            <div className="bg-white border border-[#D9C9B7] rounded-sm p-5 space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#A77B55]">
                {t.processingTitle}
              </div>
              <p className="font-serif text-lg font-medium text-[#171310]">
                {POUR_OVER_PROCESSING.map((opt) => t.processingOptions[opt]).join(' · ')}
              </p>
              <p className="pt-2 border-t border-[#D9C9B7]/60 text-xs text-[#38251D]/85 leading-relaxed">
                {t.availabilityNote}
              </p>
            </div>
          </div>

          {/* Right Editorial Menu Broadsheet Columns */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {(showEspresso || showPourOver) && (
              <div className={`${!showBlended ? 'md:col-span-2' : ''} space-y-6`}>
                {showEspresso && (
                  <div className="bg-white border border-[#D9C9B7] rounded-sm p-6 sm:p-8">
                    <div className="flex items-baseline justify-between gap-4 pb-3 border-b-2 border-[#171310]">
                      <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#171310]">
                        {t.sections.espresso}
                      </h3>
                      <span className="font-mono text-xs text-[#A77B55]">01</span>
                    </div>
                    <ul className="mt-2">{espressoDrinks.map(renderDrinkRow)}</ul>
                  </div>
                )}

                {showPourOver && (
                  <div className="bg-white border border-[#D9C9B7] rounded-sm p-6 sm:p-8">
                    <div className="flex items-baseline justify-between gap-4 pb-3 border-b-2 border-[#171310]">
                      <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#171310]">
                        {t.sections.pourover}
                      </h3>
                      <span className="font-mono text-xs text-[#A77B55]">02</span>
                    </div>
                    <ul className="mt-2">{pourOverDrinks.map(renderDrinkRow)}</ul>
                  </div>
                )}
              </div>
            )}

            {showBlended && (
              <div
                className={`${
                  !showEspresso && !showPourOver ? 'md:col-span-2' : ''
                } bg-white border border-[#D9C9B7] rounded-sm p-6 sm:p-8`}
              >
                <div className="flex items-baseline justify-between gap-4 pb-3 border-b-2 border-[#171310]">
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#171310]">
                    {t.sections.blended}
                  </h3>
                  <span className="font-mono text-xs text-[#A77B55]">03</span>
                </div>
                <ul className="mt-2">{blendedDrinks.map(renderDrinkRow)}</ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
