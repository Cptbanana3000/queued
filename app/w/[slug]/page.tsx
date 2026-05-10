import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Template, Highlight, FaqItem } from '@/lib/types'
import OatTemplate from '@/components/templates/OatTemplate'
import SlateTemplate from '@/components/templates/SlateTemplate'
import EmberTemplate from '@/components/templates/EmberTemplate'
import VoidTemplate from '@/components/templates/VoidTemplate'

export default async function PublicWaitlistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: waitlist, error } = await supabase
    .from('waitlists')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error || !waitlist) notFound()

  // Get subscriber count
  const { count } = await supabase
    .from('subscribers')
    .select('*', { count: 'exact', head: true })
    .eq('waitlist_id', waitlist.id)

  const props = {
    waitlistId: waitlist.id,
    name: waitlist.name,
    tagline: waitlist.tagline ?? '',
    buttonText: waitlist.button_text,
    showCount: waitlist.show_count,
    comingSoon: waitlist.coming_soon,
    showRecentSignups: waitlist.show_recent_signups ?? true,
    subscriberCount: count ?? 0,
    highlights: (waitlist.highlights ?? []) as Highlight[],
    faq: (waitlist.faq ?? []) as FaqItem[],
  }

  const COMPONENTS: Record<Template, React.ComponentType<typeof props>> = {
    oat: OatTemplate,
    slate: SlateTemplate,
    ember: EmberTemplate,
    void: VoidTemplate,
  }

  const Component = COMPONENTS[waitlist.template as Template] ?? OatTemplate
  return <Component {...props} />
}
