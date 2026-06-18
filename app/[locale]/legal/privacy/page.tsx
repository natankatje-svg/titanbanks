import type { Metadata } from 'next';
import LegalPage from '@/components/legal/LegalPage';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { getPrivacyContent } from '@/lib/legal-content';
import { buildPageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const doc = getPrivacyContent(locale);
  return buildPageMetadata({
    locale,
    path: 'legal/privacy',
    title: `${doc.title} | TITANBANKS`,
    description: (doc.intro ?? doc.title).slice(0, 155),
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const document = getPrivacyContent(locale);
  return (
    <>
      <BreadcrumbJsonLd locale={locale} trail={[{ name: document.title, path: 'legal/privacy' }]} />
      <LegalPage document={document} />
    </>
  );
}
