const product = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'TitanBanks Titan X Powerbank 50.000mAh',
  description:
    '50.000 mAh premium power bank with fast charging, smart LED display, two built-in retractable cables and a built-in LED flashlight. Charge up to six devices at once.',
  brand: { '@type': 'Brand', name: 'TitanBanks' },
  image: 'https://titan-banks.com/images/titanx/hero-never-at-0.png',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'EUR',
    availability: 'https://schema.org/PreOrder',
    url: 'https://titan-banks.com',
    seller: { '@type': 'Organization', name: 'TitanBanks' },
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
        text: 'De Titan X heeft een capaciteit van 50.000 mAh. Afhankelijk van het type smartphone kun je een moderne iPhone of Android gemiddeld 10–12 keer volledig opladen. Een tablet laad je 3–5 keer volledig op.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hoe werkt het fast charging systeem?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'De Titan X ondersteunt fast charging via de USB-C poort. Sluit een compatibel apparaat aan en de Titan X detecteert automatisch het juiste laadprotocol.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welke apparaten kan ik opladen met de Titan X?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'De Titan X is geschikt voor vrijwel alle USB-apparaten: smartphones, tablets, laptops via USB-C, Nintendo Switch, Bluetooth oordopjes, smartwatches, camera\'s en meer. Met 4 poorten en 2 ingebouwde retractable kabels laad je tot 6 apparaten tegelijk op.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hoe lang duurt het opladen van de Titan X zelf?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Via de USB-C ingang duurt een volledige oplaadcyclus gemiddeld 8–10 uur. Via een standaard USB-A charger duurt dit 12–16 uur.',
      },
    },
    {
      '@type': 'Question',
      name: 'Heeft de Titan X een garantie?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, alle TitanBanks producten worden geleverd met 2 jaar fabrieksgarantie.',
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
