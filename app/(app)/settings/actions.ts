'use server'

import { createClient } from '@/lib/supabase/server'
import type { ActionState } from '@/lib/types'

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
