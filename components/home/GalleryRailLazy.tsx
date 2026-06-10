'use client';

import dynamic from 'next/dynamic';

/**
 * Client-wrapper die GalleryRail (embla) pas na hydration laadt — de rail
 * staat ruim onder de fold en embla hoort niet in de First-Load-bundle.
 * Placeholder reserveert hoogte zodat er geen layout-shift optreedt.
 */
const GalleryRail = dynamic(() => import('@/components/home/GalleryRail'), {
  ssr: false,
  loading: () => (
    <div
      className="bg-black border-t border-white/[0.07]"
      style={{ minHeight: '60vh' }}
      aria-hidden
    />
  ),
});

export default function GalleryRailLazy() {
  return <GalleryRail />;
}
