'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { Subscriber } from '@/lib/types'
import { deleteWaitlist, toggleWaitlistPublished } from '@/app/(app)/waitlists/actions'

interface WaitlistTabsProps {
  waitlistId: string
  slug: string
  subscribers: Subscriber[]
  plan: 'free' | 'pro'
  published: boolean
}

const TABS = ['Subscribers', 'Settings'] as const
type Tab = typeof TABS[number]

export default function WaitlistTabs({ waitlistId, slug, subscribers, plan, published }: WaitlistTabsProps) {
  const [tab, setTab] = useState<Tab>('Subscribers')

  return (
    <div>
      {/* Tab bar */}
      <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid var(--color-border)', marginBottom: '24px' }}>
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '10px 18px', fontSize: '13px', fontWeight: tab === t ? 500 : 400,
              color: tab === t ? 'var(--color-text)' : 'var(--color-text-muted)',
              border: 'none', background: 'none', cursor: 'pointer',
              borderBottom: tab === t ? '2px solid var(--color-text)' : '2px solid transparent',
              transition: 'color 0.15s, border-color 0.15s',
              marginBottom: '-1px',
            }}
          >
            {t}
            {t === 'Subscribers' && (
              <span style={{
                marginLeft: '6px', fontSize: '11px', padding: '1px 6px',
                borderRadius: '8px', backgroundColor: 'var(--color-surface-inset)',
                color: 'var(--color-text-muted)',
              }}>
                {subscribers.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === 'Subscribers' && (
        <SubscribersPanel subscribers={subscribers} plan={plan} />
      )}
      {tab === 'Settings' && (
        <SettingsPanel waitlistId={waitlistId} slug={slug} published={published} />
      )}
    </div>
  )
}

