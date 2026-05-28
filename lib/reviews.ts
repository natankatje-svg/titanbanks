// =============================================
// REVIEWS — TitanBanks SSOT
// =============================================
// Single source of truth voor handmatig-gecureerde reviews. Bedoeld voor
// de transitie-fase: HelpfulCrowd (Ecwid app) verzorgt het schaalpad voor
// alle batch-N reviews via verified-buyer email-flow, maar voor de eerste
// paar reviews (vader, vrienden, beta-testers) plaatsen we hier handmatig
// zodat ze direct live staan zonder te wachten op delivery + email-cyclus.
//
// REGEL (zie 01_BRAND_CONTEXT/forbidden_claims.md): nooit reviews
// verzinnen. Elke entry hier MOET corresponderen met een echte koper
// die het product fysiek heeft ontvangen. `verifiedBuyer: true` betekent
// dat we de Ecwid-order-ID hebben gezien.
//
// Workflow voor toevoegen van een nieuwe review:
//   1. Klant ontvangt Titan X.
//   2. Wij vragen review (telefoon, WhatsApp, of e-mail).
//   3. Verifieer order in Ecwid → noteer orderId.
//   4. Voeg entry toe aan REVIEWS hieronder.
//   5. Commit + push → Vercel preview build → live.
//
// Zodra HelpfulCrowd-flow ≥10 reviews opgevangen heeft, kan deze file
// gedeprecateerd worden ten faveure van de Ecwid Storefront API call.

export type Locale = 'nl' | 'en' | 'de';

export interface Review {
  /** Stabiele identifier voor key-prop en future-deduplication tegen HelpfulCrowd-feed */
  id: string;
  /** Voornaam + initiaal achternaam (privacy: nooit volledige achternaam zonder expliciet consent) */
  name: string;
  /** Stad of regio — optioneel, voor herkenbaarheid */
  location?: string;
  /** 1-5 sterren, hele getallen */
  rating: 1 | 2 | 3 | 4 | 5;
  /** Hoofdcontent — locale-aware. Houd korte quotes < 280 chars voor card-rendering */
  quote: Record<Locale, string>;
  /** ISO-datum van de review (YYYY-MM-DD) */
  date: string;
  /** True als we de Ecwid-order-ID hebben gevalideerd */
  verifiedBuyer: boolean;
  /** Ecwid order-ID voor audit-trail (niet gerenderd op de site) */
  ecwidOrderId?: number;
  /** Optionele foto van de klant met het product, in /public/images/reviews/ */
  photoSrc?: string;
}

/**
 * VOEG HIER REVIEWS TOE.
 *
 * Begin leeg — Reviews.tsx valt terug op pre-launch placeholder zolang
 * deze array leeg is. Voeg de eerste echte review pas toe NADAT die
 * persoon het product fysiek heeft ontvangen.
 */
export const REVIEWS: readonly Review[] = [];

// =============================================
// HELPERS
// =============================================

export function totalReviews(): number {
  return REVIEWS.length;
}

/**
 * Gemiddelde sterren als float (bv. 4.7). Returnt `null` bij 0 reviews
 * zodat de UI explicit kan beslissen of-en-hoe een rating te tonen
 * (i.p.v. een misleidende "0.0 sterren" badge).
 */
export function averageRating(): number | null {
  if (REVIEWS.length === 0) return null;
  const sum = REVIEWS.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / REVIEWS.length) * 10) / 10;
}

/**
 * Renderbare ster-string voor compacte UI-spots ("★★★★☆ 4.7"). Returnt
 * `null` bij 0 reviews (zie averageRating-rationale).
 */
export function ratingLabel(): string | null {
  const avg = averageRating();
  if (avg == null) return null;
  return `★★★★★`.slice(0, Math.round(avg)) + `☆☆☆☆☆`.slice(Math.round(avg));
}

/** Returnt true zodra we genoeg reviews hebben voor een geloofwaardige aggregate */
export function hasCredibleAggregate(): boolean {
  return REVIEWS.length >= 5;
}
