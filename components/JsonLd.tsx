import { BRAND, SPECS, capacityLabel, portsLabel } from '@/lib/product-claims';
import { SOCIALS, CONTACT_EMAIL } from '@/lib/brand-links';
import { getLiveProduct } from '@/lib/ecwid-storefront';

/** Bouwt het Product-schema met LIVE prijs + voorraad uit Ecwid (E-2). */
function buildProductSchema(price: number, inStock: boolean) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${BRAND.text} ${BRAND.product} — ${capacityLabel()} power bank`,
    description: `${capacityLabel()} power bank in matte black. ${portsLabel()}. LED-display met exact percentage, ingebouwde zaklamp. Tot ${SPECS.simultaneousDevices.value} devices tegelijk laden.`,
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
      url: 'https://titan-banks.com/nl',
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

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: BRAND.text,
  url: 'https://titan-banks.com',
  logo: 'https://titan-banks.com/branding/logo-white-tight.png',
  sameAs: [SOCIALS.instagram, SOCIALS.facebook],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: CONTACT_EMAIL,
    availableLanguage: ['nl', 'en', 'de'],
  },
};

export default async function JsonLd() {
  const live = await getLiveProduct();
  const product = buildProductSchema(live.priceEur, live.inStock);
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
    </>
  );
}
