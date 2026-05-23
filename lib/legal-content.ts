/**
 * Structured legal content per locale.
 *
 * Pragmatische keuze: NL is volledig en bedoeld voor jurist-review. EN/DE zijn
 * werk-translations zodat alle drie locales een coherente legal-page tonen —
 * deze worden duidelijk gemarkeerd met een "preliminary translation" banner in
 * de UI tot een jurist per markt akkoord geeft.
 */

import type { Locale } from '@/i18n/routing';

export interface LegalSection {
  /** Anchor-id voor in-page navigatie (optional). */
  id?: string;
  heading: string;
  /** Paragraphs in volgorde. Ondersteunt inline markdown-stijl niet — gebruik <strong>/<em> in component zo nodig. */
  paragraphs?: string[];
  /** Bullet-list onder paragrafen. */
  list?: string[];
}

export interface LegalDocument {
  title: string;
  /** Eyebrow boven de h1 (bv. "Juridisch · Privacy"). */
  eyebrow: string;
  /** Korte intro-paragraaf onder de h1. */
  intro?: string;
  /** ISO-datum van laatste herziening, bv. "2026-05-23". */
  lastUpdated: string;
  /** Toon "Preliminary translation"-banner. */
  preliminaryTranslation?: boolean;
  /** Toon "Jurist-review pending"-banner. */
  juristReviewPending?: boolean;
  /** Optionele table-of-contents (gebruikt section.id's). */
  toc?: Array<{ id: string; label: string }>;
  sections: LegalSection[];
}

const LAST_UPDATED = '2026-05-23';

// ---------------------------------------------------------------------------
// PRIVACY
// ---------------------------------------------------------------------------

const privacyNL: LegalDocument = {
  title: 'Privacybeleid',
  eyebrow: 'Juridisch · Privacy',
  intro:
    'TitanBanks (handelsnaam van NamaCorp VOF) respecteert je privacy en verwerkt persoonsgegevens conform de Algemene Verordening Gegevensbescherming (AVG/GDPR). Op deze pagina lees je welke gegevens we verwerken, waarom, hoe lang en welke rechten je hebt.',
  lastUpdated: LAST_UPDATED,
  juristReviewPending: true,
  sections: [
    {
      heading: 'Wie is verantwoordelijk?',
      paragraphs: [
        'TitanBanks is een handelsnaam van NamaCorp VOF, gevestigd in Nederland. Vragen over privacy kun je richten aan hello@titan-banks.com.',
      ],
    },
    {
      heading: 'Welke persoonsgegevens verwerken wij?',
      paragraphs: [
        'Wij verwerken alleen persoonsgegevens die je zelf aan ons verstrekt of die noodzakelijk zijn om onze diensten te leveren:',
      ],
      list: [
        'Contactgegevens: naam, e-mailadres, afleveradres en telefoonnummer.',
        'Bestelinformatie: gekochte producten, bestelhistorie en betaalstatus.',
        'Communicatie: berichten via het contactformulier of e-mail.',
        'Technische gegevens: IP-adres, browsertype en bezochte pagina\'s (zie cookies).',
      ],
    },
    {
      heading: 'Waarvoor gebruiken wij je gegevens?',
      paragraphs: [
        'Wij verwerken persoonsgegevens uitsluitend voor de volgende doelen:',
      ],
      list: [
        'Het uitvoeren van je bestelling, levering en after-sales support.',
        'Het afhandelen van garantieclaims en retouren.',
        'Het beantwoorden van vragen via e-mail of contactformulier.',
        'Het versturen van transactionele e-mails (orderbevestiging, verzending).',
        'Het verbeteren van onze website en marketing (geanonimiseerde analytics).',
        'Het voldoen aan wettelijke verplichtingen, zoals fiscale bewaarplicht.',
      ],
    },
    {
      heading: 'Rechtsgronden',
      paragraphs: [
        'Wij verwerken persoonsgegevens op basis van: (1) uitvoering van een overeenkomst (jouw bestelling), (2) wettelijke verplichting (boekhouding, belasting), (3) gerechtvaardigd belang (fraudepreventie, productverbetering), of (4) toestemming (marketing-e-mails, niet-essentiële cookies). Toestemming kun je te allen tijde intrekken.',
      ],
    },
    {
      heading: 'Bewaartermijnen',
      paragraphs: [
        'Wij bewaren persoonsgegevens niet langer dan noodzakelijk:',
      ],
      list: [
        'Bestelgegevens: 7 jaar (fiscale bewaarplicht).',
        'Klantcommunicatie: 2 jaar na laatste contact.',
        'Marketing-aanmeldingen: tot je je uitschrijft.',
        'Analytics: geanonimiseerd, 26 maanden.',
      ],
    },
    {
      heading: 'Delen met derden',
      paragraphs: [
        'Wij delen persoonsgegevens alleen met derden voor zover noodzakelijk voor de uitvoering van onze diensten of vanwege wettelijke verplichting. Verwerkers waarmee wij werken:',
      ],
      list: [
        'Vercel Inc. — hosting van titan-banks.com.',
        'Ecwid (Lightspeed) — e-commerce backend en orderafhandeling.',
        'Mailchimp (Intuit) — e-mailcommunicatie en nieuwsbrief.',
        'Cloudflare — DNS en bescherming tegen aanvallen.',
        'Betaaldienstverleners (Mollie / Stripe) — bij checkout.',
        'Bezorgdiensten (PostNL, DHL) — voor levering van bestellingen.',
      ],
    },
    {
      heading: 'Doorgifte buiten de EU',
      paragraphs: [
        'Sommige verwerkers (zoals Vercel en Mailchimp) zijn gevestigd in de Verenigde Staten. Doorgifte vindt plaats op basis van de EU Standard Contractual Clauses (SCC\'s) of equivalente passende waarborgen, conform de AVG.',
      ],
    },
    {
      heading: 'Cookies',
      paragraphs: [
        'Wij gebruiken functionele cookies voor de werking van de website en de winkelmand. Voor analytics en marketing-cookies vragen wij vooraf toestemming via de cookiebanner. Zie ook de cookie-sectie in het beleid op /legal/policies#cookies.',
      ],
    },
    {
      heading: 'Jouw rechten',
      paragraphs: [
        'Onder de AVG heb je het recht op:',
      ],
      list: [
        'Inzage in je persoonsgegevens.',
        'Rectificatie of verwijdering ("recht op vergetelheid").',
        'Beperking van de verwerking.',
        'Gegevensoverdraagbaarheid (dataportabiliteit).',
        'Bezwaar tegen verwerking op grond van gerechtvaardigd belang.',
        'Intrekking van toestemming.',
      ],

    },
    {
      heading: 'Hoe oefen je je rechten uit?',
      paragraphs: [
        'Stuur een e-mail naar hello@titan-banks.com met je verzoek. Wij reageren binnen 30 dagen. Ben je niet tevreden over hoe wij je verzoek behandelen, dan kun je een klacht indienen bij de Autoriteit Persoonsgegevens (autoriteitpersoonsgegevens.nl).',
      ],
    },
    {
      heading: 'Beveiliging',
      paragraphs: [
        'Wij nemen passende technische en organisatorische maatregelen om persoonsgegevens te beschermen tegen verlies, misbruik en ongeoorloofde toegang. Onze website draait op HTTPS en gevoelige systemen zijn beveiligd met 2FA.',
      ],
    },
    {
      heading: 'Wijzigingen',
      paragraphs: [
        'Wij kunnen dit privacybeleid van tijd tot tijd aanpassen. De meest recente versie staat altijd op deze pagina, met de herzieningsdatum bovenaan vermeld.',
      ],
    },
  ],
};

