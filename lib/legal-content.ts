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
        'TitanBanks is een handelsnaam van NamaCorp VOF, gevestigd in Nederland. Vragen over privacy kun je richten aan info@titan-banks.com.',
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
        'ChannelDock — order- en voorraadbeheer; verstuurt orders naar ons fulfilmentcentrum (3PL).',
        'Ons fulfilmentcentrum (3PL) — opslag, verpakking en verzending van bestellingen.',
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
        'Stuur een e-mail naar info@titan-banks.com met je verzoek. Wij reageren binnen 30 dagen. Ben je niet tevreden over hoe wij je verzoek behandelen, dan kun je een klacht indienen bij de Autoriteit Persoonsgegevens (autoriteitpersoonsgegevens.nl).',
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
        'TitanBanks is a trade name of NamaCorp VOF, established in the Netherlands. Privacy questions can be sent to info@titan-banks.com.',
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
        'Send an email to info@titan-banks.com with your request. We respond within 30 days. If you are not satisfied with how we handle your request, you can lodge a complaint with the Dutch Data Protection Authority (autoriteitpersoonsgegevens.nl).',
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
        'TitanBanks ist eine Handelsmarke von NamaCorp VOF mit Sitz in den Niederlanden. Datenschutzanfragen können an info@titan-banks.com gerichtet werden.',
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
        'Sende eine E-Mail an info@titan-banks.com mit deiner Anfrage. Wir antworten innerhalb von 30 Tagen. Bist du mit der Bearbeitung nicht zufrieden, kannst du eine Beschwerde bei der niederländischen Datenschutzbehörde (autoriteitpersoonsgegevens.nl) einreichen.',
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

const TERMS_LAST_UPDATED = '2026-06-18';

