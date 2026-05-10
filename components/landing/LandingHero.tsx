'use client'

import Link from 'next/link'

export default function LandingHero() {
  return (
    <section
      style={{
        background: '#fff',
        padding: '100px 40px 90px',
        textAlign: 'center',
        borderBottom: '1px solid #e8e8e8',
      }}
    >
      {/* Pill badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        border: '1px solid #e8e8e8', borderRadius: '20px', padding: '4px 14px',
        fontSize: '12px', color: '#666', marginBottom: '32px',
      }}>
        <span style={{ width: '6px', height: '6px', background: '#22c55e', borderRadius: '50%', flexShrink: 0 }} />
        4 templates · free to start
      </div>

      {/* H1 */}
      <h1 style={{
        fontSize: 'clamp(42px, 6vw, 64px)',
        fontWeight: 500,
        color: '#0a0a0a',
        margin: '0 auto 22px',
        letterSpacing: '-3px',
        lineHeight: 1.0,
        maxWidth: '680px',
      }}>
        Your waitlist,<br />
        live in{' '}
        <em style={{ fontStyle: 'normal', color: '#BA7517' }}>60 seconds</em>
      </h1>

      {/* Subtext */}
      <p style={{
        fontSize: '18px', color: '#666', margin: '0 auto 36px',
        maxWidth: '420px', lineHeight: 1.6,
      }}>
        No code, no design skills. Pick a template, fill in your details, share your link.
      </p>

      {/* CTA */}
      <Link
        href="/signup"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '14px 28px', background: '#0a0a0a', color: '#fff',
          borderRadius: '8px', fontSize: '15px', textDecoration: 'none',
          transition: 'background 0.15s, transform 0.1s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#2e2e2c'; e.currentTarget.style.transform = 'translateY(-1px)' }}
        onMouseLeave={e => { e.currentTarget.style.background = '#0a0a0a'; e.currentTarget.style.transform = 'translateY(0)' }}
      >
        Build your waitlist
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M3 7h8M7.5 4l3.5 3-3.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>

      <p style={{ fontSize: '12px', color: '#999', margin: '14px 0 0' }}>
        Free to start · No credit card required
      </p>
    </section>
  )
}
