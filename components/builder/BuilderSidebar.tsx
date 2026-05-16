'use client'

import type { BuilderState, Template, Highlight, FaqItem } from '@/lib/types'
import { TEMPLATES } from '@/lib/types'

const TEMPLATE_COLORS: Record<Template, string> = {
  oat:   '#D85A30',
  slate: '#185FA5',
  ember: '#EF9F27',
  void:  '#000',
}

interface BuilderSidebarProps {
  state: BuilderState
  onChange: (next: BuilderState) => void
  fullWidth?: boolean
}

export default function BuilderSidebar({ state, onChange, fullWidth }: BuilderSidebarProps) {
  const set = <K extends keyof BuilderState>(key: K, val: BuilderState[K]) =>
    onChange({ ...state, [key]: val })

  const inputStyle: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box', padding: '8px 11px',
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
    borderBottom: '1px solid var(--color-border)', padding: '16px 18px',
  }

  const focusIn = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.currentTarget.style.borderColor = 'var(--color-text)')
  const focusOut = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.currentTarget.style.borderColor = 'var(--color-border)')

  /* ── Highlights helpers ─────────────────────── */
  const addHighlight = () => {
    if (state.highlights.length >= 3) return
    set('highlights', [...state.highlights, { icon: 'check', title: '', desc: '' }])
  }

  const updateHighlight = (i: number, field: keyof Highlight, val: string) => {
    const next = state.highlights.map((h, idx) => idx === i ? { ...h, [field]: val } : h)
    set('highlights', next)
  }

  const removeHighlight = (i: number) =>
    set('highlights', state.highlights.filter((_, idx) => idx !== i))

  /* ── FAQ helpers ─────────────────────────────── */
  const addFaq = () => {
    if (state.faq.length >= 5) return
    set('faq', [...state.faq, { q: '', a: '' }])
  }

  const updateFaq = (i: number, field: keyof FaqItem, val: string) => {
    const next = state.faq.map((f, idx) => idx === i ? { ...f, [field]: val } : f)
    set('faq', next)
  }

  const removeFaq = (i: number) =>
    set('faq', state.faq.filter((_, idx) => idx !== i))

  return (
    <div style={{
      width: fullWidth ? '100%' : '300px', flexShrink: 0,
      borderRight: fullWidth ? 'none' : '1px solid var(--color-border)',
      backgroundColor: 'var(--color-surface-raised)', overflowY: 'auto', height: '100%',
    }}>

      {/* ── Template picker ─────────────────────── */}
      <div style={sectionStyle}>
        <span style={labelStyle}>Template</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
          {TEMPLATES.map(t => {
            const active = state.template === t.id
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => set('template', t.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px',
                  borderRadius: '7px', cursor: 'pointer', textAlign: 'left',
                  border: active ? '2px solid var(--color-text)' : '1px solid var(--color-border)',
                  backgroundColor: active ? 'var(--color-surface-inset)' : 'var(--color-surface)',
                  transition: 'border-color 0.15s, background-color 0.15s',
                }}
              >
                <div style={{
                  width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0,
                  backgroundColor: TEMPLATE_COLORS[t.id],
                }} />
                <div>
                  <p style={{ fontSize: '13px', fontWeight: active ? 600 : 400, color: 'var(--color-text)', margin: 0 }}>{t.name}</p>
                  <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', margin: 0 }}>{t.mood}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Product details ──────────────────────── */}
      <div style={sectionStyle}>
        <div style={{ marginBottom: '13px' }}>
          <label style={labelStyle}>Product name *</label>
          <input
            value={state.name}
            onChange={e => set('name', e.target.value)}
            placeholder="My Awesome Product"
            style={inputStyle}
            onFocus={focusIn} onBlur={focusOut}
          />
        </div>
        <div style={{ marginBottom: '13px' }}>
          <label style={labelStyle}>Tagline</label>
          <input
            value={state.tagline}
            onChange={e => set('tagline', e.target.value)}
            placeholder="One line that explains what you do"
            style={inputStyle}
            onFocus={focusIn} onBlur={focusOut}
          />
        </div>
        <div style={{ marginBottom: '13px' }}>
          <label style={labelStyle}>Button text</label>
          <input
            value={state.buttonText}
            onChange={e => set('buttonText', e.target.value)}
            placeholder="Join waitlist"
            style={inputStyle}
            onFocus={focusIn} onBlur={focusOut}
          />
        </div>
        <div>
          <label style={labelStyle}>Slug</label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              value={state.slug}
              onChange={e => set('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
              placeholder="my-product"
              style={{ ...inputStyle, borderRadius: '7px 0 0 7px' }}
              onFocus={focusIn} onBlur={focusOut}
            />
            <span style={{
              padding: '8px 9px', fontSize: '12px', color: 'var(--color-text-muted)',
              backgroundColor: 'var(--color-surface-inset)', border: '1px solid var(--color-border)',
              borderLeft: 'none', borderRadius: '0 7px 7px 0', whiteSpace: 'nowrap',
            }}>.queuedapp.dev</span>
          </div>
        </div>
      </div>

      {/* ── Toggles ──────────────────────────────── */}
      <div style={sectionStyle}>
        <Toggle label="Show signup count" checked={state.showCount} onChange={v => set('showCount', v)} />
        <Toggle label='"Coming soon" badge' checked={state.comingSoon} onChange={v => set('comingSoon', v)} />
        <Toggle label="Recent signups ticker" checked={state.showRecentSignups} onChange={v => set('showRecentSignups', v)} />
      </div>

      {/* ── Highlights (max 3) ───────────────────── */}
      <div style={sectionStyle}>
        <Toggle
          label="Features section"
          checked={state.showHighlights}
          onChange={v => set('showHighlights', v)}
        />
        {state.showHighlights && (
          <div style={{ marginTop: '12px' }}>
            {state.highlights.map((h, i) => (
              <div key={i} style={{
                backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)',
                borderRadius: '8px', padding: '10px', marginBottom: '8px',
              }}>
                <input
                  value={h.title}
                  onChange={e => updateHighlight(i, 'title', e.target.value)}
                  placeholder="Feature title"
                  style={{ ...inputStyle, marginBottom: '6px' }}
                  onFocus={focusIn} onBlur={focusOut}
                />
                <textarea
                  value={h.desc}
                  onChange={e => updateHighlight(i, 'desc', e.target.value)}
                  placeholder="Short description"
                  rows={2}
                  style={{
                    ...inputStyle, resize: 'vertical', padding: '8px 11px', lineHeight: 1.4,
                  } as React.CSSProperties}
                  onFocus={focusIn as unknown as React.FocusEventHandler<HTMLTextAreaElement>}
                  onBlur={focusOut as unknown as React.FocusEventHandler<HTMLTextAreaElement>}
                />
                <button
                  type="button"
                  onClick={() => removeHighlight(i)}
                  style={{
                    marginTop: '4px', fontSize: '11px', color: 'var(--color-danger)',
                    background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0',
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
            {state.highlights.length < 3 && (
              <button
                type="button"
                onClick={addHighlight}
                style={{
                  width: '100%', padding: '8px', borderRadius: '7px', fontSize: '12px',
                  fontWeight: 500, border: '1px dashed var(--color-border-strong)',
                  backgroundColor: 'transparent', color: 'var(--color-text-secondary)',
                  cursor: 'pointer', marginTop: '2px',
                }}
              >
                + Add feature {state.highlights.length}/3
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── FAQ (max 5) ──────────────────────────── */}
      <div style={{ ...sectionStyle, borderBottom: 'none' }}>
        <Toggle
          label="FAQ section"
          checked={state.showFaq}
          onChange={v => set('showFaq', v)}
        />
        {state.showFaq && (
          <div style={{ marginTop: '12px' }}>
            {state.faq.map((f, i) => (
              <div key={i} style={{
                backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)',
                borderRadius: '8px', padding: '10px', marginBottom: '8px',
              }}>
                <input
                  value={f.q}
                  onChange={e => updateFaq(i, 'q', e.target.value)}
                  placeholder="Question"
                  style={{ ...inputStyle, marginBottom: '6px' }}
                  onFocus={focusIn} onBlur={focusOut}
                />
                <textarea
                  value={f.a}
                  onChange={e => updateFaq(i, 'a', e.target.value)}
                  placeholder="Answer"
                  rows={2}
                  style={{
                    ...inputStyle, resize: 'vertical', padding: '8px 11px', lineHeight: 1.4,
                  } as React.CSSProperties}
                  onFocus={focusIn as unknown as React.FocusEventHandler<HTMLTextAreaElement>}
                  onBlur={focusOut as unknown as React.FocusEventHandler<HTMLTextAreaElement>}
                />
                <button
                  type="button"
                  onClick={() => removeFaq(i)}
                  style={{
                    marginTop: '4px', fontSize: '11px', color: 'var(--color-danger)',
                    background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0',
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
            {state.faq.length < 5 && (
              <button
                type="button"
                onClick={addFaq}
                style={{
                  width: '100%', padding: '8px', borderRadius: '7px', fontSize: '12px',
                  fontWeight: 500, border: '1px dashed var(--color-border-strong)',
                  backgroundColor: 'transparent', color: 'var(--color-text-secondary)',
                  cursor: 'pointer', marginTop: '2px',
                }}
              >
                + Add question {state.faq.length}/5
              </button>
            )}
          </div>
        )}
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
      padding: '5px 0', cursor: 'pointer', userSelect: 'none',
    }}>
      <span style={{ fontSize: '13px', color: 'var(--color-text)' }}>{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        style={{
          width: '34px', height: '18px', borderRadius: '9px', border: 'none',
          backgroundColor: checked ? 'var(--color-text)' : 'var(--color-border-strong)',
          position: 'relative', cursor: 'pointer', transition: 'background-color 0.15s', flexShrink: 0,
        }}
      >
        <span style={{
          position: 'absolute', top: '2px', left: checked ? '17px' : '2px',
          width: '14px', height: '14px', borderRadius: '50%',
          backgroundColor: '#fff', transition: 'left 0.15s',
          boxShadow: '0 1px 2px rgba(0,0,0,0.18)',
        }} />
      </button>
    </label>
  )
}
