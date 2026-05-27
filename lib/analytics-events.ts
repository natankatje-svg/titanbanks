// =============================================
// GA4 / Plausible / analytics — event taxonomie
// =============================================
// Single source of truth voor event-namen + payload-shape.
// Vervolg-implementatie hookt elke component aan deze functies, niet aan ad-hoc gtag-calls.
// Measurement ID komt via NEXT_PUBLIC_GA4_MEASUREMENT_ID (env). Zonder ID: no-op.

type EventName =
  | 'view_home'
  | 'view_shop'
  | 'view_technology'
  | 'cta_buy_click'
  | 'cta_waitlist_click'
  | 'waitlist_submit_success'
  | 'waitlist_submit_error'
  | 'sticky_buy_click'
  | 'cart_exit_popup_shown'
  | 'cart_exit_popup_dismiss'
  | 'cart_exit_popup_submit'
  | 'faq_open'
  | 'video_play'
  | 'video_complete';

interface EventPayload {
  // Context — welke pagina, welke positie binnen pagina
  page_path?: string;
  page_section?: string;
  // Producten
  product_id?: string;
  product_name?: string;
  product_variant?: string;
  // Bedragen
  value?: number;
  currency?: string;
  // Custom
  [key: string]: unknown;
}

declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const isProd = process.env.NODE_ENV === 'production';

export function track(event: EventName, payload: EventPayload = {}): void {
  // Server-side no-op
  if (typeof window === 'undefined') return;

  // Push naar dataLayer (voor GTM-bridge of latere migraties)
  if (window.dataLayer) {
    window.dataLayer.push({ event, ...payload });
  }

  // Direct gtag-call als ID geconfigureerd is
  if (typeof window.gtag === 'function') {
    window.gtag('event', event, payload);
  }

  // Dev: log naar console zodat we events kunnen verifiëren zonder GA4 live
  if (!isProd) {
    // eslint-disable-next-line no-console
    console.debug('[analytics]', event, payload);
  }
}

/** Convenience helpers per categorie */
export const analytics = {
  pageView: (path: string) => track(`view_${path.replace(/^\//, '').replace(/-/g, '_') || 'home'}` as EventName, { page_path: path }),
  buyClick: (section: string) => track('cta_buy_click', { page_section: section }),
  waitlistClick: (section: string) => track('cta_waitlist_click', { page_section: section }),
  stickyBuyClick: () => track('sticky_buy_click'),
  faqOpen: (questionId: string) => track('faq_open', { question_id: questionId }),
  videoPlay: (videoId: string) => track('video_play', { video_id: videoId }),
  cartExitShown: () => track('cart_exit_popup_shown'),
  cartExitDismiss: () => track('cart_exit_popup_dismiss'),
  cartExitSubmit: (email: string) =>
    track('cart_exit_popup_submit', { email_domain: email.split('@')[1] || 'unknown' }),
};
