'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { ActionState } from '@/lib/types'

// ── Login ─────────────────────────────────────────────────────────
export async function login(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email    = (formData.get('email')    as string | null)?.trim() ?? ''
  const password = (formData.get('password') as string | null)          ?? ''

  if (!email || !password) {
    return { success: false, message: 'Email and password are required.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    // Normalise Supabase error messages to be user-friendly
    if (error.message.toLowerCase().includes('invalid login')) {
      return { success: false, message: 'Incorrect email or password.' }
    }
    return { success: false, message: error.message }
  }

  return { success: true, redirectTo: '/dashboard' }
}

// ── Signup ────────────────────────────────────────────────────────
export async function signup(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const fullName = (formData.get('full_name') as string | null)?.trim() ?? ''
  const email    = (formData.get('email')     as string | null)?.trim() ?? ''
  const password = (formData.get('password')  as string | null)          ?? ''

  if (!email || !password) {
    return { success: false, message: 'Email and password are required.' }
  }

  if (password.length < 8) {
    return { success: false, message: 'Password must be at least 8 characters.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName || null },
    },
  })

  if (error) {
    if (error.message.toLowerCase().includes('already registered')) {
      return {
        success: false,
        message: 'An account with this email already exists. Try signing in.',
      }
    }
    return { success: false, message: error.message }
  }

  // Supabase may require email confirmation depending on project settings.
  // If email confirm is OFF, the user is logged in immediately → redirect.
  // If email confirm is ON, we get no session yet → show a success message.
  return { success: true, redirectTo: '/dashboard' }
}

// ── Logout ────────────────────────────────────────────────────────
export async function logout(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
