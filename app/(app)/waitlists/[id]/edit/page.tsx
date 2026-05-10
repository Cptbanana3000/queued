import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import EditBuilder from '@/app/(app)/waitlists/[id]/edit/EditBuilder'
import type { BuilderState, Template } from '@/lib/types'

export default async function EditWaitlistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: waitlist, error } = await supabase
    .from('waitlists')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (error || !waitlist) notFound()

  const initial: BuilderState = {
    name: waitlist.name,
    tagline: waitlist.tagline ?? '',
    buttonText: waitlist.button_text,
    template: waitlist.template as Template,
    showCount: waitlist.show_count,
    comingSoon: waitlist.coming_soon,
    highlights: waitlist.highlights as BuilderState['highlights'],
    faq: waitlist.faq as BuilderState['faq'],
    slug: waitlist.slug,
  }

  return <EditBuilder id={id} initial={initial} published={waitlist.published} />
}
