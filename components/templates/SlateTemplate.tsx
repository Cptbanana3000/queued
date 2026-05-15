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

export default function SlateTemplate({
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
    <div style={{ fontFamily: 'var(--font-sans)', color: '#1a1a1a', minHeight: '100dvh', backgroundColor: '#F4F4F2' }}>
      {/* Hero */}
      <div style={{ padding: '80px 32px 60px', maxWidth: '800px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
        <div>
          {comingSoon && (
            <span style={{
              backgroundColor: '#E6F1FB', color: '#0C447C', fontSize: '12px', fontWeight: 500,
              padding: '4px 12px', borderRadius: '20px', display: 'inline-block', marginBottom: '16px',
            }}>
              Coming soon
            </span>
          )}
          
          <h1 style={{ fontSize: '36px', fontWeight: 600, margin: '0 0 16px', letterSpacing: '-0.8px' }}>
            {name}
          </h1>
          
          <p style={{ fontSize: '16px', color: '#5F5E5A', margin: '0 0 24px', lineHeight: 1.6 }}>
            {tagline}
          </p>

          {showCount && subscriberCount > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#888780' }}>
              <div style={{ display: 'flex', marginRight: '4px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#B5D4F4', border: '2px solid #F4F4F2', marginRight: '-8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#0C447C', fontWeight: 600 }}>A</div>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#9FE1CB', border: '2px solid #F4F4F2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#085041', fontWeight: 600 }}>B</div>
              </div>
              Join {subscriberCount} others waiting
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#fff', border: '1px solid #D3D1C7', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <p style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', margin: '0 0 16px' }}>Get early access</p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Work email"
              disabled={status === 'loading' || status === 'success'}
              style={{
                width: '100%', boxSizing: 'border-box', padding: '12px 16px', border: '1px solid #D3D1C7',
                borderRadius: '8px', backgroundColor: '#F4F4F2', fontSize: '14px', outline: 'none', marginBottom: '12px',
              }}
            />
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              style={{
                width: '100%', padding: '12px', backgroundColor: '#185FA5', color: '#fff',
                border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600,
                cursor: (status === 'loading' || status === 'success') ? 'not-allowed' : 'pointer',
              }}
            >
              {status === 'loading' ? 'Joining...' : buttonText}
            </button>
            {message && (
              <p style={{ fontSize: '13px', color: status === 'success' ? '#185FA5' : '#d32f2f', margin: '12px 0 0', textAlign: 'center', fontWeight: 500 }}>
                {message}
              </p>
            )}
            {!message && (
               <p style={{ fontSize: '12px', color: '#888780', textAlign: 'center', margin: '12px 0 0' }}>
                 No spam, ever.
               </p>
            )}
            {showRecentSignups && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '12px' }}>
                <RecentSignups color="#1a1a1a" mutedColor="#888780" dotColor="#185FA5" />
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Highlights */}
      {highlights && highlights.length > 0 && (
        <div style={{ backgroundColor: '#fff', padding: '60px 32px', borderTop: '1px solid #e8e8e8' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <p style={{ fontSize: '12px', color: '#185FA5', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 8px', fontWeight: 600 }}>
              Features
            </p>
            <h2 style={{ fontSize: '24px', fontWeight: 600, margin: '0 0 32px' }}>
              Built for you
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
              {highlights.map((hl, i) => (
                <div key={i} style={{ border: '1px solid #D3D1C7', borderRadius: '12px', padding: '20px' }}>
                  <div style={{ width: '40px', height: '40px', backgroundColor: '#E6F1FB', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12l5 5l10 -10"></path>
                    </svg>
                  </div>
                  <p style={{ fontSize: '15px', fontWeight: 600, color: '#1a1a1a', margin: '0 0 6px' }}>{hl.title}</p>
                  <p style={{ fontSize: '14px', color: '#5F5E5A', margin: 0, lineHeight: 1.5 }}>{hl.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FAQ */}
      {faq && faq.length > 0 && (
        <div style={{ backgroundColor: '#F4F4F2', padding: '60px 32px' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <p style={{ fontSize: '12px', color: '#185FA5', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 8px', fontWeight: 600 }}>
              FAQ
            </p>
            <h2 style={{ fontSize: '24px', fontWeight: 600, margin: '0 0 32px' }}>
              Common questions
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {faq.map((item, i) => (
                <div key={i} style={{ backgroundColor: '#fff', border: '1px solid #D3D1C7', borderRadius: '10px', overflow: 'hidden' }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: '100%', padding: '16px 20px', display: 'flex', justifyContent: 'space-between',
                      alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: '15px', fontWeight: 500, color: '#1a1a1a', textAlign: 'left',
                    }}
                  >
                    {item.q}
                    <svg
                      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                    >
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div style={{ padding: '0 20px 20px', fontSize: '14px', color: '#5F5E5A', lineHeight: 1.6 }}>
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
      <div style={{ backgroundColor: '#fff', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #D3D1C7' }}>
        <p style={{ fontSize: '13px', color: '#888780', margin: 0 }}>
          Built with <a href="/" style={{ color: '#185FA5', fontWeight: 600, textDecoration: 'none' }}>Queued</a>
        </p>
      </div>
    </div>
  )
}
