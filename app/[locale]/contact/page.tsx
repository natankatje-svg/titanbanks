import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ContactForm from '@/components/contact/ContactForm';
import { Mail, Clock, HelpCircle } from 'lucide-react';
import type { Locale } from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'Contact | TITANBANKS',
  description: 'Stuur ons een bericht — vragen over Titan X, bestellingen, garantie of samenwerking.',
  alternates: { canonical: 'https://titan-banks.com/contact' },
};

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return (
    <main className="relative bg-[#0A0A0A] text-[#F5F5F5] min-h-screen overflow-x-hidden">
      <Navigation />
      <section className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
        <div className="mb-5 flex items-center gap-3">
          <div className="w-6 h-px bg-[#FF6B00]" />
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
        <p className="text-[#C0C0C0] text-base lg:text-lg leading-relaxed max-w-2xl mb-14">
          {t('intro')}
        </p>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-start">
          {/* Form */}
          <div className="border border-white/[0.06] bg-white/[0.015] rounded-2xl p-6 md:p-8">
            <ContactForm />
          </div>

          {/* Side info */}
          <div className="space-y-6">
            <div className="border border-white/[0.06] rounded-xl p-5">
              <Mail className="w-5 h-5 text-[#FF6B00] mb-3" />
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#888888] mb-1">
                {t('direct_email_label')}
              </p>
              <a
                href="mailto:hello@titan-banks.com"
                className="font-body text-white hover:text-[#FF6B00] transition-colors"
              >
                hello@titan-banks.com
              </a>
            </div>

            <div className="border border-white/[0.06] rounded-xl p-5">
              <Clock className="w-5 h-5 text-[#0EB5C8] mb-3" />
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#888888] mb-1">
                {t('response_time_label')}
              </p>
              <p className="font-body text-white">{t('response_time_value')}</p>
            </div>

            <div className="border border-white/[0.06] rounded-xl p-5">
              <HelpCircle className="w-5 h-5 text-[#EAB308] mb-3" />
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#888888] mb-1">
                {t('support_alt_label')}
              </p>
              <p className="font-body text-[#A0A0A0] text-sm leading-relaxed">
                {t('support_alt_value')}
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
