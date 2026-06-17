'use client';

// Levert de LIVE Ecwid product-data (prijs/voorraad/actie) aan client-
// componenten. De server (app/layout.tsx) haalt de data één keer op via
// getLiveProduct() en geeft hem hier door; client-componenten lezen via
// useLiveProduct(). `import type` houdt het server-only reader-module uit de
// client-bundle (type wordt weg-gecompileerd → geen token-lek).

import { createContext, useContext, type ReactNode } from 'react';
import type { LiveProduct } from '@/lib/ecwid-storefront';

const LiveProductContext = createContext<LiveProduct | null>(null);

export function LiveProductProvider({
  value,
  children,
}: {
  value: LiveProduct;
  children: ReactNode;
}) {
  return <LiveProductContext.Provider value={value}>{children}</LiveProductContext.Provider>;
}

/** Live product-data, of null buiten de provider (val dan terug op product-claims). */
export function useLiveProduct(): LiveProduct | null {
  return useContext(LiveProductContext);
}
