'use client';

import { useTranslations } from 'next-intl';

/**
 * MarqueeBand — brede safety-orange band met scrollend motto in Archivo Black
 * (bestaande motto-strings). Licht gekanteld voor het tape-gevoel.
 */
export default function MarqueeBand() {
  const t = useTranslations('hero');
  const phrase = `${t('motto_lead')} ${t('motto_accent')}`.toUpperCase();
  const line = Array(4).fill(phrase).join('  ◆  ');

  return (
    <div className="relative z-10 -my-3 overflow-hidden" aria-hidden>
      <div className="-rotate-1 bg-titan-accent py-2.5 shadow-[0_0_40px_rgba(255,140,0,0.25)]">
        <div className="ticker-track items-center" style={{ ['--ticker-dur' as string]: '40s' }}>
          {[0, 1].map((i) => (
            <span key={i} className="px-3 font-display text-xl uppercase leading-none text-[#080808] lg:text-2xl">
              {line}&nbsp;&nbsp;◆&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