const privacyEN: LegalDocument = {
  title: 'Privacy Policy',
  eyebrow: 'Legal · Privacy',
  intro:
    'TitanBanks (a trade name of NamaCorp VOF) respects your privacy and processes personal data in accordance with the EU General Data Protection Regulation (GDPR). This page explains what data we process, why, how long, and what rights you have.',
  lastUpdated: LAST_UPDATED,
  juristReviewPending: true,
  preliminaryTranslation: true,
  sections: [
    {
      heading: 'Who is responsible?',
      paragraphs: [
        'TitanBanks is a trade name of NamaCorp VOF, established in the Netherlands. Privacy questions can be sent to hello@titan-banks.com.',
      ],
    },
    {
      heading: 'What personal data do we process?',
      paragraphs: [
        'We only process personal data that you provide to us or that is required to deliver our services:',
      ],
      list: [
        'Contact details: name, email, shipping address, phone number.',
        'Order information: products purchased, order history, payment status.',
        'Communication: messages sent via the contact form or email.',
        'Technical data: IP address, browser type, pages visited (see cookies).',
      ],
    },
    {
      heading: 'Why do we use your data?',
      paragraphs: [
        'We process personal data only for the following purposes:',
      ],
      list: [
        'Processing your order, delivery and after-sales support.',
        'Handling warranty claims and returns.',
        'Responding to questions via email or contact form.',
        'Sending transactional emails (order confirmation, shipping).',
        'Improving our website and marketing (anonymised analytics).',
        'Complying with legal obligations such as accounting retention.',
      ],
    },
    {
      heading: 'Legal grounds',
      paragraphs: [
        'We process personal data on the basis of: (1) performance of a contract (your order), (2) legal obligation (bookkeeping, tax), (3) legitimate interest (fraud prevention, product improvement), or (4) consent (marketing emails, non-essential cookies). Consent can be withdrawn at any time.',
      ],
    },
    {
      heading: 'Retention periods',
      list: [
        'Order data: 7 years (Dutch tax retention requirement).',
        'Customer communication: 2 years after last contact.',
        'Marketing sign-ups: until you unsubscribe.',
        'Analytics: anonymised, 26 months.',
      ],
    },
    {
      heading: 'Sharing with third parties',
      paragraphs: [
        'We only share personal data with third parties as necessary to deliver our services or to comply with the law. Processors we work with:',
      ],
      list: [
        'Vercel Inc. — hosting of titan-banks.com.',
        'Ecwid (Lightspeed) — e-commerce backend and order fulfilment.',
        'Mailchimp (Intuit) — email communication and newsletter.',
        'Cloudflare — DNS and protection against attacks.',
        'Payment providers (Mollie / Stripe) — at checkout.',
        'Carriers (PostNL, DHL) — for shipping orders.',
      ],
    },
    {
      heading: 'Transfers outside the EU',
      paragraphs: [
        'Some processors (such as Vercel and Mailchimp) are based in the United States. Transfers take place on the basis of the EU Standard Contractual Clauses (SCCs) or equivalent appropriate safeguards, in accordance with the GDPR.',
      ],
    },
    {
      heading: 'Cookies',
      paragraphs: [
        'We use functional cookies for the operation of the site and the shopping cart. For analytics and marketing cookies we ask consent in advance via the cookie banner. See also the cookie section in our policies at /legal/policies#cookies.',
      ],
    },
    {
      heading: 'Your rights',
      paragraphs: [
        'Under the GDPR you have the right to:',
      ],
      list: [
        'Access your personal data.',
        'Rectification or erasure ("right to be forgotten").',
        'Restriction of processing.',
        'Data portability.',
        'Object to processing based on legitimate interest.',
        'Withdraw consent.',
      ],
    },
    {
      heading: 'How do you exercise your rights?',
      paragraphs: [
        'Send an email to hello@titan-banks.com with your request. We respond within 30 days. If you are not satisfied with how we handle your request, you can lodge a complaint with the Dutch Data Protection Authority (autoriteitpersoonsgegevens.nl).',
      ],
    },
    {
      heading: 'Security',
      paragraphs: [
        'We take appropriate technical and organisational measures to protect personal data against loss, misuse and unauthorised access. Our website runs on HTTPS and sensitive systems are secured with 2FA.',
      ],
    },
    {
      heading: 'Changes',
      paragraphs: [
        'We may amend this privacy policy from time to time. The most recent version is always on this page, with the revision date at the top.',
      ],
    },
  ],
};

