'use client';

import { useEffect, useState } from 'react';

/**
 * useIsDesktop — returnt `true` vanaf de Tailwind `lg`-breakpoint (≥1024px).
 *
 * SSR-veilig: geeft `false` op de server én tijdens de eerste client-render,
 * en flipt pas ná mount via matchMedia. Daardoor géén hydration-mismatch en
 * rendert de zware hero-achtergrond (WebGL MeshGradient + geanimeerde
 * FloatingPaths) uitsluitend op desktop. Op mobiel blijven die componenten
 * volledig uit de tree — `hidden`/display:none zou hun requestAnimationFrame-
 * loop niet stoppen, conditioneel renderen wél.
 */
export function useIsDesktop(query = '(min-width: 1024px)'): boolean {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia(query);
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, [query]);

  return isDesktop;
}
