import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import type { Template, Highlight, FaqItem } from '@/lib/types'
import OatTemplate from '@/components/templates/OatTemplate'
import SlateTemplate from '@/components/templates/SlateTemplate'
import EmberTemplate from '@/components/templates/EmberTemplate'
import VoidTemplate from '@/components/templates/VoidTemplate'

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()

  const { data: waitlist } = await supabase
    .from('waitlists')
    .select('name, tagline')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!waitlist) return {}

  const title = waitlist.name
  const description = waitlist.tagline
    ? waitlist.tagline
    : `Join the ${waitlist.name} waitlist and be first in line.`

  return {
    title,
    description,
    alternates: { canonical: `https://www.queuedapp.dev/w/${slug}` },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://www.queuedapp.dev/w/${slug}`,
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function PublicWaitlistPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ ref?: string }>
}) {
  const { slug } = await params
  const { ref } = await searchParams
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
    slug,
    referredBy: ref ?? null,
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
