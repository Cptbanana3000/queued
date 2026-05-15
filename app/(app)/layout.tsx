import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Sidebar from '@/components/dashboard/Sidebar'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, plan')
    .eq('id', user.id)
    .single()

  return (
    <div className="app-shell" style={{ backgroundColor: 'var(--color-surface)' }}>
      <Sidebar
        userEmail={user.email ?? ''}
        userName={profile?.full_name ?? null}
        plan={(profile?.plan as 'free' | 'pro') ?? 'free'}
      />
      <main style={{ flex: 1, minWidth: 0, overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  )
}
