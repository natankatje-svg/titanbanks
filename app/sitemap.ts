import type { MetadataRoute } from 'next';

const BASE_URL = 'https://titan-banks.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/shop', priority: 0.95, changeFrequency: 'weekly' },
    { path: '/technology', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/calculator', priority: 0.75, changeFrequency: 'monthly' },
    { path: '/in-use', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/story', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/reviews', priority: 0.5, changeFrequency: 'weekly' },
    { path: '/support', priority: 0.6, changeFrequency: 'monthly' },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
