// ── Template types ────────────────────────────────────────────────
export type Template = 'oat' | 'slate' | 'ember' | 'void'

export const TEMPLATES: { id: Template; name: string; mood: string }[] = [
  { id: 'oat',   name: 'Oat',   mood: 'For the calm and considered'  },
  { id: 'slate', name: 'Slate', mood: 'For the professional builder'  },
  { id: 'ember', name: 'Ember', mood: 'For the ones who launch loud'  },
  { id: 'void',  name: 'Void',  mood: 'For the bold and serious'      },
]

// ── Plan types ────────────────────────────────────────────────────
export type Plan = 'free' | 'pro'

export const PLAN_LIMITS = {
  free: {
    maxWaitlists: 1,
    maxSubscribers: 100,
    customDomain: false,
    removeBadge: false,
    csvExport: false,
  },
  pro: {
    maxWaitlists: Infinity,
    maxSubscribers: Infinity,
    customDomain: true,
    removeBadge: true,
    csvExport: true,
  },
} as const

// ── Database types ────────────────────────────────────────────────
export interface Profile {
  id: string
  full_name: string | null
  plan: Plan
  created_at: string
}

export interface Highlight {
  icon: string
  title: string
  desc: string
}

export interface FaqItem {
  q: string
  a: string
}

export interface Waitlist {
  id: string
  user_id: string
  name: string
  slug: string
  template: Template
  tagline: string | null
  button_text: string
  show_count: boolean
  coming_soon: boolean
  highlights: Highlight[]
  faq: FaqItem[]
  published: boolean
  created_at: string
  // Joined / computed
  subscriber_count?: number
  today_count?: number
}

export interface Subscriber {
  id: string
  waitlist_id: string
  email: string
  position: number
  created_at: string
}

// ── Form state types ──────────────────────────────────────────────
export type ActionState =
  | { success: true; message?: string }
  | { success: false; message: string; errors?: Record<string, string[]> }
  | undefined

// ── Builder state type ────────────────────────────────────────────
export interface BuilderState {
  name: string
  tagline: string
  buttonText: string
  template: Template
  showCount: boolean
  comingSoon: boolean
  showRecentSignups: boolean
  showHighlights: boolean
  highlights: Highlight[]
  showFaq: boolean
  faq: FaqItem[]
  slug: string
}

export const DEFAULT_BUILDER_STATE: BuilderState = {
  name: '',
  tagline: '',
  buttonText: 'Join waitlist',
  template: 'oat',
  showCount: true,
  comingSoon: false,
  showRecentSignups: true,
  showHighlights: false,
  highlights: [],
  showFaq: false,
  faq: [],
  slug: '',
}
