'use server'

import { createClient } from '@/lib/supabase/server'
import type { ActionState } from '@/lib/types'

export async function changePassword(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const currentPassword = (formData.get('current_password') as string | null) ?? ''
  const newPassword     = (formData.get('new_password')     as string | null) ?? ''
  const confirmPassword = (formData.get('confirm_password') as string | null) ?? ''

  if (!currentPassword || !newPassword) {
    return { success: false, message: 'All fields are required.' }
  }
  if (newPassword.length < 8) {
    return { success: false, message: 'New password must be at least 8 characters.' }
  }
  if (newPassword !== confirmPassword) {
    return { success: false, message: 'Passwords do not match.' }
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user?.email) return { success: false, message: 'Not authenticated.' }

  // Verify current password by re-authenticating
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPassword,
  })
  if (signInError) {
    return { success: false, message: 'Current password is incorrect.' }
  }

  const { error } = await supabase.auth.updateUser({ password: newPassword })
  if (error) return { success: false, message: error.message }

  return { success: true, message: 'Password updated.' }
}

export async function updateProfile(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, message: 'Not authenticated.' }

  const fullName = (formData.get('full_name') as string)?.trim()
  if (!fullName) return { success: false, message: 'Name cannot be empty.' }

  const { error } = await supabase
    .from('profiles')
    .update({ full_name: fullName })
    .eq('id', user.id)

  if (error) return { success: false, message: error.message }
  return { success: true, message: 'Profile updated.' }
}
