'use client'

import { useState, useRef, useCallback } from 'react'
import Link from 'next/link'

const TEMPLATES = [
  {
    id: 'oat',
    name: 'Oat',
    mood: 'For the calm and considered',
    tag: 'warm',
    tagStyle: { background: '#F2EDE4', color: '#712B13' },
    previewBg: '#FAF7F2',
    previewContent: (
      <div style={{ background: '#FAF7F2', padding: '40px 32px', textAlign: 'center' }}>
        <span style={{ background: '#F0997B', color: '#712B13', fontSize: '11px', padding: '3px 10px', borderRadius: '20px', display: 'inline-block', marginBottom: '12px' }}>Coming soon</span>
        <h3 style={{ fontSize: '28px', fontWeight: 500, color: '#2C2C2A', margin: '0 0 10px', letterSpacing: '-0.5px' }}>Your product name</h3>
        <p style={{ fontSize: '14px', color: '#5F5E5A', margin: '0 auto 20px', maxWidth: '280px', lineHeight: 1.6 }}>A punchy one-line tagline that explains what you do.</p>
        <div style={{ display: 'flex', gap: '8px', maxWidth: '300px', margin: '0 auto 10px' }}>
          <input placeholder="you@email.com" style={{ flex: 1, padding: '10px 14px', border: '1px solid #D3D1C7', borderRadius: '8px', background: '#fff', fontSize: '13px', outline: 'none' }} />
          <button style={{ padding: '10px 16px', background: '#2C2C2A', color: '#FAF7F2', border: 'none', borderRadius: '8px', fontSize: '13px', whiteSpace: 'nowrap' }}>Join</button>
        </div>
        <p style={{ fontSize: '12px', color: '#888780' }}>Join 240 others already waiting</p>
      </div>
    ),
    hoverBtn: { background: '#FAF7F2', color: '#2C2C2A' },
  },
  {
    id: 'slate',
    name: 'Slate',
    mood: 'For the professional builder',
    tag: 'professional',
    tagStyle: { background: '#E6F1FB', color: '#0C447C' },
    previewBg: '#F4F4F2',
    previewContent: (
      <div style={{ background: '#F4F4F2', padding: '40px 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'center' }}>
        <div>
          <span style={{ background: '#E6F1FB', color: '#0C447C', fontSize: '11px', padding: '3px 10px', borderRadius: '20px', display: 'inline-block', marginBottom: '10px' }}>Coming soon</span>
          <h3 style={{ fontSize: '20px', fontWeight: 500, color: '#1a1a1a', margin: '0 0 8px' }}>Your product name</h3>
          <p style={{ fontSize: '13px', color: '#5F5E5A', margin: '0 0 10px', lineHeight: 1.5 }}>A clear tagline for founders.</p>
          <p style={{ fontSize: '12px', color: '#888780' }}>240 people waiting</p>
        </div>
        <div style={{ background: '#fff', border: '0.5px solid #D3D1C7', borderRadius: '10px', padding: '16px' }}>
          <p style={{ fontSize: '13px', fontWeight: 500, color: '#1a1a1a', margin: '0 0 10px' }}>Get early access</p>
          <input placeholder="Work email" style={{ width: '100%', boxSizing: 'border-box', padding: '10px 12px', border: '1px solid #D3D1C7', borderRadius: '7px', background: '#F4F4F2', fontSize: '12px', outline: 'none', marginBottom: '8px' }} />
          <button style={{ width: '100%', padding: '10px', background: '#185FA5', color: '#fff', border: 'none', borderRadius: '7px', fontSize: '12px' }}>Join the waitlist</button>
        </div>
      </div>
    ),
    hoverBtn: { background: '#fff', color: '#185FA5' },
  },
  {
    id: 'ember',
    name: 'Ember',
    mood: 'For the ones who launch loud',
    tag: 'dark',
    tagStyle: { background: '#2C2C2A', color: '#EF9F27' },
    previewBg: '#1C1917',
    previewContent: (
      <div style={{ background: '#1C1917', padding: '40px 32px', textAlign: 'center' }}>
        <p style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#EF9F27', margin: '0 0 16px' }}>The waitlist is open</p>
        <h3 style={{ fontSize: '26px', fontWeight: 500, color: '#FAF7F2', margin: '0 0 10px', letterSpacing: '-0.8px' }}>Your product name</h3>
        <p style={{ fontSize: '14px', color: '#888780', margin: '0 auto 16px', maxWidth: '260px', lineHeight: 1.6 }}>A bold confident tagline that says exactly what you do.</p>
        <div style={{ width: '36px', height: '1px', background: '#EF9F27', margin: '0 auto 16px' }} />
        <div style={{ display: 'flex', gap: '8px', maxWidth: '300px', margin: '0 auto 8px' }}>
          <input placeholder="your@email.com" style={{ flex: 1, padding: '10px 14px', border: '1px solid #444441', borderRadius: '8px', background: '#2C2C2A', fontSize: '13px', color: '#FAF7F2', outline: 'none' }} />
          <button style={{ padding: '10px 14px', background: '#EF9F27', color: '#1C1917', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 500, whiteSpace: 'nowrap' }}>Join</button>
        </div>
        <p style={{ fontSize: '12px', color: '#5F5E5A' }}>— 240 people waiting —</p>
      </div>
    ),
    hoverBtn: { background: '#EF9F27', color: '#1C1917' },
  },
  {
    id: 'void',
    name: 'Void',
    mood: 'For the bold and serious',
    tag: 'brutalist',
    tagStyle: { background: '#f0f0f0', color: '#0a0a0a' },
    previewBg: '#fff',
    previewContent: (
      <div style={{ background: '#fff', padding: '40px 32px', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
        <div style={{ border: '1px solid #000', display: 'inline-block', padding: '3px 10px', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '14px' }}>Waitlist open</div>
        <h3 style={{ fontSize: '26px', fontWeight: 500, color: '#000', margin: '0 0 10px', letterSpacing: '-0.5px' }}>Your product name</h3>
        <p style={{ fontSize: '13px', color: '#444', margin: '0 auto 18px', maxWidth: '260px', lineHeight: 1.6 }}>A direct no-nonsense tagline. No fluff, no filler.</p>
        <div style={{ display: 'flex', maxWidth: '300px', margin: '0 auto 10px', border: '2px solid #000' }}>
          <input placeholder="your@email.com" style={{ flex: 1, padding: '10px 14px', border: 'none', borderRight: '2px solid #000', background: '#fff', fontSize: '13px', color: '#000', outline: 'none', fontFamily: 'var(--font-mono)' }} />
          <button style={{ padding: '10px 14px', background: '#000', color: '#fff', border: 'none', fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>Join</button>
        </div>
        <p style={{ fontSize: '11px', color: '#888', letterSpacing: '1px', textTransform: 'uppercase' }}>— 240 people waiting —</p>
      </div>
    ),
    hoverBtn: { background: '#000', color: '#fff' },
  },
]

export default function LandingTemplates() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const onScroll = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const cardWidth = (el.children[0] as HTMLElement)?.offsetWidth ?? 1
    const index = Math.round(el.scrollLeft / (cardWidth + 14)) // 14 = gap
    setActiveIndex(Math.min(index, TEMPLATES.length - 1))
  }, [])

  return (
    <section id="templates" className="section-pad" style={{ background: '#F7F7F5', paddingTop: '80px', paddingBottom: '80px', borderBottom: '1px solid #e8e8e8' }}>
      <p style={{ fontSize: '11px', fontWeight: 500, color: '#999', letterSpacing: '1.5px', textTransform: 'uppercase', margin: '0 0 8px', textAlign: 'center' }}>Templates</p>
      <h2 style={{ fontSize: '32px', fontWeight: 500, color: '#0a0a0a', margin: '0 0 8px', letterSpacing: '-0.8px', textAlign: 'center' }}>Four templates. One purpose.</h2>
      <p style={{ fontSize: '15px', color: '#666', margin: '0 auto 44px', textAlign: 'center', maxWidth: '400px' }}>Every template is fully functional out of the box. Pick one and go.</p>

      <div
        ref={containerRef}
        className="templates-container"
        onScroll={onScroll}
      >
        {TEMPLATES.map(t => (
          <div
            key={t.id}
            onMouseEnter={() => setHoveredId(t.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{
              background: '#fff',
              border: `1px solid ${hoveredId === t.id ? '#0a0a0a' : '#e2e2e2'}`,
              borderRadius: '14px', overflow: 'hidden', cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
          >
            {/* Preview */}
            <div style={{ height: '220px', overflow: 'hidden', position: 'relative', background: t.previewBg }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '200%', transform: 'scale(0.5)', transformOrigin: 'top left', pointerEvents: 'none' }}>
                {t.previewContent}
              </div>
              <div style={{
                position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: hoveredId === t.id ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0)',
                opacity: hoveredId === t.id ? 1 : 0, transition: 'opacity 0.2s, background 0.2s',
              }}>
                <Link
                  href="/signup"
                  style={{
                    padding: '9px 20px', borderRadius: '20px', fontSize: '13px', fontWeight: 500,
                    display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none',
                    ...t.hoverBtn,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 7a5 5 0 1 1 10 0A5 5 0 0 1 2 7Zm3.5-1.5v3M8.5 5.5v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                  Use this template
                </Link>
              </div>
            </div>

            {/* Footer */}
            <div style={{
              padding: '14px 18px', borderTop: '1px solid #e8e8e8',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff',
            }}>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 500, color: '#0a0a0a', margin: '0 0 2px' }}>{t.name}</p>
                <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>{t.mood}</p>
              </div>
              <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '10px', ...t.tagStyle }}>{t.tag}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Dots — visible on mobile only via CSS */}
      <div className="carousel-dots">
        {TEMPLATES.map((t, i) => (
          <button
            key={t.id}
            aria-label={`Go to ${t.name}`}
            onClick={() => {
              const el = containerRef.current
              if (!el) return
              const card = el.children[i] as HTMLElement
              el.scrollTo({ left: card.offsetLeft - 20, behavior: 'smooth' })
            }}
            style={{
              width: activeIndex === i ? '20px' : '6px',
              height: '6px',
              borderRadius: '3px',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              background: activeIndex === i ? '#0a0a0a' : '#d0d0d0',
              transition: 'width 0.2s, background 0.2s',
            }}
          />
        ))}
      </div>
    </section>
  )
}
