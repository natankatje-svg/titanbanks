import { BRAND, SPECS, capacityLabel, portsLabel } from '@/lib/product-claims';

const product = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: `${BRAND.text} ${BRAND.product} — ${capacityLabel()} power bank`,
  description: `${capacityLabel()} power bank in matte black. ${portsLabel()}. LED-display met exact percentage, ingebouwde zaklamp. Tot ${SPECS.simultaneousDevices.value} devices tegelijk laden.`,
  brand: { '@type': 'Brand', name: BRAND.text },
  image: 'https://titan-banks.com/images/titanx/hero-never-at-0.png',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'EUR',
    availability: 'https://schema.org/PreOrder',
    url: 'https://titan-banks.com',
    seller: { '@type': 'Organization', name: BRAND.text },
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: `Hoe vaak laadt ${BRAND.product} mijn devices op?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${BRAND.product} heeft een capaciteit van ${capacityLabel()}. Voor de meeste smartphones meerdere volledige laadbeurten, voor tablets enkele en voor moderne laptops 1–2 keer via USB-C. Gebruik de Power Calculator voor een schatting per device.`,
      },
    },
    {
      '@type': 'Question',
      name: `Welke apparaten kan ${BRAND.product} opladen?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Vrijwel alle USB-apparaten: smartphones, tablets, laptops via USB-C, oordopjes, smartwatches, camera's en meer. Via ${portsLabel()} laad je tot ${SPECS.simultaneousDevices.value} devices tegelijk.`,
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
  sameAs: [],
};

export default function JsonLd() {
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
