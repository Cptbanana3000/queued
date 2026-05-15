import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import StatCard from '@/components/dashboard/StatCard'
import WaitlistCard from '@/components/dashboard/WaitlistCard'
import type { Template } from '@/lib/types'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Fetch profile for greeting
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .single()

  // Fetch waitlists with counts
  const { data: waitlists } = await supabase
    .from('waitlists_with_counts')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const list = waitlists ?? []
  const totalSignups = list.reduce((sum, w) => sum + Number(w.subscriber_count ?? 0), 0)
  const weekSignups = list.reduce((sum, w) => sum + Number(w.week_count ?? 0), 0)

  const firstName = profile?.full_name?.split(' ')[0] ?? user.email?.split('@')[0] ?? 'there'

  return (
    <div className="dashboard-content">
      {/* Greeting */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '24px', fontWeight: 600, color: 'var(--color-text)',
          margin: '0 0 4px', letterSpacing: '-0.5px',
        }}>
          Welcome back, {firstName}
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: 0 }}>
          Here&apos;s how your waitlists are doing.
        </p>
      </div>

      {/* Stat cards */}
      <div className="stats-grid">
        <StatCard label="Total signups" value={totalSignups} accent />
        <StatCard label="This week" value={weekSignups > 0 ? `+${weekSignups}` : '0'} />
        <StatCard label="Waitlists" value={list.length} />
      </div>

      {/* Waitlists header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '16px',
      }}>
        <h2 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text)', margin: 0 }}>
          Your waitlists
        </h2>
        <Link
          href="/waitlists/new"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '7px 14px', borderRadius: '7px', fontSize: '13px', fontWeight: 500,
            backgroundColor: 'var(--color-text)', color: '#fff', textDecoration: 'none',
            transition: 'background-color 0.15s',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
            <path d="M6.5 2v9M2 6.5h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          New waitlist
        </Link>
      </div>

      {/* Waitlist cards or empty state */}
      {list.length === 0 ? (
        <div style={{
          backgroundColor: 'var(--color-surface-raised)',
          border: '1px dashed var(--color-border-strong)',
          borderRadius: '12px',
          padding: '48px 32px',
          textAlign: 'center',
        }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '10px',
            backgroundColor: 'var(--color-surface-inset)', border: '1px solid var(--color-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M10 4v12M4 10h12" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <p style={{ fontSize: '15px', fontWeight: 500, color: 'var(--color-text)', margin: '0 0 6px' }}>
            No waitlists yet
          </p>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 20px', maxWidth: '280px', marginLeft: 'auto', marginRight: 'auto' }}>
            Create your first waitlist and start collecting signups in 60 seconds.
          </p>
          <Link
            href="/waitlists/new"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '9px 20px', borderRadius: '7px', fontSize: '13px', fontWeight: 500,
              backgroundColor: 'var(--color-text)', color: '#fff', textDecoration: 'none',
            }}
          >
            Create your first waitlist
          </Link>
        </div>
      ) : (
        <div className="waitlists-grid">
          {list.map((w) => (
            <WaitlistCard
              key={w.id}
              id={w.id}
              name={w.name}
              slug={w.slug}
              template={w.template as Template}
              published={w.published}
              subscriberCount={Number(w.subscriber_count ?? 0)}
              todayCount={Number(w.today_count ?? 0)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
