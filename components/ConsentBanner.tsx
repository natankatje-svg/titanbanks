'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { getConsent, setConsent } from '@/lib/consent';

// AP/AVG-eisen: accepteren en weigeren gelijkwaardig op de eerste laag,
// geen cookie-wall, keuze persistent. Analytics (GA4) laadt pas na 'granted'.
const COPY: Record<string, { body: string; accept: string; decline: string; privacy: string }> = {
  nl: {
    body: 'We gebruiken cookies alleen voor anonieme statistieken (Google Analytics), zodat we de site kunnen verbeteren. Geen advertentie-tracking.',
    accept: 'Accepteren',
    decline: 'Weigeren',
    privacy: 'Privacybeleid',
  },
  en: {
    body: 'We only use cookies for anonymous statistics (Google Analytics) to improve the site. No ad tracking.',
    accept: 'Accept',
    decline: 'Decline',
    privacy: 'Privacy policy',
  },
  de: {
    body: 'Wir verwenden Cookies nur für anonyme Statistiken (Google Analytics), um die Seite zu verbessern. Kein Werbe-Tracking.',
    accept: 'Akzeptieren',
    decline: 'Ablehnen',
    privacy: 'Datenschutz',
  },
};

export default function ConsentBanner() {
  const locale = useLocale();
  const [visible, setVisible] = useState(false);
  const copy = COPY[locale] ?? COPY.nl;

  // Pas na mount beslissen (localStorage bestaat niet op de server).
  useEffect(() => {
    setVisible(getConsent() === null);
  }, []);

  if (!visible) return null;

  const choose = (choice: 'granted' | 'denied') => {
    setConsent(choice);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie-voorkeuren"
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-white/[0.12] bg-[#0C0C0C]/97 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <p className="max-w-2xl font-body text-sm leading-relaxed text-[#C9C9C9]">
          {copy.body}{' '}
          <Link href="/legal/privacy" className="underline decoration-white/30 underline-offset-4 transition-colors hover:text-titan-accent">
            {copy.privacy}
          </Link>
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <button
            onClick={() => choose('denied')}
            className="rounded-full border border-white/[0.25] px-6 py-2.5 font-body text-sm font-600 text-white transition-colors hover:border-white/50"
          >
            {copy.decline}
          </button>
          <button
            onClick={() => choose('granted')}
            className="rounded-full bg-titan-accent px-6 py-2.5 font-body text-sm font-600 text-black transition-colors hover:bg-[#FFA033]"
          >
            {copy.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
