import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import type { Locale } from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'Missie | TITANBANKS',
  description: 'De missie achter TitanBanks — premium portable power voor mensen die niet stoppen.',
  alternates: { canonical: 'https://titan-banks.com/mission' },
};

export default async function MissionPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'mission' });
  const values = t.raw('values') as string[];

  return (
    <main className="relative bg-[#0A0A0A] text-[#F5F5F5] min-h-screen overflow-x-hidden">
      <Navigation />
      <section className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
        <div className="mb-5 flex items-center gap-3">
          <div className="w-6 h-px bg-[#FF6B00]" />
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#888888]">
            {t('eyebrow')}
          </span>
        </div>
        <h1
          className="font-display uppercase text-white mb-8"
          style={{ fontSize: 'clamp(2.6rem, 6.5vw, 5rem)', lineHeight: 0.92 }}
        >
          {t('title')}
        </h1>
        <p className="text-[#C0C0C0] text-base lg:text-lg leading-relaxed max-w-2xl mb-16">
          {t('intro')}
        </p>

        {/* Values */}
        <div className="border-t border-white/[0.06] pt-12 mb-16">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#888888] mb-6">
            {t('values_label')}
          </p>
          <ul className="space-y-5">
            {values.map((value, i) => (
              <li key={i} className="flex items-start gap-5">
                <span className="font-mono text-[#FF6B00] text-sm pt-1 min-w-[2rem]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-body text-[#D5D5D5] text-base lg:text-lg leading-relaxed">
                  {value}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Founder note */}
        <div className="border-t border-white/[0.06] pt-12">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#888888] mb-4">
            {t('founder_label')}
          </p>
          <p className="font-body text-[#B5B5B5] text-base lg:text-lg leading-relaxed max-w-2xl">
            {t('founder_body')}
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
