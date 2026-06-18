'use client';

import { useEffect } from 'react';
import { ECWID_STORE_ID } from '@/lib/ecwid-config';

/* xProductBrowser is een legacy Ecwid-global die niet in de type-shim van
   EcwidProvider staat — hier aanvullen (interface-merge met de bestaande
   Window-augmentatie). OnPageLoaded benaderen we via een cast omdat de
   provider-shim alleen de members declareert die hij zelf gebruikt. */
declare global {
  interface Window {
    xProductBrowser?: (...args: string[]) => void;
  }
}

const STORE_CONTAINER_ID = `ecwid-store-${ECWID_STORE_ID}`;

// Storefront-pagina's die op de cart-subpagina niet thuishoren: zodra Ecwid er
// een laadt (leeg mandje dat terugvalt naar de winkel, of een race bij het
// eerste renderen), sturen we terug naar de winkelwagen.
const CATALOG_PAGE_TYPES = new Set(['CATEGORY', 'PRODUCT', 'SEARCH']);

/**
 * EcwidCart — toont de volledige Ecwid-winkelwagen inline op de cart-pagina.
 *
 * Het sitebrede Ecwid-script (zie <EcwidProvider> in de root layout) laadt de
 * storefront-engine + de `x*`-widgetfuncties. We renderen hier expliciet een
 * storefront-widget via `xProductBrowser` in een eigen container — dezelfde
 * store-instance als de (verborgen) minicart van de provider, dus de
 * cart-inhoud klopt.
 *
 * `Ecwid.openPage('cart')` zónder storefront-widget redirect naar de
 * geconfigureerde storefront-URL (de homepage). Daarom renderen we eerst de
 * widget; die opent direct op de cart-pagina (hash `#!/~/cart`).
 *
 * De storefront is een volledige winkel — hij zou ook de catalogus kunnen
 * tonen. Op een cart-pagina willen we dat NOOIT. Twee verdedigingen:
 *   1) komt er toch een catalogus-/product-/zoekpagina langs → meteen terug
 *      naar de cart (begrensd tegen loops);
 *   2) CSS in globals.css verbergt die pagina-varianten sowieso (vangnet +
 *      geen flits tijdens laden). Een leeg mandje toont Ecwids eigen
 *      "winkelmandje is leeg"-pagina (de CART-pagina), niet de catalogus.
 */
export default function EcwidCart() {
  useEffect(() => {
    let cancelled = false;
    let started = false;
    let forceCount = 0;

    const w = window as unknown as {
      xProductBrowser?: (...args: string[]) => void;
      location: Location;
      history: History;
      Ecwid?: {
        openPage: (p: string) => void;
        OnPageLoaded: { add: (cb: (page: { type?: string }) => void) => void };
      };
    };

    const start = (triesLeft: number) => {
      if (cancelled || started) return;

      if (typeof w.xProductBrowser === 'function' && w.Ecwid) {
        started = true;

        // Houd de storefront op de winkelwagen. forceCount begrenst tegen een
        // theoretische loop; in de praktijk valt een leeg mandje terug op de
        // CART-pagina (niet de catalogus), dus dit convergeert meteen.
        try {
          w.Ecwid.OnPageLoaded.add((page) => {
            if (cancelled) return;
            if (page?.type && CATALOG_PAGE_TYPES.has(page.type) && forceCount < 5) {
              forceCount += 1;
              w.Ecwid!.openPage('cart');
            }
          });
        } catch {
          /* OnPageLoaded niet beschikbaar — CSS verbergt de catalogus alsnog. */
        }

        // Laat de storefront meteen op de cart-pagina starten (geen flits).
        if (!w.location.hash) {
          const base = w.location.pathname + w.location.search;
          try {
            w.history.replaceState(null, '', `${base}#!/~/cart`);
          } catch {
            w.location.hash = '!/~/cart';
          }
        }

        w.xProductBrowser(
          `id=${STORE_CONTAINER_ID}`,
          'views=grid(20,3) list(60) table(60)',
          'categoryView=grid',
          'searchView=list',
        );
        return;
      }

      if (triesLeft > 0) {
        window.setTimeout(() => start(triesLeft - 1), 250);
      }
    };

    start(80); // ~20s marge op een trage verbinding

    return () => {
      cancelled = true;
    };
  }, []);

  return <div id={STORE_CONTAINER_ID} className="ecwid-storefront min-h-[55vh]" />;
}
