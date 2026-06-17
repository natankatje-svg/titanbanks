// =============================================
// Ecwid storefront reader — LIVE product-data (server-only)
// =============================================
// "Full live"-keuze (Natan, 2026-06-16): prijs/voorraad/naam/beschrijving/
// specs/media komen LIVE uit Ecwid (de admin = single source of truth), niet
// uit hardcoded constants. Dit module LEEST die data server-side via de REST
// API v3 met ISR-caching.
//
// VEILIGHEID:
//   - `import 'server-only'` → dit module (en daarmee ECWID_ACCESS_TOKEN) kan
//     NOOIT in een client-bundle terechtkomen. De klant-cart/checkout draait
//     los hiervan via het Ecwid in-page storefront-script (EcwidProvider).
//   - Graceful fallback: als Ecwid onbereikbaar is (ik zag een 500-storing
//     tijdens de audit), valt de site terug op de CONFIRMED product-claims
//     zodat de pagina nooit breekt. `isLive` geeft aan welke bron gebruikt is.
// =============================================

import 'server-only';
import { ecwidGet } from './ecwid-api';
import { ECWID_PRODUCT_ID } from './ecwid-config';
import { BRAND, TBD, SPECS, safe, formatEuro, capacityLabel } from './product-claims';

/** Genormaliseerde live product-data voor de UI. */
export interface LiveProduct {
  /** true = data uit Ecwid; false = fallback uit product-claims (Ecwid down). */
  isLive: boolean;
  priceEur: number;
  /** "€50,99" — NL-conventie, gedeeld met product-claims.formatEuro. */
  priceFormatted: string;
  /** Doorgestreepte "was"-prijs (Ecwid compareToPrice) — null als geen actie. */
  compareAtEur: number | null;
  compareAtFormatted: string | null;
  inStock: boolean;
  /** null = onbeperkt/onbekend. */
  quantity: number | null;
  name: string;
  descriptionHtml: string;
  images: LiveImage[];
  attributes: { name: string; value: string }[];
}

/** Eén live product-foto met responsive bronnen uit Ecwid's CDN. */
export interface LiveImage {
  /** 800px-variant — default src. */
  url: string;
  /** 1500px-variant voor grote/retina weergave (lightbox/zoom). */
  urlLarge: string;
  alt: string;
  isMain: boolean;
}

/** Subset van de Ecwid /products/{id} response die we gebruiken. */
interface EcwidFullProduct {
  id: number;
  sku: string;
  name: string;
  price: number;
  /** Door Ecwid berekende klant-prijs (incl. evt. inbegrepen BTW). */
  defaultDisplayedPrice?: number;
  /** "Was"-prijs voor doorstreep-weergave bij een actie. */
  compareToPrice?: number;
  description?: string;
  quantity?: number;
  unlimited?: boolean;
  inStock?: boolean;
  imageUrl?: string;
  /** Rijkste beeld-bron: responsive varianten + isMain + alt + orderBy. */
  media?: {
    images?: Array<{
      isMain?: boolean;
      orderBy?: number;
      alt?: string;
      image400pxUrl?: string;
      image800pxUrl?: string;
      image1500pxUrl?: string;
      imageOriginalUrl?: string;
    }>;
  };
  galleryImages?: Array<{ alt?: string; imageUrl?: string; originalImageUrl?: string }>;
  attributes?: Array<{ name: string; value: string | number | boolean }>;
}

const REVALIDATE_SECONDS = 300; // 5 min ISR — prijs/voorraad vers genoeg, geen live-hammering

/** Fallback op de CONFIRMED claims — gebruikt als Ecwid onbereikbaar is. */
function fallbackProduct(): LiveProduct {
  const price = safe(TBD.priceEur) ?? 0;
  return {
    isLive: false,
    priceEur: price,
    priceFormatted: price > 0 ? formatEuro(price) : '',
    compareAtEur: null,
    compareAtFormatted: null,
    inStock: true,
    quantity: null,
    name: `${BRAND.product} ${capacityLabel()} Power Bank — ${SPECS.finish.value}`,
    descriptionHtml: '',
    images: [],
    attributes: [],
  };
}

/**
 * Leest het live Titan X product uit Ecwid. Nooit throwt — bij een fout
 * (netwerk, 401/403, Ecwid-storing) loggt het en valt terug op product-claims.
 */
export async function getLiveProduct(): Promise<LiveProduct> {
  try {
    const p = await ecwidGet<EcwidFullProduct>(
      `/products/${ECWID_PRODUCT_ID}`,
      undefined,
      { revalidate: REVALIDATE_SECONDS },
    );
    // Voorkeur: media.images (responsive varianten + isMain + orderBy + alt).
    // Sorteer op orderBy zodat de hoofdfoto/volgorde uit Ecwid wordt gevolgd.
    const mediaImages = [...(p.media?.images ?? [])]
      .sort((a, b) => (a.orderBy ?? 0) - (b.orderBy ?? 0))
      .map((m) => ({
        url: m.image800pxUrl ?? m.image1500pxUrl ?? m.imageOriginalUrl ?? '',
        urlLarge: m.image1500pxUrl ?? m.imageOriginalUrl ?? m.image800pxUrl ?? '',
        alt: m.alt ?? p.name,
        isMain: m.isMain ?? false,
      }))
      .filter((m) => m.url);

    // Fallback op galleryImages als media (om wat voor reden dan ook) leeg is.
    const images: LiveImage[] = mediaImages.length
      ? mediaImages
      : (p.galleryImages ?? [])
          .map((g) => ({
            url: g.imageUrl ?? g.originalImageUrl ?? '',
            urlLarge: g.originalImageUrl ?? g.imageUrl ?? '',
            alt: g.alt ?? p.name,
            isMain: false,
          }))
          .filter((g) => g.url);

    // Klant-prijs = defaultDisplayedPrice (door Ecwid berekend, incl. evt.
    // inbegrepen BTW) met fallback op `price`.
    const priceEur = p.defaultDisplayedPrice ?? p.price;
    const compareAtEur =
      p.compareToPrice && p.compareToPrice > priceEur ? p.compareToPrice : null;

    return {
      isLive: true,
      priceEur,
      priceFormatted: formatEuro(priceEur),
      compareAtEur,
      compareAtFormatted: compareAtEur ? formatEuro(compareAtEur) : null,
      inStock: p.inStock ?? (p.quantity ?? 0) > 0,
      quantity: p.unlimited ? null : p.quantity ?? null,
      name: p.name,
      descriptionHtml: p.description ?? '',
      images,
      attributes: (p.attributes ?? []).map((a) => ({ name: a.name, value: String(a.value) })),
    };
  } catch (err) {
    console.error(
      '[ecwid-storefront] live read faalde — fallback op product-claims:',
      (err as Error).message,
    );
    return fallbackProduct();
  }
}
