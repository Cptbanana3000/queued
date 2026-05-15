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

export default function OatTemplate({
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
    <div style={{ fontFamily: 'var(--font-sans)', color: '#2C2C2A', minHeight: '100dvh', backgroundColor: '#FAF7F2' }}>
      {/* Hero */}
      <div style={{ padding: '80px 32px 60px', textAlign: 'center' }}>
        <div style={{
          width: '48px', height: '48px', backgroundColor: '#2C2C2A', borderRadius: '12px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#FAF7F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        {comingSoon && (
          <span style={{
            backgroundColor: '#F0997B', color: '#712B13', fontSize: '12px', fontWeight: 500,
            padding: '4px 12px', borderRadius: '20px', display: 'inline-block', marginBottom: '16px',
          }}>
            Coming soon
          </span>
        )}
        
        <h1 style={{ fontSize: '36px', fontWeight: 500, margin: '0 0 16px', letterSpacing: '-0.8px' }}>
          {name}
        </h1>
        
        <p style={{ fontSize: '16px', color: '#5F5E5A', margin: '0 auto 32px', maxWidth: '400px', lineHeight: 1.6 }}>
          {tagline}
        </p>

        <form onSubmit={handleSubmit} style={{ maxWidth: '340px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@email.com"
              disabled={status === 'loading' || status === 'success'}
              style={{
                flex: 1, padding: '12px 16px', border: '1px solid #D3D1C7', borderRadius: '8px',
                backgroundColor: '#fff', fontSize: '14px', color: '#2C2C2A', outline: 'none',
              }}
            />
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              style={{
                padding: '12px 20px', backgroundColor: '#2C2C2A', color: '#FAF7F2',
                border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 500,
                cursor: (status === 'loading' || status === 'success') ? 'not-allowed' : 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {status === 'loading' ? 'Joining...' : buttonText}
            </button>
          </div>
          
          {message && (
            <p style={{ fontSize: '13px', color: status === 'success' ? '#D85A30' : '#d32f2f', margin: '0 0 12px', fontWeight: 500 }}>
              {message}
            </p>
          )}

          {showCount && (
            <p style={{ fontSize: '13px', color: '#888780', margin: '0 0 12px' }}>
              Join {subscriberCount} others already waiting
            </p>
          )}

          {showRecentSignups && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4px' }}>
              <RecentSignups color="#2C2C2A" mutedColor="#888780" dotColor="#D85A30" />
            </div>
          )}
        </form>
      </div>

      {/* Highlights */}
      {highlights && highlights.length > 0 && (
        <div style={{ backgroundColor: '#F2EDE4', padding: '60px 32px', borderTop: '1px solid #D3D1C7' }}>
          <div style={{ maxWidth: '480px', margin: '0 auto' }}>
            <p style={{ fontSize: '11px', color: '#D85A30', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 6px', fontWeight: 600 }}>
              Why it matters
            </p>
            <h2 style={{ fontSize: '24px', fontWeight: 500, margin: '0 0 32px' }}>
              Everything you need
            </h2>

            <div>
              {highlights.map((hl, i) => (
                <div key={i} style={{
                  display: 'flex', gap: '16px', padding: '20px 0',
                  borderTop: i === 0 ? '0.5px solid #D3D1C7' : 'none',
                  borderBottom: '0.5px solid #D3D1C7',
                  alignItems: 'flex-start',
                }}>
                  <div style={{
                    width: '36px', height: '36px', backgroundColor: '#FAF7F2', borderRadius: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D85A30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12l5 5l10 -10"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: 600, margin: '0 0 4px' }}>{hl.title}</h3>
                    <p style={{ fontSize: '14px', color: '#5F5E5A', margin: 0, lineHeight: 1.5 }}>{hl.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FAQ */}
      {faq && faq.length > 0 && (
        <div style={{ backgroundColor: '#FAF7F2', padding: '60px 32px' }}>
          <div style={{ maxWidth: '480px', margin: '0 auto' }}>
            <p style={{ fontSize: '11px', color: '#D85A30', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 6px', fontWeight: 600 }}>
              Questions
            </p>
            <h2 style={{ fontSize: '24px', fontWeight: 500, margin: '0 0 24px' }}>
              Frequently asked
            </h2>

            <div>
              {faq.map((item, i) => (
                <div key={i} style={{ borderTop: '0.5px solid #D3D1C7', borderBottom: i === faq.length - 1 ? '0.5px solid #D3D1C7' : 'none' }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: '100%', padding: '16px 0', display: 'flex', justifyContent: 'space-between',
                      alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: '15px', fontWeight: 500, color: '#2C2C2A', textAlign: 'left',
                    }}
                  >
                    {item.q}
                    <svg
                      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D85A30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                    >
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div style={{ padding: '0 0 16px', fontSize: '14px', color: '#5F5E5A', lineHeight: 1.6 }}>
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
      <div style={{ backgroundColor: '#F2EDE4', padding: '24px 32px', textAlign: 'center', borderTop: '0.5px solid #D3D1C7' }}>
        <p style={{ fontSize: '12px', color: '#888780', margin: 0 }}>
          Built with <a href="/" style={{ color: '#2C2C2A', fontWeight: 600, textDecoration: 'none' }}>Queued</a>
        </p>
      </div>
    </div>
  )
}
