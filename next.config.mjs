import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // x-powered-by header weglaten: minder bytes per response, geen stack-leak.
  poweredByHeader: false,
  experimental: {
    // Barrel-imports (lucide-react ~1000 iconen, framer-motion) worden door
    // Next omgezet naar directe per-module imports. Zonder dit sleept één
    // `import { Icon } from 'lucide-react'` de hele barrel mee de client-bundle
    // in. Puur build-time transform — geen runtime- of visueel effect.
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  images: {
    // Ecwid product-media (CDN) — live listing-foto's uit de catalogus worden
    // server-side gelezen (lib/ecwid-storefront.ts) en via next/image getoond.
    remotePatterns: [
      { protocol: 'https', hostname: 'd2j6dbq0eux0bg.cloudfront.net' },
    ],
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
    const routes = ['technology', 'story', 'support'];
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
      // /shop is opgeheven (1 product → homepage = shoppagina). Eén hop, geen chain.
      { source: '/shop', destination: '/nl', permanent: true },
      { source: '/:locale(nl|en|de)/shop', destination: '/:locale', permanent: true },
      // Pagina-consolidatie (kernset): dunne pagina's gevouwen in story/support/home.
      { source: '/mission', destination: '/nl/story', permanent: true },
      { source: '/:locale(nl|en|de)/mission', destination: '/:locale/story', permanent: true },
      { source: '/faq', destination: '/nl/support', permanent: true },
      { source: '/:locale(nl|en|de)/faq', destination: '/:locale/support', permanent: true },
      { source: '/in-use', destination: '/nl', permanent: true },
      { source: '/:locale(nl|en|de)/in-use', destination: '/:locale', permanent: true },
      { source: '/products', destination: '/nl', permanent: true },
      { source: '/:locale(nl|en|de)/products', destination: '/:locale', permanent: true },
      { source: '/reviews', destination: '/nl', permanent: true },
      { source: '/:locale(nl|en|de)/reviews', destination: '/:locale', permanent: true },
      ...redirects,
    ];
  },
};

export default withNextIntl(nextConfig);
