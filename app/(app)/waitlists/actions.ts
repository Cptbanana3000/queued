'use server'

import { createClient } from '@/lib/supabase/server'
import type { ActionState } from '@/lib/types'
import { PLAN_LIMITS } from '@/lib/types'

export async function deleteWaitlist(id: string): Promise<ActionState> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, message: 'Not authenticated.' }

  const { error } = await supabase
    .from('waitlists')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return { success: false, message: error.message }

  return { success: true, redirectTo: '/dashboard' }
}


function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 50)
}

export async function createWaitlist(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, message: 'Not authenticated.' }

  // Get profile for plan limits
  const { data: profile } = await supabase
    .from('profiles')
    .select('plan')
    .eq('id', user.id)
    .single()

  const plan = (profile?.plan as 'free' | 'pro') ?? 'free'

  // Check waitlist limit
  const { count } = await supabase
    .from('waitlists')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  if ((count ?? 0) >= PLAN_LIMITS[plan].maxWaitlists) {
    return {
      success: false,
      message: plan === 'free'
        ? 'Free plan allows 1 waitlist. Upgrade to Pro for unlimited.'
        : 'Waitlist limit reached.',
    }
  }

  const name = (formData.get('name') as string)?.trim()
  if (!name) return { success: false, message: 'Waitlist name is required.' }

  const rawSlug = (formData.get('slug') as string)?.trim() || slugify(name)
  const slug = slugify(rawSlug)
  if (slug.length < 3) return { success: false, message: 'Slug must be at least 3 characters.' }

  const template  = (formData.get('template') as string) || 'oat'
  const tagline   = (formData.get('tagline') as string)?.trim() || null
  const buttonText = (formData.get('buttonText') as string)?.trim() || 'Join waitlist'
  const showCount  = formData.get('showCount') === 'true'
  const comingSoon = formData.get('comingSoon') === 'true'
  const published  = formData.get('published') === 'true'
  const showRecentSignups = formData.get('showRecentSignups') !== 'false'

  let highlights = []
  let faq = []
  try { highlights = JSON.parse(formData.get('highlights') as string || '[]') } catch {}
  try { faq = JSON.parse(formData.get('faq') as string || '[]') } catch {}

  const { data, error } = await supabase
    .from('waitlists')
    .insert({
      user_id: user.id,
      name,
      slug,
      template,
      tagline,
      button_text: buttonText,
      show_count: showCount,
      coming_soon: comingSoon,
      show_recent_signups: showRecentSignups,
      highlights,
      faq,
      published,
    })
    .select('id')
    .single()

  if (error) {
    if (error.message.includes('duplicate') || error.message.includes('unique')) {
      return { success: false, message: 'That slug is already taken. Try a different one.' }
    }
    return { success: false, message: error.message }
  }

  return { success: true, redirectTo: `/waitlists/${data.id}` }
}

export async function updateWaitlist(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, message: 'Not authenticated.' }

  const id = formData.get('id') as string
  if (!id) return { success: false, message: 'Missing waitlist ID.' }

  const name = (formData.get('name') as string)?.trim()
  if (!name) return { success: false, message: 'Waitlist name is required.' }

  const template  = (formData.get('template') as string) || 'oat'
  const tagline   = (formData.get('tagline') as string)?.trim() || null
  const buttonText = (formData.get('buttonText') as string)?.trim() || 'Join waitlist'
  const showCount  = formData.get('showCount') === 'true'
  const comingSoon = formData.get('comingSoon') === 'true'
  const published  = formData.get('published') === 'true'
  const showRecentSignups = formData.get('showRecentSignups') !== 'false'

  const rawSlug = (formData.get('slug') as string)?.trim()
  const slug = rawSlug ? slugify(rawSlug) : undefined

  let highlights = []
  let faq = []
  try { highlights = JSON.parse(formData.get('highlights') as string || '[]') } catch {}
  try { faq = JSON.parse(formData.get('faq') as string || '[]') } catch {}

  const { error } = await supabase
    .from('waitlists')
    .update({
      name,
      ...(slug ? { slug } : {}),
      template,
      tagline,
      button_text: buttonText,
      show_count: showCount,
      coming_soon: comingSoon,
      show_recent_signups: showRecentSignups,
      highlights,
      faq,
      published,
    })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    if (error.message.includes('duplicate') || error.message.includes('unique')) {
      return { success: false, message: 'That slug is already taken. Try a different one.' }
    }
    return { success: false, message: error.message }
  }

  return { success: true, message: 'Waitlist updated.' }
}

export async function toggleWaitlistPublished(
  id: string,
  published: boolean,
): Promise<ActionState> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, message: 'Not authenticated.' }

  const { error } = await supabase
    .from('waitlists')
    .update({ published })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return { success: false, message: error.message }
  return { success: true, message: published ? 'Waitlist is now live.' : 'Waitlist set to draft.' }
}

