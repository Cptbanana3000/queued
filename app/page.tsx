import Link from 'next/link'
import type { Metadata } from 'next'
import LandingNav from '@/components/landing/LandingNav'
import LandingHero from '@/components/landing/LandingHero'
import LandingBleed from '@/components/landing/LandingBleed'
import LandingTemplates from '@/components/landing/LandingTemplates'
import LandingHowItWorks from '@/components/landing/LandingHowItWorks'
import LandingPricing from '@/components/landing/LandingPricing'
import LandingFooter from '@/components/landing/LandingFooter'

export const metadata: Metadata = {
  title: 'Queued — Your waitlist, live in 60 seconds',
  description:
    'Launch a beautiful waitlist page in 60 seconds. No code, no design skills. Pick a template, fill in your details, share your link.',
}

export default function HomePage() {
  return (
    <div style={{ fontFamily: 'var(--font-sans)', color: '#0a0a0a', backgroundColor: '#fff' }}>
      <LandingNav />
      <LandingHero />
      <LandingBleed />
      <LandingTemplates />
      <LandingHowItWorks />
      <LandingPricing />
      <LandingFooter />
    </div>
  )
}
