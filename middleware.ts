import { NextRequest, NextResponse } from 'next/server';

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

export function middleware(req: NextRequest): NextResponse {
  if (process.env.BASIC_AUTH_ENABLED === 'false') {
    return NextResponse.next();
  }

  const user = process.env.BASIC_AUTH_USER;
  const password = process.env.BASIC_AUTH_PASSWORD;

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

  return NextResponse.next();
}

export const config = {
  // Protect everything except Next internals, static files, and the
  // health/sitemap/robots endpoints that should stay public for crawlers
  // (note: while gated, robots and sitemap won't actually be indexed).
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};