const termsNL: LegalDocument = {
  title: 'Algemene voorwaarden',
  eyebrow: 'Juridisch · Voorwaarden',
  intro:
    'Deze algemene voorwaarden zijn van toepassing op elk aanbod en elke overeenkomst tussen TitanBanks (een handelsnaam van NamaCorp VOF) en jou, of je nu als consument of als zakelijke koper bestelt via titan-banks.com. Sommige bepalingen gelden uitsluitend voor consumenten; de bepalingen in artikel 20 gelden uitsluitend voor zakelijke kopers.',
  lastUpdated: TERMS_LAST_UPDATED,
  juristReviewPending: true,
  toc: [
    { id: 'definities', label: 'Definities' },
    { id: 'herroeping', label: 'Herroepingsrecht' },
    { id: 'veilig-gebruik', label: 'Veilig gebruik' },
    { id: 'aansprakelijkheid', label: 'Aansprakelijkheid' },
    { id: 'zakelijk', label: 'Zakelijke klanten' },
  ],
  sections: [
    {
      heading: '1. Identiteit en contact',
      paragraphs: [
        'TitanBanks is een handelsnaam van NamaCorp VOF, ingeschreven bij de Nederlandse Kamer van Koophandel. Wij verkopen de Titan X 50.000 mAh powerbank rechtstreeks via titan-banks.com.',
        'In deze voorwaarden worden NamaCorp VOF en de handelsnaam TitanBanks aangeduid als "wij", "ons" of "TitanBanks".',
      ],
      list: [
        'Handelsnaam: TitanBanks',
        'Statutaire naam en rechtsvorm: NamaCorp VOF',
        'Adres: De Twee Gebroeders 37, 9207 CL Drachten, Nederland',
        'KvK-nummer: 88305139',
        'Btw-identificatienummer: NL864572566B01',
        'E-mail: info@titan-banks.com',
        'Website: titan-banks.com',
      ],
    },
    {
      id: 'definities',
      heading: '2. Definities',
      list: [
        'Consument: een natuurlijke persoon die niet handelt in de uitoefening van een beroep of bedrijf.',
        'Zakelijke koper: een natuurlijke of rechtspersoon die handelt in de uitoefening van een beroep of bedrijf.',
        'Klant: zowel de consument als de zakelijke koper.',
        'Product: de Titan X 50.000 mAh powerbank en eventuele bijbehorende accessoires.',
        'Overeenkomst: de op afstand gesloten koopovereenkomst tussen TitanBanks en de klant.',
        'Schriftelijk: per brief of per e-mail.',
        'Werkdag: een kalenderdag, met uitzondering van weekenden en in Nederland erkende feestdagen.',
        'Herroepingsrecht: het recht van de consument om de overeenkomst binnen de bedenktijd te ontbinden.',
      ],
    },
    {
      heading: '3. Toepasselijkheid en rangorde',
      paragraphs: [
        'Deze voorwaarden zijn van toepassing op elk aanbod van TitanBanks en op elke overeenkomst die op afstand tot stand komt via titan-banks.com. Door een bestelling te plaatsen aanvaardt de klant deze voorwaarden.',
        'Bepalingen die uitsluitend voor consumenten gelden, zijn als zodanig aangeduid. Artikel 20 geldt uitsluitend voor zakelijke kopers en gaat bij een zakelijke koper vóór op andersluidende algemene bepalingen in deze voorwaarden. Toepasselijkheid van inkoop- of andere voorwaarden van een zakelijke koper wordt uitdrukkelijk van de hand gewezen.',
        'Dwingendrechtelijke bepalingen van consumentenrecht gaan, voor zover van toepassing op een consument, altijd vóór op deze voorwaarden. Niets in deze voorwaarden beoogt de wettelijke rechten van de consument te beperken.',
      ],
    },
    {
      heading: '4. Aanbod en prijzen',
      paragraphs: [
        'Alle prijzen op titan-banks.com zijn vermeld in euro. Voor consumenten zijn de prijzen inclusief btw; voor zakelijke kopers kan de prijs exclusief btw worden vermeld. Verzendkosten worden, voor zover van toepassing, vóór het afronden van de bestelling getoond.',
        'Een aanbod is vrijblijvend en geldt zolang de voorraad strekt. Kennelijke vergissingen of schrijffouten in het aanbod, in prijzen of in productinformatie binden TitanBanks niet.',
        'Wij behouden ons het recht voor prijzen te wijzigen. Voor een geplaatste bestelling geldt de prijs die op het moment van bestellen werd vermeld.',
      ],
    },
    {
      heading: '5. Totstandkoming van de overeenkomst',
      paragraphs: [
        'De overeenkomst komt tot stand op het moment dat de klant een bestelling plaatst en TitanBanks deze schriftelijk (per e-mail) bevestigt.',
        'Wij behouden ons het recht voor een bestelling zonder opgaaf van redenen te weigeren of aan aanvullende voorwaarden te verbinden, bijvoorbeeld bij een vermoeden van fraude, misbruik, wanbetaling of bij onvoldoende voorraad. Is een geweigerde bestelling al betaald, dan betalen wij het betaalde bedrag terug.',
      ],
    },
    {
      heading: '6. Betaling',
      paragraphs: [
        'Betaling vindt plaats via de bij de bestelling aangeboden betaalmethoden (zoals iDEAL, creditcard of Apple Pay). Transacties worden veilig verwerkt door onze betaaldienstverlener; wij ontvangen en bewaren zelf geen volledige kaartgegevens.',
        'De klant is verantwoordelijk voor het verstrekken van juiste betaal- en adresgegevens. Aanvullende betalingsbepalingen voor zakelijke kopers staan in artikel 20.',
      ],
    },
    {
      heading: '7. Levering en risico-overgang',
      paragraphs: [
        'Wij streven ernaar bestellingen binnen 1 tot 3 werkdagen na ontvangst van de betaling te verzenden. Genoemde lever- en bezorgtermijnen zijn indicatief en gelden niet als fatale termijn. Verzendkosten en bezorgduur per zone staan op /legal/policies#shipping.',
        'Voor de consument gaat het risico van verlies of beschadiging van het product over op het moment dat de consument (of een door de consument aangewezen derde, niet zijnde de vervoerder) het product feitelijk in ontvangst neemt. Voor de zakelijke koper gaat het risico over op het moment dat het product ter verzending aan de vervoerder wordt overgedragen.',
        'Overschrijding van een indicatieve levertermijn geeft geen recht op schadevergoeding, tenzij sprake is van opzet of bewuste roekeloosheid van TitanBanks of voor zover dwingend recht anders bepaalt.',
      ],
    },
    {
      id: 'herroeping',
      heading: '8. Herroepingsrecht (consumenten, 14 dagen)',
      paragraphs: [
        'Dit artikel geldt uitsluitend voor consumenten.',
        'De consument heeft het recht de overeenkomst binnen 14 dagen na ontvangst van het product zonder opgaaf van redenen te herroepen. De bedenktijd gaat in op de dag nadat de consument (of een aangewezen derde) het product heeft ontvangen. De consument meldt de herroeping binnen de bedenktijd per e-mail aan info@titan-banks.com of via het onderstaande modelformulier. Na de melding heeft de consument nog 14 dagen om het product terug te sturen.',
        'Tijdens de bedenktijd gaat de consument zorgvuldig om met het product en de verpakking. De consument mag het product slechts uitpakken en hanteren voor zover nodig om de aard en werking ervan vast te stellen, zoals ook in een fysieke winkel zou mogen. De consument is aansprakelijk voor waardevermindering die het gevolg is van een verdergaand gebruik.',
        'De rechtstreekse kosten van het terugzenden van het product zijn voor rekening van de consument, tenzij wij anders aangeven of het product bij ontvangst defect of verkeerd was. Wij vermelden dit vooraf zodat de consument hiervan op de hoogte is.',
        'Wij betalen het door de consument betaalde bedrag, inclusief de standaard leveringskosten, terug binnen 14 dagen nadat wij de herroeping hebben ontvangen, maar niet eerder dan nadat wij het product retour hebben ontvangen of de consument heeft aangetoond het product te hebben teruggezonden. Terugbetaling gebeurt met hetzelfde betaalmiddel als waarmee is betaald, tenzij anders afgesproken. De volledige retourprocedure staat op /legal/policies#returns.',
        'Modelformulier voor herroeping — vul dit alleen in en stuur het terug als je de overeenkomst wilt herroepen:',
      ],
      list: [
        'Aan: NamaCorp VOF (handelsnaam TitanBanks), per e-mail: info@titan-banks.com',
        'Ik/Wij (*) deel/delen (*) u hierbij mede dat ik/wij (*) onze overeenkomst betreffende de verkoop van het volgende product herroep/herroepen (*): Titan X 50.000 mAh power bank',
        'Besteld op (*) / ontvangen op (*): [datum]',
        'Naam consument(en): [naam]',
        'Adres consument(en): [adres]',
        'Datum: [datum]',
        'Handtekening consument(en) (alleen bij indiening op papier)',
        '(*) Doorhalen wat niet van toepassing is.',
      ],
    },
    {
      heading: '9. Garantie (fabrieksgarantie)',
      paragraphs: [
        'Op de Titan X powerbank geldt 2 jaar fabrieksgarantie vanaf de aankoopdatum bij normaal gebruik. Deze fabrieksgarantie is een commerciële garantie en komt bovenop de wettelijke rechten van de consument (zie artikel 10), die zij onverlet laat.',
        'De garantie dekt fabricage- en materiaalfouten. De garantie dekt NIET: schade door vallen of stoten, contact met water of vocht, ongeoorloofd openen of repareren, gebruik buiten de productspecificaties, het niet-naleven van de gebruiksinstructies (artikel 11) en normale slijtage.',
        'Bewaar de factuur; deze is nodig voor een garantieclaim. Een claim meld je via info@titan-banks.com. TitanBanks coördineert de afhandeling en kiest, binnen de grenzen van de wet, voor herstel of vervanging. De kosten van het opsturen van een product voor een garantieclaim zijn voor rekening van de klant; bij een erkend garantiegeval vergoeden wij die kosten. Zie ook /legal/policies#warranty.',
      ],
    },
    {
      heading: '10. Wettelijke conformiteit (consumenten)',
      paragraphs: [
        'Voor de consument geldt dat het product moet voldoen aan de overeenkomst: aan de in het aanbod vermelde specificaties, aan redelijke eisen van deugdelijkheid en bruikbaarheid, en aan wat de consument op grond van de wet mag verwachten gedurende de te verwachten levensduur van het product. Dit wettelijke recht (conformiteit) staat naast en los van de fabrieksgarantie en kan voor consumenten niet worden beperkt.',
        'Voor zakelijke kopers gelden in plaats hiervan de bepalingen in artikel 20.',
      ],
    },
    {
      id: 'veilig-gebruik',
      heading: '11. Veilig gebruik en juiste behandeling van de accu',
      paragraphs: [
        'De Titan X bevat een lithium-ion-accu. Volg voor je eigen veiligheid en die van anderen de onderstaande instructies en de meegeleverde handleiding.',
      ],
      list: [
        'Laad en gebruik het product alleen met geschikte, onbeschadigde kabels en een geschikte stroombron.',
        'Gebruik en bewaar het product binnen het in de handleiding aangegeven temperatuurbereik; stel het niet bloot aan extreme hitte, open vuur of langdurig direct zonlicht.',
        'Open, doorboor, plet, demonteer, wijzig of kortsluit het product niet.',
        'Gebruik het product niet meer bij beschadiging, vervorming, opzwelling, lekkage, een afwijkende geur of oververhitting, en neem contact met ons op.',
        'Stel het product niet bloot aan water of vocht, tenzij de specificaties dit uitdrukkelijk toestaan.',
        'Houd het product buiten bereik van kinderen.',
        'Lever het product aan het einde van de levensduur in als batterij/klein chemisch afval bij een inzamelpunt; gooi het niet bij het gewone huisvuil.',
      ],
    },
    {
      heading: '12. Productaansprakelijkheid',
      paragraphs: [
        'Niets in deze voorwaarden sluit onze aansprakelijkheid uit of beperkt deze voor zover dat op grond van dwingend recht niet is toegestaan. Dit geldt in het bijzonder voor aansprakelijkheid op grond van de wettelijke regeling voor productaansprakelijkheid (afdeling 6.3.3 van het Burgerlijk Wetboek) voor schade door dood of lichamelijk letsel, en voor zaakschade bij consumenten, veroorzaakt door een gebrek in het product.',
        'Onverminderd het voorgaande zijn wij niet aansprakelijk voor schade die het gevolg is van verkeerd gebruik, het niet-naleven van de gebruiksinstructies (artikel 11), wijziging of reparatie door anderen dan door ons aangewezen partijen, of gebruik in strijd met de bestemming van het product.',
      ],
    },
    {
      id: 'aansprakelijkheid',
      heading: '13. Aansprakelijkheid (algemeen)',
      paragraphs: [
        'Behoudens dwingend recht en behoudens het bepaalde in artikel 12 is onze aansprakelijkheid jegens de klant beperkt tot het factuurbedrag van de betreffende bestelling.',
        'Wij zijn niet aansprakelijk voor indirecte schade, gevolgschade, gederfde winst, gemiste besparingen, gegevensverlies of bedrijfsschade.',
        'De in dit artikel opgenomen beperkingen gelden niet in geval van opzet of bewuste roekeloosheid van TitanBanks zelf, noch voor zover dwingend recht (waaronder de consumentenbescherming en artikel 12) aan beperking in de weg staat. Verdergaande beperkingen jegens zakelijke kopers staan in artikel 20.',
      ],
    },
    {
      heading: '14. Overmacht',
      paragraphs: [
        'In geval van overmacht zijn wij niet gehouden tot nakoming van enige verplichting en is iedere aansprakelijkheid uitgesloten. Wij mogen onze verplichtingen voor de duur van de overmacht opschorten.',
        'Onder overmacht wordt onder meer verstaan: storingen of tekortkomingen bij leveranciers, fabrikanten of vervoerders, voorraad- of grondstoftekorten, transport- en logistieke belemmeringen, stakingen, brand, overstroming, energie- of internetstoringen, cyberaanvallen, pandemieën, overheidsmaatregelen en alle overige omstandigheden buiten onze redelijke controle.',
        'Duurt de overmacht langer dan 30 dagen, dan mogen zowel de klant als TitanBanks de overeenkomst schriftelijk ontbinden voor het niet-uitvoerbare deel; reeds betaalde bedragen voor niet-geleverde producten worden dan terugbetaald.',
      ],
    },
    {
      heading: '15. Eigendomsvoorbehoud',
      paragraphs: [
        'Geleverde producten blijven eigendom van TitanBanks totdat de klant alle daarvoor verschuldigde bedragen volledig heeft betaald. Zolang de eigendom niet is overgegaan, mag een zakelijke koper het product niet verpanden, bezwaren of aan derden in eigendom overdragen anders dan in het kader van zijn normale bedrijfsuitoefening.',
      ],
    },
    {
      heading: '16. Intellectueel eigendom en merkrechten',
      paragraphs: [
        'Alle intellectuele-eigendomsrechten met betrekking tot TitanBanks en haar producten berusten bij NamaCorp VOF of haar licentiegevers. Dit omvat onder meer de merken "TitanBanks" en "Titan X", het logo, de handelsnaam, de website, teksten, vormgeving, foto’s, video’s en het 3D-productmodel.',
        'Niets in deze voorwaarden of in de aankoop van een product draagt enig intellectueel-eigendomsrecht over. Het is niet toegestaan deze materialen zonder voorafgaande schriftelijke toestemming te kopiëren, te verveelvoudigen, te wijzigen, openbaar te maken of commercieel te gebruiken.',
      ],
    },
    {
      heading: '17. Toegestaan gebruik van de website',
      paragraphs: [
        'De klant gebruikt titan-banks.com uitsluitend op een rechtmatige wijze. Het is niet toegestaan de website of webshop te misbruiken, te verstoren, geautomatiseerd uit te lezen (scraping), te reverse-engineeren, te voorzien van schadelijke software, of frauduleuze of valse bestellingen te plaatsen. Wij mogen toegang of bestellingen weigeren of beëindigen bij een (vermoeden van) misbruik.',
      ],
    },
    {
      heading: '18. Geen wederverkoop of commercieel gebruik zonder toestemming',
      paragraphs: [
        'Producten worden geleverd voor eigen gebruik door de klant. Aan een aankoop kunnen geen rechten worden ontleend op een wederverkoper-, distributeur- of partnerstatus, op groothandelsvolumes of op gebruik van onze merk- en intellectuele-eigendomsrechten.',
        'Voor wederverkoop, distributie of ander commercieel gebruik onder gebruikmaking van onze merken of materialen is voorafgaande schriftelijke toestemming van TitanBanks vereist. Deze bepaling laat dwingendrechtelijke rechten van de klant ten aanzien van het door hem rechtmatig verkregen exemplaar onverlet.',
      ],
    },
    {
      heading: '19. Persoonsgegevens',
      paragraphs: [
        'Wij verwerken persoonsgegevens in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG). Hoe wij dat doen, met welk doel en welke rechten je hebt, staat in ons privacybeleid op /legal/privacy.',
      ],
    },
    {
      id: 'zakelijk',
      heading: '20. Aanvullende bepalingen voor zakelijke klanten',
      paragraphs: [
        'Dit artikel geldt uitsluitend voor zakelijke kopers en gaat bij hen vóór op andersluidende algemene bepalingen in deze voorwaarden. De bepalingen die specifiek voor consumenten gelden — waaronder het herroepingsrecht (artikel 8) en de wettelijke conformiteit (artikel 10) — zijn op zakelijke kopers niet van toepassing.',
      ],
      list: [
        'Geen herroepingsrecht: de zakelijke koper heeft geen bedenktijd; een bestelling is na totstandkoming definitief.',
        'Garantie: voor zakelijke kopers geldt uitsluitend de fabrieksgarantie uit artikel 9, met uitsluiting van verdergaande wettelijke conformiteitsaanspraken voor zover toegestaan.',
        'Klacht- en vervaltermijnen: zichtbare gebreken meldt de zakelijke koper binnen 48 uur na ontvangst, niet-zichtbare gebreken binnen 14 dagen na ontdekking, telkens schriftelijk en op straffe van verval van rechten. Elke rechtsvordering vervalt in elk geval 12 maanden na levering.',
        'Aansprakelijkheid: onze aansprakelijkheid jegens de zakelijke koper is uitgesloten voor alle indirecte schade, gevolgschade, bedrijfs- en stilstandschade, gederfde winst en reputatieschade, en is voor het overige beperkt tot het factuurbedrag van de betreffende bestelling. Alleen opzet of bewuste roekeloosheid van TitanBanks zelf is hiervan uitgezonderd.',
        'Betaling en verzuim: bij overschrijding van een betaaltermijn is de zakelijke koper van rechtswege in verzuim, zonder ingebrekestelling, en is hij de wettelijke handelsrente (artikel 6:119a BW) en de buitengerechtelijke incassokosten verschuldigd. Wij mogen onze verplichtingen opschorten zolang betaling uitblijft.',
        'Eigendomsvoorbehoud: het eigendomsvoorbehoud uit artikel 15 geldt onverkort tot algehele betaling.',
        'Inkoopvoorwaarden: eventuele inkoop- of andere voorwaarden van de zakelijke koper worden uitdrukkelijk van de hand gewezen.',
        'Vrijwaring: de zakelijke koper vrijwaart TitanBanks volledig tegen aanspraken van zijn eigen afnemers of andere derden die verband houden met de afgenomen producten.',
        'Bevoegde rechter: geschillen worden bij uitsluiting voorgelegd aan de bevoegde rechter van de rechtbank Noord-Nederland.',
      ],
    },
    {
      heading: '21. Vrijwaring',
      paragraphs: [
        'De klant vrijwaart TitanBanks tegen aanspraken van derden die voortvloeien uit een aan de klant toe te rekenen verkeerd gebruik van het product, het niet-naleven van de gebruiksinstructies (artikel 11) of een schending van deze voorwaarden. Voor consumenten geldt deze vrijwaring uitsluitend voor zover de schade aan de consument kan worden toegerekend en blijft zij binnen de grenzen van het dwingend recht.',
      ],
    },
    {
      heading: '22. Klachten en geschillen',
      paragraphs: [
        'Heeft de klant een klacht, dan ontvangen wij die graag binnen redelijke termijn — voor zakelijke kopers binnen de termijnen van artikel 20 — per e-mail op info@titan-banks.com. Wij reageren binnen 14 dagen.',
        'Komen wij er samen niet uit, dan kan de consument het geschil voorleggen aan het Europese ODR-platform via ec.europa.eu/consumers/odr of aan de bevoegde rechter. Wij zijn niet aangesloten bij een onafhankelijke geschillencommissie.',
      ],
    },
    {
      heading: '23. Toepasselijk recht en bevoegde rechter',
      paragraphs: [
        'Op deze voorwaarden en op alle overeenkomsten is uitsluitend Nederlands recht van toepassing. De toepasselijkheid van het Weens Koopverdrag (CISG) is uitgesloten.',
        'Geschillen worden voorgelegd aan de bevoegde Nederlandse rechter. Voor zakelijke kopers geldt de forumkeuze uit artikel 20. Voor consumenten blijven de wettelijke regels over de bevoegde rechter onverkort gelden.',
      ],
    },
    {
      heading: '24. Gedeeltelijke nietigheid',
      paragraphs: [
        'Is een bepaling van deze voorwaarden nietig of vernietigbaar, dan blijven de overige bepalingen volledig van kracht. In plaats van de ongeldige bepaling geldt dan een geldige bepaling die het doel en de strekking van de oorspronkelijke bepaling zo dicht mogelijk benadert.',
      ],
    },
    {
      heading: '25. Geen afstand van rechten',
      paragraphs: [
        'Als wij een recht uit deze voorwaarden of uit de wet op enig moment niet of niet direct uitoefenen, betekent dat geen afstand van dat recht en kunnen wij het later alsnog uitoefenen.',
      ],
    },
    {
      heading: '26. Volledige overeenkomst',
      paragraphs: [
        'Deze voorwaarden vormen, samen met het aanbod en de orderbevestiging, de volledige afspraak tussen de klant en TitanBanks over het onderwerp ervan. Voor consumenten laat dit hun wettelijke en precontractuele rechten onverlet.',
      ],
    },
    {
      heading: '27. Taal',
      paragraphs: [
        'Deze voorwaarden zijn opgesteld in het Nederlands. Vertalingen worden uitsluitend ter informatie aangeboden; bij verschil tussen de Nederlandse tekst en een vertaling is de Nederlandse tekst leidend.',
      ],
    },
    {
      heading: '28. Wijzigingen van deze voorwaarden',
      paragraphs: [
        'Wij mogen deze voorwaarden wijzigen. De meest actuele versie staat altijd op titan-banks.com/legal/terms. Voor een bestelling geldt de versie die van kracht was op het moment van bestellen.',
      ],
    },
  ],
};

