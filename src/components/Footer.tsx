import { BRAND_STATS } from '../data/brandStats';
import { LOCALES } from '../locales';
import { Language } from '../types';
import { LanguageSwitcher } from './LanguageSwitcher';

interface FooterProps {
  lang: Language;
  onChangeLang: (lang: Language) => void;
}

export function Footer({ lang, onChangeLang }: FooterProps) {
  const tf = LOCALES[lang].footer;
  const tn = LOCALES[lang].nav;

  return (
    <footer className="bg-[#171310] text-[#F5F0E8] border-t border-[#38251D] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand */}
          <div className="md:col-span-5 space-y-3">
            <a
              href="#home"
              className="inline-flex items-center gap-2.5 text-white whitespace-nowrap"
            >
              <span
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#F5F0E8] text-[#171310]"
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M11.6 3.5C7.6 4.2 5.6 8 6.3 12.7c.5 3.5 2.7 6.1 5.3 6.9-1.2-3-1.3-6.8 0-10.6 1-2.9.8-4.5 0-5.5Zm1.4 0c1.2 3 1.3 6.8 0 10.6-1 2.9-.8 4.5 0 5.5 4-.7 6-4.5 5.3-9.2-.5-3.5-2.7-6.1-5.3-6.9Z" />
                </svg>
              </span>
              <span className="font-serif text-2xl font-medium tracking-tight">
                Feeling Coffee
              </span>
            </a>
            <p className="text-sm text-[#D9C9B7] leading-relaxed max-w-sm">
              {tf.description}
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#A77B55]">
              {tf.navTitle}
            </div>
            <nav aria-label="Footer navigation" className="flex flex-col space-y-2 text-sm text-[#D9C9B7]">
              <a href="#home" className="hover:text-white transition-colors w-fit">
                {tn.home}
              </a>
              <a href="#about" className="hover:text-white transition-colors w-fit">
                {tn.about}
              </a>
              <a href="#menu" className="hover:text-white transition-colors w-fit">
                {tn.menu}
              </a>
              <a href="#locations" className="hover:text-white transition-colors w-fit">
                {tn.locations}
              </a>
              <a href="#contact" className="hover:text-white transition-colors w-fit">
                {tn.contact}
              </a>
            </nav>
          </div>

          {/* Connect */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#A77B55]">
              {tf.connectTitle}
            </div>
            <div className="flex flex-col space-y-2 text-sm text-[#D9C9B7]">
              <span>{BRAND_STATS.city}</span>
              <a
                href={BRAND_STATS.phoneHref}
                className="font-mono tabular-nums hover:text-white transition-colors w-fit"
              >
                {BRAND_STATS.phoneDisplay}
              </a>
              <a
                href={BRAND_STATS.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors w-fit"
              >
                {BRAND_STATS.instagramHandle}
              </a>
            </div>
          </div>

          {/* Language Switcher */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#A77B55]">
              {tf.languageTitle}
            </div>
            <LanguageSwitcher lang={lang} onChangeLang={onChangeLang} variant="dark" />
          </div>
        </div>

        <div className="pt-6 border-t border-[#38251D] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#D9C9B7]/80">
          <p>{tf.copyright}</p>
          <p className="font-mono tabular-nums">Chișinău · Moldova</p>
        </div>
      </div>
    </footer>
  );
}
