import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { LOCALES } from '../locales';
import { Language } from '../types';
import { LanguageSwitcher } from './LanguageSwitcher';

interface NavbarProps {
  lang: Language;
  onChangeLang: (lang: Language) => void;
}

export function Navbar({ lang, onChangeLang }: NavbarProps) {
  const t = LOCALES[lang].nav;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: t.home },
    { href: '#about', label: t.about },
    { href: '#menu', label: t.menu },
    { href: '#locations', label: t.locations },
    { href: '#contact', label: t.contact },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-200 ${
        scrolled || mobileOpen
          ? 'bg-[#F5F0E8]/95 backdrop-blur-md border-b border-[#D9C9B7] text-[#171310]'
          : 'bg-gradient-to-b from-[#171310]/65 to-transparent text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-6 lg:gap-8">
        {/* Brand Wordmark */}
        <a
          href="#home"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A77B55]"
        >
          <span
            className={`inline-flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
              scrolled || mobileOpen ? 'bg-[#171310] text-[#F5F0E8]' : 'bg-white text-[#171310]'
            }`}
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M11.6 3.5C7.6 4.2 5.6 8 6.3 12.7c.5 3.5 2.7 6.1 5.3 6.9-1.2-3-1.3-6.8 0-10.6 1-2.9.8-4.5 0-5.5Zm1.4 0c1.2 3 1.3 6.8 0 10.6-1 2.9-.8 4.5 0 5.5 4-.7 6-4.5 5.3-9.2-.5-3.5-2.7-6.1-5.3-6.9Z" />
            </svg>
          </span>
          <span className="font-serif text-xl sm:text-2xl font-semibold tracking-tight">
            Feeling Coffee
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium underline-offset-4 hover:underline transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A77B55] ${
                scrolled ? 'text-[#38251D] hover:text-[#171310]' : 'text-white/90 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Language Switcher & Mobile Menu Button */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:block">
            <LanguageSwitcher
              lang={lang}
              onChangeLang={onChangeLang}
              variant={scrolled || mobileOpen ? 'solid' : 'transparent'}
            />
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? t.closeMenuLabel : t.openMenuLabel}
            className={`md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border transition-colors cursor-pointer ${
              scrolled || mobileOpen
                ? 'border-[#D9C9B7] bg-white text-[#171310]'
                : 'border-white/30 bg-white/10 text-white backdrop-blur-sm'
            }`}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Animated Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-t border-[#D9C9B7] bg-[#F5F0E8] px-4 py-4 space-y-4 shadow-lg"
          >
            <nav aria-label="Mobile" className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 min-h-[44px] flex items-center text-base font-medium text-[#171310] rounded-lg hover:bg-[#EBE3D6] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="pt-3 border-t border-[#D9C9B7] flex items-center justify-between">
              <LanguageSwitcher
                lang={lang}
                onChangeLang={(next) => {
                  onChangeLang(next);
                  setMobileOpen(false);
                }}
                variant="solid"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
