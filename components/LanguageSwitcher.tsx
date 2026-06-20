'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname, routing, type Locale } from '@/i18n/routing';

const LOCALE_LABEL: Record<Locale, string> = {
  nl: 'NL',
  en: 'EN',
  de: 'DE',
};

const LOCALE_FULL: Record<Locale, string> = {
  nl: 'Nederlands',
  en: 'English',
  de: 'Deutsch',
};

interface LanguageSwitcherProps {
  /** "compact" toont enkel "NL/EN/DE" code; "full" toont vlag + volle naam. */
  variant?: 'compact' | 'full';
}

export default function LanguageSwitcher({ variant = 'compact' }: LanguageSwitcherProps) {
  const t = useTranslations('navigation');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  const switchTo = (nextLocale: Locale) => {
    setOpen(false);
    // next-intl router.push behoudt het huidige pathname maar wisselt locale.
    router.push(pathname, { locale: nextLocale });
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={t('language')}
        aria-expanded={open}
        className="flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[#A0A0A0] hover:text-white transition-colors"
      >
        <Globe className="w-3.5 h-3.5" />
        <span>{variant === 'full' ? LOCALE_FULL[locale] : LOCALE_LABEL[locale]}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 min-w-[120px] rounded-lg overflow-hidden z-50"
          style={{
            background: 'rgba(12,12,12,0.97)',
            border: '1px solid rgba(255,255,255,0.09)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
          }}
        >
          {routing.locales.map((l) => {
            const active = l === locale;
            return (
              <button
                key={l}
                onClick={() => switchTo(l)}
                aria-current={active ? 'true' : undefined}
                className={`w-full px-3 py-2 text-left flex items-center justify-between gap-3 hover:bg-white/[0.04] transition-colors ${
                  active ? 'text-white' : 'text-[#A0A0A0]'
                }`}
              >
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em]">
                  {LOCALE_LABEL[l]}
                </span>
                <span className="font-body text-xs">
                  {LOCALE_FULL[l]}
                </span>
                {active && (
                  <span className="w-1 h-1 rounded-full bg-[#FF8C00]" aria-hidden />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
