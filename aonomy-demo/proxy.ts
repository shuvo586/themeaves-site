import { NextRequest, NextResponse } from 'next/server';

// Download gate for the template files.
//
// The 24 template HTML pages and every file under /assets/ and /demo/ are
// only served to the site itself: a request that arrives without a
// same-origin referer or sec-fetch-site header (typed URL, curl, wget, a
// scraper) gets a 404. Navigation from the landing page and the page's own
// subresources always carry those headers, so the demo itself is untouched.
// This is deterrence, not a firewall: an attacker who spoofs a referer gets
// through, but the casual download is dead.

const TEMPLATE_RE = /^\/(index|blog|coming-soon)-[^/]*\.html$/;

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const gated = TEMPLATE_RE.test(pathname) || pathname.startsWith('/assets/') || pathname.startsWith('/demo/');
  if (!gated) return NextResponse.next();

  const site = req.headers.get('sec-fetch-site');
  const sameSite = site === 'same-origin' || site === 'same-site';
  // Compare against the request's Host header: Next normalizes
  // req.nextUrl.host to its configured hostname (e.g. localhost), which
  // never matches the Host the browser actually sent.
  const host = req.headers.get('host');
  let sameOriginReferer = false;
  const ref = req.headers.get('referer') || '';
  try {
    sameOriginReferer = new URL(ref).host === host;
  } catch (e) {
    sameOriginReferer = false;
  }

  if (sameSite || sameOriginReferer) {
    const res = NextResponse.next();
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return res;
  }
  return new NextResponse('Not found', { status: 404, headers: { 'Content-Type': 'text/plain' } });
}

export const config = {
  matcher: ['/(index|blog|coming-soon)-(.*).html', '/assets/:path*', '/demo/:path*'],
};