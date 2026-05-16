import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { PLAN_LIMITS } from '@/lib/types'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { email, ref } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    const supabase = await createClient()

    // 1. Get the waitlist and user's plan to check limits
    const { data: waitlist, error: waitlistError } = await supabase
      .from('waitlists')
      .select('user_id, published, slug')
      .eq('id', id)
      .single()

    if (waitlistError || !waitlist) {
      return NextResponse.json({ error: 'Waitlist not found.' }, { status: 404 })
    }

    if (!waitlist.published) {
      return NextResponse.json({ error: 'Waitlist is not active.' }, { status: 403 })
    }

    // 2. Get user's plan
    const { data: profile } = await supabase
      .from('profiles')
      .select('plan')
      .eq('id', waitlist.user_id)
      .single()

    const plan = (profile?.plan as 'free' | 'pro') ?? 'free'

    // 3. Check subscriber limit for free plan
    const { count } = await supabase
      .from('subscribers')
      .select('*', { count: 'exact', head: true })
      .eq('waitlist_id', id)

    if ((count ?? 0) >= PLAN_LIMITS[plan].maxSubscribers) {
      return NextResponse.json({ error: 'This waitlist is currently full.' }, { status: 403 })
    }

    // 4. Validate the referral token — must belong to an existing subscriber on this waitlist
    let referredBy: string | null = null
    if (ref && typeof ref === 'string' && ref.length > 0) {
      const { data: referrer } = await supabase
        .from('subscribers')
        .select('ref_token')
        .eq('waitlist_id', id)
        .eq('ref_token', ref)
        .single()
      if (referrer) referredBy = ref
    }

    // 5. Generate a unique referral token for this new subscriber
    const refToken = crypto.randomUUID().replace(/-/g, '').slice(0, 12)

    // 6. Insert subscriber (DB trigger sets position)
    const { error: insertError } = await supabase
      .from('subscribers')
      .insert({
        waitlist_id: id,
        email: email.trim().toLowerCase(),
        ref_token: refToken,
        referred_by: referredBy,
      })

    if (insertError) {
      if (insertError.message.includes('unique') || insertError.message.includes('duplicate')) {
        return NextResponse.json({ error: 'You are already on the list!' }, { status: 400 })
      }
      return NextResponse.json({ error: 'Failed to join waitlist.' }, { status: 500 })
    }

    return NextResponse.json({ success: true, refToken })

  } catch (err) {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
