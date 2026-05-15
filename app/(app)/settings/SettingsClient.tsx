'use client'

import { useActionState, useState } from 'react'
import { updateProfile } from './actions'
import type { ActionState } from '@/lib/types'

interface ProfileFormProps {
  initialName: string
  email: string
  plan: 'free' | 'pro'
}

export default function SettingsClient({ initialName, email, plan }: ProfileFormProps) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    updateProfile, undefined,
  )
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [isManaging, setIsManaging] = useState(false)

  const handleUpgrade = async () => {
    try {
      setIsCheckingOut(true)
      const res = await fetch('/api/stripe/checkout', { method: 'POST' })
      let data
      try { data = await res.json() } catch (e) { data = null }
      
      if (!res.ok) {
        throw new Error(data?.error || `Server responded with ${res.status}`)
      }
      
      if (data?.url) window.location.href = data.url
    } catch (err) {
      console.error('Checkout failed:', err)
      setIsCheckingOut(false)
    }
  }

  const handleManage = async () => {
    try {
      setIsManaging(true)
      const res = await fetch('/api/stripe/portal', { method: 'POST' })
      if (!res.ok) {
        console.error('Portal request failed:', res.status)
        setIsManaging(false)
        return
      }
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else setIsManaging(false)
    } catch (err) {
      console.error(err)
      setIsManaging(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box', padding: '10px 13px',
    border: '1px solid var(--color-border)', borderRadius: '8px',
    backgroundColor: 'var(--color-surface)', fontSize: '14px',
    color: 'var(--color-text)', outline: 'none', fontFamily: 'var(--font-sans)',
    transition: 'border-color 0.15s',
  }

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-surface-raised)',
    border: '1px solid var(--color-border)',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '16px',
  }

  return (
    <div style={{ maxWidth: '600px' }}>

      {/* Profile section */}
      <div style={cardStyle}>
        <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 4px' }}>
          Profile
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: '0 0 20px' }}>
          Update your display name.
        </p>

        <form action={formAction}>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-text)', display: 'block', marginBottom: '5px' }}>
              Display name
            </label>
            <input
              name="full_name"
              defaultValue={initialName}
              placeholder="Your name"
              required
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-text)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-text)', display: 'block', marginBottom: '5px' }}>
              Email
            </label>
            <input
              value={email}
              readOnly
              style={{ ...inputStyle, backgroundColor: 'var(--color-surface-inset)', color: 'var(--color-text-muted)', cursor: 'default' }}
            />
            <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', margin: '5px 0 0' }}>
              Email cannot be changed.
            </p>
          </div>

          {state && (
            <p style={{
              fontSize: '13px', margin: '0 0 14px', fontWeight: 500,
              color: state.success ? 'var(--color-success)' : 'var(--color-danger)',
            }}>
              {state.success ? '✓ ' : ''}{state.message}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            style={{
              padding: '9px 20px', borderRadius: '7px', fontSize: '13px', fontWeight: 500,
              border: 'none', backgroundColor: 'var(--color-text)', color: '#fff',
              cursor: pending ? 'not-allowed' : 'pointer', opacity: pending ? 0.6 : 1,
            }}
          >
            {pending ? 'Saving…' : 'Save changes'}
          </button>
        </form>
      </div>

      {/* Plan section */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 4px' }}>
              Plan
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: '0 0 16px' }}>
              You are on the{' '}
              <span style={{
                fontWeight: 600,
                color: plan === 'pro' ? 'var(--color-text)' : 'var(--color-text-secondary)',
              }}>
                {plan === 'pro' ? '⚡ Pro' : 'Free'}
              </span>{' '}
              plan.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {plan === 'free' ? (
                <>
                  <PlanRow label="Waitlists" value="1" limit />
                  <PlanRow label="Subscribers per waitlist" value="100" limit />
                  <PlanRow label="CSV export" value="Not included" limit />
                </>
              ) : (
                <>
                  <PlanRow label="Waitlists" value="Unlimited" />
                  <PlanRow label="Subscribers" value="Unlimited" />
                  <PlanRow label="CSV export" value="Included" />
                </>
              )}
            </div>
          </div>

          {plan === 'pro' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
              <span style={{
                flexShrink: 0, padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600,
                backgroundColor: 'var(--color-text)', color: '#fff',
              }}>
                ⚡ Active
              </span>
              <button
                onClick={handleManage}
                disabled={isManaging}
                style={{
                  padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 500,
                  background: 'transparent', color: 'var(--color-text)', border: '1px solid var(--color-border)',
                  cursor: isManaging ? 'not-allowed' : 'pointer', opacity: isManaging ? 0.6 : 1,
                }}
              >
                {isManaging ? 'Loading…' : 'Manage subscription'}
              </button>
            </div>
          )}
        </div>

        {plan === 'free' && (
          <div style={{
            marginTop: '20px', padding: '16px', borderRadius: '8px',
            background: 'linear-gradient(135deg, #0a0a0a 0%, #2e2e2c 100%)',
          }}>
            <p style={{ fontSize: '14px', fontWeight: 600, color: '#fff', margin: '0 0 4px' }}>
              Upgrade to Pro
            </p>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', margin: '0 0 14px' }}>
              Unlimited waitlists, subscribers, CSV exports and more.
            </p>
            <button
              onClick={handleUpgrade}
              disabled={isCheckingOut}
              style={{
                padding: '8px 18px', borderRadius: '6px', fontSize: '13px', fontWeight: 600,
                background: '#fff', color: '#0a0a0a', border: 'none',
                cursor: isCheckingOut ? 'not-allowed' : 'pointer', opacity: isCheckingOut ? 0.7 : 1,
              }}
            >
              {isCheckingOut ? 'Redirecting…' : 'Upgrade to Pro'}
            </button>
          </div>
        )}
      </div>

      {/* Danger zone */}
      <div style={{
        ...cardStyle,
        backgroundColor: 'var(--color-danger-bg)',
        border: '1px solid #f5c6c6',
        marginBottom: 0,
      }}>
        <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-danger)', margin: '0 0 4px' }}>
          Danger zone
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 14px' }}>
          Deleting your account is permanent. All waitlists and subscriber data will be erased immediately.
        </p>
        <button
          disabled
          title="Account deletion coming soon"
          style={{
            padding: '7px 14px', borderRadius: '7px', fontSize: '12px', fontWeight: 500,
            border: '1px solid var(--color-danger)', backgroundColor: 'transparent',
            color: 'var(--color-danger)', cursor: 'not-allowed', opacity: 0.5,
          }}
        >
          Delete account
        </button>
      </div>
    </div>
  )
}

function PlanRow({ label, value, limit }: { label: string; value: string; limit?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
      <span style={{ color: 'var(--color-text-secondary)' }}>{label}</span>
      <span style={{ fontWeight: 500, color: limit ? 'var(--color-text-muted)' : 'var(--color-text)' }}>
        {value}
      </span>
    </div>
  )
}
