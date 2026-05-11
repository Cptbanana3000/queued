import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import SettingsClient from './SettingsClient'

export const metadata: Metadata = {
  title: 'Settings — Queued',
}

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, plan')
    .eq('id', user.id)
    .single()

  const plan = (profile?.plan as 'free' | 'pro') ?? 'free'

  return (
    <div style={{ padding: '36px 40px', maxWidth: '900px' }}>
      {/* Page header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 4px', letterSpacing: '-0.3px' }}>
          Settings
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0 }}>
          Manage your profile and plan.
        </p>
      </div>

      <SettingsClient
        initialName={profile?.full_name ?? ''}
        email={user.email ?? ''}
        plan={plan}
      />
    </div>
  )
}
