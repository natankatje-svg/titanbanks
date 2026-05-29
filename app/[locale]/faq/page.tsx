import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';
import type { Locale } from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'FAQ | TITANBANKS',
  description: 'Veelgestelde vragen over Titan X — capaciteit, opladen, garantie en meer.',
  alternates: { canonical: 'https://titan-banks.com/faq' },
};

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faq_page' });

  return (
    <main className="relative bg-[#0A0A0A] text-[#F5F5F5] min-h-screen overflow-x-hidden">
      <Navigation />
      <section className="pt-32 pb-8 px-6 max-w-4xl mx-auto">
        <div className="mb-5 flex items-center gap-3">
          <div className="w-6 h-px bg-[#0EB5C8]" />
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#888888]">
            {t('eyebrow')}
          </span>
        </div>
        <h1
          className="font-display uppercase text-white mb-6"
          style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', lineHeight: 0.92 }}
        >
          {t('title')}
        </h1>
        <p className="text-[#C0C0C0] text-base lg:text-lg leading-relaxed max-w-2xl">
          {t('intro')}
        </p>
      </section>
      <FAQ />
      <Footer />
    </main>
  );
}
