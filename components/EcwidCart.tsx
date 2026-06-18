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

/**
 * EcwidCart — toont de volledige Ecwid-winkelwagen inline op de cart-pagina.
 *
 * Aanpak (in de browser geverifieerd): het sitebrede Ecwid-script (zie
 * <EcwidProvider> in de root layout) laadt de storefront-engine + de
 * `x*`-widgetfuncties. We renderen hier expliciet een storefront-widget via
 * `xProductBrowser` in een eigen container — dezelfde store-instance als de
 * (verborgen) minicart van de provider, dus de cart-inhoud klopt.
 *
 * `Ecwid.openPage('cart')` zónder storefront-widget op de pagina laat Ecwid
 * naar de geconfigureerde storefront-URL (de homepage) redirecten → dan
 * verlies je deze subpagina. Daarom forceren we de cart-weergave pas in
 * `OnPageLoaded`: dat event vuurt NA de eerste render van de widget, dus de
 * context bestaat en openPage navigeert binnen de widget (hash `#!/~/cart`),
 * op deze route — geen redirect.
 */
export default function EcwidCart() {
  useEffect(() => {
    let cancelled = false;
    let started = false;
    let forced = false;

    const start = (triesLeft: number) => {
      if (cancelled || started) return;

      const w = window as unknown as {
        xProductBrowser?: (...args: string[]) => void;
        Ecwid?: {
          openPage: (p: string) => void;
          OnPageLoaded: { add: (cb: (page: { type?: string }) => void) => void };
        };
      };

      if (typeof w.xProductBrowser === 'function' && w.Ecwid) {
        started = true;

        // Forceer eenmalig de cart-weergave zodra de storefront een pagina
        // heeft geladen (widget-context bestaat → openPage redirect niet).
        try {
          w.Ecwid.OnPageLoaded.add((page) => {
            if (cancelled || forced) return;
            forced = true;
            if (page?.type !== 'CART') w.Ecwid!.openPage('cart');
          });
        } catch {
          /* OnPageLoaded niet beschikbaar — storefront opent dan op de
             catalogus; de cart blijft bereikbaar via de minicart in de widget. */
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
