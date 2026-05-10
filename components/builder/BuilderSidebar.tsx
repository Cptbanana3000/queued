'use client'

import type { BuilderState, Template } from '@/lib/types'
import { TEMPLATES } from '@/lib/types'

const TEMPLATE_SWATCHES: Record<Template, { bg: string; dot: string }> = {
  oat:   { bg: '#FAF7F2', dot: '#D85A30' },
  slate: { bg: '#F4F4F2', dot: '#185FA5' },
  ember: { bg: '#1C1917', dot: '#EF9F27' },
  void:  { bg: '#fff',    dot: '#000'    },
}

interface BuilderSidebarProps {
  state: BuilderState
  onChange: (next: BuilderState) => void
}

export default function BuilderSidebar({ state, onChange }: BuilderSidebarProps) {
  const set = <K extends keyof BuilderState>(key: K, val: BuilderState[K]) =>
    onChange({ ...state, [key]: val })

  const inputStyle: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box', padding: '9px 12px',
    border: '1px solid var(--color-border)', borderRadius: '7px',
    backgroundColor: 'var(--color-surface)', fontSize: '13px',
    color: 'var(--color-text)', outline: 'none', fontFamily: 'var(--font-sans)',
    transition: 'border-color 0.15s',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '12px', fontWeight: 500, color: 'var(--color-text)',
    display: 'block', marginBottom: '5px',
  }

  const sectionStyle: React.CSSProperties = {
    borderBottom: '1px solid var(--color-border)', padding: '18px 20px',
  }

  return (
    <div style={{
      width: '320px', flexShrink: 0, borderRight: '1px solid var(--color-border)',
      backgroundColor: 'var(--color-surface-raised)', overflowY: 'auto', height: '100%',
    }}>
      {/* ── Template picker ─────────────────── */}
      <div style={sectionStyle}>
        <span style={labelStyle}>Template</span>
        <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
          {TEMPLATES.map(t => {
            const sw = TEMPLATE_SWATCHES[t.id]
            const active = state.template === t.id
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => set('template', t.id)}
                title={t.name}
                style={{
                  width: '42px', height: '42px', borderRadius: '8px', cursor: 'pointer',
                  border: active ? '2px solid var(--color-text)' : '1px solid var(--color-border)',
                  backgroundColor: sw.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'border-color 0.15s',
                }}
              >
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: sw.dot }} />
              </button>
            )
          })}
        </div>
        <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', margin: '6px 0 0' }}>
          {TEMPLATES.find(t => t.id === state.template)?.mood}
        </p>
      </div>

      {/* ── Product details ──────────────────── */}
      <div style={sectionStyle}>
        <div style={{ marginBottom: '14px' }}>
          <label style={labelStyle}>Product name *</label>
          <input
            value={state.name}
            onChange={e => set('name', e.target.value)}
            placeholder="My Awesome Product"
            style={inputStyle}
            onFocus={e => e.currentTarget.style.borderColor = 'var(--color-text)'}
            onBlur={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
          />
        </div>
        <div style={{ marginBottom: '14px' }}>
          <label style={labelStyle}>Tagline</label>
          <input
            value={state.tagline}
            onChange={e => set('tagline', e.target.value)}
            placeholder="One line that explains what you do"
            style={inputStyle}
            onFocus={e => e.currentTarget.style.borderColor = 'var(--color-text)'}
            onBlur={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
          />
        </div>
        <div style={{ marginBottom: '14px' }}>
          <label style={labelStyle}>Button text</label>
          <input
            value={state.buttonText}
            onChange={e => set('buttonText', e.target.value)}
            placeholder="Join waitlist"
            style={inputStyle}
            onFocus={e => e.currentTarget.style.borderColor = 'var(--color-text)'}
            onBlur={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
          />
        </div>
        <div>
          <label style={labelStyle}>Slug</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
            <span style={{
              padding: '9px 10px', fontSize: '12px', color: 'var(--color-text-muted)',
              backgroundColor: 'var(--color-surface-inset)', border: '1px solid var(--color-border)',
              borderRight: 'none', borderRadius: '7px 0 0 7px', whiteSpace: 'nowrap',
            }}>
              /w/
            </span>
            <input
              value={state.slug}
              onChange={e => set('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
              placeholder="my-product"
              style={{ ...inputStyle, borderRadius: '0 7px 7px 0' }}
              onFocus={e => e.currentTarget.style.borderColor = 'var(--color-text)'}
              onBlur={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
            />
          </div>
        </div>
      </div>

      {/* ── Toggles ──────────────────────────── */}
      <div style={sectionStyle}>
        <Toggle
          label="Show signup count"
          checked={state.showCount}
          onChange={v => set('showCount', v)}
        />
        <Toggle
          label='Show "Coming soon" badge'
          checked={state.comingSoon}
          onChange={v => set('comingSoon', v)}
        />
      </div>
    </div>
  )
}

/* ── Toggle primitive ──────────────────────────── */
function Toggle({ label, checked, onChange }: {
  label: string; checked: boolean; onChange: (v: boolean) => void
}) {
  return (
    <label style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '6px 0', cursor: 'pointer',
    }}>
      <span style={{ fontSize: '13px', color: 'var(--color-text)' }}>{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        style={{
          width: '36px', height: '20px', borderRadius: '10px', border: 'none',
          backgroundColor: checked ? 'var(--color-text)' : 'var(--color-border-strong)',
          position: 'relative', cursor: 'pointer', transition: 'background-color 0.15s',
          flexShrink: 0,
        }}
      >
        <span style={{
          position: 'absolute', top: '2px',
          left: checked ? '18px' : '2px',
          width: '16px', height: '16px', borderRadius: '50%',
          backgroundColor: '#fff', transition: 'left 0.15s',
          boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
        }} />
      </button>
    </label>
  )
}
