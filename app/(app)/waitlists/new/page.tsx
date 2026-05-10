'use client'

import { useState, useActionState } from 'react'
import { createWaitlist } from '../actions'
import BuilderSidebar from '@/components/builder/BuilderSidebar'
import BuilderPreview from '@/components/builder/BuilderPreview'
import type { BuilderState, ActionState } from '@/lib/types'
import { DEFAULT_BUILDER_STATE } from '@/lib/types'

export default function NewWaitlistPage() {
  const [state, setState] = useState<BuilderState>(DEFAULT_BUILDER_STATE)
  const [actionState, formAction, pending] = useActionState<ActionState, FormData>(
    createWaitlist, undefined,
  )

  const handleSubmit = (formData: FormData) => {
    formData.set('name', state.name)
    formData.set('slug', state.slug || state.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''))
    formData.set('template', state.template)
    formData.set('tagline', state.tagline)
    formData.set('buttonText', state.buttonText)
    formData.set('showCount', String(state.showCount))
    formData.set('comingSoon', String(state.comingSoon))
    formData.set('highlights', JSON.stringify(state.showHighlights ? state.highlights : []))
    formData.set('faq', JSON.stringify(state.showFaq ? state.faq : []))
    formData.set('published', 'false')
    formAction(formData)
  }

  return (
    <form
      action={handleSubmit}
      style={{ display: 'flex', height: 'calc(100dvh)', backgroundColor: 'var(--color-surface)' }}
    >
      {/* Sidebar form */}
      <BuilderSidebar state={state} onChange={setState} />

      {/* Preview + top action bar */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top bar */}
        <div style={{
          padding: '12px 24px', borderBottom: '1px solid var(--color-border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          backgroundColor: 'var(--color-surface-raised)',
        }}>
          <div>
            <h1 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text)', margin: 0 }}>
              New waitlist
            </h1>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: '2px 0 0' }}>
              Fill in your details and preview your page
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {/* Save as draft */}
            <button
              type="submit"
              disabled={pending || !state.name.trim()}
              style={{
                padding: '8px 16px', borderRadius: '7px', fontSize: '13px', fontWeight: 500,
                border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface-raised)',
                color: 'var(--color-text)', cursor: pending ? 'not-allowed' : 'pointer',
                transition: 'border-color 0.15s',
              }}
            >
              {pending ? 'Saving…' : 'Save as draft'}
            </button>
            {/* Publish */}
            <button
              type="submit"
              disabled={pending || !state.name.trim()}
              onClick={() => {
                // set a hidden flag to publish on submit
                const hidden = document.getElementById('__publish_flag') as HTMLInputElement | null
                if (hidden) hidden.value = 'true'
              }}
              style={{
                padding: '8px 16px', borderRadius: '7px', fontSize: '13px', fontWeight: 500,
                border: 'none', backgroundColor: 'var(--color-text)', color: '#fff',
                cursor: pending ? 'not-allowed' : 'pointer', transition: 'background-color 0.15s',
              }}
            >
              {pending ? 'Publishing…' : 'Publish'}
            </button>
          </div>
        </div>

        {/* Error message */}
        {actionState && !actionState.success && (
          <div style={{
            margin: '12px 24px 0', padding: '10px 14px', borderRadius: '8px',
            backgroundColor: 'var(--color-danger-bg)', border: '1px solid #f5c6c6',
            fontSize: '13px', color: 'var(--color-danger)',
          }}>
            {actionState.message}
          </div>
        )}

        {/* Live preview */}
        <BuilderPreview state={state} />
      </div>

      {/* Hidden input for publish flag */}
      <input type="hidden" id="__publish_flag" name="published" value="false" />
    </form>
  )
}