const termsEN: LegalDocument = {
  title: 'Terms & Conditions',
  eyebrow: 'Legal · Terms',
  intro:
    'These terms and conditions apply to every offer and every agreement between TitanBanks (a trade name of NamaCorp VOF) and you, whether you order as a consumer or as a business customer via titan-banks.com. Some provisions apply only to consumers; the provisions in article 20 apply only to business customers.',
  lastUpdated: TERMS_LAST_UPDATED,
  juristReviewPending: true,
  preliminaryTranslation: true,
  toc: [
    { id: 'definities', label: 'Definitions' },
    { id: 'herroeping', label: 'Right of withdrawal' },
    { id: 'veilig-gebruik', label: 'Safe use' },
    { id: 'aansprakelijkheid', label: 'Liability' },
    { id: 'zakelijk', label: 'Business customers' },
  ],
  sections: [
    {
      heading: '1. Identity and contact',
      paragraphs: [
        'TitanBanks is a trade name of NamaCorp VOF, registered with the Dutch Chamber of Commerce. We sell the Titan X 50,000 mAh power bank directly via titan-banks.com.',
        'In these terms, NamaCorp VOF and the trade name TitanBanks are referred to as "we", "us" or "TitanBanks".',
      ],
      list: [
        'Trade name: TitanBanks',
        'Legal name and form: NamaCorp VOF',
        'Address: De Twee Gebroeders 37, 9207 CL Drachten, Netherlands',
        'Chamber of Commerce (KvK) number: 88305139',
        'VAT identification number: NL864572566B01',
        'Email: info@titan-banks.com',
        'Website: titan-banks.com',
      ],
    },
    {
      id: 'definities',
      heading: '2. Definitions',
      list: [
        'Consumer: a natural person not acting in the course of a profession or business.',
        'Business customer: a natural or legal person acting in the course of a profession or business.',
        'Customer: both the consumer and the business customer.',
        'Product: the Titan X 50,000 mAh power bank and any related accessories.',
        'Agreement: the distance sales contract between TitanBanks and the customer.',
        'In writing: by letter or by email.',
        'Business day: a calendar day excluding weekends and public holidays recognised in the Netherlands.',
        'Right of withdrawal: the consumer’s right to dissolve the agreement within the cooling-off period.',
      ],
    },
    {
      heading: '3. Applicability and order of precedence',
      paragraphs: [
        'These terms apply to every offer by TitanBanks and to every distance-sales agreement concluded through titan-banks.com. By placing an order the customer accepts these terms.',
        'Provisions that apply only to consumers are marked as such. Article 20 applies only to business customers and, for a business customer, prevails over conflicting general provisions in these terms. The applicability of any purchasing or other terms of a business customer is expressly rejected.',
        'Mandatory provisions of consumer law always prevail over these terms insofar as they apply to a consumer. Nothing in these terms is intended to limit the consumer’s statutory rights.',
      ],
    },
    {
      heading: '4. Offer and prices',
      paragraphs: [
        'All prices on titan-banks.com are in euros. For consumers, prices are inclusive of VAT; for business customers, prices may be stated exclusive of VAT. Shipping costs, where applicable, are shown before the order is completed.',
        'An offer is without obligation and applies while stocks last. Obvious errors or typos in the offer, in prices or in product information do not bind TitanBanks.',
        'We reserve the right to change prices. For an order placed, the price stated at the time of ordering applies.',
      ],
    },
    {
      heading: '5. Formation of the agreement',
      paragraphs: [
        'The agreement is formed at the moment the customer places an order and TitanBanks confirms it in writing (by email).',
        'We reserve the right to refuse an order or attach additional conditions without giving reasons, for example in case of suspected fraud, misuse, non-payment or insufficient stock. If a refused order has already been paid, we refund the amount paid.',
      ],
    },
    {
      heading: '6. Payment',
      paragraphs: [
        'Payment takes place via the payment methods offered with the order (such as iDEAL, credit card or Apple Pay). Transactions are processed securely by our payment service provider; we do not receive or store full card details ourselves.',
        'The customer is responsible for providing correct payment and address details. Additional payment provisions for business customers are set out in article 20.',
      ],
    },
    {
      heading: '7. Delivery and passing of risk',
      paragraphs: [
        'We aim to ship orders within 1 to 3 business days after receipt of payment. Stated delivery times are indicative and are not strict deadlines. Shipping costs and delivery times per zone are at /legal/policies#shipping.',
        'For the consumer, the risk of loss or damage passes at the moment the consumer (or a third party designated by the consumer, other than the carrier) takes physical possession of the product. For the business customer, the risk passes at the moment the product is handed to the carrier for shipment.',
        'Exceeding an indicative delivery time does not give rise to a claim for damages, except in case of intent or wilful recklessness by TitanBanks or insofar as mandatory law provides otherwise.',
      ],
    },
    {
      id: 'herroeping',
      heading: '8. Right of withdrawal (consumers, 14 days)',
      paragraphs: [
        'This article applies only to consumers.',
        'The consumer has the right to withdraw the agreement within 14 days of receiving the product, without giving any reason. The cooling-off period starts on the day after the consumer (or a designated third party) has received the product. The consumer reports the withdrawal within the cooling-off period by email to info@titan-banks.com or using the model form below. After reporting, the consumer has a further 14 days to return the product.',
        'During the cooling-off period the consumer handles the product and packaging with care. The consumer may only unpack and handle the product to the extent necessary to establish its nature and functioning, as would be permitted in a physical shop. The consumer is liable for any diminished value resulting from handling beyond this.',
        'The direct cost of returning the product is borne by the consumer, unless we state otherwise or the product was defective or incorrect on receipt. We state this in advance so the consumer is aware of it.',
        'We refund the amount paid by the consumer, including the standard delivery costs, within 14 days after we receive the withdrawal, but no earlier than after we have received the product back or the consumer has demonstrated having returned it. Refunds are made using the same means of payment, unless agreed otherwise. The full return procedure is at /legal/policies#returns.',
        'Model withdrawal form — complete and return this only if you wish to withdraw the agreement:',
      ],
      list: [
        'To: NamaCorp VOF (trade name TitanBanks), by email: info@titan-banks.com',
        'I/We (*) hereby give notice that I/we (*) withdraw from my/our (*) contract for the sale of the following product: Titan X 50,000 mAh power bank',
        'Ordered on (*) / received on (*): [date]',
        'Name of consumer(s): [name]',
        'Address of consumer(s): [address]',
        'Date: [date]',
        'Signature of consumer(s) (only if submitted on paper)',
        '(*) Delete as appropriate.',
      ],
    },
    {
      heading: '9. Warranty (manufacturer warranty)',
      paragraphs: [
        'The Titan X power bank carries a 2-year manufacturer warranty from the date of purchase under normal use. This manufacturer warranty is a commercial guarantee and is additional to the consumer’s statutory rights (see article 10), which it does not affect.',
        'The warranty covers manufacturing and material defects. The warranty does NOT cover: damage from dropping or impact, contact with water or moisture, unauthorised opening or repair, use outside the product specifications, failure to follow the usage instructions (article 11), and normal wear.',
        'Keep your invoice; it is required for a warranty claim. Report a claim via info@titan-banks.com. TitanBanks coordinates the handling and chooses, within the limits of the law, between repair and replacement. The cost of sending in a product for a warranty claim is borne by the customer; in case of a recognised warranty claim we reimburse those costs. See also /legal/policies#warranty.',
      ],
    },
    {
      heading: '10. Statutory conformity (consumers)',
      paragraphs: [
        'For the consumer, the product must conform to the agreement: to the specifications stated in the offer, to reasonable requirements of soundness and usability, and to what the consumer may legally expect during the product’s expected lifespan. This statutory right (conformity) exists alongside and independently of the manufacturer warranty and cannot be limited for consumers.',
        'For business customers, the provisions of article 20 apply instead.',
      ],
    },
    {
      id: 'veilig-gebruik',
      heading: '11. Safe use and proper handling of the battery',
      paragraphs: [
        'The Titan X contains a lithium-ion battery. For your safety and that of others, follow the instructions below and the supplied manual.',
      ],
      list: [
        'Only charge and use the product with suitable, undamaged cables and a suitable power source.',
        'Use and store the product within the temperature range stated in the manual; do not expose it to extreme heat, open flame or prolonged direct sunlight.',
        'Do not open, puncture, crush, disassemble, modify or short-circuit the product.',
        'Stop using the product in case of damage, deformation, swelling, leakage, unusual smell or overheating, and contact us.',
        'Do not expose the product to water or moisture unless the specifications expressly allow it.',
        'Keep the product out of the reach of children.',
        'At the end of its life, hand the product in as a battery / chemical waste at a collection point; do not dispose of it with regular household waste.',
      ],
    },
    {
      heading: '12. Product liability',
      paragraphs: [
        'Nothing in these terms excludes or limits our liability insofar as that is not permitted under mandatory law. This applies in particular to liability under the statutory product liability regime (Section 6.3.3 of the Dutch Civil Code) for damage caused by death or personal injury, and for property damage to consumers, caused by a defect in the product.',
        'Without prejudice to the foregoing, we are not liable for damage resulting from incorrect use, failure to follow the usage instructions (article 11), modification or repair by parties other than those designated by us, or use contrary to the product’s intended purpose.',
      ],
    },
    {
      id: 'aansprakelijkheid',
      heading: '13. Liability (general)',
      paragraphs: [
        'Subject to mandatory law and to article 12, our liability towards the customer is limited to the invoice amount of the relevant order.',
        'We are not liable for indirect damage, consequential damage, lost profits, missed savings, loss of data or business losses.',
        'The limitations in this article do not apply in case of intent or wilful recklessness by TitanBanks itself, nor insofar as mandatory law (including consumer protection and article 12) precludes limitation. Further limitations towards business customers are set out in article 20.',
      ],
    },
    {
      heading: '14. Force majeure',
      paragraphs: [
        'In the event of force majeure we are not obliged to perform any obligation and all liability is excluded. We may suspend our obligations for the duration of the force majeure.',
        'Force majeure includes, among other things: failures or shortcomings of suppliers, manufacturers or carriers, stock or raw-material shortages, transport and logistics obstacles, strikes, fire, flooding, energy or internet outages, cyberattacks, pandemics, government measures and all other circumstances beyond our reasonable control.',
        'If the force majeure lasts longer than 30 days, both the customer and TitanBanks may dissolve the agreement in writing for the part that cannot be performed; amounts already paid for products not delivered will then be refunded.',
      ],
    },
    {
      heading: '15. Retention of title',
      paragraphs: [
        'Products delivered remain the property of TitanBanks until the customer has paid in full all amounts due for them. As long as title has not passed, a business customer may not pledge, encumber or transfer ownership of the product to third parties other than in the ordinary course of business.',
      ],
    },
    {
      heading: '16. Intellectual property and trademark rights',
      paragraphs: [
        'All intellectual property rights relating to TitanBanks and its products belong to NamaCorp VOF or its licensors. This includes the trademarks "TitanBanks" and "Titan X", the logo, the trade name, the website, texts, design, photos, videos and the 3D product model.',
        'Nothing in these terms or in the purchase of a product transfers any intellectual property right. These materials may not be copied, reproduced, modified, published or used commercially without prior written permission.',
      ],
    },
    {
      heading: '17. Permitted use of the website',
      paragraphs: [
        'The customer uses titan-banks.com only in a lawful manner. It is not permitted to misuse or disrupt the website or shop, to scrape it, to reverse-engineer it, to introduce malicious software, or to place fraudulent or false orders. We may refuse or terminate access or orders in case of (suspected) misuse.',
      ],
    },
    {
      heading: '18. No resale or commercial use without permission',
      paragraphs: [
        'Products are supplied for the customer’s own use. A purchase does not confer any right to reseller, distributor or partner status, to wholesale volumes, or to use of our trademark and intellectual property rights.',
        'Resale, distribution or other commercial use making use of our trademarks or materials requires TitanBanks’ prior written permission. This provision does not affect the customer’s mandatory rights in respect of the item lawfully acquired.',
      ],
    },
    {
      heading: '19. Personal data',
      paragraphs: [
        'We process personal data in accordance with the General Data Protection Regulation (GDPR). How we do this, for what purpose and what rights you have is set out in our privacy policy at /legal/privacy.',
      ],
    },
    {
      id: 'zakelijk',
      heading: '20. Additional provisions for business customers',
      paragraphs: [
        'This article applies only to business customers and, for them, prevails over conflicting general provisions in these terms. The provisions that apply specifically to consumers — including the right of withdrawal (article 8) and statutory conformity (article 10) — do not apply to business customers.',
      ],
      list: [
        'No right of withdrawal: the business customer has no cooling-off period; an order is final once formed.',
        'Warranty: for business customers only the manufacturer warranty of article 9 applies, to the exclusion of further statutory conformity claims insofar as permitted.',
        'Complaint and limitation periods: the business customer reports visible defects within 48 hours of receipt and non-visible defects within 14 days of discovery, each in writing and on penalty of forfeiture of rights. Any legal claim lapses in any case 12 months after delivery.',
        'Liability: our liability towards the business customer is excluded for all indirect damage, consequential damage, business and downtime losses, lost profits and reputational damage, and is otherwise limited to the invoice amount of the relevant order. Only intent or wilful recklessness by TitanBanks itself is excepted.',
        'Payment and default: on exceeding a payment term the business customer is in default by operation of law, without notice of default, and owes the statutory commercial interest (article 6:119a Dutch Civil Code) and extrajudicial collection costs. We may suspend our obligations while payment is outstanding.',
        'Retention of title: the retention of title in article 15 applies in full until payment in full.',
        'Purchasing terms: any purchasing or other terms of the business customer are expressly rejected.',
        'Indemnification: the business customer fully indemnifies TitanBanks against claims by its own customers or other third parties relating to the products purchased.',
        'Competent court: disputes are submitted exclusively to the competent court of the District Court of Noord-Nederland.',
      ],
    },
    {
      heading: '21. Indemnification',
      paragraphs: [
        'The customer indemnifies TitanBanks against third-party claims arising from incorrect use of the product attributable to the customer, failure to follow the usage instructions (article 11), or a breach of these terms. For consumers this indemnification applies only insofar as the damage can be attributed to the consumer and remains within the limits of mandatory law.',
      ],
    },
    {
      heading: '22. Complaints and disputes',
      paragraphs: [
        'If the customer has a complaint, we are glad to receive it within a reasonable time — for business customers within the periods of article 20 — by email at info@titan-banks.com. We respond within 14 days.',
        'If we cannot resolve the matter together, the consumer may submit the dispute to the European ODR platform via ec.europa.eu/consumers/odr or to the competent court. We are not affiliated with an independent disputes committee.',
      ],
    },
    {
      heading: '23. Applicable law and competent court',
      paragraphs: [
        'These terms and all agreements are governed exclusively by Dutch law. The applicability of the United Nations Convention on Contracts for the International Sale of Goods (CISG) is excluded.',
        'Disputes are submitted to the competent Dutch court. For business customers the choice of forum in article 20 applies. For consumers, the statutory rules on the competent court continue to apply in full.',
      ],
    },
    {
      heading: '24. Partial invalidity',
      paragraphs: [
        'If a provision of these terms is void or voidable, the remaining provisions remain fully in force. The invalid provision is then replaced by a valid provision that approximates the purpose and intent of the original as closely as possible.',
      ],
    },
    {
      heading: '25. No waiver of rights',
      paragraphs: [
        'If at any time we do not exercise, or do not immediately exercise, a right under these terms or the law, this does not constitute a waiver of that right and we may still exercise it later.',
      ],
    },
    {
      heading: '26. Entire agreement',
      paragraphs: [
        'These terms, together with the offer and the order confirmation, constitute the entire agreement between the customer and TitanBanks on its subject matter. For consumers, this does not affect their statutory and pre-contractual rights.',
      ],
    },
    {
      heading: '27. Language',
      paragraphs: [
        'These terms are drawn up in Dutch. Translations are provided for information only; in case of any discrepancy between the Dutch text and a translation, the Dutch text prevails.',
      ],
    },
    {
      heading: '28. Changes to these terms',
      paragraphs: [
        'We may change these terms. The most current version is always available at titan-banks.com/legal/terms. For an order, the version in force at the time of ordering applies.',
      ],
    },
  ],
};

