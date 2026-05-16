'use client'

import Link from 'next/link'
import { useState } from 'react'

const CHECK = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M2.5 7.5 5.5 10.5 11.5 4" stroke="#22c55e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const CROSS = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M4 4l6 6M10 4l-6 6" stroke="#ddd" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const FREE_FEATURES = [
  { icon: CHECK, text: '1 waitlist', muted: false },
  { icon: CHECK, text: 'Up to 100 signups', muted: false },
  { icon: CHECK, text: 'Referral links for subscribers', muted: false },
  { icon: CHECK, text: 'All 4 templates', muted: false },
  { icon: CHECK, text: 'Queued subdomain', muted: false },
  { icon: CROSS, text: 'Signups chart', muted: true },
  { icon: CROSS, text: 'Referral analytics', muted: true },
  { icon: CROSS, text: 'CSV export', muted: true },
  { icon: CROSS, text: 'Custom domain', muted: true },
]

const PRO_FEATURES = [
  { icon: CHECK, text: 'Unlimited waitlists', muted: false },
  { icon: CHECK, text: 'Unlimited signups', muted: false },
  { icon: CHECK, text: 'Referral links + analytics', muted: false },
  { icon: CHECK, text: 'Signups over time chart', muted: false },
  { icon: CHECK, text: 'CSV export', muted: false },
  { icon: CHECK, text: 'Milestone email notifications', muted: false },
  { icon: CHECK, text: 'All 4 templates', muted: false },
  { icon: CHECK, text: 'Custom domain', muted: false },
]

export default function LandingPricing({ isLoggedIn }: { isLoggedIn?: boolean }) {
  const [loading, setLoading] = useState(false)

  const handleUpgrade = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/stripe/checkout', { method: 'POST' })
      let data
      try { data = await res.json() } catch { data = null }
      if (!res.ok) throw new Error(data?.error || `Error ${res.status}`)
      if (data?.url) window.location.href = data.url
    } catch (err) {
      console.error('Checkout failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="pricing" className="section-pad" style={{ background: '#F7F7F5', paddingTop: '80px', paddingBottom: '80px', borderBottom: '1px solid #e8e8e8' }}>
      <p style={{ fontSize: '11px', fontWeight: 500, color: '#999', letterSpacing: '1.5px', textTransform: 'uppercase', margin: '0 0 8px', textAlign: 'center' }}>Pricing</p>
      <h2 style={{ fontSize: '32px', fontWeight: 500, color: '#0a0a0a', margin: '0 0 8px', letterSpacing: '-0.8px', textAlign: 'center' }}>Simple pricing</h2>
      <p style={{ fontSize: '15px', color: '#666', margin: '0 auto 48px', textAlign: 'center', maxWidth: '340px' }}>Start free. Upgrade when you&apos;re ready.</p>

      <div className="r-grid-2" style={{ maxWidth: '540px', margin: '0 auto' }}>
        {/* Free */}
        <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: '12px', padding: '28px' }}>
          <p style={{ fontSize: '14px', fontWeight: 500, color: '#0a0a0a', margin: '0 0 4px' }}>Free</p>
          <p style={{ fontSize: '32px', fontWeight: 500, color: '#0a0a0a', margin: '0 0 4px', letterSpacing: '-1px' }}>$0</p>
          <p style={{ fontSize: '13px', color: '#999', margin: '0 0 20px' }}>forever</p>
          <div style={{ height: '1px', background: '#e8e8e8', margin: '0 0 16px' }} />
          {FREE_FEATURES.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: f.muted ? '#bbb' : '#444', marginBottom: '10px' }}>
              {f.icon}{f.text}
            </div>
          ))}
          <Link href="/signup" style={{
            display: 'block', width: '100%', padding: '10px', borderRadius: '8px', fontSize: '13px',
            cursor: 'pointer', marginTop: '20px', boxSizing: 'border-box', textAlign: 'center',
            background: '#fff', border: '1px solid #e8e8e8', color: '#0a0a0a', textDecoration: 'none',
            transition: 'border-color 0.15s',
          }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#0a0a0a')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = '#e8e8e8')}
          >
            Get started free
          </Link>
        </div>

        {/* Pro */}
        <div style={{ background: '#fff', border: '2px solid #0a0a0a', borderRadius: '12px', padding: '28px' }}>
          <span style={{ display: 'inline-block', background: '#0a0a0a', color: '#fff', fontSize: '10px', padding: '3px 8px', borderRadius: '10px', marginBottom: '12px', letterSpacing: '0.5px' }}>
            Most popular
          </span>
          <p style={{ fontSize: '14px', fontWeight: 500, color: '#0a0a0a', margin: '0 0 4px' }}>Pro</p>
          <p style={{ fontSize: '32px', fontWeight: 500, color: '#0a0a0a', margin: '0 0 4px', letterSpacing: '-1px' }}>$7</p>
          <p style={{ fontSize: '13px', color: '#999', margin: '0 0 20px' }}>per month</p>
          <div style={{ height: '1px', background: '#e8e8e8', margin: '0 0 16px' }} />
          {PRO_FEATURES.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#444', marginBottom: '10px' }}>
              {f.icon}{f.text}
            </div>
          ))}
          {isLoggedIn ? (
            <button
              onClick={handleUpgrade}
              disabled={loading}
              style={{
                display: 'block', width: '100%', padding: '10px', borderRadius: '8px', fontSize: '13px',
                cursor: loading ? 'not-allowed' : 'pointer', marginTop: '20px', boxSizing: 'border-box', textAlign: 'center',
                background: '#0a0a0a', border: 'none', color: '#fff', opacity: loading ? 0.7 : 1,
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#2e2e2c' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#0a0a0a' }}
            >
              {loading ? 'Redirecting…' : 'Upgrade to Pro'}
            </button>
          ) : (
            <Link href="/signup" style={{
              display: 'block', width: '100%', padding: '10px', borderRadius: '8px', fontSize: '13px',
              cursor: 'pointer', marginTop: '20px', boxSizing: 'border-box', textAlign: 'center',
              background: '#0a0a0a', border: 'none', color: '#fff', textDecoration: 'none',
              transition: 'background 0.15s',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = '#2e2e2c')}
              onMouseLeave={e => (e.currentTarget.style.background = '#0a0a0a')}
            >
              Get started
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
