// =============================================
// TITAN X — Single Source of Truth voor product claims
// =============================================
// Elke component MOET hieruit importeren in plaats van hardcoded strings.
// Bron: assets/01_BRAND_CONTEXT/product_specs.md + brand documenten.
//
// Status legenda:
//   CONFIRMED  — bevestigd via brand-context, renderbaar
//   TBD        — open question, mag NIET in UI verschijnen tot bevestigd
//   FORBIDDEN  — expliciet niet claimen (zie forbidden_claims.md)
//
// Bij twijfel: lees assets/01_BRAND_CONTEXT/forbidden_claims.md
// =============================================

export type ClaimStatus = 'CONFIRMED' | 'TBD' | 'FORBIDDEN';

export interface ProductClaim<T> {
  value: T;
  status: ClaimStatus;
  source?: string;
}

/**
 * Helper — return value alleen als CONFIRMED, anders fallback (default: null).
 * UI gebruikt dit om TBD-data niet te renderen.
 */
export function safe<T>(claim: ProductClaim<T>, fallback: T | null = null): T | null {
  return claim.status === 'CONFIRMED' ? claim.value : fallback;
}

// =============================================
// PRODUCT IDENTITY
// =============================================

export const BRAND = {
  wordmark: 'TITANBANKS', // logo / wordmark spelling — exact, no variations
  text: 'TitanBanks', // brand-tekst in body copy
  product: 'Titan X',
  tagline: 'Never at 0.',
} as const;

// =============================================
// CONFIRMED SPECS (renderbaar)
// =============================================

export const SPECS = {
  capacityMah: {
    value: 50000,
    status: 'CONFIRMED',
    source: 'product_specs.md',
  } satisfies ProductClaim<number>,

  // OUTPUT-poorten: 4× USB-A op de top-side. Géén losse USB-C of
  // Micro-USB port — de USB-C en Lightning hieronder zijn INGEBOUWDE
  // kabels (tethered), geen sockets. Onderscheid is belangrijk voor
  // accurate spec-communicatie en marketplace-listings.
  portsUsbA: {
    value: 4,
    status: 'CONFIRMED',
    source: 'user-correction 2026-05-28',
  } satisfies ProductClaim<number>,

  /** Ingebouwde, intrekbare USB-C laadkabel (tethered, geen port). */
  builtInCableUsbC: {
    value: true,
    status: 'CONFIRMED',
    source: 'user-correction 2026-05-28',
  } satisfies ProductClaim<boolean>,

  /** Ingebouwde, intrekbare Lightning laadkabel (tethered, geen port). */
  builtInCableLightning: {
    value: true,
    status: 'CONFIRMED',
    source: 'user-correction 2026-05-28',
  } satisfies ProductClaim<boolean>,

  simultaneousDevices: {
    value: 6,
    status: 'CONFIRMED',
    source: 'Brand document.md:127',
  } satisfies ProductClaim<number>,

  hasLedDisplay: {
    value: true,
    status: 'CONFIRMED',
    source: 'product_specs.md',
  } satisfies ProductClaim<boolean>,

  hasFlashlight: {
    value: true,
    status: 'CONFIRMED',
    source: 'product_specs.md',
  } satisfies ProductClaim<boolean>,

  hasPowerButton: {
    value: true,
    status: 'CONFIRMED',
    source: 'product_specs.md',
  } satisfies ProductClaim<boolean>,

  finish: {
    value: 'matte black',
    status: 'CONFIRMED',
    source: 'product_specs.md',
  } satisfies ProductClaim<string>,

  carryLoop: {
    value: 'orange woven loop, embossed "POWER BANK"',
    status: 'CONFIRMED',
    source: 'product_specs.md',
  } satisfies ProductClaim<string>,

  warrantyYears: {
    value: 2,
    status: 'CONFIRMED',
    source: 'site-defaults',
  } satisfies ProductClaim<number>,
};

// =============================================
// TBD — antwoorden bevestigd via Telegram-checkpoint 1
// =============================================
// Wat nog open staat (cells) blijft TBD totdat user antwoordt.

export const TBD = {
  fastChargeWattage: {
    value: 22.5,
    status: 'CONFIRMED',
    source: 'Telegram checkpoint 1, vraag 3 — antwoord B (22.5W)',
  } satisfies ProductClaim<number>,

  priceEur: {
    value: 59.99,
    status: 'CONFIRMED',
    source: 'Telegram checkpoint 1, vraag 2 — €59,99 incl. BTW',
  } satisfies ProductClaim<number>,

  anchorPriceEur: {
    value: 0,
    status: 'TBD',
    source: 'user koos geen anchor — niet renderen',
  } satisfies ProductClaim<number>,

  weightGrams: {
    value: 758,
    status: 'CONFIRMED',
    source: 'Telegram checkpoint 1, vraag 5',
  } satisfies ProductClaim<number>,

  dimensionsMm: {
    value: '148 × 69 × 68 mm',
    status: 'CONFIRMED',
    source: 'Telegram checkpoint 1, vraag 5',
  } satisfies ProductClaim<string>,

  freeShippingCountries: {
    value: [] as string[],
    status: 'CONFIRMED',
    source: 'Telegram checkpoint 1, vraag 6 — GEEN gratis verzending bij launch (later evt)',
  } satisfies ProductClaim<string[]>,

  returnPolicyDays: {
    value: 14,
    status: 'CONFIRMED',
    source: 'Telegram checkpoint 1, vraag 6 — 14 dagen retour',
  } satisfies ProductClaim<number>,

  kvkNumber: {
    value: '88305139',
    status: 'CONFIRMED',
    source: 'Telegram checkpoint 1, vraag 7 — Namacorp VOF',
  } satisfies ProductClaim<string>,

  businessAddress: {
    value: 'De Twee Gebroeders 37, 9207 CL Drachten',
    status: 'CONFIRMED',
    source: 'Telegram checkpoint 1, vraag 7',
  } satisfies ProductClaim<string>,

  certifications: {
    value: ['CE', 'FCC', 'RoHS', 'UN38.3'] as Array<'CE' | 'FCC' | 'RoHS' | 'UN38.3'>,
    status: 'CONFIRMED',
    source: 'Telegram checkpoint 1, vraag 8 — antwoord A (volledige set)',
  } satisfies ProductClaim<Array<'CE' | 'FCC' | 'RoHS' | 'UN38.3'>>,

  cellSupplier: {
    value: '',
    status: 'TBD',
    source: 'open — gebruiker heeft nog niet bevestigd (Panasonic NCR / LG INR / Samsung INR)',
  } satisfies ProductClaim<string>,

  /** @deprecated SPECS.builtInCableUsbC + SPECS.builtInCableLightning bevatten nu de specifieke kabels. */
  hasRetractableCables: {
    value: true,
    status: 'CONFIRMED',
    source: 'Telegram checkpoint 1, vraag 10 — bevestigd aanwezig',
  } satisfies ProductClaim<boolean>,

  hasSosMode: {
    value: false,
    status: 'CONFIRMED',
    source: 'Telegram checkpoint 1, vraag 10 — flashlight heeft GEEN SOS',
  } satisfies ProductClaim<boolean>,
};