const termsDE: LegalDocument = {
  title: 'Allgemeine Geschäftsbedingungen',
  eyebrow: 'Rechtliches · AGB',
  intro:
    'Diese AGB gelten für jedes Angebot und jeden Vertrag zwischen TitanBanks (eine Handelsmarke der NamaCorp VOF) und dir, egal ob du als Verbraucher oder als Geschäftskunde über titan-banks.com bestellst. Einige Bestimmungen gelten ausschließlich für Verbraucher; die Bestimmungen in Artikel 20 gelten ausschließlich für Geschäftskunden.',
  lastUpdated: TERMS_LAST_UPDATED,
  juristReviewPending: true,
  preliminaryTranslation: true,
  toc: [
    { id: 'definities', label: 'Definitionen' },
    { id: 'herroeping', label: 'Widerrufsrecht' },
    { id: 'veilig-gebruik', label: 'Sicherer Gebrauch' },
    { id: 'aansprakelijkheid', label: 'Haftung' },
    { id: 'zakelijk', label: 'Geschäftskunden' },
  ],
  sections: [
    {
      heading: '1. Identität und Kontakt',
      paragraphs: [
        'TitanBanks ist eine Handelsmarke der NamaCorp VOF, eingetragen bei der niederländischen Handelskammer. Wir verkaufen die Titan X 50.000 mAh Powerbank direkt über titan-banks.com.',
        'In diesen AGB werden NamaCorp VOF und die Handelsmarke TitanBanks als „wir", „uns" oder „TitanBanks" bezeichnet.',
      ],
      list: [
        'Handelsmarke: TitanBanks',
        'Rechtsname und Rechtsform: NamaCorp VOF',
        'Adresse: De Twee Gebroeders 37, 9207 CL Drachten, Niederlande',
        'Handelskammernummer (KvK): 88305139',
        'USt-Identifikationsnummer: NL864572566B01',
        'E-Mail: info@titan-banks.com',
        'Website: titan-banks.com',
      ],
    },
    {
      id: 'definities',
      heading: '2. Definitionen',
      list: [
        'Verbraucher: eine natürliche Person, die nicht in Ausübung eines Berufs oder Gewerbes handelt.',
        'Geschäftskunde: eine natürliche oder juristische Person, die in Ausübung eines Berufs oder Gewerbes handelt.',
        'Kunde: sowohl der Verbraucher als auch der Geschäftskunde.',
        'Produkt: die Titan X 50.000 mAh Powerbank und etwaiges Zubehör.',
        'Vertrag: der im Fernabsatz geschlossene Kaufvertrag zwischen TitanBanks und dem Kunden.',
        'Schriftlich: per Brief oder per E-Mail.',
        'Werktag: ein Kalendertag mit Ausnahme von Wochenenden und in den Niederlanden anerkannten Feiertagen.',
        'Widerrufsrecht: das Recht des Verbrauchers, den Vertrag innerhalb der Widerrufsfrist aufzulösen.',
      ],
    },
    {
      heading: '3. Geltungsbereich und Rangfolge',
      paragraphs: [
        'Diese AGB gelten für jedes Angebot von TitanBanks und für jeden über titan-banks.com geschlossenen Fernabsatzvertrag. Mit der Bestellung akzeptiert der Kunde diese AGB.',
        'Bestimmungen, die nur für Verbraucher gelten, sind als solche gekennzeichnet. Artikel 20 gilt nur für Geschäftskunden und geht bei einem Geschäftskunden abweichenden allgemeinen Bestimmungen dieser AGB vor. Die Geltung etwaiger Einkaufs- oder sonstiger Bedingungen eines Geschäftskunden wird ausdrücklich zurückgewiesen.',
        'Zwingende Bestimmungen des Verbraucherrechts gehen, soweit sie auf einen Verbraucher anwendbar sind, diesen AGB stets vor. Nichts in diesen AGB soll die gesetzlichen Rechte des Verbrauchers einschränken.',
      ],
    },
    {
      heading: '4. Angebot und Preise',
      paragraphs: [
        'Alle Preise auf titan-banks.com verstehen sich in Euro. Für Verbraucher sind die Preise inklusive MwSt.; für Geschäftskunden kann der Preis ohne MwSt. angegeben werden. Versandkosten werden, soweit zutreffend, vor Abschluss der Bestellung angezeigt.',
        'Ein Angebot ist freibleibend und gilt solange der Vorrat reicht. Offensichtliche Irrtümer oder Schreibfehler im Angebot, in Preisen oder in Produktinformationen binden TitanBanks nicht.',
        'Wir behalten uns Preisänderungen vor. Für eine aufgegebene Bestellung gilt der zum Bestellzeitpunkt angegebene Preis.',
      ],
    },
    {
      heading: '5. Zustandekommen des Vertrags',
      paragraphs: [
        'Der Vertrag kommt zustande, wenn der Kunde eine Bestellung aufgibt und TitanBanks diese schriftlich (per E-Mail) bestätigt.',
        'Wir behalten uns vor, eine Bestellung ohne Angabe von Gründen abzulehnen oder an zusätzliche Bedingungen zu knüpfen, etwa bei Verdacht auf Betrug, Missbrauch, Zahlungsausfall oder unzureichendem Lagerbestand. Ist eine abgelehnte Bestellung bereits bezahlt, erstatten wir den gezahlten Betrag.',
      ],
    },
    {
      heading: '6. Zahlung',
      paragraphs: [
        'Die Zahlung erfolgt über die bei der Bestellung angebotenen Zahlungsmethoden (wie iDEAL, Kreditkarte oder Apple Pay). Transaktionen werden sicher von unserem Zahlungsdienstleister abgewickelt; wir erhalten und speichern selbst keine vollständigen Kartendaten.',
        'Der Kunde ist für die Angabe korrekter Zahlungs- und Adressdaten verantwortlich. Zusätzliche Zahlungsbestimmungen für Geschäftskunden finden sich in Artikel 20.',
      ],
    },
    {
      heading: '7. Lieferung und Gefahrübergang',
      paragraphs: [
        'Wir bemühen uns, Bestellungen innerhalb von 1 bis 3 Werktagen nach Zahlungseingang zu versenden. Genannte Liefer- und Zustellzeiten sind unverbindlich und keine festen Fristen. Versandkosten und Laufzeiten pro Zone: /legal/policies#shipping.',
        'Für den Verbraucher geht die Gefahr des Verlusts oder der Beschädigung über, sobald der Verbraucher (oder ein von ihm benannter Dritter, nicht der Beförderer) das Produkt tatsächlich in Besitz nimmt. Für den Geschäftskunden geht die Gefahr über, sobald das Produkt zum Versand an den Beförderer übergeben wird.',
        'Die Überschreitung einer unverbindlichen Lieferzeit begründet keinen Schadensersatzanspruch, außer bei Vorsatz oder bewusster Leichtfertigkeit von TitanBanks oder soweit zwingendes Recht etwas anderes bestimmt.',
      ],
    },
    {
      id: 'herroeping',
      heading: '8. Widerrufsrecht (Verbraucher, 14 Tage)',
      paragraphs: [
        'Dieser Artikel gilt ausschließlich für Verbraucher.',
        'Der Verbraucher hat das Recht, den Vertrag innerhalb von 14 Tagen nach Erhalt des Produkts ohne Angabe von Gründen zu widerrufen. Die Widerrufsfrist beginnt am Tag nachdem der Verbraucher (oder ein benannter Dritter) das Produkt erhalten hat. Der Verbraucher meldet den Widerruf innerhalb der Frist per E-Mail an info@titan-banks.com oder über das untenstehende Muster-Formular. Nach der Meldung hat der Verbraucher weitere 14 Tage, um das Produkt zurückzusenden.',
        'Während der Widerrufsfrist geht der Verbraucher sorgfältig mit Produkt und Verpackung um. Der Verbraucher darf das Produkt nur in dem Umfang auspacken und handhaben, der erforderlich ist, um Art und Funktionsweise festzustellen, wie es auch in einem Ladengeschäft zulässig wäre. Der Verbraucher haftet für einen Wertverlust, der auf einen darüber hinausgehenden Umgang zurückzuführen ist.',
        'Die unmittelbaren Kosten der Rücksendung trägt der Verbraucher, sofern wir nichts anderes mitteilen oder das Produkt bei Erhalt defekt oder falsch war. Wir weisen darauf im Voraus hin, damit der Verbraucher davon Kenntnis hat.',
        'Wir erstatten den vom Verbraucher gezahlten Betrag einschließlich der Standard-Lieferkosten innerhalb von 14 Tagen, nachdem wir den Widerruf erhalten haben, jedoch nicht früher, als bis wir das Produkt zurückerhalten haben oder der Verbraucher die Rücksendung nachgewiesen hat. Die Erstattung erfolgt mit demselben Zahlungsmittel, sofern nichts anderes vereinbart wurde. Das vollständige Rückgabeverfahren: /legal/policies#returns.',
        'Muster-Widerrufsformular — bitte nur ausfüllen und zurücksenden, wenn du den Vertrag widerrufen möchtest:',
      ],
      list: [
        'An: NamaCorp VOF (Handelsmarke TitanBanks), per E-Mail: info@titan-banks.com',
        'Ich/Wir (*) widerrufe(n) hiermit den von mir/uns (*) abgeschlossenen Vertrag über den Kauf des folgenden Produkts: Titan X 50.000 mAh Powerbank',
        'Bestellt am (*) / erhalten am (*): [Datum]',
        'Name des/der Verbraucher(s): [Name]',
        'Anschrift des/der Verbraucher(s): [Anschrift]',
        'Datum: [Datum]',
        'Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)',
        '(*) Unzutreffendes streichen.',
      ],
    },
    {
      heading: '9. Garantie (Herstellergarantie)',
      paragraphs: [
        'Auf die Titan X Powerbank gewähren wir 2 Jahre Herstellergarantie ab Kaufdatum bei normalem Gebrauch. Diese Herstellergarantie ist eine gewerbliche Garantie und besteht zusätzlich zu den gesetzlichen Rechten des Verbrauchers (siehe Artikel 10), die sie unberührt lässt.',
        'Die Garantie deckt Fabrikations- und Materialfehler. Die Garantie deckt NICHT: Schäden durch Stürze oder Stöße, Kontakt mit Wasser oder Feuchtigkeit, unbefugtes Öffnen oder Reparieren, Gebrauch außerhalb der Produktspezifikationen, Nichtbeachtung der Gebrauchsanweisungen (Artikel 11) und normale Abnutzung.',
        'Bewahre die Rechnung auf; sie ist für einen Garantieanspruch erforderlich. Einen Anspruch meldest du über info@titan-banks.com. TitanBanks koordiniert die Abwicklung und wählt im Rahmen des Gesetzes zwischen Reparatur und Ersatz. Die Kosten der Einsendung eines Produkts für einen Garantieanspruch trägt der Kunde; bei einem anerkannten Garantiefall erstatten wir diese Kosten. Siehe auch /legal/policies#warranty.',
      ],
    },
    {
      heading: '10. Gesetzliche Vertragsmäßigkeit (Verbraucher)',
      paragraphs: [
        'Für den Verbraucher gilt, dass das Produkt dem Vertrag entsprechen muss: den im Angebot genannten Spezifikationen, vernünftigen Anforderungen an Zuverlässigkeit und Brauchbarkeit sowie dem, was der Verbraucher gesetzlich während der zu erwartenden Lebensdauer des Produkts erwarten darf. Dieses gesetzliche Recht (Vertragsmäßigkeit) besteht neben und unabhängig von der Herstellergarantie und kann für Verbraucher nicht eingeschränkt werden.',
        'Für Geschäftskunden gelten stattdessen die Bestimmungen in Artikel 20.',
      ],
    },
    {
      id: 'veilig-gebruik',
      heading: '11. Sicherer Gebrauch und richtiger Umgang mit dem Akku',
      paragraphs: [
        'Die Titan X enthält einen Lithium-Ionen-Akku. Befolge zu deiner Sicherheit und der anderer die folgenden Hinweise und die mitgelieferte Anleitung.',
      ],
      list: [
        'Lade und benutze das Produkt nur mit geeigneten, unbeschädigten Kabeln und einer geeigneten Stromquelle.',
        'Benutze und lagere das Produkt innerhalb des in der Anleitung angegebenen Temperaturbereichs; setze es nicht extremer Hitze, offenem Feuer oder längerer direkter Sonneneinstrahlung aus.',
        'Öffne, durchbohre, zerdrücke, zerlege, verändere oder kurzschließe das Produkt nicht.',
        'Benutze das Produkt nicht weiter bei Beschädigung, Verformung, Aufblähung, Auslaufen, ungewöhnlichem Geruch oder Überhitzung und kontaktiere uns.',
        'Setze das Produkt keinem Wasser oder keiner Feuchtigkeit aus, sofern die Spezifikationen dies nicht ausdrücklich zulassen.',
        'Bewahre das Produkt außerhalb der Reichweite von Kindern auf.',
        'Gib das Produkt am Ende seiner Lebensdauer als Batterie/Sondermüll bei einer Sammelstelle ab; entsorge es nicht über den normalen Hausmüll.',
      ],
    },
    {
      heading: '12. Produkthaftung',
      paragraphs: [
        'Nichts in diesen AGB schließt unsere Haftung aus oder beschränkt sie, soweit dies nach zwingendem Recht nicht zulässig ist. Dies gilt insbesondere für die Haftung nach der gesetzlichen Produkthaftungsregelung (Abschnitt 6.3.3 des niederländischen Bürgerlichen Gesetzbuchs) für Schäden durch Tod oder Körperverletzung sowie für Sachschäden bei Verbrauchern, die durch einen Fehler des Produkts verursacht werden.',
        'Unbeschadet des Vorstehenden haften wir nicht für Schäden infolge unsachgemäßen Gebrauchs, Nichtbeachtung der Gebrauchsanweisungen (Artikel 11), Änderung oder Reparatur durch andere als von uns benannte Parteien oder bestimmungswidrigen Gebrauchs.',
      ],
    },
    {
      id: 'aansprakelijkheid',
      heading: '13. Haftung (allgemein)',
      paragraphs: [
        'Vorbehaltlich zwingenden Rechts und vorbehaltlich Artikel 12 ist unsere Haftung gegenüber dem Kunden auf den Rechnungsbetrag der betreffenden Bestellung begrenzt.',
        'Für mittelbare Schäden, Folgeschäden, entgangenen Gewinn, entgangene Einsparungen, Datenverlust oder Betriebsschäden haften wir nicht.',
        'Die Beschränkungen dieses Artikels gelten nicht bei Vorsatz oder bewusster Leichtfertigkeit von TitanBanks selbst und auch nicht, soweit zwingendes Recht (einschließlich des Verbraucherschutzes und Artikel 12) einer Beschränkung entgegensteht. Weitergehende Beschränkungen gegenüber Geschäftskunden finden sich in Artikel 20.',
      ],
    },
    {
      heading: '14. Höhere Gewalt',
      paragraphs: [
        'Im Fall höherer Gewalt sind wir nicht zur Erfüllung einer Verpflichtung verpflichtet und jegliche Haftung ist ausgeschlossen. Wir dürfen unsere Verpflichtungen für die Dauer der höheren Gewalt aussetzen.',
        'Unter höherer Gewalt sind unter anderem zu verstehen: Störungen oder Ausfälle bei Lieferanten, Herstellern oder Beförderern, Lager- oder Rohstoffmangel, Transport- und Logistikhindernisse, Streiks, Brand, Überschwemmung, Energie- oder Internetausfälle, Cyberangriffe, Pandemien, behördliche Maßnahmen und alle sonstigen Umstände außerhalb unserer angemessenen Kontrolle.',
        'Dauert die höhere Gewalt länger als 30 Tage, dürfen sowohl der Kunde als auch TitanBanks den Vertrag für den nicht erfüllbaren Teil schriftlich auflösen; bereits gezahlte Beträge für nicht gelieferte Produkte werden dann erstattet.',
      ],
    },
    {
      heading: '15. Eigentumsvorbehalt',
      paragraphs: [
        'Gelieferte Produkte bleiben Eigentum von TitanBanks, bis der Kunde alle dafür geschuldeten Beträge vollständig bezahlt hat. Solange das Eigentum nicht übergegangen ist, darf ein Geschäftskunde das Produkt nicht verpfänden, belasten oder an Dritte übereignen, außer im Rahmen seines normalen Geschäftsbetriebs.',
      ],
    },
    {
      heading: '16. Geistiges Eigentum und Markenrechte',
      paragraphs: [
        'Alle Rechte des geistigen Eigentums in Bezug auf TitanBanks und ihre Produkte stehen NamaCorp VOF oder ihren Lizenzgebern zu. Dazu gehören unter anderem die Marken „TitanBanks" und „Titan X", das Logo, der Handelsname, die Website, Texte, Gestaltung, Fotos, Videos und das 3D-Produktmodell.',
        'Nichts in diesen AGB oder im Kauf eines Produkts überträgt ein Recht des geistigen Eigentums. Diese Materialien dürfen ohne vorherige schriftliche Genehmigung nicht kopiert, vervielfältigt, geändert, veröffentlicht oder kommerziell genutzt werden.',
      ],
    },
    {
      heading: '17. Zulässige Nutzung der Website',
      paragraphs: [
        'Der Kunde nutzt titan-banks.com ausschließlich auf rechtmäßige Weise. Es ist nicht gestattet, die Website oder den Shop zu missbrauchen oder zu stören, automatisiert auszulesen (Scraping), zurückzuentwickeln, mit Schadsoftware zu versehen oder betrügerische oder falsche Bestellungen aufzugeben. Wir dürfen den Zugang oder Bestellungen bei (Verdacht auf) Missbrauch verweigern oder beenden.',
      ],
    },
    {
      heading: '18. Kein Weiterverkauf oder kommerzielle Nutzung ohne Genehmigung',
      paragraphs: [
        'Produkte werden zum Eigengebrauch des Kunden geliefert. Aus einem Kauf können keine Rechte auf einen Wiederverkäufer-, Vertriebs- oder Partnerstatus, auf Großhandelsmengen oder auf die Nutzung unserer Marken- und Schutzrechte abgeleitet werden.',
        'Für Weiterverkauf, Vertrieb oder sonstige kommerzielle Nutzung unter Verwendung unserer Marken oder Materialien ist die vorherige schriftliche Genehmigung von TitanBanks erforderlich. Diese Bestimmung lässt die zwingenden Rechte des Kunden in Bezug auf das von ihm rechtmäßig erworbene Exemplar unberührt.',
      ],
    },
    {
      heading: '19. Personenbezogene Daten',
      paragraphs: [
        'Wir verarbeiten personenbezogene Daten im Einklang mit der Datenschutz-Grundverordnung (DSGVO). Wie wir das tun, zu welchem Zweck und welche Rechte du hast, steht in unserer Datenschutzerklärung unter /legal/privacy.',
      ],
    },
    {
      id: 'zakelijk',
      heading: '20. Zusätzliche Bestimmungen für Geschäftskunden',
      paragraphs: [
        'Dieser Artikel gilt ausschließlich für Geschäftskunden und geht bei ihnen abweichenden allgemeinen Bestimmungen dieser AGB vor. Die speziell für Verbraucher geltenden Bestimmungen — darunter das Widerrufsrecht (Artikel 8) und die gesetzliche Vertragsmäßigkeit (Artikel 10) — gelten nicht für Geschäftskunden.',
      ],
      list: [
        'Kein Widerrufsrecht: Der Geschäftskunde hat keine Widerrufsfrist; eine Bestellung ist nach Zustandekommen endgültig.',
        'Garantie: Für Geschäftskunden gilt ausschließlich die Herstellergarantie aus Artikel 9, unter Ausschluss weitergehender gesetzlicher Vertragsmäßigkeitsansprüche, soweit zulässig.',
        'Rüge- und Verfallfristen: Der Geschäftskunde rügt sichtbare Mängel innerhalb von 48 Stunden nach Erhalt und nicht sichtbare Mängel innerhalb von 14 Tagen nach Entdeckung, jeweils schriftlich und bei Verlust der Rechte. Jeder Rechtsanspruch verfällt in jedem Fall 12 Monate nach Lieferung.',
        'Haftung: Unsere Haftung gegenüber dem Geschäftskunden ist für alle mittelbaren Schäden, Folgeschäden, Betriebs- und Stillstandsschäden, entgangenen Gewinn und Reputationsschäden ausgeschlossen und im Übrigen auf den Rechnungsbetrag der betreffenden Bestellung begrenzt. Nur Vorsatz oder bewusste Leichtfertigkeit von TitanBanks selbst ist hiervon ausgenommen.',
        'Zahlung und Verzug: Bei Überschreitung einer Zahlungsfrist befindet sich der Geschäftskunde von Rechts wegen in Verzug, ohne Mahnung, und schuldet die gesetzlichen Verzugszinsen für Handelsgeschäfte (Artikel 6:119a niederländisches BGB) sowie außergerichtliche Inkassokosten. Wir dürfen unsere Verpflichtungen aussetzen, solange die Zahlung aussteht.',
        'Eigentumsvorbehalt: Der Eigentumsvorbehalt aus Artikel 15 gilt uneingeschränkt bis zur vollständigen Zahlung.',
        'Einkaufsbedingungen: Etwaige Einkaufs- oder sonstige Bedingungen des Geschäftskunden werden ausdrücklich zurückgewiesen.',
        'Freistellung: Der Geschäftskunde stellt TitanBanks vollständig von Ansprüchen seiner eigenen Abnehmer oder sonstiger Dritter frei, die mit den abgenommenen Produkten zusammenhängen.',
        'Zuständiges Gericht: Streitigkeiten werden ausschließlich dem zuständigen Gericht der Rechtbank Noord-Nederland vorgelegt.',
      ],
    },
    {
      heading: '21. Freistellung',
      paragraphs: [
        'Der Kunde stellt TitanBanks von Ansprüchen Dritter frei, die aus einem dem Kunden zuzurechnenden unsachgemäßen Gebrauch des Produkts, der Nichtbeachtung der Gebrauchsanweisungen (Artikel 11) oder einem Verstoß gegen diese AGB entstehen. Für Verbraucher gilt diese Freistellung nur, soweit der Schaden dem Verbraucher zugerechnet werden kann, und bleibt innerhalb der Grenzen des zwingenden Rechts.',
      ],
    },
    {
      heading: '22. Beschwerden und Streitigkeiten',
      paragraphs: [
        'Hat der Kunde eine Beschwerde, erhalten wir sie gern innerhalb angemessener Frist — für Geschäftskunden innerhalb der Fristen von Artikel 20 — per E-Mail an info@titan-banks.com. Wir antworten innerhalb von 14 Tagen.',
        'Können wir uns nicht einigen, kann der Verbraucher den Streit über die EU-ODR-Plattform unter ec.europa.eu/consumers/odr oder dem zuständigen Gericht vorlegen. Wir sind keiner unabhängigen Schlichtungsstelle angeschlossen.',
      ],
    },
    {
      heading: '23. Anwendbares Recht und zuständiges Gericht',
      paragraphs: [
        'Auf diese AGB und alle Verträge ist ausschließlich niederländisches Recht anwendbar. Die Anwendbarkeit des UN-Kaufrechts (CISG) ist ausgeschlossen.',
        'Streitigkeiten werden dem zuständigen niederländischen Gericht vorgelegt. Für Geschäftskunden gilt die Gerichtsstandswahl aus Artikel 20. Für Verbraucher gelten die gesetzlichen Regeln über das zuständige Gericht uneingeschränkt weiter.',
      ],
    },
    {
      heading: '24. Salvatorische Klausel',
      paragraphs: [
        'Ist eine Bestimmung dieser AGB nichtig oder anfechtbar, bleiben die übrigen Bestimmungen vollständig in Kraft. An die Stelle der ungültigen Bestimmung tritt dann eine gültige Bestimmung, die dem Zweck und der Absicht der ursprünglichen Bestimmung möglichst nahekommt.',
      ],
    },
    {
      heading: '25. Kein Verzicht auf Rechte',
      paragraphs: [
        'Üben wir ein Recht aus diesen AGB oder dem Gesetz zu einem bestimmten Zeitpunkt nicht oder nicht sofort aus, bedeutet dies keinen Verzicht auf dieses Recht und wir können es später noch ausüben.',
      ],
    },
    {
      heading: '26. Gesamte Vereinbarung',
      paragraphs: [
        'Diese AGB bilden zusammen mit dem Angebot und der Auftragsbestätigung die gesamte Vereinbarung zwischen dem Kunden und TitanBanks über deren Gegenstand. Für Verbraucher bleiben ihre gesetzlichen und vorvertraglichen Rechte hiervon unberührt.',
      ],
    },
    {
      heading: '27. Sprache',
      paragraphs: [
        'Diese AGB sind in niederländischer Sprache abgefasst. Übersetzungen werden nur zu Informationszwecken bereitgestellt; bei Abweichungen zwischen dem niederländischen Text und einer Übersetzung ist der niederländische Text maßgeblich.',
      ],
    },
    {
      heading: '28. Änderungen dieser AGB',
      paragraphs: [
        'Wir dürfen diese AGB ändern. Die jeweils aktuelle Fassung ist stets unter titan-banks.com/legal/terms verfügbar. Für eine Bestellung gilt die zum Bestellzeitpunkt gültige Fassung.',
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
        'Rest van de wereld — op aanvraag, neem contact op via info@titan-banks.com.',
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
        'Je meldt het retour aan via info@titan-banks.com binnen 14 dagen.',
        'Je verstuurt het product binnen 14 dagen na aanmelding.',
        'Retourkosten zijn voor jouw rekening, tenzij wij anders aangeven (bv. defect bij ontvangst).',
        'Wij betalen het volledige aankoopbedrag terug binnen 14 dagen na ontvangst van het geretourneerde product.',
      ],
    },
    {
      id: 'warranty',
      heading: 'Garantie',
      paragraphs: [
        'Op de Titan X powerbank zit 2 jaar fabrieksgarantie bij normaal gebruik. Bij defect of storing nemen wij of de fabrikant de reparatie of vervanging op ons. Wij werken nog uit of TitanBanks of de fabrikant de claim afhandelt — tot dan: meld een claim via info@titan-banks.com en wij coördineren het proces.',
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
        'Rest of world — on request, contact info@titan-banks.com.',
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
        'You notify us of the return via info@titan-banks.com within 14 days.',
        'You ship the product within 14 days of notification.',
        'Return shipping is at your expense, unless we state otherwise (e.g. defective on arrival).',
        'We refund the full purchase amount within 14 days after we receive the returned product.',
      ],
    },
    {
      id: 'warranty',
      heading: 'Warranty',
      paragraphs: [
        'The Titan X power bank carries a 2-year manufacturer warranty under normal use. If a unit fails, we or the manufacturer take care of repair or replacement. We are still working out whether TitanBanks or the manufacturer handles claims — for now, file a claim via info@titan-banks.com and we coordinate the process.',
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
        'Restliche Welt — auf Anfrage, kontaktiere info@titan-banks.com.',
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
        'Du meldest die Rücksendung innerhalb von 14 Tagen unter info@titan-banks.com.',
        'Du versendest das Produkt innerhalb von 14 Tagen nach der Anmeldung.',
        'Die Rücksendekosten trägst du, außer wir teilen anderes mit (z.B. Defekt bei Erhalt).',
        'Wir erstatten den vollen Kaufpreis innerhalb von 14 Tagen nach Eingang der Rücksendung.',
      ],
    },
    {
      id: 'warranty',
      heading: 'Garantie',
      paragraphs: [
        'Auf die Titan X Powerbank gewähren wir 2 Jahre Herstellergarantie bei normalem Gebrauch. Bei Defekt übernehmen wir oder der Hersteller die Reparatur oder den Austausch. Wir klären gerade, ob TitanBanks oder der Hersteller Garantieansprüche bearbeitet — bis dahin: melde dich via info@titan-banks.com, wir koordinieren den Prozess.',
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
