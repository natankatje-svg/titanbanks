// Cookie-consent state (AVG/Consent Mode v2). Keuze geldt 12 maanden;
// daarna vragen we opnieuw. GA4 laadt pas NA expliciete toestemming
// (basic consent mode — vóór die tijd wordt er niets geladen of gezet).

export type ConsentChoice = 'granted' | 'denied';

const KEY = 'tb-consent-v1';
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000; // 12 maanden
export const CONSENT_EVENT = 'tb-consent';

export function getConsent(): ConsentChoice | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { choice: ConsentChoice; ts: number };
    if (!parsed?.choice || Date.now() - parsed.ts > MAX_AGE_MS) return null;
    return parsed.choice;
  } catch {
    return null;
  }
}

export function setConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ choice, ts: Date.now() }));
  } catch {
    // localStorage geblokkeerd — keuze geldt dan alleen voor deze pageview.
  }
  window.dispatchEvent(new CustomEvent<ConsentChoice>(CONSENT_EVENT, { detail: choice }));
}
