'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

interface LandingNavProps {
  isLoggedIn?: boolean
}

export default function LandingNav({ isLoggedIn }: LandingNavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const linkStyle: React.CSSProperties = { fontSize: '13px', color: '#666', textDecoration: 'none' }
  const mobileLinkStyle: React.CSSProperties = {
    fontSize: '15px', color: '#333', textDecoration: 'none',
    padding: '10px 0', borderBottom: '1px solid #f0f0f0', display: 'block',
  }

  return (
    <>
      <nav
        style={{
          position: 'sticky', top: 0, zIndex: 100,
          backgroundColor: '#fff', borderBottom: '1px solid #e8e8e8',
          height: '56px', transition: 'box-shadow 0.2s',
          boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.06)' : 'none',
        }}
        className="section-pad"
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <span style={{
              width: '28px', height: '28px', background: '#0a0a0a', borderRadius: '6px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '13px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono)',
            }}>Q</span>
            <span style={{ fontSize: '15px', fontWeight: 500, color: '#0a0a0a', letterSpacing: '-0.3px' }}>Queued</span>
          </Link>

          {/* Desktop links */}
          <div className="nav-links">
            <a href="#templates" style={linkStyle}>Templates</a>
            <a href="#pricing" style={linkStyle}>Pricing</a>
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                style={{ padding: '7px 16px', background: '#0a0a0a', color: '#fff', borderRadius: '6px', fontSize: '13px', textDecoration: 'none', fontWeight: 500 }}
                onMouseEnter={e => (e.currentTarget.style.background = '#2e2e2c')}
                onMouseLeave={e => (e.currentTarget.style.background = '#0a0a0a')}
              >
                Dashboard →
              </Link>
            ) : (
              <>
                <Link href="/login" style={linkStyle}>Sign in</Link>
                <Link
                  href="/signup"
                  style={{ padding: '7px 16px', background: '#0a0a0a', color: '#fff', borderRadius: '6px', fontSize: '13px', textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#2e2e2c')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#0a0a0a')}
                >
                  Get started
                </Link>
              </>
            )}
          </div>

          {/* Hamburger */}
          <button
            className="hamburger-btn"
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M3 5h12M3 9h12M3 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', top: '56px', left: 0, right: 0, zIndex: 99,
          background: '#fff', borderBottom: '1px solid #e8e8e8',
          padding: '8px 20px 20px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        }}>
          <a href="#templates" style={mobileLinkStyle} onClick={() => setMobileOpen(false)}>Templates</a>
          <a href="#pricing" style={mobileLinkStyle} onClick={() => setMobileOpen(false)}>Pricing</a>
          {isLoggedIn ? (
            <Link href="/dashboard" style={{ ...mobileLinkStyle, borderBottom: 'none' }} onClick={() => setMobileOpen(false)}>
              Dashboard →
            </Link>
          ) : (
            <>
              <Link href="/login" style={mobileLinkStyle} onClick={() => setMobileOpen(false)}>Sign in</Link>
              <Link
                href="/signup"
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'block', marginTop: '12px', padding: '12px',
                  background: '#0a0a0a', color: '#fff', borderRadius: '8px',
                  fontSize: '14px', fontWeight: 500, textDecoration: 'none', textAlign: 'center',
                }}
              >
                Get started free
              </Link>
            </>
          )}
        </div>
      )}
    </>
  )
}
