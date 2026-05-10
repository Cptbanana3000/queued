'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { login } from '../actions'
import type { ActionState } from '@/lib/types'

export default function LoginPage() {
  const [state, action, pending] = useActionState<ActionState, FormData>(
    login,
    undefined,
  )

  return (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      {/* Card */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-raised)',
          border: '1px solid var(--color-border)',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1
            style={{
              fontSize: '22px',
              fontWeight: '700',
              letterSpacing: '-0.5px',
              color: 'var(--color-text)',
              marginBottom: '6px',
            }}
          >
            Welcome back
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
            Sign in to your Queued account
          </p>
        </div>

        {/* Error banner */}
        {state && !state.success && (
          <div
            role="alert"
            style={{
              backgroundColor: 'var(--color-danger-bg)',
              border: '1px solid #f5c6c6',
              borderRadius: '8px',
              padding: '12px 14px',
              marginBottom: '20px',
              fontSize: '13px',
              color: 'var(--color-danger)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="6.5" stroke="currentColor"/>
              <path d="M7 4v3.5" stroke="currentColor" strokeLinecap="round"/>
              <circle cx="7" cy="10" r="0.6" fill="currentColor"/>
            </svg>
            {state.message}
          </div>
        )}

        {/* Form */}
        <form action={action} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label
              htmlFor="login-email"
              style={{ fontSize: '13px', fontWeight: '500', color: 'var(--color-text)' }}
            >
              Email
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              required
              placeholder="you@example.com"
              style={{
                height: '42px',
                borderRadius: '8px',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-surface)',
                padding: '0 12px',
                fontSize: '14px',
                color: 'var(--color-text)',
                outline: 'none',
                transition: 'border-color 0.15s',
                fontFamily: 'var(--font-sans)',
                width: '100%',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-text)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
            />
          </div>

          {/* Password */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label
              htmlFor="login-password"
              style={{ fontSize: '13px', fontWeight: '500', color: 'var(--color-text)' }}
            >
              Password
            </label>
            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              style={{
                height: '42px',
                borderRadius: '8px',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-surface)',
                padding: '0 12px',
                fontSize: '14px',
                color: 'var(--color-text)',
                outline: 'none',
                transition: 'border-color 0.15s',
                fontFamily: 'var(--font-sans)',
                width: '100%',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-text)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={pending}
            style={{
              height: '44px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: pending ? 'var(--color-text-muted)' : 'var(--color-text)',
              color: '#fff',
              fontSize: '14px',
              fontWeight: '600',
              cursor: pending ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.15s, transform 0.1s',
              letterSpacing: '-0.1px',
              fontFamily: 'var(--font-sans)',
              marginTop: '4px',
              width: '100%',
            }}
            onMouseEnter={e => {
              if (!pending) e.currentTarget.style.backgroundColor = '#2e2e2c'
            }}
            onMouseLeave={e => {
              if (!pending) e.currentTarget.style.backgroundColor = 'var(--color-text)'
            }}
          >
            {pending ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>

      {/* Footer link */}
      <p
        style={{
          textAlign: 'center',
          marginTop: '20px',
          fontSize: '13px',
          color: 'var(--color-text-secondary)',
        }}
      >
        Don&apos;t have an account?{' '}
        <Link
          href="/signup"
          style={{
            color: 'var(--color-text)',
            fontWeight: '600',
            textDecoration: 'none',
          }}
        >
          Create one →
        </Link>
      </p>
    </div>
  )
}
