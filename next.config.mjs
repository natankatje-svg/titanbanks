import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
    // AVIF/WebP first: next/image serveert deze automatisch i.p.v. de zware
    // bron-PNG/JPG. AVIF eerst (kleinst), WebP als fallback.
    formats: ['image/avif', 'image/webp'],
    // Breakpoints afgestemd op de layout (mobiel → desktop). Grote varianten
    // (2048/2560/3840) toegevoegd voor de full-bleed hero-foto op grote en
    // retina/4K-schermen — anders schaalt de browser 1920 op = wazig.
    deviceSizes: [360, 640, 768, 1024, 1280, 1600, 1920, 2048, 2560, 3840],
    imageSizes: [100, 200, 320, 480, 640],
  },
  async redirects() {
    // 301-redirect alle pre-i18n URLs naar /nl/<route>.
    // /preview en /preview2 blijven op root (interne review-pagina's).
    const routes = [
      'shop',
      'technology',
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
