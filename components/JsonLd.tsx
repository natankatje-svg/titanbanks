import { BRAND, SPECS, capacityLabel, portsLabel } from '@/lib/product-claims';
import { getLiveProduct } from '@/lib/ecwid-storefront';
import { BASE_URL } from '@/lib/seo';

// Product-beschrijving per locale. Het FAQPage-schema hieronder blijft NL omdat
// de zichtbare FAQ (components/FAQ.tsx) nog NL is op álle locales — Google eist
// dat FAQ-schema exact matcht met de zichtbare content. Zodra de FAQ vertaald is,
// moet ook faqSchema gelokaliseerd worden.
const PRODUCT_DESCRIPTION: Record<string, string> = {
  nl: `${capacityLabel()} power bank in matte black. ${portsLabel()}. LED-display met exact percentage, ingebouwde zaklamp. Tot ${SPECS.simultaneousDevices.value} devices tegelijk laden.`,
  en: `${capacityLabel()} power bank in matte black. 4× USB-A plus built-in USB-C and Lightning cables. LED display with exact percentage and a built-in flashlight. Charge up to ${SPECS.simultaneousDevices.value} devices at once.`,
  de: `${capacityLabel()} Powerbank in Mattschwarz. 4× USB-A plus integrierte USB-C- und Lightning-Kabel. LED-Display mit exaktem Prozentwert und integrierter Taschenlampe. Lade bis zu ${SPECS.simultaneousDevices.value} Geräte gleichzeitig.`,
};

/** Bouwt het Product-schema met LIVE prijs + voorraad uit Ecwid (E-2). */
function buildProductSchema(price: number, inStock: boolean, locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${BRAND.text} ${BRAND.product} — ${capacityLabel()} power bank`,
    description: PRODUCT_DESCRIPTION[locale] ?? PRODUCT_DESCRIPTION.nl,
    brand: { '@type': 'Brand', name: BRAND.text },
    // Schoon productbeeld (lichte achtergrond, product gecentreerd) — geschikt
    // voor rich results én Google Merchant Center.
    image: 'https://titan-banks.com/images/titanx/gallery/v2/studio-orangegel.webp',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      // Prijs LIVE uit Ecwid (getLiveProduct → fallback product-claims als down).
      ...(price > 0 ? { price: price.toFixed(2) } : {}),
      priceValidUntil: '2026-12-31',
      // Voorraad LIVE uit Ecwid: InStock vs OutOfStock o.b.v. inStock-flag.
      availability: inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      // Eén product → de homepage ís de productpagina (/shop is opgeheven).
      // Per-locale URL zodat de offer naar de juiste taalvariant wijst.
      url: `${BASE_URL}/${locale}`,
      seller: { '@type': 'Organization', name: BRAND.text },
      // Verzending — alleen NL hard gedeclareerd (gratis, zeker). Andere zones
      // ("tarief bij checkout") horen in de Merchant Center-verzendinstellingen,
      // niet in schema. Bron: lib/legal-content.ts → policies#shipping.
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: { '@type': 'MonetaryAmount', value: 0, currency: 'EUR' },
        shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'NL' },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          // Verwerking 1-3 werkdagen, transit 1-2 werkdagen (PostNL).
          handlingTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 3, unitCode: 'DAY' },
          transitTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 2, unitCode: 'DAY' },
        },
      },
      // Retour — 14 dagen herroepingsrecht; retourkosten voor koper (per post).
      // Bron: lib/legal-content.ts → policies#returns.
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'NL',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 14,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/ReturnShippingFees',
      },
    },
  };
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: `Hoe vaak laadt ${BRAND.product} mijn devices op?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${BRAND.product} heeft een capaciteit van ${capacityLabel()}. Voor de meeste smartphones meerdere volledige laadbeurten en voor tablets enkele.`,
      },
    },
    {
      '@type': 'Question',
      name: `Welke apparaten kan ${BRAND.product} opladen?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Vrijwel alle USB-apparaten: smartphones, tablets, oordopjes, smartwatches, camera's en meer. Via ${portsLabel()} laad je tot ${SPECS.simultaneousDevices.value} devices tegelijk.`,
      },
    },
    {
      '@type': 'Question',
      name: `Heeft ${BRAND.product} garantie?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Ja, ${SPECS.warrantyYears.value} jaar fabrieksgarantie op alle ${BRAND.text} producten.`,
      },
    },
    {
      '@type': 'Question',
      name: 'Hoe gebruik ik de ingebouwde zaklamp?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Houd de power-button kort ingedrukt om de zaklamp te activeren. De zaklamp werkt onafhankelijk van het opladen.',
      },
    },
  ],
};

// Organization + WebSite zijn naar components/SiteJsonLd.tsx verhuisd (in de
// root-layout) zodat ze op élke URL staan, niet alleen op de homepage.

export default async function JsonLd({ locale }: { locale: string }) {
  const live = await getLiveProduct();
  const product = buildProductSchema(live.priceEur, live.inStock, locale);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