/* ── Subscribers panel ──────────────────────────────── */
function SubscribersPanel({ subscribers, plan }: { subscribers: Subscriber[]; plan: string }) {
  if (subscribers.length === 0) {
    return (
      <div style={{
        backgroundColor: 'var(--color-surface-raised)', border: '1px dashed var(--color-border-strong)',
        borderRadius: '12px', padding: '48px 32px', textAlign: 'center',
      }}>
        <p style={{ fontSize: '15px', fontWeight: 500, color: 'var(--color-text)', margin: '0 0 6px' }}>
          No subscribers yet
        </p>
        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0 }}>
          Share your waitlist link to start collecting signups.
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Export button (Pro only) */}
      {plan === 'pro' && (
        <div style={{ marginBottom: '16px', textAlign: 'right' }}>
          <button
            onClick={() => {
              const csv = ['Position,Email,Joined']
                .concat(subscribers.map(s => `${s.position},${s.email},${s.created_at}`))
                .join('\n')
              const blob = new Blob([csv], { type: 'text/csv' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = 'subscribers.csv'
              a.click()
              URL.revokeObjectURL(url)
            }}
            style={{
              padding: '7px 14px', borderRadius: '7px', fontSize: '12px', fontWeight: 500,
              border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface-raised)',
              color: 'var(--color-text)', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: '5px',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M6 2v6M3.5 5.5 6 8l2.5-2.5M2 10h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Export CSV
          </button>
        </div>
      )}

      {/* Table */}
      <div style={{
        backgroundColor: 'var(--color-surface-raised)', border: '1px solid var(--color-border)',
        borderRadius: '10px', overflow: 'hidden',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
              <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 500, color: 'var(--color-text-muted)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.3px' }}>#</th>
              <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 500, color: 'var(--color-text-muted)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Email</th>
              <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 500, color: 'var(--color-text-muted)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Joined</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map(s => (
              <tr key={s.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '10px 16px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                  {s.position}
                </td>
                <td style={{ padding: '10px 16px', color: 'var(--color-text)' }}>
                  {s.email}
                </td>
                <td style={{ padding: '10px 16px', color: 'var(--color-text-muted)', fontSize: '12px' }}>
                  {new Date(s.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ── Settings panel ─────────────────────────────────── */
function SettingsPanel({ waitlistId, slug, published }: { waitlistId: string; slug: string; published: boolean }) {
  const router = useRouter()
  const [copyText, setCopyText] = useState('Copy link')
  const [isPublished, setIsPublished] = useState(published)
  const [isPendingDelete, startDeleteTransition] = useTransition()
  const [isPendingPublish, startPublishTransition] = useTransition()
  const [publishError, setPublishError] = useState<string | null>(null)

  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/w/${slug}`

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopyText('Copied!')
    setTimeout(() => setCopyText('Copy link'), 2000)
  }

  const handleTogglePublish = () => {
    const next = !isPublished
    // Optimistic update — happens synchronously, before any async work
    setIsPublished(next)
    setPublishError(null)

    startPublishTransition(async () => {
      const result = await toggleWaitlistPublished(waitlistId, next)
      if (result && !result.success) {
        // Rollback on error
        setIsPublished(!next)
        setPublishError(result.message)
      } else {
        // Sync real server state into the page cache
        router.refresh()
      }
    })
  }

  const handleDelete = () => {
    if (!confirm('Are you sure you want to delete this waitlist? This will permanently remove all subscriber data and cannot be undone.')) return
    startDeleteTransition(() => { deleteWaitlist(waitlistId) })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* Share link */}
      <div style={{
        backgroundColor: 'var(--color-surface-raised)', border: '1px solid var(--color-border)',
        borderRadius: '10px', padding: '20px',
      }}>
        <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text)', margin: '0 0 4px' }}>
          Share link
        </p>
        <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: '0 0 12px' }}>
          Send this to people you want to invite to your waitlist.
        </p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            readOnly
            value={shareUrl}
            style={{
              flex: 1, padding: '9px 12px', borderRadius: '7px',
              border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)',
              fontSize: '13px', color: 'var(--color-text)', fontFamily: 'var(--font-mono)',
              outline: 'none',
            }}
          />
          <button
            onClick={handleCopy}
            style={{
              padding: '9px 14px', borderRadius: '7px', fontSize: '13px', fontWeight: 500,
              border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface-raised)',
              color: 'var(--color-text)', cursor: 'pointer', whiteSpace: 'nowrap',
            }}
          >
            {copyText}
          </button>
          <a
            href={`/w/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '9px 14px', borderRadius: '7px', fontSize: '13px', fontWeight: 500,
              border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface-raised)',
              color: 'var(--color-text)', textDecoration: 'none', whiteSpace: 'nowrap',
            }}
          >
            Open ↗
          </a>
        </div>
      </div>

      {/* Publish status */}
      <div style={{
        backgroundColor: 'var(--color-surface-raised)', border: '1px solid var(--color-border)',
        borderRadius: '10px', padding: '20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text)', margin: '0 0 4px' }}>
              {isPublished ? 'Live' : 'Draft'}
            </p>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: 0 }}>
              {isPublished
                ? 'Your waitlist is publicly accessible.'
                : 'Only you can see this. Publish to go live.'}
            </p>
          </div>
          <button
            onClick={handleTogglePublish}
            disabled={isPendingPublish}
            style={{
              padding: '8px 18px', borderRadius: '7px', fontSize: '13px', fontWeight: 500,
              border: 'none',
              backgroundColor: isPublished ? 'var(--color-surface-inset)' : 'var(--color-text)',
              color: isPublished ? 'var(--color-text)' : '#fff',
              cursor: isPendingPublish ? 'not-allowed' : 'pointer',
              opacity: isPendingPublish ? 0.6 : 1, whiteSpace: 'nowrap',
            }}
          >
            {isPendingPublish ? '…' : isPublished ? 'Unpublish' : 'Publish'}
          </button>
        </div>
        {publishError && (
          <p style={{ fontSize: '12px', color: 'var(--color-danger)', margin: '10px 0 0' }}>{publishError}</p>
        )}
      </div>

      {/* Edit page link */}
      <div style={{
        backgroundColor: 'var(--color-surface-raised)', border: '1px solid var(--color-border)',
        borderRadius: '10px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text)', margin: '0 0 4px' }}>Edit page</p>
          <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: 0 }}>
            Change your template, content, and settings.
          </p>
        </div>
        <Link
          href={`/waitlists/${waitlistId}/edit`}
          style={{
            padding: '8px 18px', borderRadius: '7px', fontSize: '13px', fontWeight: 500,
            border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)',
            color: 'var(--color-text)', textDecoration: 'none', whiteSpace: 'nowrap',
          }}
        >
          Open builder →
        </Link>
      </div>

      {/* Danger zone */}
      <div style={{
        backgroundColor: 'var(--color-danger-bg)', border: '1px solid #f5c6c6',
        borderRadius: '10px', padding: '20px',
      }}>
        <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-danger)', margin: '0 0 4px' }}>
          Danger zone
        </p>
        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 12px' }}>
          Deleting a waitlist is permanent and removes all subscriber data.
        </p>
        <button
          onClick={handleDelete}
          disabled={isPendingDelete}
          style={{
            padding: '7px 14px', borderRadius: '7px', fontSize: '12px', fontWeight: 500,
            border: '1px solid var(--color-danger)', backgroundColor: 'transparent',
            color: 'var(--color-danger)', cursor: isPendingDelete ? 'not-allowed' : 'pointer',
            opacity: isPendingDelete ? 0.6 : 1,
          }}
        >
          {isPendingDelete ? 'Deleting…' : 'Delete waitlist'}
        </button>
      </div>
    </div>
  )
}
