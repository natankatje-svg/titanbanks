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
        addProduct: (opts: {
          id: number;
          quantity: number;
          callback?: () => void;
        }) => void;
        open: () => void;
        get: (cb: (cart: { items: unknown[] }) => void) => void;
      };
      openPage: (page: string) => void;
      init: () => void;
    };
    ecwid_script_defer: boolean;
    ecwid_dynamic_widgets: boolean;
    ec: { storefront: { show_root_categories: boolean } };
  }
}

interface EcwidContextType {
  /** Add Titan X to cart and open the cart popup */
  addToCart: () => void;
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

  const addToCart = useCallback(() => {
    if (typeof window === 'undefined') return;
    const { Ecwid } = window;
    if (!Ecwid) {
      console.warn('[Ecwid] Not loaded yet — configure ECWID_STORE_ID in lib/ecwid-config.ts');
      return;
    }
    Ecwid.Cart.addProduct({
      id: ECWID_PRODUCT_ID,
      quantity: 1,
      callback: () => Ecwid.openPage('cart'),
    });
  }, []);

  const openCart = useCallback(() => {
    if (typeof window === 'undefined') return;
    const { Ecwid } = window;
    if (!Ecwid) return;
    Ecwid.openPage('cart');
  }, []);

  /* Don't load the script if Store ID hasn't been configured */
  const storeId: string = ECWID_STORE_ID;
  const isConfigured = storeId !== 'YOUR_STORE_ID' && storeId.length > 0;

  return (
    <EcwidContext.Provider value={{ addToCart, openCart, isReady }}>
      {children}

      {isConfigured && (
        <>
          {/* Ecwid core script */}
          <Script
            id="ecwid-script"
            src={`https://app.ecwid.com/script.js?${ECWID_STORE_ID}&data_platform=code`}
            strategy="afterInteractive"
            onLoad={() => {
              window.ecwid_script_defer = true;
              window.ecwid_dynamic_widgets = true;

              if (window.Ecwid) {
                window.Ecwid.OnAPILoaded.add(() => setIsReady(true));
                window.Ecwid.init();
              }
            }}
          />

          {/* Hidden Ecwid store root — needed for cart/checkout overlays */}
          <div
            id={`my-store-${ECWID_STORE_ID}`}
            style={{ position: 'fixed', top: 0, left: 0, width: 0, height: 0, overflow: 'hidden' }}
          />
        </>
      )}
    </EcwidContext.Provider>
  );
}
