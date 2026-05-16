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
  const { data, error } = await supabase.auth.signUp({
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

  // No session means Supabase requires email confirmation before login.
  if (!data.session) {
    return {
      success: true,
      message: email,  // pass email so the UI can display it
    }
  }

  return { success: true, redirectTo: '/dashboard' }
}

// ── Request password reset ────────────────────────────────────────
export async function requestPasswordReset(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email = (formData.get('email') as string | null)?.trim() ?? ''
  if (!email) return { success: false, message: 'Email is required.' }

  const supabase = await createClient()
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${appUrl}/auth/callback?next=/reset-password`,
  })

  if (error) return { success: false, message: error.message }

  // Always return success to avoid leaking whether an email exists
  return { success: true, message: email }
}

// ── Reset password (called after email link → callback → session) ──
export async function resetPassword(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const password        = (formData.get('password')         as string | null) ?? ''
  const confirmPassword = (formData.get('confirm_password') as string | null) ?? ''

  if (!password) return { success: false, message: 'Password is required.' }
  if (password.length < 8) return { success: false, message: 'Password must be at least 8 characters.' }
  if (password !== confirmPassword) return { success: false, message: 'Passwords do not match.' }

  const supabase = await createClient()
  const { error } = await supabase.auth.updateUser({ password })

  if (error) return { success: false, message: error.message }

  return { success: true, redirectTo: '/dashboard' }
}

// ── Logout ────────────────────────────────────────────────────────
export async function logout(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
