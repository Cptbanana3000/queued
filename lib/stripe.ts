import 'server-only'
import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY')
}

if (!process.env.STRIPE_PRICE_ID) {
  throw new Error('Missing STRIPE_PRICE_ID')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // Use the latest stable API version or omit if preferred.
  // The SDK requires an API version to be passed.
  apiVersion: '2026-04-22.dahlia',
  appInfo: {
    name: 'Queued',
    version: '0.1.0',
  },
})
