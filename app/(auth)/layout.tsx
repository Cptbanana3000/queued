import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sign in',
  robots: { index: false },
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--color-surface)',
      }}
    >
      {/* Minimal top bar */}
      <header
        style={{
          padding: '20px 32px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
          }}
        >
          {/* Q logomark */}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '30px',
              height: '30px',
              borderRadius: '8px',
              backgroundColor: 'var(--color-text)',
              color: '#fff',
              fontFamily: 'var(--font-mono)',
              fontWeight: '700',
              fontSize: '14px',
              letterSpacing: '-0.5px',
              flexShrink: 0,
            }}
          >
            Q
          </span>
          <span
            style={{
              fontWeight: '600',
              fontSize: '15px',
              color: 'var(--color-text)',
              letterSpacing: '-0.2px',
            }}
          >
            Queued
          </span>
        </Link>
      </header>

      {/* Centered content */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px 16px 64px',
        }}
      >
        {children}
      </main>
    </div>
  )
}
