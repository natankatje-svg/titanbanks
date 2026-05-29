import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Site-wide HTTP Basic Auth for private preview deploys.
// Disable by setting BASIC_AUTH_ENABLED=false (defaults to ON in production).
const REALM = 'TitanBanks Preview';

function unauthorized(): NextResponse {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${REALM}", charset="UTF-8"`,
    },
  });
}

function checkBasicAuth(req: NextRequest): NextResponse | null {
  if (process.env.BASIC_AUTH_ENABLED === 'false') {
    return null;
  }

  const user = process.env.BASIC_AUTH_USER;
  const password = process.env.BASIC_AUTH_PASSWORD;

  // Vercel Preview-deploys: credentials staan vaak alleen op Production, niet
  // op Preview. We laten preview-URLs zonder auth door — de URL zelf is al
  // niet-discoverable. Production blijft fail-closed.
  if (process.env.VERCEL_ENV === 'preview' && (!user || !password)) {
    return null;
  }

  if (!user || !password) {
    // Fail closed: if creds are not configured, refuse access rather than
    // silently exposing the site.
    return unauthorized();
  }

  const header = req.headers.get('authorization');
  if (!header?.startsWith('Basic ')) {
    return unauthorized();
  }

  const decoded = atob(header.slice('Basic '.length));
  const sep = decoded.indexOf(':');
  const providedUser = sep === -1 ? decoded : decoded.slice(0, sep);
  const providedPass = sep === -1 ? '' : decoded.slice(sep + 1);

  if (providedUser !== user || providedPass !== password) {
    return unauthorized();
  }

  return null;
}

const intlMiddleware = createIntlMiddleware(routing);

// Routes that bypass next-intl: internal previews + api. These don't need
// locale-detection or /[locale]/-prefix redirects.
function isNonI18nRoute(pathname: string): boolean {
  return (
    pathname.startsWith('/preview') ||
    pathname.startsWith('/preview2') ||
    pathname.startsWith('/api')
  );
}

export default function middleware(req: NextRequest): NextResponse {
  // 1) Basic Auth eerst — fail-closed voor heel de site.
  const authResponse = checkBasicAuth(req);
  if (authResponse) return authResponse;

  // 2) Non-i18n routes (interne previews + api) skippen next-intl.
  if (isNonI18nRoute(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // 3) i18n routes: next-intl handelt locale-detection en /[locale]/-prefix.
  return intlMiddleware(req);
}

export const config = {
  // Match alle paden BEHALVE:
  // - /api/*         API routes (eigen processing)
  // - /_next/*       Next.js internals
  // - /_vercel/*     Vercel internals
  // - files met extensie ('.png', '.mp4', etc.) — public/ assets
  // - robots.txt, sitemap.xml — moeten publiek blijven voor crawlers
  //
  // Belangrijk: deze matcher voorkomt dat next-intl /hero/video.mp4 rewrite
  // naar /nl/hero/video.mp4 (zou 404 geven). Basic Auth past hierdoor niet
  // op individuele static files — bewuste afweging, files zijn niet
  // gevoelig en de pagina's die ze tonen zijn nog gegate.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
