'use client'

import Link from 'next/link'

export default function LandingFooter() {
  return (
    <footer style={{ background: '#0a0a0a', padding: '32px 40px 24px' }}>
      {/* Top row */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #222',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            width: '24px', height: '24px', background: '#fff', borderRadius: '5px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '11px', fontWeight: 700, color: '#0a0a0a', fontFamily: 'var(--font-mono)',
          }}>Q</span>
          <span style={{ fontSize: '15px', fontWeight: 500, color: '#fff' }}>Queued</span>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '24px' }}>
          {['Templates', 'Pricing'].map(label => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              style={{ fontSize: '13px', color: '#555', textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#888')}
              onMouseLeave={e => (e.currentTarget.style.color = '#555')}
            >
              {label}
            </a>
          ))}
          <Link
            href="/login"
            style={{ fontSize: '13px', color: '#555', textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#888')}
            onMouseLeave={e => (e.currentTarget.style.color = '#555')}
          >
            Sign in
          </Link>
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', color: '#444' }}>© 2025 Queued. All rights reserved.</span>
        <span style={{ fontSize: '12px', color: '#444' }}>Built with care</span>
      </div>
    </footer>
  )
}
