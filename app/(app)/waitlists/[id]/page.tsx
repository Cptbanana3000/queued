import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { Template, Subscriber } from '@/lib/types'
import WaitlistTabs from '@/components/dashboard/WaitlistTabs'

export default async function WaitlistDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Fetch waitlist with counts
  const { data: waitlist, error } = await supabase
    .from('waitlists_with_counts')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (error || !waitlist) notFound()

  // Fetch subscribers
  const { data: subscribers } = await supabase
    .from('subscribers')
    .select('*')
    .eq('waitlist_id', id)
    .order('position', { ascending: true })

  // Fetch profile for plan
  const { data: profile } = await supabase
    .from('profiles')
    .select('plan')
    .eq('id', user.id)
    .single()

  const plan = (profile?.plan as 'free' | 'pro') ?? 'free'
  const subs = (subscribers ?? []) as Subscriber[]

  const TEMPLATE_LABELS: Record<Template, { name: string; color: string; bg: string }> = {
    oat:   { name: 'Oat',   color: '#712B13', bg: '#F2EDE4' },
    slate: { name: 'Slate', color: '#0C447C', bg: '#E6F1FB' },
    ember: { name: 'Ember', color: '#EF9F27', bg: '#2C2C2A' },
    void:  { name: 'Void',  color: '#0a0a0a', bg: '#f0f0f0' },
  }

  const t = TEMPLATE_LABELS[waitlist.template as Template]

  return (
    <div style={{ padding: '36px 40px', maxWidth: '900px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <h1 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-text)', margin: 0, letterSpacing: '-0.3px' }}>
              {waitlist.name}
            </h1>
            <span style={{
              fontSize: '11px', padding: '2px 8px', borderRadius: '20px', fontWeight: 500,
              backgroundColor: waitlist.published ? 'var(--color-success-bg)' : 'var(--color-surface-inset)',
              color: waitlist.published ? 'var(--color-success)' : 'var(--color-text-muted)',
            }}>
              {waitlist.published ? 'Live' : 'Draft'}
            </span>
            <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '20px', fontWeight: 500, backgroundColor: t.bg, color: t.color }}>
              {t.name}
            </span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0 }}>
            /w/{waitlist.slug}
            {waitlist.published && (
              <>
                {' · '}
                <a
                  href={`/w/${waitlist.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--color-brand)', textDecoration: 'none' }}
                >
                  View live page ↗
                </a>
              </>
            )}
          </p>
        </div>
        <Link
          href={`/waitlists/${id}/edit`}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '8px 16px', borderRadius: '7px', fontSize: '13px', fontWeight: 500,
            border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface-raised)',
            color: 'var(--color-text)', textDecoration: 'none', transition: 'border-color 0.15s',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
            <path d="M9.5 1.5l2 2-7 7H2.5v-2l7-7z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Edit page
        </Link>
      </div>

      {/* Stat row */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '14px',
        marginBottom: '28px',
      }}>
        <MiniStat label="Total signups" value={Number(waitlist.subscriber_count ?? 0)} accent />
        <MiniStat label="Today" value={Number(waitlist.today_count ?? 0)} />
        <MiniStat label="This week" value={Number(waitlist.week_count ?? 0)} />
      </div>

      {/* Tabs */}
      <WaitlistTabs
        waitlistId={id}
        subscribers={subs}
        plan={plan}
        published={waitlist.published}
      />
    </div>
  )
}

/* ── Inline mini stat (no separate file needed) ──── */
function MiniStat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div style={{
      backgroundColor: 'var(--color-surface-raised)', border: '1px solid var(--color-border)',
      borderRadius: '10px', padding: '16px 18px',
    }}>
      <p style={{ fontSize: '11px', fontWeight: 500, color: 'var(--color-text-muted)', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
        {label}
      </p>
      <p style={{
        fontSize: '24px', fontWeight: 600, margin: 0, letterSpacing: '-0.5px',
        color: accent ? 'var(--color-brand)' : 'var(--color-text)',
      }}>
        {value}
      </p>
    </div>
  )
}
