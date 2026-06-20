import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Mail, Clock, HelpCircle, Instagram, Facebook } from 'lucide-react';
import PageShell from '@/components/pulse/PageShell';
import ContactForm from '@/components/contact/ContactForm';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { CONTACT_EMAIL, SOCIALS } from '@/lib/brand-links';
import { buildPageMetadata } from '@/lib/seo';
import { Link } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';

const META: Record<string, { title: string; description: string }> = {
  nl: {
    title: 'Contact — TitanBanks | vragen over de Titan X powerbank',
    description:
      'Vragen over de Titan X powerbank, je bestelling, garantie of samenwerking? Mail info@titan-banks.com of stuur een bericht — reactie binnen 1-2 werkdagen.',
  },
  en: {
    title: 'Contact — TitanBanks | questions about the Titan X power bank',
    description:
      'Questions about the Titan X power bank, your order, warranty or partnerships? Email info@titan-banks.com or send a message — reply within 1-2 business days.',
  },
  de: {
    title: 'Kontakt — TitanBanks | Fragen zur Titan X Powerbank',
    description:
      'Fragen zur Titan X Powerbank, deiner Bestellung, Garantie oder Kooperationen? Schreib an info@titan-banks.com — Antwort innerhalb von 1-2 Werktagen.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = META[locale] ?? META.nl;
  return buildPageMetadata({ locale, path: 'contact', ...copy });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return (
    <PageShell kicker={t('eyebrow')} title={t('title')} intro={t('intro')}>
      <BreadcrumbJsonLd locale={locale} trail={[{ name: t('eyebrow'), path: 'contact' }]} />
      <section className="relative border-t border-white/[0.07] bg-[#080808] py-14 lg:py-20">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="grid items-start gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            {/* formulier */}
            <div className="rounded-2xl border border-white/[0.1] bg-[#0C0C0C] p-6 md:p-8">
              <ContactForm />
            </div>

            {/* zijinfo */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/[0.1] bg-[#0C0C0C] p-6">
                <Mail className="h-5 w-5 text-titan-accent" aria-hidden />
                <p className="mt-4 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white/55">
                  {t('direct_email_label')}
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="mt-1 inline-block font-body text-white transition-colors hover:text-titan-accent"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>

              <div className="rounded-2xl border border-white/[0.1] bg-[#0C0C0C] p-6">
                <Clock className="h-5 w-5 text-titan-accent" aria-hidden />
                <p className="mt-4 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white/55">
                  {t('response_time_label')}
                </p>
                <p className="mt-1 font-body text-white">{t('response_time_value')}</p>
              </div>

              <div className="rounded-2xl border border-white/[0.1] bg-[#0C0C0C] p-6">
                <HelpCircle className="h-5 w-5 text-titan-accent" aria-hidden />
                <p className="mt-4 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white/55">
                  {t('support_alt_label')}
                </p>
                <p className="mt-1 font-body text-sm leading-relaxed text-[#A0A0A0]">
                  <Link href="/support" className="underline decoration-white/30 underline-offset-4 transition-colors hover:text-titan-accent hover:decoration-titan-accent/60">
                    {t('support_alt_value')}
                  </Link>
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.1] bg-[#0C0C0C] p-6">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white/55">Social</p>
                <div className="mt-3 flex items-center gap-3">
                  <a href={SOCIALS.instagram} target="_blank" rel="noopener" aria-label="TitanBanks op Instagram" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1] text-[#9A9A9A] transition-colors hover:border-titan-accent/50 hover:text-titan-accent">
                    <Instagram className="h-4 w-4" aria-hidden />
                  </a>
                  <a href={SOCIALS.facebook} target="_blank" rel="noopener" aria-label="TitanBanks op Facebook" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1] text-[#9A9A9A] transition-colors hover:border-titan-accent/50 hover:text-titan-accent">
                    <Facebook className="h-4 w-4" aria-hidden />
                  </a>
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#A0A0A0]">@thetitanbanks</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
