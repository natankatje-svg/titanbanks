import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PageShell from '@/components/pulse/PageShell';
import EcwidCart from '@/components/EcwidCart';
import { buildAlternates } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';

const META: Record<string, { title: string; description: string }> = {
  nl: {
    title: 'Winkelwagen — TitanBanks',
    description:
      'Bekijk je winkelwagen en reken veilig af. Titan X — 50.000 mAh powerbank van TitanBanks.',
  },
  en: {
    title: 'Cart — TitanBanks',
    description:
      'Review your shopping cart and check out securely. Titan X — 50,000 mAh power bank by TitanBanks.',
  },
  de: {
    title: 'Warenkorb — TitanBanks',
    description:
      'Sieh dir deinen Warenkorb an und bezahle sicher. Titan X — 50.000 mAh Powerbank von TitanBanks.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = META[locale] ?? META.nl;
  return {
    title: copy.title,
    description: copy.description,
    alternates: buildAlternates(locale, 'cart'),
    // Een winkelwagen is per definitie geen indexeerbare landingspagina.
    robots: { index: false, follow: true },
  };
}

export default async function CartPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'cart' });

  return (
    <PageShell kicker={t('eyebrow')} title={t('title')} intro={t('intro')}>
      <section className="relative border-t border-white/[0.07] bg-[#080808] py-14 lg:py-20">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
          <EcwidCart />
        </div>
      </section>
    </PageShell>
  );
}
