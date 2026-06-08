'use client';

import Script from 'next/script';
import {
  createContext,
  useContext,
  useCallback,
  useState,
  type ReactNode,
} from 'react';
import { ECWID_STORE_ID, ECWID_PRODUCT_ID } from '@/lib/ecwid-config';

/* ── Ecwid global type shim ── */
declare global {
  interface Window {
    Ecwid: {
      OnAPILoaded: { add: (fn: () => void) => void };
      Cart: {
        addProduct: (
          opts: { id: number; quantity: number },
          callback?: (success: boolean, product: unknown, cart: unknown) => void,
        ) => void;
        open: () => void;
        get: (cb: (cart: { productsQuantity: number; items: unknown[] }) => void) => void;
      };
      openPage: (page: string) => void;
      init: () => void;
    };
    ecwid_script_defer: boolean;
    ecwid_dynamic_widgets: boolean;
    ec: { storefront: { show_root_categories: boolean } };
    xMinicart: (...args: string[]) => void;
  }
}

interface EcwidContextType {
  /**
   * Add the Titan X to the Ecwid cart. Defaults to 1 unit; pass a higher
   * quantity from a quantity selector. The Ecwid order — including the
   * exact quantity — is what ChannelDock pulls and forwards to the
   * fulfilment center, so this value must reflect the actual purchase
   * intent.
   */
  addToCart: (quantity?: number) => void;
  /** Open the cart without adding */
  openCart: () => void;
  /** True once the Ecwid API is loaded and ready */
  isReady: boolean;
}

const EcwidContext = createContext<EcwidContextType>({
  addToCart: () => {},
  openCart: () => {},
  isReady: false,
});

export const useEcwid = () => useContext(EcwidContext);

export default function EcwidProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  const addToCart = useCallback((quantity: number = 1) => {
    if (typeof window === 'undefined' || !window.Ecwid) {
      console.warn('[Ecwid] Not loaded yet');
      return;
    }
    /*
      Ecwid v3 internally wraps every API call in `n(() => ...)` which queues
      until `ecommerce.ready` fires. We do NOT need React-side isReady gating —
      Ecwid handles the queueing itself.

      Open the cart-overlay AFTER addProduct so the rendered cart-page reads
      the just-added item. A 150ms delay reliably wins the race against the
      addProduct mutation commit; calling openPage synchronously after
      addProduct caused the overlay to render with stale (empty-cart) state
      on the first click of a fresh page-load.
    */
    window.Ecwid.Cart.addProduct({
      id: ECWID_PRODUCT_ID,
      quantity: Math.max(1, Math.floor(quantity)),
    });
    setTimeout(() => {
      if (window.Ecwid) window.Ecwid.openPage('cart');
    }, 600);
  }, []);

  const openCart = useCallback(() => {
    if (typeof window === 'undefined' || !window.Ecwid) return;
    window.Ecwid.openPage('cart');
  }, []);

  const storeId: string = ECWID_STORE_ID;
  const isConfigured = storeId !== 'YOUR_STORE_ID' && storeId.length > 0;

  return (
    <EcwidContext.Provider value={{ addToCart, openCart, isReady }}>
      {children}

      {isConfigured && (
        <>
          {/*
            Defer-flags MUST be set BEFORE script.js loads. Use beforeInteractive
            so Next.js injects this into <head> ahead of the Ecwid loader.
          */}
          <Script id="ecwid-flags" strategy="beforeInteractive">
            {`window.ecwid_script_defer = true; window.ecwid_dynamic_widgets = true;`}
          </Script>

          {/*
            Ecwid core script. strategy="lazyOnload" → laadt pas in browser-idle
            ná het window 'load'-event, dus van het kritieke pad af. Op de
            homepage is Ecwid alleen nodig zodra iemand op "kopen" klikt; tegen
            die tijd is de idle-load (binnen ~1-2s) klaar. addToCart no-opt veilig
            als 'window.Ecwid' nog niet bestaat (zie hierboven).
          */}
          <Script
            id="ecwid-script"
            src={`https://app.ecwid.com/script.js?${ECWID_STORE_ID}&data_platform=code`}
            strategy="lazyOnload"
            onLoad={() => {
              if (!window.Ecwid) return;
              /*
                Register a minicart widget to bootstrap the storefront context.
                Without ANY xWidget call, Ecwid's script.js never calls
                Ecwid.init() (its auto-init guard checks for queued init
                scripts) and Cart.addProduct silently no-ops. The minicart is
                visually hidden via CSS on #my-store-XXXXX.
              */
              if (typeof window.xMinicart === 'function') {
                window.xMinicart(`id=my-store-${ECWID_STORE_ID}`);
              }
              window.Ecwid.OnAPILoaded.add(() => setIsReady(true));
              window.Ecwid.init();
            }}
          />

          {/*
            Ecwid storefront root. The minicart renders here; we keep it in the
            visual flow with non-zero dimensions because Ecwid uses this element
            as the anchor for cart/checkout overlays. Visually hidden but still
            laid out so Ecwid can mount widgets into a real bounding box.
          */}
          <div
            id={`my-store-${ECWID_STORE_ID}`}
            aria-hidden="true"
            style={{
              position: 'fixed',
              left: '-9999px',
              top: 0,
              width: '1px',
              height: '1px',
              overflow: 'hidden',
              pointerEvents: 'none',
            }}
          />
        </>
      )}
    </EcwidContext.Provider>
  );
}
