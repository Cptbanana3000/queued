'use client'

import { useState } from 'react'
import type { Highlight, FaqItem } from '@/lib/types'
import RecentSignups from '@/components/templates/RecentSignups'

interface TemplateProps {
  waitlistId: string
  name: string
  tagline: string
  buttonText: string
  showCount: boolean
  comingSoon: boolean
  showRecentSignups: boolean
  subscriberCount: number
  highlights: Highlight[]
  faq: FaqItem[]
}

export default function VoidTemplate({
  waitlistId,
  name,
  tagline,
  buttonText,
  showCount,
  comingSoon,
  showRecentSignups,
  subscriberCount,
  highlights,
  faq,
}: TemplateProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')

    try {
      const res = await fetch(`/api/waitlists/${waitlistId}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setMessage("You're on the list!")
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong.')
      }
    } catch (err) {
      setStatus('error')
      setMessage('Failed to join. Please try again.')
    }
  }

  return (
    <div style={{ fontFamily: 'var(--font-mono)', color: '#000', minHeight: '100dvh', backgroundColor: '#fff' }}>
      {/* Hero */}
      <div style={{ padding: '100px 32px 80px', textAlign: 'center', borderBottom: '2px solid #000' }}>
        {comingSoon && (
          <div style={{
            border: '1px solid #000', display: 'inline-block', padding: '4px 12px',
            fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '24px', fontWeight: 600,
          }}>
            Waitlist open
          </div>
        )}
        
        <h1 style={{ fontSize: '42px', fontWeight: 600, margin: '0 0 16px', letterSpacing: '-1px' }}>
          {name}
        </h1>
        
        <p style={{ fontSize: '18px', color: '#444', margin: '0 auto 32px', maxWidth: '480px', lineHeight: 1.6 }}>
          {tagline}
        </p>

        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', border: '2px solid #000', marginBottom: '16px' }}>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              disabled={status === 'loading' || status === 'success'}
              style={{
                flex: 1, padding: '14px 16px', border: 'none', borderRight: '2px solid #000',
                backgroundColor: '#fff', fontSize: '15px', color: '#000', outline: 'none',
                fontFamily: 'var(--font-mono)',
              }}
            />
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              style={{
                padding: '14px 20px', backgroundColor: '#000', color: '#fff',
                border: 'none', fontSize: '12px', fontWeight: 600, letterSpacing: '1px',
                textTransform: 'uppercase', cursor: (status === 'loading' || status === 'success') ? 'not-allowed' : 'pointer',
                whiteSpace: 'nowrap', fontFamily: 'var(--font-mono)',
              }}
            >
              {status === 'loading' ? 'WAIT...' : buttonText}
            </button>
          </div>
          
          {message && (
            <p style={{ fontSize: '14px', color: status === 'success' ? '#22c55e' : '#ef4444', margin: '0 0 16px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
              {message}
            </p>
          )}

          {showCount && subscriberCount > 0 && (
            <p style={{ fontSize: '12px', color: '#888', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              — {subscriberCount} people waiting —
            </p>
          )}

          {showRecentSignups && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4px' }}>
              <RecentSignups
                color="#000" mutedColor="#888" dotColor="#000"
                fontFamily="var(--font-mono)"
              />
            </div>
          )}
        </form>
      </div>

      {/* Highlights */}
      {highlights && highlights.length > 0 && (
        <div style={{ backgroundColor: '#F5F5F5', padding: '80px 32px', borderBottom: '2px solid #000' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <p style={{ fontSize: '12px', color: '#888', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 8px', fontWeight: 600 }}>
              What you get
            </p>
            <h2 style={{ fontSize: '28px', fontWeight: 600, margin: '0 0 32px', textTransform: 'uppercase', letterSpacing: '-0.5px' }}>
              Built different
            </h2>

            <div>
              {highlights.map((hl, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '48px 1fr', gap: '20px', padding: '24px 0',
                  borderTop: '2px solid #000',
                  borderBottom: i === highlights.length - 1 ? '2px solid #000' : 'none',
                  alignItems: 'start',
                }}>
                  <div style={{ width: '48px', height: '48px', border: '2px solid #000', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12l5 5l10 -10"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '14px', fontWeight: 600, margin: '0 0 6px', letterSpacing: '1px', textTransform: 'uppercase' }}>{hl.title}</h3>
                    <p style={{ fontSize: '15px', color: '#444', margin: 0, lineHeight: 1.6 }}>{hl.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FAQ */}
      {faq && faq.length > 0 && (
        <div style={{ backgroundColor: '#fff', padding: '80px 32px', borderBottom: '2px solid #000' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <p style={{ fontSize: '12px', color: '#888', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 8px', fontWeight: 600 }}>
              Questions
            </p>
            <h2 style={{ fontSize: '28px', fontWeight: 600, margin: '0 0 32px', textTransform: 'uppercase', letterSpacing: '-0.5px' }}>
              Straight answers
            </h2>

            <div>
              {faq.map((item, i) => (
                <div key={i} style={{ borderTop: '2px solid #000', borderBottom: i === faq.length - 1 ? '2px solid #000' : 'none' }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: '100%', padding: '20px 0', display: 'flex', justifyContent: 'space-between',
                      alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: '16px', fontWeight: 600, color: '#000', textAlign: 'left',
                      fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.5px',
                    }}
                  >
                    {item.q}
                    <span style={{ fontSize: '24px', fontWeight: 300, lineHeight: 1 }}>
                      {openFaq === i ? '−' : '+'}
                    </span>
                  </button>
                  {openFaq === i && (
                    <div style={{ padding: '0 0 24px', fontSize: '15px', color: '#444', lineHeight: 1.6 }}>
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ backgroundColor: '#000', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: '11px', color: '#fff', margin: 0, letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>
          Built with <a href="/" style={{ color: '#fff', textDecoration: 'underline' }}>Queued</a>
        </p>
        <p style={{ fontSize: '11px', color: '#666', margin: 0, letterSpacing: '1px', textTransform: 'uppercase' }}>
          {name}
        </p>
      </div>
    </div>
  )
}
