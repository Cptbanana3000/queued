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

export default function EmberTemplate({
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

  const handleSubmit = async (e: React.SyntheticEvent) => {
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
    <div style={{ fontFamily: 'var(--font-sans)', color: '#FAF7F2', minHeight: '100dvh', backgroundColor: '#1C1917' }}>
      {/* Hero */}
      <div className="tmpl-hero" style={{ padding: '80px 32px 60px', textAlign: 'center' }}>
        {comingSoon && (
          <p style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#EF9F27', margin: '0 0 16px', fontWeight: 600 }}>
            The waitlist is open
          </p>
        )}
        
        <h1 style={{ fontSize: '38px', fontWeight: 500, margin: '0 0 16px', letterSpacing: '-1px' }}>
          {name}
        </h1>
        
        <p style={{ fontSize: '16px', color: '#888780', margin: '0 auto 24px', maxWidth: '420px', lineHeight: 1.6 }}>
          {tagline}
        </p>

        <div style={{ width: '40px', height: '1px', background: '#EF9F27', margin: '0 auto 24px' }} />

        <form onSubmit={handleSubmit} style={{ maxWidth: '360px', margin: '0 auto' }}>
          <div className="tmpl-form-row" style={{ marginBottom: '16px' }}>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              disabled={status === 'loading' || status === 'success'}
              style={{
                flex: 1, padding: '12px 16px', border: '1px solid #444441', borderRadius: '8px',
                backgroundColor: '#2C2C2A', fontSize: '14px', color: '#FAF7F2', outline: 'none',
              }}
            />
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              style={{
                padding: '12px 20px', backgroundColor: '#EF9F27', color: '#1C1917',
                border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600,
                cursor: (status === 'loading' || status === 'success') ? 'not-allowed' : 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {status === 'loading' ? 'Joining...' : buttonText}
            </button>
          </div>
          
          {message && (
            <p style={{ fontSize: '14px', color: status === 'success' ? '#EF9F27' : '#ef4444', margin: '0 0 16px', fontWeight: 500 }}>
              {message}
            </p>
          )}

          {showCount && subscriberCount > 0 && (
            <p style={{ fontSize: '13px', color: '#5F5E5A', margin: '0 0 12px' }}>
              — {subscriberCount} people already waiting —
            </p>
          )}

          {showRecentSignups && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4px' }}>
              <RecentSignups color="#FAF7F2" mutedColor="#5F5E5A" dotColor="#EF9F27" />
            </div>
          )}
        </form>
      </div>

      {/* Highlights */}
      {highlights && highlights.length > 0 && (
        <div className="tmpl-section" style={{ backgroundColor: '#231F1C', padding: '80px 32px', borderTop: '1px solid #333' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <p style={{ fontSize: '11px', color: '#EF9F27', letterSpacing: '1.5px', textTransform: 'uppercase', margin: '0 0 8px', fontWeight: 600 }}>
              Why {name}
            </p>
            <h2 style={{ fontSize: '28px', fontWeight: 500, margin: '0 0 40px' }}>
              Everything you need
            </h2>

            <div>
              {highlights.map((hl, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '80px 1fr', gap: '24px', padding: '32px 0',
                  borderTop: i === 0 ? '1px solid #333' : 'none',
                  borderBottom: '1px solid #333',
                  alignItems: 'start',
                }}>
                  <p style={{ fontSize: '48px', fontWeight: 500, color: '#3D2E10', margin: 0, lineHeight: 1 }}>
                    {(i + 1).toString().padStart(2, '0')}
                  </p>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 500, margin: '0 0 8px', color: '#FAF7F2' }}>{hl.title}</h3>
                    <p style={{ fontSize: '15px', color: '#888780', margin: 0, lineHeight: 1.6 }}>{hl.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FAQ */}
      {faq && faq.length > 0 && (
        <div className="tmpl-section" style={{ backgroundColor: '#1C1917', padding: '80px 32px' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <p style={{ fontSize: '11px', color: '#EF9F27', letterSpacing: '1.5px', textTransform: 'uppercase', margin: '0 0 8px', fontWeight: 600 }}>
              Questions
            </p>
            <h2 style={{ fontSize: '28px', fontWeight: 500, margin: '0 0 32px' }}>
              Frequently asked
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {faq.map((item, i) => (
                <div key={i} style={{ backgroundColor: '#2C2C2A', border: '1px solid #444441', borderRadius: '8px', overflow: 'hidden' }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: '100%', padding: '20px 24px', display: 'flex', justifyContent: 'space-between',
                      alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: '16px', fontWeight: 500, color: '#FAF7F2', textAlign: 'left',
                    }}
                  >
                    {item.q}
                    <svg
                      width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EF9F27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                    >
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div style={{ padding: '0 24px 24px', fontSize: '15px', color: '#888780', lineHeight: 1.6 }}>
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
      <div style={{ backgroundColor: '#141210', padding: '32px', textAlign: 'center' }}>
        <p style={{ fontSize: '12px', color: '#444441', margin: 0 }}>
          Built with <a href="/" style={{ color: '#EF9F27', fontWeight: 600, textDecoration: 'none' }}>Queued</a>
        </p>
      </div>
    </div>
  )
}
