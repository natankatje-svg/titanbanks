import type { Metadata } from 'next';
import LegalPage from '@/components/legal/LegalPage';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { getPoliciesContent } from '@/lib/legal-content';
import { buildPageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const doc = getPoliciesContent(locale);
  return buildPageMetadata({
    locale,
    path: 'legal/policies',
    title: `${doc.title} | TITANBANKS`,
    description: (doc.intro ?? doc.title).slice(0, 155),
  });
}

export default async function PoliciesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const document = getPoliciesContent(locale);
  return (
    <>
      <BreadcrumbJsonLd locale={locale} trail={[{ name: document.title, path: 'legal/policies' }]} />
      <LegalPage document={document} />
    </>
  );
}
