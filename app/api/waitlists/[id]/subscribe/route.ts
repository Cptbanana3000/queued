import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { resend, FROM_EMAIL } from '@/lib/resend'
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
      .select('user_id, published, slug, name')
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

    const currentCount = count ?? 0

    if (currentCount >= PLAN_LIMITS[plan].maxSubscribers) {
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

    // 7. Fire milestone email if this was the 100th subscriber (fire-and-forget)
    if (currentCount + 1 === 100) {
      sendMilestoneEmail(waitlist.user_id, waitlist.name, waitlist.slug).catch(() => {})
    }

    return NextResponse.json({ success: true, refToken })

  } catch (err) {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}

async function sendMilestoneEmail(ownerId: string, waitlistName: string, slug: string) {
  const admin = createAdminClient()
  const { data } = await admin.auth.admin.getUserById(ownerId)
  const ownerEmail = data.user?.email
  if (!ownerEmail) return

  const waitlistUrl = `https://www.queuedapp.dev/w/${slug}`
  const dashboardUrl = `https://www.queuedapp.dev/dashboard`

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ownerEmail,
    subject: `🎉 ${waitlistName} just hit 100 subscribers`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:40px 24px;color:#1a1a1a">
        <div style="margin-bottom:32px">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#0a0a0a;border-radius:8px;color:#fff;font-weight:700;font-size:16px">Q</span>
        </div>
        <h1 style="font-size:22px;font-weight:700;margin:0 0 8px;letter-spacing:-0.5px">
          100 subscribers — nice work.
        </h1>
        <p style="font-size:15px;color:#555;margin:0 0 24px;line-height:1.6">
          <strong style="color:#1a1a1a">${waitlistName}</strong> just crossed 100 signups.
          That's a real signal — people want what you're building.
        </p>
        <a href="${dashboardUrl}"
          style="display:inline-block;padding:12px 22px;background:#0a0a0a;color:#fff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:600">
          View your dashboard →
        </a>
        <p style="font-size:13px;color:#888;margin:32px 0 0;line-height:1.6">
          Your waitlist page: <a href="${waitlistUrl}" style="color:#1a1a1a">${waitlistUrl}</a>
        </p>
        <hr style="border:none;border-top:1px solid #eee;margin:32px 0">
        <p style="font-size:12px;color:#aaa;margin:0">
          Sent by <a href="https://www.queuedapp.dev" style="color:#aaa">Queued</a>
        </p>
      </div>
    `,
  })
}
