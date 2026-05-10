'use client'

import Link from 'next/link'
import type { Template } from '@/lib/types'

const TEMPLATE_COLORS: Record<Template, { bg: string; dot: string; label: string }> = {
  oat:   { bg: '#F2EDE4', dot: '#D85A30', label: 'Oat' },
  slate: { bg: '#E6F1FB', dot: '#185FA5', label: 'Slate' },
  ember: { bg: '#2C2C2A', dot: '#EF9F27', label: 'Ember' },
  void:  { bg: '#f0f0f0', dot: '#000000', label: 'Void' },
}

interface WaitlistCardProps {
  id: string
  name: string
  slug: string
  template: Template
  published: boolean
  subscriberCount: number
  todayCount: number
}

export default function WaitlistCard({
  id, name, slug, template, published, subscriberCount, todayCount,
}: WaitlistCardProps) {
  const t = TEMPLATE_COLORS[template]

  return (
    <Link
      href={`/waitlists/${id}`}
      style={{
        display: 'block',
        backgroundColor: 'var(--color-surface-raised)',
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
        padding: '20px 22px',
        textDecoration: 'none',
        transition: 'border-color 0.15s, box-shadow 0.15s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--color-border-strong)'
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--color-border)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Top row: name + status */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
          {/* Template swatch */}
          <div style={{
            width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
            backgroundColor: t.bg, border: '1px solid var(--color-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: t.dot }} />
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{
              fontSize: '14px', fontWeight: 500, color: 'var(--color-text)',
              margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {name}
            </p>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: '1px 0 0' }}>
              /w/{slug}
            </p>
          </div>
        </div>

        {/* Status badge */}
        <span style={{
          fontSize: '11px', padding: '2px 8px', borderRadius: '20px', fontWeight: 500, flexShrink: 0,
          backgroundColor: published ? 'var(--color-success-bg)' : 'var(--color-surface-inset)',
          color: published ? 'var(--color-success)' : 'var(--color-text-muted)',
        }}>
          {published ? 'Live' : 'Draft'}
        </span>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: '20px' }}>
        <div>
          <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
            Signups
          </p>
          <p style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text)', margin: 0, letterSpacing: '-0.5px' }}>
            {subscriberCount}
          </p>
        </div>
        <div>
          <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
            Today
          </p>
          <p style={{ fontSize: '18px', fontWeight: 600, color: todayCount > 0 ? 'var(--color-success)' : 'var(--color-text)', margin: 0, letterSpacing: '-0.5px' }}>
            +{todayCount}
          </p>
        </div>
      </div>
    </Link>
  )
}
