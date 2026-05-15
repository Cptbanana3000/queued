'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { logout } from '@/app/(auth)/actions'

const NAV = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
        <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
        <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
        <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
      </svg>
    ),
  },
  {
    href: '/waitlists/new',
    label: 'New waitlist',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: '/settings',
    label: 'Settings',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M8 1.5v1.3M8 13.2v1.3M1.5 8h1.3M13.2 8h1.3M3.4 3.4l.92.92M11.68 11.68l.92.92M12.6 3.4l-.92.92M4.32 11.68l-.92.92" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
]

interface SidebarProps {
  userEmail: string
  userName: string | null
  plan: 'free' | 'pro'
}

export default function Sidebar({ userEmail, userName, plan }: SidebarProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Close drawer on navigation
  useEffect(() => { setOpen(false) }, [pathname])

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard'
    return pathname.startsWith(href)
  }

  const sidebarContent = (
    <>
      {/* Logo row */}
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <span style={{
            width: '26px', height: '26px', background: 'var(--color-text)', borderRadius: '6px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '12px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono)',
          }}>Q</span>
          <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text)', letterSpacing: '-0.2px' }}>Queued</span>
        </Link>
        <button
          className="sidebar-close-btn"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Nav */}
      <nav style={{ padding: '12px 10px', flex: 1 }}>
        {NAV.map(item => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex', alignItems: 'center', gap: '9px',
                padding: '8px 10px', borderRadius: '7px', marginBottom: '2px',
                fontSize: '13px', fontWeight: active ? 500 : 400, textDecoration: 'none',
                color: active ? 'var(--color-text)' : 'var(--color-text-secondary)',
                backgroundColor: active ? 'var(--color-surface-inset)' : 'transparent',
                transition: 'background-color 0.15s, color 0.15s',
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.backgroundColor = 'var(--color-surface-inset)' }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              {item.icon}
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* User footer */}
      <div style={{ padding: '12px 10px', borderTop: '1px solid var(--color-border)' }}>
        <div style={{ padding: '0 10px', marginBottom: '10px' }}>
          <span style={{
            display: 'inline-block', fontSize: '11px', padding: '2px 8px',
            borderRadius: '20px', fontWeight: 500,
            background: plan === 'pro' ? '#0a0a0a' : 'var(--color-surface-inset)',
            color: plan === 'pro' ? '#fff' : 'var(--color-text-secondary)',
          }}>
            {plan === 'pro' ? '⚡ Pro' : 'Free plan'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '6px 10px', borderRadius: '7px' }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
            background: 'var(--color-surface-inset)', border: '1px solid var(--color-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)',
          }}>
            {(userName || userEmail).charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-text)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {userName || userEmail}
            </p>
          </div>
        </div>

        <form action={logout}>
          <button
            type="submit"
            style={{
              width: '100%', textAlign: 'left', padding: '7px 10px', borderRadius: '7px',
              border: 'none', background: 'transparent', cursor: 'pointer',
              fontSize: '12px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '8px',
              marginTop: '2px', transition: 'background-color 0.15s, color 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--color-surface-inset)'; e.currentTarget.style.color = 'var(--color-text-secondary)' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--color-text-muted)' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M5 2H2.5A1.5 1.5 0 0 0 1 3.5v7A1.5 1.5 0 0 0 2.5 12H5M9.5 10l3-3-3-3M12.5 7H5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Sign out
          </button>
        </form>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile top bar */}
      <header className="mobile-header">
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <span style={{
            width: '26px', height: '26px', background: 'var(--color-text)', borderRadius: '6px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '12px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono)',
          }}>Q</span>
          <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text)', letterSpacing: '-0.2px' }}>Queued</span>
        </Link>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '36px', height: '36px', border: 'none', background: 'transparent',
            cursor: 'pointer', color: 'var(--color-text)', borderRadius: '6px', padding: 0,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M3 5h12M3 9h12M3 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </header>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
            zIndex: 200, backdropFilter: 'blur(2px)',
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`app-sidebar${open ? ' sidebar-open' : ''}`}
        style={{
          width: '220px',
          flexShrink: 0,
          borderRight: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-surface-raised)',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          position: 'sticky',
          top: 0,
        }}
      >
        {sidebarContent}
      </aside>
    </>
  )
}
