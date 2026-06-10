'use client';

// Laadt GA4 alleen als (1) NEXT_PUBLIC_GA4_MEASUREMENT_ID gezet is én
// (2) de bezoeker via de cookiebanner expliciet 'granted' heeft gekozen
// (basic Consent Mode v2: vóór toestemming wordt er niets geladen/gezet).
// Advertentie-signalen blijven altijd denied — we doen alleen statistiek.

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { getConsent, CONSENT_EVENT, type ConsentChoice } from '@/lib/consent';

export default function GA4Loader() {
  const id = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
  const [consent, setConsentState] = useState<ConsentChoice | null>(null);

  useEffect(() => {
    setConsentState(getConsent());
    const onChange = (e: Event) => setConsentState((e as CustomEvent<ConsentChoice>).detail);
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  if (!id || consent !== 'granted') return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            analytics_storage: 'granted',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
          });
          gtag('js', new Date());
          gtag('config', '${id}', {
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure',
          });
        `}
      </Script>
    </>
  );
}
