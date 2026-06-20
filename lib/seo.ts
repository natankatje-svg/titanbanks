// =============================================
// SEO helper — locale-correcte metadata
// =============================================
// Lost de canonical-bug op: voorheen hardcodeden de pages één NL-canonical
// voor álle locales (EN/DE declareerden /nl = duplicate-content). Deze helper
// bouwt per-locale canonical + hreflang `languages` (incl. x-default) +
// OpenGraph/Twitter, zodat Google de juiste taalvariant indexeert.
// =============================================

import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { BRAND, capacityLabel } from '@/lib/product-claims';

export const BASE_URL = 'https://titan-banks.com';

/** Dedicated 1200×630 OG-render (scripts/make-og-image.mjs):
 *  logo links, goedgekeurde productfoto rechts op donker canvas. */
const OG_IMAGE = `${BASE_URL}/images/og-image.jpg`;

const OG_LOCALE: Record<string, string> = {
  nl: 'nl_NL',
  en: 'en_US',
  de: 'de_DE',
};

/**
 * Bouwt `alternates` voor een pad zonder locale-prefix.
 * @param locale actieve locale (nl/en/de)
 * @param path   pad zonder leading slash en zonder locale ('' = homepage, 'shop' = /shop)
 */
export function buildAlternates(locale: string, path = ''): Metadata['alternates'] {
  const suffix = path ? `/${path}` : '';
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = `${BASE_URL}/${l}${suffix}`;
  }
  languages['x-default'] = `${BASE_URL}/${routing.defaultLocale}${suffix}`;

  return {
    canonical: `${BASE_URL}/${locale}${suffix}`,
    languages,
  };
}

/**
 * Volledige per-locale page-metadata: title/description + canonical/hreflang
 * + OpenGraph + Twitter. Gebruik in `generateMetadata` van een page.
 */
export function buildPageMetadata({
  locale,
  path = '',
  title,
  description,
}: {
  locale: string;
  path?: string;
  title: string;
  description: string;
}): Metadata {
  const url = `${BASE_URL}/${locale}${path ? `/${path}` : ''}`;
  const ogAlt = `${BRAND.text} ${BRAND.product} — ${capacityLabel()} power bank`;

  return {
    title,
    description,
    alternates: buildAlternates(locale, path),
    openGraph: {
      type: 'website',
      url,
      siteName: BRAND.wordmark,
      title,
      description,
      locale: OG_LOCALE[locale] ?? OG_LOCALE.nl,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: ogAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}

// =============================================
// BreadcrumbList JSON-LD — gelokaliseerde kruimels per inner page
// =============================================
// Google toont breadcrumb rich results en gebruikt de trail om site-structuur
// te begrijpen. De homepage-kruimel wordt automatisch vooraan toegevoegd, dus
// pages geven alleen de diepere kruimel(s) mee.

/** Gelokaliseerd label voor de homepage-kruimel. */
const HOME_CRUMB: Record<string, string> = { nl: 'Home', en: 'Home', de: 'Startseite' };

export interface BreadcrumbItem {
  /** Zichtbare naam van de kruimel (matcht de page-titel/kicker). */
  name: string;
  /** Pad zonder locale-prefix ('' = homepage, 'technology' = /technology). */
  path: string;
}

/**
 * Bouwt het BreadcrumbList-schema voor een inner page. `trail` bevat alleen de
 * kruimels ná de homepage (die wordt automatisch als positie 1 toegevoegd).
 */
export function buildBreadcrumbJsonLd(locale: string, trail: BreadcrumbItem[]) {
  const items: BreadcrumbItem[] = [
    { name: HOME_CRUMB[locale] ?? HOME_CRUMB.nl, path: '' },
    ...trail,
  ];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}/${locale}${item.path ? `/${item.path}` : ''}`,
    })),
  };
}
