'use client'

import { useActionState, useEffect, useState } from 'react'
import Link from 'next/link'
import { requestPasswordReset } from '../actions'
import type { ActionState } from '@/lib/types'

export default function ForgotPasswordPage() {
  const [state, action, pending] = useActionState<ActionState, FormData>(
    requestPasswordReset,
    undefined,
  )
  const [sent, setSent] = useState(false)
  const [sentEmail, setSentEmail] = useState('')

  useEffect(() => {
    if (state?.success && state.message) {
      setSentEmail(state.message)
      setSent(true)
    }
  }, [state])

  return (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      <div
        style={{
          backgroundColor: 'var(--color-surface-raised)',
          border: '1px solid var(--color-border)',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        {sent ? (
          /* Success state */
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '48px', height: '48px', borderRadius: '12px',
                backgroundColor: 'var(--color-surface-inset)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path d="M2 6.5L11 12.5L20 6.5" stroke="var(--color-text)" strokeWidth="1.5" strokeLinecap="round"/>
                <rect x="2" y="4" width="18" height="14" rx="3" stroke="var(--color-text)" strokeWidth="1.5"/>
              </svg>
            </div>
            <h1 style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.4px', color: 'var(--color-text)', marginBottom: '8px' }}>
              Check your inbox
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.5', marginBottom: '0' }}>
              We sent a password reset link to{' '}
              <strong style={{ color: 'var(--color-text)' }}>{sentEmail}</strong>.
              It expires in 1 hour.
            </p>
          </div>
        ) : (
          /* Form state */
          <>
            <div style={{ marginBottom: '32px' }}>
              <h1 style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '-0.5px', color: 'var(--color-text)', marginBottom: '6px' }}>
                Reset your password
              </h1>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                Enter your email and we&apos;ll send you a reset link.
              </p>
            </div>

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

            <form action={action} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label
                  htmlFor="forgot-email"
                  style={{ fontSize: '13px', fontWeight: '500', color: 'var(--color-text)' }}
                >
                  Email
                </label>
                <input
                  id="forgot-email"
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
                  transition: 'background-color 0.15s',
                  letterSpacing: '-0.1px',
                  fontFamily: 'var(--font-sans)',
                  marginTop: '4px',
                  width: '100%',
                }}
                onMouseEnter={e => { if (!pending) e.currentTarget.style.backgroundColor = '#2e2e2c' }}
                onMouseLeave={e => { if (!pending) e.currentTarget.style.backgroundColor = 'var(--color-text)' }}
              >
                {pending ? 'Sending…' : 'Send reset link'}
              </button>
            </form>
          </>
        )}
      </div>

      <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
        <Link
          href="/login"
          style={{ color: 'var(--color-text)', fontWeight: '600', textDecoration: 'none' }}
        >
          ← Back to sign in
        </Link>
      </p>
    </div>
  )
}
