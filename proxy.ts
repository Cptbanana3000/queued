import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const ROOT_DOMAIN = 'queuedapp.dev'

/**
 * Next.js 16 Proxy — runs on every matched route before rendering.
 *
 * Responsibilities:
 * 1. Rewrite [slug].queuedapp.dev → /w/[slug] for public waitlist subdomains
 * 2. Refresh the Supabase session cookie (critical — must happen on every request)
 * 3. Redirect unauthenticated users away from protected routes → /login
 * 4. Redirect authenticated users away from auth pages → /dashboard
 */
export default async function proxy(request: NextRequest) {
  const hostname = request.headers.get('host') ?? ''

  // ── Subdomain routing ─────────────────────────────────────────────
  // [slug].queuedapp.dev → rewrite root path to /w/[slug] internally.
  // Public waitlist pages need no auth, so return early before Supabase.
  if (
    hostname.endsWith(`.${ROOT_DOMAIN}`) &&
    !hostname.startsWith('www.')
  ) {
    const slug = hostname.replace(`.${ROOT_DOMAIN}`, '')
    if (request.nextUrl.pathname === '/') {
      const url = request.nextUrl.clone()
      url.pathname = `/w/${slug}`
      return NextResponse.rewrite(url)
    }
    // All other paths on the subdomain (API routes etc.) pass through
    return NextResponse.next()
  }

  // We need to mutate the response cookies, so we start with a base response
  // that passes the request through, then we may replace it with a redirect.
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // First, set cookies on the request (for the current request chain)
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          )
          // Then rebuild the response with the updated cookies
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  // IMPORTANT: Do not add any logic between createServerClient and getUser().
  // A simple mistake here could cause session tokens to not be refreshed.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // ── Protected routes (require auth) ──────────────────────────────
  const isProtected =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/waitlists') ||
    pathname.startsWith('/settings')

  if (isProtected && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // ── Auth routes (redirect if already logged in) ───────────────────
  const isAuthRoute = pathname === '/login' || pathname === '/signup'

  if (isAuthRoute && user) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  // Return the supabaseResponse so session cookies are properly forwarded
  return supabaseResponse
}

// Proxy should run on all routes except Next.js internals and static assets
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
  ],
}
