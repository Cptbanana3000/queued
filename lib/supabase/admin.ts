import { createClient } from '@supabase/supabase-js'

/**
 * Supabase client using the service role key.
 * Server-only — never import in Client Components or expose to the browser.
 * Use only for privileged operations (e.g. reading auth.users email).
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  )
}
