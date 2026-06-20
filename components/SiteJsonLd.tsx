import { BRAND } from '@/lib/product-claims';
import { SOCIALS, CONTACT_EMAIL } from '@/lib/brand-links';
import { BASE_URL } from '@/lib/seo';

/**
 * Site-brede entiteit-schema's: Organization + WebSite. Worden in de root-layout
 * gerenderd zodat élke URL (niet alleen de homepage) de merk-entiteit declareert
 * — sterker signaal voor Google's Knowledge Graph en sitelinks. Het Product- en
 * FAQPage-schema blijft pagina-specifiek (zie components/JsonLd.tsx, alleen home).
 */
export default function SiteJsonLd({ locale }: { locale: string }) {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND.text,
    url: BASE_URL,
    logo: `${BASE_URL}/branding/logo-white-tight.png`,
    sameAs: [SOCIALS.instagram, SOCIALS.facebook],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: CONTACT_EMAIL,
      availableLanguage: ['nl', 'en', 'de'],
    },
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BRAND.wordmark,
    url: BASE_URL,
    inLanguage: locale,
    publisher: { '@type': 'Organization', name: BRAND.text },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
