'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: '#fff',
        borderBottom: '1px solid #e8e8e8',
        padding: '0 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '56px',
        transition: 'box-shadow 0.2s',
        boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.06)' : 'none',
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
        <span style={{
          width: '28px', height: '28px', background: '#0a0a0a', borderRadius: '6px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '13px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono)',
        }}>Q</span>
        <span style={{ fontSize: '15px', fontWeight: 500, color: '#0a0a0a', letterSpacing: '-0.3px' }}>Queued</span>
      </Link>

      {/* Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <a href="#templates" style={{ fontSize: '13px', color: '#666', textDecoration: 'none', cursor: 'pointer' }}>Templates</a>
        <a href="#pricing" style={{ fontSize: '13px', color: '#666', textDecoration: 'none', cursor: 'pointer' }}>Pricing</a>
        <Link href="/login" style={{ fontSize: '13px', color: '#666', textDecoration: 'none' }}>Sign in</Link>
        <Link
          href="/signup"
          style={{
            padding: '7px 16px', background: '#0a0a0a', color: '#fff',
            borderRadius: '6px', fontSize: '13px', textDecoration: 'none',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#2e2e2c')}
          onMouseLeave={e => (e.currentTarget.style.background = '#0a0a0a')}
        >
          Get started
        </Link>
      </div>
    </nav>
  )
}
