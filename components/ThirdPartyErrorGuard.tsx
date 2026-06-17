'use client';

import { useEffect } from 'react';

/**
 * ThirdPartyErrorGuard — onderdrukt SMAL één bekende, niet-fatale third-party
 * fout: het Ecwid storefront-script initialiseert de Mollie-betaal-app op
 * élke pagina, en Mollie's script gooit `SyntaxError: "undefined" is not valid
 * JSON` (geen betaalsessie bij init) → een uncaught promise-rejection op iedere
 * pagina. Cart + checkout werken wél; dit is puur console-ruis die echte fouten
 * maskeert en onprofessioneel oogt.
 *
 * Deze guard vangt ALLEEN die specifieke rejection (match op de Mollie/Ecwid
 * script-bron + de exacte message) en laat al het andere ongemoeid.
 *
 * NB: dit is een STOPGAP. De échte fix zit in de Ecwid-admin (Mollie-app
 * herconfigureren / dubbele betaalmethodes opruimen). Verwijder deze guard
 * zodra dat is opgelost. Zie audit Fase 2 / "Mollie console-error".
 */
export default function ThirdPartyErrorGuard() {
  useEffect(() => {
    const isMollieNoise = (reason: unknown): boolean => {
      const message = String((reason as { message?: unknown })?.message ?? reason ?? '');
      const stack = String((reason as { stack?: unknown })?.stack ?? '');
      return message.includes('is not valid JSON') && /mollie-pg|apps-js-api|ecwid/i.test(stack);
    };

    const onRejection = (e: PromiseRejectionEvent) => {
      if (isMollieNoise(e.reason)) {
        e.preventDefault(); // voorkomt de "Uncaught (in promise)" console-error
      }
    };

    window.addEventListener('unhandledrejection', onRejection);
    return () => window.removeEventListener('unhandledrejection', onRejection);
  }, []);

  return null;
}
