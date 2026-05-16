import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ROOT_DOMAIN = 'queuedapp.dev'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') ?? ''
  const { pathname } = request.nextUrl

  // Pass through on localhost and the root/www domain
  if (
    hostname === 'localhost' ||
    hostname.startsWith('localhost:') ||
    hostname === ROOT_DOMAIN ||
    hostname === `www.${ROOT_DOMAIN}`
  ) {
    return NextResponse.next()
  }

  // Waitlist subdomain: [slug].queuedapp.dev
  if (hostname.endsWith(`.${ROOT_DOMAIN}`)) {
    const slug = hostname.replace(`.${ROOT_DOMAIN}`, '')

    // Rewrite root path to the internal waitlist page.
    // API routes (/api/...) and other app paths are served as-is —
    // the subscriber fetch from templates resolves correctly because
    // Next.js serves those routes regardless of host.
    if (pathname === '/') {
      const url = request.nextUrl.clone()
      url.pathname = `/w/${slug}`
      return NextResponse.rewrite(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
