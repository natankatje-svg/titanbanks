import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const BASE_URL = 'https://titan-banks.com';

interface RouteSpec {
  /** Pad zonder leading slash en zonder locale-prefix. Lege string = homepage. */
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  /**
   * Of de page-file daadwerkelijk al bestaat. Wanneer false: route staat al
   * in sitemap (voor hreflang-consistentie) maar nog niet bezoekbaar tot
   * Day 4-6 implementatie. Tijdens deze fase staat site achter Basic Auth.
   */
  exists: boolean;
}

const routes: RouteSpec[] = [
  { path: '', priority: 1.0, changeFrequency: 'weekly', exists: true },
  { path: 'shop', priority: 0.95, changeFrequency: 'weekly', exists: true },
  { path: 'products', priority: 0.85, changeFrequency: 'monthly', exists: true },
  { path: 'technology', priority: 0.8, changeFrequency: 'monthly', exists: true },
  { path: 'in-use', priority: 0.7, changeFrequency: 'monthly', exists: true },
  { path: 'story', priority: 0.6, changeFrequency: 'monthly', exists: true },
  { path: 'mission', priority: 0.6, changeFrequency: 'monthly', exists: true },
  { path: 'reviews', priority: 0.5, changeFrequency: 'weekly', exists: true },
  { path: 'support', priority: 0.6, changeFrequency: 'monthly', exists: true },
  { path: 'contact', priority: 0.55, changeFrequency: 'monthly', exists: true },
  { path: 'faq', priority: 0.55, changeFrequency: 'monthly', exists: true },
  { path: 'legal/privacy', priority: 0.3, changeFrequency: 'yearly', exists: true },
  { path: 'legal/terms', priority: 0.3, changeFrequency: 'yearly', exists: true },
  { path: 'legal/policies', priority: 0.3, changeFrequency: 'yearly', exists: true },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Alleen bestaande routes in de live sitemap.xml — vermijdt 404's in Google
  // Search Console tijdens de Day 4-6 build-out.
  return routes
    .filter((r) => r.exists)
    .flatMap(({ path, priority, changeFrequency }) =>
      routing.locales.map((locale) => {
        const localePart = `/${locale}`;
        const pathPart = path ? `/${path}` : '';
        return {
          url: `${BASE_URL}${localePart}${pathPart}`,
          lastModified,
          changeFrequency,
          priority,
          alternates: {
            languages: Object.fromEntries(
              routing.locales.map((l) => [
                l,
                `${BASE_URL}/${l}${pathPart}`,
              ])
            ),
          },
        };
      })
    );
}
