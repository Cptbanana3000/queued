'use client'

import { useState, useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createWaitlist } from '../actions'
import BuilderSidebar from '@/components/builder/BuilderSidebar'
import BuilderPreview from '@/components/builder/BuilderPreview'
import type { BuilderState, ActionState } from '@/lib/types'
import { DEFAULT_BUILDER_STATE } from '@/lib/types'

export default function NewWaitlistPage() {
  const router = useRouter()
  const [state, setState] = useState<BuilderState>(DEFAULT_BUILDER_STATE)
  const [actionState, formAction, pending] = useActionState<ActionState, FormData>(
    createWaitlist, undefined,
  )

  // Handle redirect returned from server action
  useEffect(() => {
    if (actionState?.success && actionState.redirectTo) {
      router.push(actionState.redirectTo)
    }
  }, [actionState, router])

  const buildFormData = (published: boolean): FormData => {
    const fd = new FormData()
    fd.set('name', state.name)
    fd.set('slug', state.slug || state.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''))
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
      {/* Sidebar form */}
      <BuilderSidebar state={state} onChange={setState} />

      {/* Preview + top action bar */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top bar */}
        <div style={{
          padding: '12px 24px', borderBottom: '1px solid var(--color-border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          backgroundColor: 'var(--color-surface-raised)', flexShrink: 0,
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
            <button
              type="button"
              onClick={() => formAction(buildFormData(false))}
              disabled={pending || !state.name.trim()}
              style={{
                padding: '8px 16px', borderRadius: '7px', fontSize: '13px', fontWeight: 500,
                border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface-raised)',
                color: 'var(--color-text)', cursor: pending ? 'not-allowed' : 'pointer',
                opacity: pending ? 0.6 : 1,
              }}
            >
              {pending ? 'Saving…' : 'Save as draft'}
            </button>
            <button
              type="button"
              onClick={() => formAction(buildFormData(true))}
              disabled={pending || !state.name.trim()}
              style={{
                padding: '8px 16px', borderRadius: '7px', fontSize: '13px', fontWeight: 500,
                border: 'none', backgroundColor: 'var(--color-text)', color: '#fff',
                cursor: pending ? 'not-allowed' : 'pointer', opacity: pending ? 0.6 : 1,
              }}
            >
              {pending ? 'Publishing…' : 'Publish'}
            </button>
          </div>
        </div>

        {/* Error message */}
        {actionState && !actionState.success && (
          <div style={{
            margin: '12px 24px 0', padding: '10px 14px', borderRadius: '8px', flexShrink: 0,
            backgroundColor: 'var(--color-danger-bg)', border: '1px solid #f5c6c6',
            fontSize: '13px', color: 'var(--color-danger)',
          }}>
            {actionState.message}
          </div>
        )}

        {/* Live preview */}
        <BuilderPreview state={state} />
      </div>
    </div>
  )
}