const privacyDE: LegalDocument = {
  title: 'Datenschutzerklärung',
  eyebrow: 'Rechtliches · Datenschutz',
  intro:
    'TitanBanks (eine Handelsmarke von NamaCorp VOF) respektiert deine Privatsphäre und verarbeitet personenbezogene Daten gemäß der EU-Datenschutz-Grundverordnung (DSGVO). Auf dieser Seite erfährst du, welche Daten wir verarbeiten, warum, wie lange und welche Rechte du hast.',
  lastUpdated: LAST_UPDATED,
  juristReviewPending: true,
  preliminaryTranslation: true,
  sections: [
    {
      heading: 'Wer ist verantwortlich?',
      paragraphs: [
        'TitanBanks ist eine Handelsmarke von NamaCorp VOF mit Sitz in den Niederlanden. Datenschutzanfragen können an hello@titan-banks.com gerichtet werden.',
      ],
    },
    {
      heading: 'Welche personenbezogenen Daten verarbeiten wir?',
      paragraphs: [
        'Wir verarbeiten nur personenbezogene Daten, die du uns selbst zur Verfügung stellst oder die für die Erbringung unserer Dienste notwendig sind:',
      ],
      list: [
        'Kontaktdaten: Name, E-Mail, Lieferadresse, Telefonnummer.',
        'Bestellinformationen: gekaufte Produkte, Bestellhistorie, Zahlungsstatus.',
        'Kommunikation: Nachrichten über das Kontaktformular oder per E-Mail.',
        'Technische Daten: IP-Adresse, Browser-Typ, besuchte Seiten (siehe Cookies).',
      ],
    },
    {
      heading: 'Wofür verwenden wir deine Daten?',
      list: [
        'Abwicklung deiner Bestellung, Lieferung und After-Sales-Support.',
        'Bearbeitung von Garantieansprüchen und Rückgaben.',
        'Beantwortung von Fragen per E-Mail oder Kontaktformular.',
        'Versand von transaktionalen E-Mails (Bestellbestätigung, Versand).',
        'Verbesserung unserer Website und unseres Marketings (anonymisierte Analytics).',
        'Erfüllung gesetzlicher Verpflichtungen wie steuerliche Aufbewahrungsfristen.',
      ],
    },
    {
      heading: 'Rechtsgrundlagen',
      paragraphs: [
        'Wir verarbeiten personenbezogene Daten auf folgender Grundlage: (1) Vertragserfüllung (deine Bestellung), (2) gesetzliche Verpflichtung (Buchhaltung, Steuer), (3) berechtigtes Interesse (Betrugsprävention, Produktverbesserung), oder (4) Einwilligung (Marketing-E-Mails, nicht-essenzielle Cookies). Die Einwilligung kann jederzeit widerrufen werden.',
      ],
    },
    {
      heading: 'Aufbewahrungsfristen',
      list: [
        'Bestelldaten: 7 Jahre (niederländische steuerliche Aufbewahrungspflicht).',
        'Kundenkommunikation: 2 Jahre nach letztem Kontakt.',
        'Marketing-Anmeldungen: bis zur Abmeldung.',
        'Analytics: anonymisiert, 26 Monate.',
      ],
    },
    {
      heading: 'Weitergabe an Dritte',
      paragraphs: [
        'Wir geben personenbezogene Daten nur an Dritte weiter, soweit dies für die Erbringung unserer Dienste oder aufgrund gesetzlicher Verpflichtungen erforderlich ist. Auftragsverarbeiter:',
      ],
      list: [
        'Vercel Inc. — Hosting von titan-banks.com.',
        'Ecwid (Lightspeed) — E-Commerce-Backend und Bestellabwicklung.',
        'Mailchimp (Intuit) — E-Mail-Kommunikation und Newsletter.',
        'Cloudflare — DNS und Schutz gegen Angriffe.',
        'Zahlungsdienstleister (Mollie / Stripe) — beim Checkout.',
        'Versanddienstleister (PostNL, DHL) — für die Lieferung.',
      ],
    },
    {
      heading: 'Übermittlung außerhalb der EU',
      paragraphs: [
        'Einige Auftragsverarbeiter (z.B. Vercel und Mailchimp) sind in den USA ansässig. Die Übermittlung erfolgt auf Grundlage der EU-Standardvertragsklauseln (SCCs) oder gleichwertiger geeigneter Garantien gemäß DSGVO.',
      ],
    },
    {
      heading: 'Cookies',
      paragraphs: [
        'Wir verwenden funktionale Cookies für den Betrieb der Website und des Warenkorbs. Für Analytics- und Marketing-Cookies holen wir vorab deine Zustimmung über das Cookie-Banner ein. Siehe auch den Cookie-Abschnitt unter /legal/policies#cookies.',
      ],
    },
    {
      heading: 'Deine Rechte',
      paragraphs: [
        'Nach der DSGVO hast du das Recht auf:',
      ],
      list: [
        'Auskunft über deine personenbezogenen Daten.',
        'Berichtigung oder Löschung ("Recht auf Vergessenwerden").',
        'Einschränkung der Verarbeitung.',
        'Datenübertragbarkeit.',
        'Widerspruch gegen Verarbeitung auf Grundlage berechtigter Interessen.',
        'Widerruf der Einwilligung.',
      ],
    },
    {
      heading: 'Wie machst du deine Rechte geltend?',
      paragraphs: [
        'Sende eine E-Mail an hello@titan-banks.com mit deiner Anfrage. Wir antworten innerhalb von 30 Tagen. Bist du mit der Bearbeitung nicht zufrieden, kannst du eine Beschwerde bei der niederländischen Datenschutzbehörde (autoriteitpersoonsgegevens.nl) einreichen.',
      ],
    },
    {
      heading: 'Sicherheit',
      paragraphs: [
        'Wir treffen geeignete technische und organisatorische Maßnahmen zum Schutz personenbezogener Daten vor Verlust, Missbrauch und unbefugtem Zugriff. Unsere Website läuft über HTTPS, sensible Systeme sind mit 2FA gesichert.',
      ],
    },
    {
      heading: 'Änderungen',
      paragraphs: [
        'Wir können diese Datenschutzerklärung von Zeit zu Zeit anpassen. Die aktuelle Fassung steht stets auf dieser Seite, mit Revisionsdatum oben.',
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// TERMS
// ---------------------------------------------------------------------------

const termsNL: LegalDocument = {
  title: 'Algemene voorwaarden',
  eyebrow: 'Juridisch · Voorwaarden',
  intro:
    'Deze algemene voorwaarden zijn van toepassing op elke overeenkomst tussen TitanBanks (NamaCorp VOF) en jou als consument via titan-banks.com.',
  lastUpdated: LAST_UPDATED,
  juristReviewPending: true,
  sections: [
    {
      heading: '1. Wie zijn wij?',
      paragraphs: [
        'TitanBanks is een handelsnaam van NamaCorp VOF, gevestigd in Nederland. Wij verkopen premium powerbanks rechtstreeks aan consumenten via titan-banks.com. Voor vragen zijn we bereikbaar via hello@titan-banks.com.',
      ],
    },
    {
      heading: '2. Toepasselijkheid',
      paragraphs: [
        'Deze voorwaarden zijn van toepassing op elk aanbod en op elke overeenkomst die op afstand wordt gesloten via titan-banks.com. Bij het plaatsen van een bestelling ga je akkoord met deze voorwaarden.',
      ],
    },
    {
      heading: '3. Aanbod en prijzen',
      paragraphs: [
        'Alle prijzen op titan-banks.com zijn vermeld in euro inclusief BTW, tenzij anders aangegeven. Verzendkosten worden bij checkout berekend. Wij behouden ons het recht voor om prijzen te wijzigen; de prijs op het moment van bestellen geldt.',
      ],
    },
    {
      heading: '4. Bestelling en totstandkoming overeenkomst',
      paragraphs: [
        'Een overeenkomst komt tot stand op het moment dat je een bestelling plaatst en wij deze schriftelijk bevestigen (per e-mail). Wij behouden ons het recht voor een bestelling zonder opgaaf van redenen te weigeren, bijvoorbeeld bij vermoeden van fraude of bij voorraadtekort.',
      ],
    },
    {
      heading: '5. Betaling',
      paragraphs: [
        'Betaling vindt plaats via de aangeboden methoden bij checkout (iDEAL, creditcard, Apple Pay, etc.). Alle transacties worden veilig verwerkt door onze betaalprovider; wij ontvangen geen kaartgegevens.',
      ],
    },
    {
      heading: '6. Levering',
      paragraphs: [
        'Wij streven ernaar bestellingen binnen 1-3 werkdagen na ontvangst van betaling te verzenden. Levertijden zijn indicatief; vertraging geeft geen recht op schadevergoeding tenzij sprake is van opzet of grove nalatigheid. Verzendkosten en bezorgduur per zone staan op /legal/policies#shipping.',
      ],
    },
    {
      heading: '7. Herroepingsrecht (14 dagen)',
      paragraphs: [
        'Je hebt het recht je bestelling binnen 14 dagen na ontvangst zonder opgaaf van redenen te herroepen. Het product moet ongebruikt en in originele verpakking zijn. De kosten van retourzending zijn voor jouw rekening, tenzij wij anders aangeven. Volledige procedure: /legal/policies#returns.',
      ],
    },
    {
      heading: '8. Garantie',
      paragraphs: [
        'Op de Titan X powerbank zit 2 jaar fabrieksgarantie bij normaal gebruik. Garantie dekt fabricage- en materiaalfouten, geen schade door val, water, ongeoorloofd openen of normale slijtage. Voor garantieclaims: hello@titan-banks.com. Zie ook /legal/policies#warranty.',
      ],
    },
    {
      heading: '9. Conformiteit',
      paragraphs: [
        'Wij garanderen dat producten voldoen aan de overeenkomst, de in het aanbod vermelde specificaties en aan redelijke eisen van deugdelijkheid en bruikbaarheid. Dit is een wettelijk recht en staat naast de fabrieksgarantie.',
      ],
    },
    {
      heading: '10. Aansprakelijkheid',
      paragraphs: [
        'Onze aansprakelijkheid is beperkt tot het factuurbedrag van de bestelling, behalve in geval van opzet of bewuste roekeloosheid. Wij zijn niet aansprakelijk voor indirecte schade, gevolgschade of gederfde winst.',
      ],
    },
    {
      heading: '11. Klachten',
      paragraphs: [
        'Heb je een klacht? Stuur deze binnen redelijke termijn per e-mail naar hello@titan-banks.com. Wij reageren binnen 14 dagen. Komen we er samen niet uit, dan kun je je geschil voorleggen aan het Europees ODR-platform (ec.europa.eu/consumers/odr) of de bevoegde rechter.',
      ],
    },
    {
      heading: '12. Toepasselijk recht',
      paragraphs: [
        'Op deze voorwaarden is uitsluitend Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in Nederland.',
      ],
    },
    {
      heading: '13. Wijzigingen',
      paragraphs: [
        'Wij behouden ons het recht voor deze voorwaarden te wijzigen. De geldende versie is altijd te raadplegen op titan-banks.com/legal/terms. Voor bestellingen geldt de versie die ten tijde van bestellen van kracht was.',
      ],
    },
  ],
};

const termsEN: LegalDocument = {
  title: 'Terms & Conditions',
  eyebrow: 'Legal · Terms',
  intro:
    'These terms and conditions apply to every agreement between TitanBanks (NamaCorp VOF) and you as a consumer via titan-banks.com.',
  lastUpdated: LAST_UPDATED,
  juristReviewPending: true,
  preliminaryTranslation: true,
  sections: [
    {
      heading: '1. Who we are',
      paragraphs: [
        'TitanBanks is a trade name of NamaCorp VOF, established in the Netherlands. We sell premium power banks directly to consumers via titan-banks.com. Contact us at hello@titan-banks.com.',
      ],
    },
    {
      heading: '2. Applicability',
      paragraphs: [
        'These terms apply to every offer and every distance-sales agreement concluded through titan-banks.com. By placing an order you agree to these terms.',
      ],
    },
    {
      heading: '3. Offer and prices',
      paragraphs: [
        'All prices on titan-banks.com are in euros including VAT, unless stated otherwise. Shipping costs are calculated at checkout. We reserve the right to change prices; the price at the moment of ordering applies.',
      ],
    },
    {
      heading: '4. Order and contract formation',
      paragraphs: [
        'A contract is formed at the moment you place an order and we confirm it in writing (by email). We reserve the right to refuse an order without giving reasons, for instance in case of suspected fraud or stock shortage.',
      ],
    },
    {
      heading: '5. Payment',
      paragraphs: [
        'Payment takes place via the methods offered at checkout (iDEAL, credit card, Apple Pay, etc.). All transactions are processed securely by our payment provider; we do not receive card details.',
      ],
    },
    {
      heading: '6. Delivery',
      paragraphs: [
        'We aim to ship orders within 1-3 business days after receipt of payment. Delivery times are indicative; delays do not give rise to claims for damages unless caused by intent or gross negligence. Shipping costs and delivery times per zone: /legal/policies#shipping.',
      ],
    },
    {
      heading: '7. Right of withdrawal (14 days)',
      paragraphs: [
        'You have the right to withdraw your order within 14 days of receipt without giving any reason. The product must be unused and in original packaging. Return shipping costs are at your expense, unless we state otherwise. Full procedure: /legal/policies#returns.',
      ],
    },
    {
      heading: '8. Warranty',
      paragraphs: [
        'The Titan X power bank carries a 2-year manufacturer warranty under normal use. Warranty covers manufacturing and material defects, not damage from dropping, water, unauthorised opening or normal wear. For warranty claims: hello@titan-banks.com. See /legal/policies#warranty.',
      ],
    },
    {
      heading: '9. Conformity',
      paragraphs: [
        'We guarantee that products conform to the agreement, the specifications stated in the offer, and reasonable expectations of quality and usability. This is a statutory right that exists alongside the manufacturer warranty.',
      ],
    },
    {
      heading: '10. Liability',
      paragraphs: [
        'Our liability is limited to the invoice amount of the order, except in cases of intent or wilful recklessness. We are not liable for indirect damages, consequential damages or lost profits.',
      ],
    },
    {
      heading: '11. Complaints',
      paragraphs: [
        'Have a complaint? Send it within a reasonable time by email to hello@titan-banks.com. We respond within 14 days. If we cannot resolve the matter together, you can submit your dispute to the European ODR platform (ec.europa.eu/consumers/odr) or the competent court.',
      ],
    },
    {
      heading: '12. Applicable law',
      paragraphs: [
        'These terms are governed exclusively by Dutch law. Disputes are submitted to the competent court in the Netherlands.',
      ],
    },
    {
      heading: '13. Changes',
      paragraphs: [
        'We reserve the right to change these terms. The current version is always available at titan-banks.com/legal/terms. For orders, the version in force at the time of ordering applies.',
      ],
    },
  ],
};

const termsDE: LegalDocument = {
  title: 'Allgemeine Geschäftsbedingungen',
  eyebrow: 'Rechtliches · AGB',
  intro:
    'Diese AGB gelten für jeden Vertrag zwischen TitanBanks (NamaCorp VOF) und dir als Verbraucher über titan-banks.com.',
  lastUpdated: LAST_UPDATED,
  juristReviewPending: true,
  preliminaryTranslation: true,
  sections: [
    {
      heading: '1. Wer wir sind',
      paragraphs: [
        'TitanBanks ist eine Handelsmarke von NamaCorp VOF mit Sitz in den Niederlanden. Wir verkaufen Premium-Powerbanks direkt an Endkunden über titan-banks.com. Kontakt: hello@titan-banks.com.',
      ],
    },
    {
      heading: '2. Geltungsbereich',
      paragraphs: [
        'Diese AGB gelten für jedes Angebot und jeden Fernabsatzvertrag über titan-banks.com. Mit der Bestellung erklärst du dein Einverständnis mit diesen AGB.',
      ],
    },
    {
      heading: '3. Angebot und Preise',
      paragraphs: [
        'Alle Preise sind in Euro inklusive MwSt., sofern nicht anders angegeben. Versandkosten werden im Checkout berechnet. Wir behalten uns Preisänderungen vor; es gilt der Preis zum Zeitpunkt der Bestellung.',
      ],
    },
    {
      heading: '4. Bestellung und Vertragsschluss',
      paragraphs: [
        'Der Vertrag kommt zustande, wenn du eine Bestellung aufgibst und wir diese schriftlich (per E-Mail) bestätigen. Wir behalten uns vor, Bestellungen ohne Angabe von Gründen abzulehnen, etwa bei Verdacht auf Betrug oder bei Lagerengpässen.',
      ],
    },
    {
      heading: '5. Zahlung',
      paragraphs: [
        'Die Zahlung erfolgt über die im Checkout angebotenen Methoden (iDEAL, Kreditkarte, Apple Pay etc.). Alle Transaktionen werden sicher von unserem Zahlungsdienstleister abgewickelt; wir erhalten keine Kartendaten.',
      ],
    },
    {
      heading: '6. Lieferung',
      paragraphs: [
        'Wir versuchen, Bestellungen innerhalb von 1-3 Werktagen nach Zahlungseingang zu versenden. Lieferzeiten sind unverbindlich; Verzögerungen begründen keine Schadensersatzansprüche, außer bei Vorsatz oder grober Fahrlässigkeit. Versandkosten und Laufzeiten pro Zone: /legal/policies#shipping.',
      ],
    },
    {
      heading: '7. Widerrufsrecht (14 Tage)',
      paragraphs: [
        'Du hast das Recht, deine Bestellung innerhalb von 14 Tagen nach Erhalt ohne Angabe von Gründen zu widerrufen. Das Produkt muss unbenutzt und in der Originalverpackung sein. Die Rücksendekosten trägst du, sofern wir nichts anderes mitteilen. Vollständiges Verfahren: /legal/policies#returns.',
      ],
    },
    {
      heading: '8. Garantie',
      paragraphs: [
        'Auf die Titan X Powerbank gewähren wir 2 Jahre Herstellergarantie bei normalem Gebrauch. Die Garantie deckt Fabrikations- und Materialfehler, nicht jedoch Schäden durch Stürze, Wasser, unbefugtes Öffnen oder normale Abnutzung. Für Garantieansprüche: hello@titan-banks.com. Siehe /legal/policies#warranty.',
      ],
    },
    {
      heading: '9. Vertragsmäßigkeit',
      paragraphs: [
        'Wir garantieren, dass Produkte dem Vertrag, den im Angebot genannten Spezifikationen und vernünftigen Anforderungen an Qualität und Brauchbarkeit entsprechen. Dies ist ein gesetzliches Recht und besteht neben der Herstellergarantie.',
      ],
    },
    {
      heading: '10. Haftung',
      paragraphs: [
        'Unsere Haftung ist auf den Rechnungsbetrag der Bestellung begrenzt, außer bei Vorsatz oder grober Fahrlässigkeit. Für mittelbare Schäden, Folgeschäden oder entgangenen Gewinn haften wir nicht.',
      ],
    },
    {
      heading: '11. Beschwerden',
      paragraphs: [
        'Hast du eine Beschwerde? Sende sie innerhalb angemessener Frist per E-Mail an hello@titan-banks.com. Wir antworten innerhalb von 14 Tagen. Können wir uns nicht einigen, kannst du den Streit der EU-ODR-Plattform (ec.europa.eu/consumers/odr) oder dem zuständigen Gericht vorlegen.',
      ],
    },
    {
      heading: '12. Anwendbares Recht',
      paragraphs: [
        'Es gilt ausschließlich niederländisches Recht. Streitigkeiten werden dem zuständigen Gericht in den Niederlanden vorgelegt.',
      ],
    },
    {
      heading: '13. Änderungen',
      paragraphs: [
        'Wir behalten uns vor, diese AGB zu ändern. Die aktuelle Fassung ist stets unter titan-banks.com/legal/terms verfügbar. Für Bestellungen gilt die zum Bestellzeitpunkt gültige Fassung.',
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// POLICIES (shipping / returns / warranty / cookies)
// ---------------------------------------------------------------------------

const policiesNL: LegalDocument = {
  title: 'Verzending, retour, garantie & cookies',
  eyebrow: 'Juridisch · Beleid',
  intro:
    'Op deze pagina vind je de praktische voorwaarden voor verzending, retour, garantie en cookies bij bestellingen via titan-banks.com.',
  lastUpdated: LAST_UPDATED,
  juristReviewPending: true,
  toc: [
    { id: 'shipping', label: 'Verzending' },
    { id: 'returns', label: 'Retour' },
    { id: 'warranty', label: 'Garantie' },
    { id: 'cookies', label: 'Cookies' },
  ],
  sections: [
    {
      id: 'shipping',
      heading: 'Verzending',
      paragraphs: [
        'Wij verzenden vanuit Nederland. Bestellingen worden binnen 1-3 werkdagen na ontvangst van betaling verzonden. Bezorgduur en kosten zijn afhankelijk van de zone.',
      ],
      list: [
        'Nederland — €0 (gratis), 1-2 werkdagen via PostNL.',
        'België & Duitsland — tarief bij checkout berekend, 2-3 werkdagen via DHL.',
        'Rest EU (FR, ES, IT, etc.) — tarief bij checkout, 3-5 werkdagen.',
        'UK, Zwitserland, Noorwegen — tarief bij checkout, 5-7 werkdagen, incl. douaneformaliteiten.',
        'VS & Canada — tarief bij checkout, 7-10 werkdagen, douanekosten voor rekening ontvanger.',
        'Rest van de wereld — op aanvraag, neem contact op via hello@titan-banks.com.',
      ],
    },
    {
      id: 'returns',
      heading: 'Retour',
      paragraphs: [
        'Je hebt 14 dagen bedenktijd vanaf de dag van ontvangst. Binnen die periode kun je de bestelling zonder opgaaf van redenen retourneren. Voorwaarden:',
      ],
      list: [
        'Het product is ongebruikt en in originele verpakking, met alle accessoires.',
        'Je meldt het retour aan via hello@titan-banks.com binnen 14 dagen.',
        'Je verstuurt het product binnen 14 dagen na aanmelding.',
        'Retourkosten zijn voor jouw rekening, tenzij wij anders aangeven (bv. defect bij ontvangst).',
        'Wij betalen het volledige aankoopbedrag terug binnen 14 dagen na ontvangst van het geretourneerde product.',
      ],
    },
    {
      id: 'warranty',
      heading: 'Garantie',
      paragraphs: [
        'Op de Titan X powerbank zit 2 jaar fabrieksgarantie bij normaal gebruik. Bij defect of storing nemen wij of de fabrikant de reparatie of vervanging op ons. Wij werken nog uit of TitanBanks of de fabrikant de claim afhandelt — tot dan: meld een claim via hello@titan-banks.com en wij coördineren het proces.',
      ],
      list: [
        'Garantie geldt 2 jaar vanaf aankoopdatum (factuur).',
        'Garantie dekt fabricage- en materiaalfouten.',
        'Garantie dekt NIET: schade door val of stoot, contact met water of vocht, ongeoorloofd openen, gebruik buiten specificaties of normale slijtage.',
        'Bewaar je factuur — vereist voor garantieclaim.',
        'Verzendkosten bij garantieclaim: voorlopig in onderzoek. Bij goedkeuring melden wij dit per claim.',
      ],
    },
    {
      id: 'cookies',
      heading: 'Cookies',
      paragraphs: [
        'titan-banks.com gebruikt cookies voor de werking van de website en — na jouw toestemming — voor analytics en marketing. Je beheert je voorkeuren via de cookiebanner of via je browser-instellingen.',
      ],
      list: [
        'Functioneel (altijd aan): sessie, winkelmand, taalkeuze. Geen toestemming vereist.',
        'Analytics (optioneel): geanonimiseerde meting van bezoekers en paginas, om de site te verbeteren. Bewaartermijn 26 maanden.',
        'Marketing (optioneel): retargeting via Meta Pixel — zodat je relevante ads ziet. Alleen na expliciete toestemming.',
        'Derden: cookies geplaatst door embedded content (bv. video-platforms). Wij streven naar minimaal gebruik van derden.',
      ],
    },
  ],
};

const policiesEN: LegalDocument = {
  title: 'Shipping, returns, warranty & cookies',
  eyebrow: 'Legal · Policies',
  intro:
    'On this page you will find the practical conditions for shipping, returns, warranty and cookies for orders via titan-banks.com.',
  lastUpdated: LAST_UPDATED,
  juristReviewPending: true,
  preliminaryTranslation: true,
  toc: [
    { id: 'shipping', label: 'Shipping' },
    { id: 'returns', label: 'Returns' },
    { id: 'warranty', label: 'Warranty' },
    { id: 'cookies', label: 'Cookies' },
  ],
  sections: [
    {
      id: 'shipping',
      heading: 'Shipping',
      paragraphs: [
        'We ship from the Netherlands. Orders are shipped within 1-3 business days after receipt of payment. Delivery time and cost depend on the zone.',
      ],
      list: [
        'Netherlands — €0 (free), 1-2 business days via PostNL.',
        'Belgium & Germany — rate calculated at checkout, 2-3 business days via DHL.',
        'Rest of EU (FR, ES, IT, etc.) — rate at checkout, 3-5 business days.',
        'UK, Switzerland, Norway — rate at checkout, 5-7 business days, incl. customs handling.',
        'USA & Canada — rate at checkout, 7-10 business days, customs duties for the recipient.',
        'Rest of world — on request, contact hello@titan-banks.com.',
      ],
    },
    {
      id: 'returns',
      heading: 'Returns',
      paragraphs: [
        'You have 14 days from the day of receipt to consider your purchase. Within that period you can return your order without giving reasons. Conditions:',
      ],
      list: [
        'The product is unused and in its original packaging, with all accessories.',
        'You notify us of the return via hello@titan-banks.com within 14 days.',
        'You ship the product within 14 days of notification.',
        'Return shipping is at your expense, unless we state otherwise (e.g. defective on arrival).',
        'We refund the full purchase amount within 14 days after we receive the returned product.',
      ],
    },
    {
      id: 'warranty',
      heading: 'Warranty',
      paragraphs: [
        'The Titan X power bank carries a 2-year manufacturer warranty under normal use. If a unit fails, we or the manufacturer take care of repair or replacement. We are still working out whether TitanBanks or the manufacturer handles claims — for now, file a claim via hello@titan-banks.com and we coordinate the process.',
      ],
      list: [
        'Warranty is valid 2 years from the date of purchase (invoice).',
        'Warranty covers manufacturing and material defects.',
        'Warranty does NOT cover: damage from drops or impacts, contact with water or moisture, unauthorised opening, use outside specifications, or normal wear.',
        'Keep your invoice — required for warranty claims.',
        'Shipping costs on warranty claims: under review. We will inform you per claim once approved.',
      ],
    },
    {
      id: 'cookies',
      heading: 'Cookies',
      paragraphs: [
        'titan-banks.com uses cookies for the operation of the site and — with your consent — for analytics and marketing. You manage your preferences via the cookie banner or your browser settings.',
      ],
      list: [
        'Functional (always on): session, cart, language preference. No consent required.',
        'Analytics (optional): anonymised measurement of visitors and pages, to improve the site. Retention 26 months.',
        'Marketing (optional): retargeting via the Meta Pixel — so you see relevant ads. Only with explicit consent.',
        'Third parties: cookies set by embedded content (e.g. video platforms). We aim for minimal third-party use.',
      ],
    },
  ],
};

const policiesDE: LegalDocument = {
  title: 'Versand, Rückgabe, Garantie & Cookies',
  eyebrow: 'Rechtliches · Richtlinien',
  intro:
    'Auf dieser Seite findest du die praktischen Bedingungen für Versand, Rückgabe, Garantie und Cookies bei Bestellungen über titan-banks.com.',
  lastUpdated: LAST_UPDATED,
  juristReviewPending: true,
  preliminaryTranslation: true,
  toc: [
    { id: 'shipping', label: 'Versand' },
    { id: 'returns', label: 'Rückgabe' },
    { id: 'warranty', label: 'Garantie' },
    { id: 'cookies', label: 'Cookies' },
  ],
  sections: [
    {
      id: 'shipping',
      heading: 'Versand',
      paragraphs: [
        'Wir versenden aus den Niederlanden. Bestellungen werden innerhalb von 1-3 Werktagen nach Zahlungseingang verschickt. Lieferzeit und Kosten hängen von der Zone ab.',
      ],
      list: [
        'Niederlande — €0 (kostenlos), 1-2 Werktage über PostNL.',
        'Belgien & Deutschland — Tarif im Checkout berechnet, 2-3 Werktage über DHL.',
        'Rest EU (FR, ES, IT etc.) — Tarif im Checkout, 3-5 Werktage.',
        'UK, Schweiz, Norwegen — Tarif im Checkout, 5-7 Werktage, inkl. Zollformalitäten.',
        'USA & Kanada — Tarif im Checkout, 7-10 Werktage, Zollgebühren zu Lasten des Empfängers.',
        'Restliche Welt — auf Anfrage, kontaktiere hello@titan-banks.com.',
      ],
    },
    {
      id: 'returns',
      heading: 'Rückgabe',
      paragraphs: [
        'Du hast 14 Tage Bedenkzeit ab dem Tag des Erhalts. Innerhalb dieser Frist kannst du die Bestellung ohne Angabe von Gründen zurücksenden. Bedingungen:',
      ],
      list: [
        'Das Produkt ist unbenutzt und in der Originalverpackung, mit allem Zubehör.',
        'Du meldest die Rücksendung innerhalb von 14 Tagen unter hello@titan-banks.com.',
        'Du versendest das Produkt innerhalb von 14 Tagen nach der Anmeldung.',
        'Die Rücksendekosten trägst du, außer wir teilen anderes mit (z.B. Defekt bei Erhalt).',
        'Wir erstatten den vollen Kaufpreis innerhalb von 14 Tagen nach Eingang der Rücksendung.',
      ],
    },
    {
      id: 'warranty',
      heading: 'Garantie',
      paragraphs: [
        'Auf die Titan X Powerbank gewähren wir 2 Jahre Herstellergarantie bei normalem Gebrauch. Bei Defekt übernehmen wir oder der Hersteller die Reparatur oder den Austausch. Wir klären gerade, ob TitanBanks oder der Hersteller Garantieansprüche bearbeitet — bis dahin: melde dich via hello@titan-banks.com, wir koordinieren den Prozess.',
      ],
      list: [
        'Garantie gilt 2 Jahre ab Kaufdatum (Rechnung).',
        'Garantie deckt Fabrikations- und Materialfehler.',
        'Garantie deckt NICHT: Sturz- oder Stoßschäden, Kontakt mit Wasser oder Feuchtigkeit, unbefugtes Öffnen, Nutzung außerhalb der Spezifikationen oder normale Abnutzung.',
        'Bewahre deine Rechnung auf — erforderlich für Garantieansprüche.',
        'Versandkosten bei Garantieansprüchen: derzeit in Prüfung. Wir informieren dich pro Fall nach Freigabe.',
      ],
    },
    {
      id: 'cookies',
      heading: 'Cookies',
      paragraphs: [
        'titan-banks.com verwendet Cookies für den Betrieb der Website und — mit deiner Einwilligung — für Analytics und Marketing. Du verwaltest deine Präferenzen über das Cookie-Banner oder deine Browser-Einstellungen.',
      ],
      list: [
        'Funktional (immer aktiv): Sitzung, Warenkorb, Spracheinstellung. Keine Einwilligung erforderlich.',
        'Analytics (optional): anonymisierte Messung von Besuchern und Seiten zur Verbesserung der Website. Aufbewahrung 26 Monate.',
        'Marketing (optional): Retargeting über den Meta Pixel — damit du relevante Anzeigen siehst. Nur mit ausdrücklicher Einwilligung.',
        'Dritte: Cookies, die von eingebetteten Inhalten gesetzt werden (z.B. Video-Plattformen). Wir streben minimale Dritt-Nutzung an.',
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// PUBLIC API
// ---------------------------------------------------------------------------

const PRIVACY: Record<Locale, LegalDocument> = { nl: privacyNL, en: privacyEN, de: privacyDE };
const TERMS: Record<Locale, LegalDocument> = { nl: termsNL, en: termsEN, de: termsDE };
const POLICIES: Record<Locale, LegalDocument> = { nl: policiesNL, en: policiesEN, de: policiesDE };

export function getPrivacyContent(locale: Locale): LegalDocument {
  return PRIVACY[locale];
}

export function getTermsContent(locale: Locale): LegalDocument {
  return TERMS[locale];
}

export function getPoliciesContent(locale: Locale): LegalDocument {
  return POLICIES[locale];
}
