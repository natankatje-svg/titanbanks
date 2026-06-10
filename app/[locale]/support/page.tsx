import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Mail, Shield, RefreshCcw, Package } from 'lucide-react';
import PageShell from '@/components/pulse/PageShell';
import FAQ from '@/components/FAQ';
import { SPECS, TBD, safe } from '@/lib/product-claims';
import { CONTACT_EMAIL } from '@/lib/brand-links';
import { buildPageMetadata } from '@/lib/seo';
import { Link } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';

const META: Record<string, { title: string; description: string }> = {
  nl: {
    title: 'Support & veelgestelde vragen — Titan X powerbank | TITANBANKS',
    description:
      'Antwoorden over de Titan X powerbank: opladen, garantie, retourneren en verzending. Kom je er niet uit? Mail info@titan-banks.com — we reageren snel.',
  },
  en: {
    title: 'Support & FAQ — Titan X power bank | TITANBANKS',
    description:
      'Answers about the Titan X power bank: charging, warranty, returns and shipping. Still stuck? Email info@titan-banks.com — we respond fast.',
  },
  de: {
    title: 'Support & häufige Fragen — Titan X Powerbank | TITANBANKS',
    description:
      'Antworten zur Titan X Powerbank: Laden, Garantie, Rückgabe und Versand. Nicht fündig geworden? Schreib an info@titan-banks.com — wir antworten schnell.',
  },
};

const HERO: Record<string, { kicker: string; title: string; accent: string; emailLabel: string }> = {
  nl: { kicker: 'Support', title: 'Hier helpen we', accent: 'je verder.', emailLabel: 'E-mail' },
  en: { kicker: 'Support', title: 'We are here', accent: 'to help.', emailLabel: 'Email' },
  de: { kicker: 'Support', title: 'Hier helfen wir', accent: 'dir weiter.', emailLabel: 'E-Mail' },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = META[locale] ?? META.nl;
  return buildPageMetadata({ locale, path: 'support', ...copy });
}

export default async function SupportPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'shipping_returns_warranty' });
  const tFaq = await getTranslations({ locale, namespace: 'faq_page' });
  const hero = HERO[locale] ?? HERO.nl;
  const returnDays = safe(TBD.returnPolicyDays);

  const tiles = [
    {
      icon: Mail,
      title: hero.emailLabel,
      body: CONTACT_EMAIL,
      href: `mailto:${CONTACT_EMAIL}`,
    },
    {
      icon: Shield,
      title: t('warranty_title', { years: SPECS.warrantyYears.value }),
      body: t('warranty_body'),
      legal: '/legal/policies' as const,
    },
    ...(returnDays && returnDays > 0
      ? [{
          icon: RefreshCcw,
          title: t('returns_title', { days: returnDays }),
          body: t('returns_body', { days: returnDays }),
          legal: '/legal/policies' as const,
        }]
      : []),
    {
      icon: Package,
      title: t('shipping_title'),
      body: t('shipping_body'),
      legal: '/legal/policies' as const,
    },
  ];

  return (
    <PageShell
      kicker={hero.kicker}
      title={hero.title}
      accent={hero.accent}
      intro={tFaq('intro')}
    >
      <section className="relative border-t border-white/[0.07] bg-[#080808] py-14 lg:py-20">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tiles.map((tile) => {
              const Icon = tile.icon;
              const inner = (
                <>
                  <Icon className="h-5 w-5 text-titan-accent" aria-hidden />
                  <p className="mt-4 font-body font-semibold leading-snug text-white">{tile.title}</p>
                  <p className="mt-1.5 font-body text-sm leading-relaxed text-[#9A9A9A]">{tile.body}</p>
                </>
              );
              return tile.href ? (
                <a
                  key={tile.title}
                  href={tile.href}
                  className="rounded-2xl border border-white/[0.1] bg-[#0C0C0C] p-6 transition-colors hover:border-titan-accent/50"
                >
                  {inner}
                </a>
              ) : (
                <Link
                  key={tile.title}
                  href={tile.legal ?? '/legal/policies'}
                  className="rounded-2xl border border-white/[0.1] bg-[#0C0C0C] p-6 transition-colors hover:border-titan-accent/50"
                >
                  {inner}
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <FAQ />
    </PageShell>
  );
}
