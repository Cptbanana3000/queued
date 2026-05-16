'use client'

import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signup } from '../actions'
import GoogleButton from '@/components/auth/GoogleButton'
import type { ActionState } from '@/lib/types'

export default function SignupPage() {
  const router = useRouter()
  const [state, action, pending] = useActionState<ActionState, FormData>(
    signup,
    undefined,
  )

  useEffect(() => {
    if (state?.success && state.redirectTo) {
      router.push(state.redirectTo)
    }
  }, [state, router])

  // Email confirmation required — show inbox prompt
  if (state?.success && !state.redirectTo) {
    return (
      <div style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <div style={{
          backgroundColor: 'var(--color-surface-raised)',
          border: '1px solid var(--color-border)',
          borderRadius: '16px',
          padding: '48px 40px',
          boxShadow: 'var(--shadow-md)',
        }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '12px',
            backgroundColor: 'var(--color-success-bg)',
            border: '1px solid #c3e6c3',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
          }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path d="M2 6.5L11 13l9-6.5" stroke="var(--color-success)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="2" y="4" width="18" height="14" rx="2" stroke="var(--color-success)" strokeWidth="1.5"/>
            </svg>
          </div>
          <h1 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text)', margin: '0 0 10px', letterSpacing: '-0.4px' }}>
            Check your inbox
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: '0 0 6px', lineHeight: 1.6 }}>
            We sent a confirmation link to
          </p>
          <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 24px' }}>
            {state.message}
          </p>
          <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
            Click the link in the email to activate your account, then come back to sign in.
          </p>
        </div>
        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
          Already confirmed?{' '}
          <a href="/login" style={{ color: 'var(--color-text)', fontWeight: 600, textDecoration: 'none' }}>
            Sign in →
          </a>
        </p>
      </div>
    )
  }

  const inputStyle: React.CSSProperties = {
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
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '13px',
    fontWeight: '500',
    color: 'var(--color-text)',
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = 'var(--color-text)'
  }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = 'var(--color-border)'
  }

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
            Create your account
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
            Launch your first waitlist in 60 seconds
          </p>
        </div>

        {/* Google OAuth */}
        <GoogleButton label="Sign up with Google" />

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
          <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>or</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
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
          {/* Full name */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor="signup-name" style={labelStyle}>
              Full name <span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}>(optional)</span>
            </label>
            <input
              id="signup-name"
              name="full_name"
              type="text"
              autoComplete="name"
              autoFocus
              placeholder="Alex Johnson"
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          {/* Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor="signup-email" style={labelStyle}>
              Email
            </label>
            <input
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          {/* Password */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor="signup-password" style={labelStyle}>
              Password
            </label>
            <input
              id="signup-password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              placeholder="At least 8 characters"
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
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
              transition: 'background-color 0.15s',
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
            {pending ? 'Creating account…' : 'Create account'}
          </button>

          {/* Terms */}
          <p
            style={{
              fontSize: '12px',
              color: 'var(--color-text-muted)',
              textAlign: 'center',
              lineHeight: '1.5',
            }}
          >
            By creating an account you agree to our{' '}
            <Link href="/terms" style={{ color: 'var(--color-text-secondary)', textDecoration: 'underline' }}>
              Terms
            </Link>{' '}
            and{' '}
            <Link href="/privacy" style={{ color: 'var(--color-text-secondary)', textDecoration: 'underline' }}>
              Privacy Policy
            </Link>
            .
          </p>
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
        Already have an account?{' '}
        <Link
          href="/login"
          style={{
            color: 'var(--color-text)',
            fontWeight: '600',
            textDecoration: 'none',
          }}
        >
          Sign in →
        </Link>
      </p>
    </div>
  )
}
