'use client'

import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { resetPassword } from '../actions'
import type { ActionState } from '@/lib/types'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [state, action, pending] = useActionState<ActionState, FormData>(
    resetPassword,
    undefined,
  )

  useEffect(() => {
    if (state?.success && state.redirectTo) {
      router.push(state.redirectTo)
    }
  }, [state, router])

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
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '-0.5px', color: 'var(--color-text)', marginBottom: '6px' }}>
            Set new password
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
            Choose a strong password for your account.
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
              htmlFor="reset-password"
              style={{ fontSize: '13px', fontWeight: '500', color: 'var(--color-text)' }}
            >
              New password
            </label>
            <input
              id="reset-password"
              name="password"
              type="password"
              autoComplete="new-password"
              autoFocus
              required
              minLength={8}
              placeholder="Min. 8 characters"
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label
              htmlFor="reset-confirm-password"
              style={{ fontSize: '13px', fontWeight: '500', color: 'var(--color-text)' }}
            >
              Confirm new password
            </label>
            <input
              id="reset-confirm-password"
              name="confirm_password"
              type="password"
              autoComplete="new-password"
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
            {pending ? 'Updating…' : 'Update password'}
          </button>
        </form>
      </div>
    </div>
  )
}
