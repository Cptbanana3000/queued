'use client'

import type { BuilderState, Template } from '@/lib/types'
import OatTemplate from '@/components/templates/OatTemplate'
import SlateTemplate from '@/components/templates/SlateTemplate'
import EmberTemplate from '@/components/templates/EmberTemplate'
import VoidTemplate from '@/components/templates/VoidTemplate'

const TEMPLATE_MAP: Record<Template, React.ComponentType<React.ComponentProps<typeof OatTemplate>>> = {
  oat:   OatTemplate,
  slate: SlateTemplate,
  ember: EmberTemplate,
  void:  VoidTemplate,
}

interface BuilderPreviewProps {
  state: BuilderState
}

export default function BuilderPreview({ state }: BuilderPreviewProps) {
  const Component = TEMPLATE_MAP[state.template]

  return (
    <div style={{ flex: 1, overflowY: 'auto', height: '100%' }}>
      <Component
        waitlistId="__preview__"
        name={state.name || 'Your product name'}
        tagline={state.tagline || 'A punchy one-line tagline that explains what you do.'}
        buttonText={state.buttonText || 'Join waitlist'}
        showCount={state.showCount}
        comingSoon={state.comingSoon}
        showRecentSignups={state.showRecentSignups}
        subscriberCount={0}
        highlights={state.showHighlights ? state.highlights : []}
        faq={state.showFaq ? state.faq : []}
      />
    </div>
  )
}
