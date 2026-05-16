'use client'

import { useState, useActionState, useEffect } from 'react'
import { updateWaitlist } from '../../actions'
import BuilderSidebar from '@/components/builder/BuilderSidebar'
import BuilderPreview from '@/components/builder/BuilderPreview'
import type { BuilderState, ActionState } from '@/lib/types'

interface EditBuilderProps {
  id: string
  initial: BuilderState
  published: boolean
}

export default function EditBuilder({ id, initial, published }: EditBuilderProps) {
  const [state, setState] = useState<BuilderState>(initial)
  const [actionState, formAction, pending] = useActionState<ActionState, FormData>(
    updateWaitlist, undefined,
  )
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const buildFormData = (): FormData => {
    const fd = new FormData()
    fd.set('id', id)
    fd.set('name', state.name)
    fd.set('slug', state.slug)
    fd.set('template', state.template)
    fd.set('tagline', state.tagline)
    fd.set('buttonText', state.buttonText)
    fd.set('showCount', String(state.showCount))
    fd.set('comingSoon', String(state.comingSoon))
    fd.set('showRecentSignups', String(state.showRecentSignups))
    fd.set('highlights', JSON.stringify(state.showHighlights ? state.highlights : []))
    fd.set('faq', JSON.stringify(state.showFaq ? state.faq : []))
    fd.set('published', String(published))
    return fd
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', backgroundColor: 'var(--color-surface)' }}>

      {/* Top bar */}
      <div style={{
        padding: isMobile ? '10px 16px' : '12px 24px',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        backgroundColor: 'var(--color-surface-raised)', flexShrink: 0,
      }}>
        <div style={{ minWidth: 0 }}>
          <h1 style={{
            fontSize: '15px', fontWeight: 600, color: 'var(--color-text)', margin: 0,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {isMobile ? (state.name || 'Edit waitlist') : 'Edit waitlist'}
          </h1>
          {!isMobile && (
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: '2px 0 0' }}>
              {state.slug}.queuedapp.dev
            </p>
          )}
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
          {actionState?.success && (
            <span style={{ fontSize: '12px', color: 'var(--color-success)' }}>
              Saved
            </span>
          )}
          <button
            type="button"
            onClick={() => formAction(buildFormData())}
            disabled={pending || !state.name.trim()}
            style={{
              padding: '8px 14px', borderRadius: '7px', fontSize: '13px', fontWeight: 500,
              border: 'none', backgroundColor: 'var(--color-text)', color: '#fff',
              cursor: pending ? 'not-allowed' : 'pointer', opacity: pending ? 0.6 : 1,
            }}
          >
            {pending ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>

      {/* Mobile tab bar */}
      {isMobile && (
        <div style={{
          display: 'flex', flexShrink: 0,
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-surface-raised)',
        }}>
          {(['edit', 'preview'] as const).map(tab => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1, padding: '11px', fontSize: '13px',
                fontWeight: activeTab === tab ? 600 : 400,
                color: activeTab === tab ? 'var(--color-text)' : 'var(--color-text-muted)',
                border: 'none', background: 'none', cursor: 'pointer',
                borderBottom: activeTab === tab ? '2px solid var(--color-text)' : '2px solid transparent',
                marginBottom: '-1px',
              }}
            >
              {tab === 'edit' ? 'Edit' : 'Preview'}
            </button>
          ))}
        </div>
      )}

      {/* Error banner */}
      {actionState && !actionState.success && (
        <div style={{
          margin: '12px 16px 0', padding: '10px 14px', borderRadius: '8px', flexShrink: 0,
          backgroundColor: 'var(--color-danger-bg)', border: '1px solid #f5c6c6',
          fontSize: '13px', color: 'var(--color-danger)',
        }}>
          {actionState.message}
        </div>
      )}

      {/* Main content */}
      {isMobile ? (
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {activeTab === 'edit'
            ? <div style={{ flex: 1, overflowY: 'auto' }}><BuilderSidebar state={state} onChange={setState} fullWidth /></div>
            : <BuilderPreview state={state} />
          }
        </div>
      ) : (
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <BuilderSidebar state={state} onChange={setState} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <BuilderPreview state={state} />
          </div>
        </div>
      )}
    </div>
  )
}
