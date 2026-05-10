import 'server-only'

import { cache } from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Profile } from '@/lib/types'

/**
 * Verifies the current user's session server-side via Supabase Auth.
 * Redirects to /login if no valid session exists.
 * Memoised per-request via React cache().
 */
export const verifySession = cache(async () => {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  }

  return { isAuth: true as const, userId: user.id, user }
})

/**
 * Returns the current user's profile row from the `profiles` table.
 * Returns null if not authenticated (does not redirect).
 * Memoised per-request via React cache().
 */
export const getUser = cache(async (): Promise<Profile | null> => {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error || !profile) return null

  return profile as Profile
})

/**
 * Returns the authenticated user id without redirecting.
 * Useful for optional auth checks.
 */
export const getUserId = cache(async (): Promise<string | null> => {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user?.id ?? null
})
