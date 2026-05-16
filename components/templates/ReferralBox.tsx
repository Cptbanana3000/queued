'use client'

import { useState } from 'react'

interface ReferralBoxProps {
  refUrl: string
  accentColor: string
  textColor: string
  borderColor: string
  labelColor: string
}

export default function ReferralBox({
  refUrl,
  accentColor,
  textColor,
  borderColor,
  labelColor,
}: ReferralBoxProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(refUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{
      marginTop: '16px',
      padding: '14px 16px',
      borderRadius: '10px',
      border: `1px solid ${borderColor}`,
      textAlign: 'left',
    }}>
      <p style={{
        fontSize: '11px', fontWeight: 600, color: accentColor,
        margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.6px',
      }}>
        Your referral link
      </p>
      <div style={{ display: 'flex', gap: '6px' }}>
        <input
          readOnly
          value={refUrl}
          style={{
            flex: 1, padding: '8px 10px', borderRadius: '6px',
            border: `1px solid ${borderColor}`, backgroundColor: 'transparent',
            fontSize: '11px', color: textColor, fontFamily: 'var(--font-mono)',
            outline: 'none', minWidth: 0,
          }}
        />
        <button
          onClick={handleCopy}
          style={{
            padding: '8px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600,
            border: 'none', backgroundColor: accentColor, color: '#fff',
            cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
          }}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <p style={{ fontSize: '12px', color: labelColor, margin: '8px 0 0', lineHeight: 1.4 }}>
        Share this — anyone who joins through your link is counted as your referral.
      </p>
    </div>
  )
}
