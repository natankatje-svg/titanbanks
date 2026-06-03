import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
    // AVIF/WebP first: next/image serveert deze automatisch i.p.v. de zware
    // bron-PNG/JPG. AVIF eerst (kleinst), WebP als fallback.
    formats: ['image/avif', 'image/webp'],
    // Breakpoints afgestemd op de layout (mobiel → desktop) zodat het
    // optimizer-srcset geen onnodig grote varianten genereert.
    deviceSizes: [360, 640, 768, 1024, 1280, 1600, 1920],
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
