const product = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'TitanBanks Titan X Powerbank 50.000mAh',
  description:
    '50.000mAh premium powerbank met PD 22.5W fast charge, smart LED display, ingebouwde kabels en LED flashlight. Gebouwd voor reizigers, avonturiers en professionals.',
  brand: { '@type': 'Brand', name: 'TitanBanks' },
  image: 'https://www.titanbanks.nl/images/product-hero.jpg',
  offers: {
    '@type': 'Offer',
    price: '89.95',
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
    priceValidUntil: '2026-12-31',
    url: 'https://www.titanbanks.nl',
    seller: { '@type': 'Organization', name: 'TitanBanks' },
    hasMerchantReturnPolicy: {
      '@type': 'MerchantReturnPolicy',
      returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
      merchantReturnDays: 30,
    },
    shippingDetails: {
      '@type': 'OfferShippingDetails',
      shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'EUR' },
    },
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '2400',
    bestRating: '5',
    worstRating: '1',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Hoe vaak kan ik mijn telefoon opladen met de Titan X?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'De Titan X heeft een capaciteit van 50.000mAh. Afhankelijk van het type smartphone kun je een moderne iPhone of Android gemiddeld 10–12 keer volledig opladen. Een tablet laad je 3–5 keer volledig op.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is de Titan X toegestaan in het vliegtuig?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'De Titan X heeft een capaciteit van 185Wh. Lithium-accu\'s boven de 160Wh zijn bij de meeste luchtvaartmaatschappijen niet toegestaan aan boord. Check altijd de regels van jouw luchtvaartmaatschappij vóór vertrek.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hoe werkt het fast charging systeem?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'De Titan X ondersteunt Power Delivery (PD) 22.5W en Quick Charge (QC) 3.0. Via de USB-C poort detecteert de Titan X automatisch het snelste laadprotocol en geeft maximaal 22.5W af.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welke apparaten kan ik opladen met de Titan X?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'De Titan X is geschikt voor vrijwel alle USB-apparaten: smartphones (iPhone, Android), tablets (iPad, Samsung), laptops (via USB-C PD), Nintendo Switch, Bluetooth oordopjes, smartwatches, camera\'s en meer. Met 5 uitgangspoorten kun je tot 5 apparaten tegelijkertijd opladen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hoe lang duurt het opladen van de Titan X zelf?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Via de USB-C ingang (PD 22.5W input) duurt een volledige oplaadcyclus gemiddeld 8–10 uur. Via een standaard USB-A charger duurt dit 12–16 uur.',
      },
    },
    {
      '@type': 'Question',
      name: 'Heeft de Titan X een garantie?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, alle TitanBanks producten worden geleverd met 2 jaar fabrieksgarantie. Bij defecten die onder normale gebruiksomstandigheden ontstaan, zorgen wij voor gratis reparatie of vervanging.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hoe gebruik ik de ingebouwde LED flashlight?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Houd de powerknop 2 seconden ingedrukt. Eén keer drukken schakelt naar de lage stand, nogmaals naar hoog, en een derde keer activeert de SOS-knipperstand. Nog een keer drukken schakelt de flashlight uit.',
      },
    },
  ],
};

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'TitanBanks',
  url: 'https://www.titanbanks.nl',
  logo: 'https://www.titanbanks.nl/branding/logo-white-tight.png',
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