// =============================================
// FORBIDDEN — NOOIT in UI
// =============================================
// Bron: assets/01_BRAND_CONTEXT/forbidden_claims.md
// Reden: zie tabel in plan.

export const FORBIDDEN_PHRASES = [
  // Luchtvaart — 50.000 mAh ≈ 185 Wh, ver boven 100 Wh ICAO-limiet
  'TSA-approved',
  'TSA approved',
  'flight-safe',
  'flight safe',
  'carry-on',
  'carry on',
  'airplane',
  'airport',
  'perfect for flights',
  'cabin baggage',
  'handbagage',
  'in het vliegtuig',
  'meenemen vliegtuig',

  // Specifieke wattage tot bevestigd
  '65W',
  '100W',
  '120W',

  // Micro-USB / extra USB-C als losse port (er zit GEEN Micro-USB port
  // op het product, en de USB-C is een ingebouwde kabel niet een socket).
  'Micro-USB',
  '1× USB-C port',
  '1× USB-C socket',
  'output via Micro-USB',

  // Verzonnen reviews / counts
  '2.400+ reviews',
  '2400+ reviews',
  '10.000+ klanten',
  '10000+ klanten',
  '10.000+ tevreden',
];

// =============================================
// HELPERS — pre-launch state
// =============================================

export const LAUNCH_STATE = {
  /** Site is pre-launch — geen echte reviews/klantbase nog (Reviews-component
   *  blijft pre-launch placeholder). */
  isPreLaunch: true,
  /**
   * Waitlist-modus is per 2026-05-23 UIT — V2 webshop toont direct Buy-CTA's.
   * Zie [[feedback-titanbanks-no-teaser-no-preview]]. CTA-fallback naar
   *  `#waitlist` werkt niet meer; alles drijft naar Ecwid addToCart of /shop.
   */
  waitlistMode: false,
} as const;

// =============================================
// COPY-BUILDERS — gebruiken safe() zodat TBD niet rendert
// =============================================

/** "50.000 mAh" — altijd renderbaar */
export function capacityLabel(): string {
  return `${SPECS.capacityMah.value.toLocaleString('nl-NL')} mAh`;
}

/**
 * "4× USB-A · ingebouwde USB-C + Lightning kabel" — altijd renderbaar.
 *
 * Bewust GEEN losse USB-C of Micro-USB port noemen: de USB-C en
 * Lightning op het product zijn INGEBOUWDE/TETHERED kabels, niet
 * sockets. Onderscheid voorkomt misleidende claims op de listing.
 */
export function portsLabel(): string {
  const cables: string[] = [];
  if (SPECS.builtInCableUsbC.value) cables.push('USB-C');
  if (SPECS.builtInCableLightning.value) cables.push('Lightning');
  const cableStr = cables.length > 0 ? ` · ingebouwde ${cables.join(' + ')} kabel` : '';
  return `${SPECS.portsUsbA.value}× USB-A${cableStr}`;
}

/**
 * Compacte vorm voor specs-tabellen — "4× USB-A + USB-C/Lightning kabel".
 */
export function portsLabelCompact(): string {
  const cables: string[] = [];
  if (SPECS.builtInCableUsbC.value) cables.push('USB-C');
  if (SPECS.builtInCableLightning.value) cables.push('Lightning');
  const cableStr = cables.length > 0 ? ` + ${cables.join('/')} kabel` : '';
  return `${SPECS.portsUsbA.value}× USB-A${cableStr}`;
}

/** Format euro met NL-conventie (€59,99 of €89 voor ronde getallen) */
function formatEuro(amount: number): string {
  if (Number.isInteger(amount)) return `€${amount}`;
  return `€${amount.toFixed(2).replace('.', ',')}`;
}

/** Prijs in euro — null als TBD */
export function priceLabel(): string | null {
  const price = safe(TBD.priceEur);
  return price && price > 0 ? formatEuro(price) : null;
}

/** Anchor prijs (doorgestreept) — null als TBD of niet zinvol */
export function anchorPriceLabel(): string | null {
  const anchor = safe(TBD.anchorPriceEur);
  return anchor && anchor > 0 ? formatEuro(anchor) : null;
}
