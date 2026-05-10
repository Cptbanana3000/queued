import { createBrowserClient } from '@supabase/ssr'

/**
 * Supabase client for use in Client Components and browser context.
 * Call once per component — @supabase/ssr handles singleton internally.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  )
}
