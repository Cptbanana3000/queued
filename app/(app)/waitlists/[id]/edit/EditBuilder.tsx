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

  const handleSubmit = (formData: FormData) => {
    formData.set('id', id)
    formData.set('name', state.name)
    formData.set('template', state.template)
    formData.set('tagline', state.tagline)
    formData.set('buttonText', state.buttonText)
    formData.set('showCount', String(state.showCount))
    formData.set('comingSoon', String(state.comingSoon))
    formData.set('highlights', JSON.stringify(state.showHighlights ? state.highlights : []))
    formData.set('faq', JSON.stringify(state.showFaq ? state.faq : []))
    formData.set('published', String(published))
    formAction(formData)
  }

  return (
    <form
      action={handleSubmit}
      style={{ display: 'flex', height: 'calc(100dvh)', backgroundColor: 'var(--color-surface)' }}
    >
      <BuilderSidebar state={state} onChange={setState} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top bar */}
        <div style={{
          padding: '12px 24px', borderBottom: '1px solid var(--color-border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          backgroundColor: 'var(--color-surface-raised)',
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
            {/* Success message */}
            {actionState?.success && (
              <span style={{ fontSize: '12px', color: 'var(--color-success)', marginRight: '6px' }}>
                ✓ Saved
              </span>
            )}
            <button
              type="submit"
              disabled={pending || !state.name.trim()}
              style={{
                padding: '8px 16px', borderRadius: '7px', fontSize: '13px', fontWeight: 500,
                border: 'none', backgroundColor: 'var(--color-text)', color: '#fff',
                cursor: pending ? 'not-allowed' : 'pointer', transition: 'background-color 0.15s',
              }}
            >
              {pending ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </div>

        {/* Error */}
        {actionState && !actionState.success && (
          <div style={{
            margin: '12px 24px 0', padding: '10px 14px', borderRadius: '8px',
            backgroundColor: 'var(--color-danger-bg)', border: '1px solid #f5c6c6',
            fontSize: '13px', color: 'var(--color-danger)',
          }}>
            {actionState.message}
          </div>
        )}

        <BuilderPreview state={state} />
      </div>
    </form>
  )
}
