'use client';

import dynamic from 'next/dynamic';

/**
 * Client-wrapper die PulseGallery (embla) pas na hydration laadt — de galerij
 * staat onder de fold en embla hoort niet in de First-Load-bundle.
 * Placeholder reserveert hoogte zodat er geen layout-shift optreedt.
 * (ssr:false mag niet rechtstreeks in de server-component page.)
 */
const PulseGallery = dynamic(() => import('@/components/pulse/PulseGallery'), {
  ssr: false,
  loading: () => (
    <div
      className="border-t border-white/[0.07] bg-[#080808]"
      style={{ minHeight: '70vh' }}
      aria-hidden
    />
  ),
});

export default function PulseGalleryLazy() {
  return <PulseGallery />;
}
