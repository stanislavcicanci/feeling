import { Language } from '../types';

interface LanguageSwitcherProps {
  lang: Language;
  onChangeLang: (lang: Language) => void;
  variant?: 'transparent' | 'solid' | 'dark';
}

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'ro', label: 'RO' },
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
];

export function LanguageSwitcher({
  lang,
  onChangeLang,
  variant = 'solid',
}: LanguageSwitcherProps) {
  const containerClasses =
    variant === 'transparent'
      ? 'bg-white/15 backdrop-blur-sm border border-white/25'
      : variant === 'dark'
        ? 'bg-[#261D18] border border-[#38251D]'
        : 'bg-[#EBE3D6] border border-[#D9C9B7]';

  return (
    <div
      role="group"
      aria-label="Language selector"
      className={`inline-flex items-center gap-0.5 p-1 rounded-lg ${containerClasses}`}
    >
      {LANGUAGES.map((item) => {
        const active = lang === item.code;
        let btnClass = '';
        if (variant === 'transparent') {
          btnClass = active
            ? 'bg-white text-[#171310] shadow-xs'
            : 'text-white/85 hover:text-white hover:bg-white/10';
        } else if (variant === 'dark') {
          btnClass = active
            ? 'bg-[#F5F0E8] text-[#171310]'
            : 'text-[#D9C9B7] hover:text-white';
        } else {
          btnClass = active
            ? 'bg-white text-[#171310] shadow-xs'
            : 'text-[#38251D] hover:text-[#171310]';
        }

        return (
          <button
            key={item.code}
            type="button"
            onClick={() => onChangeLang(item.code)}
            aria-pressed={active}
            className={`px-2.5 py-1 min-h-[34px] text-xs font-semibold tracking-wide rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A77B55] ${btnClass}`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
