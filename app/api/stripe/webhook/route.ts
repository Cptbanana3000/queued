import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

if (!process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error('Missing STRIPE_WEBHOOK_SECRET')
}

if (!process.env.SUPABASE_SECRET_KEY) {
  throw new Error('Missing SUPABASE_SECRET_KEY')
}

export async function POST(req: Request) {
  const body = await req.text()
  const headerPayload = await headers()
  const signature = headerPayload.get('Stripe-Signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    console.error(`Webhook signature verification failed: ${error.message}`)
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  )

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        if (!session.client_reference_id) break

        // Idempotency: skip if this subscription is already recorded
        const { data: existing } = await supabaseAdmin
          .from('profiles')
          .select('stripe_subscription_id')
          .eq('id', session.client_reference_id)
          .single()

        if (existing?.stripe_subscription_id === (session.subscription as string)) break

        const { error } = await supabaseAdmin
          .from('profiles')
          .update({
            plan: 'pro',
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: session.subscription as string,
          })
          .eq('id', session.client_reference_id)

        if (error) throw error
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const { data } = await supabaseAdmin
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', subscription.customer as string)
          .single()

        if (!data) break

        const { error } = await supabaseAdmin
          .from('profiles')
          .update({ plan: 'free', stripe_subscription_id: null })
          .eq('id', data.id)

        if (error) throw error
        break
      }
    }
  } catch (error: any) {
    console.error('Error handling webhook:', error)
    return new NextResponse('Internal error', { status: 500 })
  }

  return new NextResponse('OK', { status: 200 })
}
