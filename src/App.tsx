/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { About } from './components/About';
import { CoffeeExperience } from './components/CoffeeExperience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Instagram } from './components/Instagram';
import { Locations } from './components/Locations';
import { Menu } from './components/Menu';
import { Navbar } from './components/Navbar';
import { LOCALES } from './locales';
import { Language } from './types';

const STORAGE_KEY = 'feeling-coffee-language';

function getInitialLanguage(): Language {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'ro' || saved === 'ru' || saved === 'en') {
      return saved;
    }
  } catch {
    // Ignore storage access errors
  }
  return 'ro';
}

export default function App() {
  const [lang, setLang] = useState<Language>(getInitialLanguage);
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  useEffect(() => {
    const handleQuotaExceeded = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    const seo = LOCALES[lang].seo;
    document.title = seo.title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', seo.description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', seo.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', seo.description);

    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore storage access errors
    }
  }, [lang]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F0E8] text-[#171310]">
      {quotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}
      <Navbar lang={lang} onChangeLang={setLang} />
      <main className="flex-1">
        <Hero lang={lang} />
        <About lang={lang} />
        <CoffeeExperience lang={lang} />
        <Menu lang={lang} />
        <Locations lang={lang} />
        <Instagram lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} onChangeLang={setLang} />
    </div>
  );
}
