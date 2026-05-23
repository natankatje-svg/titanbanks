import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
  },
  async redirects() {
    // 301-redirect alle pre-i18n URLs naar /nl/<route>.
    // /preview en /preview2 blijven op root (interne review-pagina's).
    const routes = [
      'shop',
      'technology',
      'calculator',
      'in-use',
      'story',
      'reviews',
      'support',
    ];
    const redirects = routes.map((path) => ({
      source: `/${path}`,
      destination: `/nl/${path}`,
      permanent: true,
    }));

    return [
      // Root → /nl
      { source: '/', destination: '/nl', permanent: true },
      // Legacy /privacy → /nl/legal/privacy
      { source: '/privacy', destination: '/nl/legal/privacy', permanent: true },
      ...redirects,
    ];
  },
};

export default withNextIntl(nextConfig);
