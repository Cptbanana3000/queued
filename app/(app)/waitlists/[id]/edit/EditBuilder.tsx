'use client'

import { useState, useActionState } from 'react'
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

  const buildFormData = (): FormData => {
    const fd = new FormData()
    fd.set('id', id)
    fd.set('name', state.name)
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
    <div style={{ display: 'flex', height: 'calc(100dvh)', backgroundColor: 'var(--color-surface)' }}>
      <BuilderSidebar state={state} onChange={setState} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top bar */}
        <div style={{
          padding: '12px 24px', borderBottom: '1px solid var(--color-border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          backgroundColor: 'var(--color-surface-raised)', flexShrink: 0,
        }}>
          <div>
            <h1 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text)', margin: 0 }}>
              Edit waitlist
            </h1>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: '2px 0 0' }}>
              /w/{state.slug}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {actionState?.success && (
              <span style={{ fontSize: '12px', color: 'var(--color-success)', marginRight: '4px' }}>
                ✓ Saved
              </span>
            )}
            <button
              type="button"
              onClick={() => formAction(buildFormData())}
              disabled={pending || !state.name.trim()}
              style={{
                padding: '8px 16px', borderRadius: '7px', fontSize: '13px', fontWeight: 500,
                border: 'none', backgroundColor: 'var(--color-text)', color: '#fff',
                cursor: pending ? 'not-allowed' : 'pointer', opacity: pending ? 0.6 : 1,
              }}
            >
              {pending ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </div>

        {/* Error */}
        {actionState && !actionState.success && (
          <div style={{
            margin: '12px 24px 0', padding: '10px 14px', borderRadius: '8px', flexShrink: 0,
            backgroundColor: 'var(--color-danger-bg)', border: '1px solid #f5c6c6',
            fontSize: '13px', color: 'var(--color-danger)',
          }}>
            {actionState.message}
          </div>
        )}

        <BuilderPreview state={state} />
      </div>
    </div>
  )
}
