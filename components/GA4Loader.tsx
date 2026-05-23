// Laadt GA4 alleen als NEXT_PUBLIC_GA4_MEASUREMENT_ID gezet is.
// Geen ID = geen script = geen tracking. Dat is bewust voor pre-launch en privacy.

import Script from 'next/script';

export default function GA4Loader() {
  const id = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
  if (!id) return null;

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
