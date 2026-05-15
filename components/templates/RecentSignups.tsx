'use client'

import { useState, useEffect } from 'react'

const POOL = [
  'j***n@gmail.com',   'as***k@gmail.com',  'm***5@hotmail.com',
  'da***d@outlook.com','sa***h@gmail.com',   'ch***e@yahoo.com',
  'mi***l@gmail.com',  'em***y@gmail.com',   'ro***t@gmail.com',
  'an***a@outlook.com','pa***k@gmail.com',   'ke***n@gmail.com',
  'li***a@gmail.com',  'to***s@yahoo.com',   'ni***e@gmail.com',
  'br***n@outlook.com','st***y@gmail.com',   'de***n@hotmail.com',
  'je***y@gmail.com',  'ca***e@gmail.com',   'ol***r@gmail.com',
  'fr***k@outlook.com','so***a@gmail.com',   'ha***n@yahoo.com',
]

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

interface RecentSignupsProps {
  /** Text color for the email */
  color: string
  /** Muted/secondary color for "just joined" */
  mutedColor: string
  /** Optional font family override */
  fontFamily?: string
  /** Dot color */
  dotColor: string
}

export default function RecentSignups({ color, mutedColor, dotColor, fontFamily }: RecentSignupsProps) {
  // Start with stable pool (matches SSR), shuffle only after client mount
  const [emails, setEmails] = useState<string[]>(POOL)
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    setEmails(shuffle(POOL))
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex(i => (i + 1) % emails.length)
        setVisible(true)
      }, 350)
    }, 2800)
    return () => clearInterval(id)
  }, [emails.length])

  return (
    <div
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '7px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-4px)',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
        fontFamily,
      }}
    >
      {/* Live dot */}
      <span style={{ position: 'relative', display: 'inline-flex', width: '8px', height: '8px', flexShrink: 0 }}>
        <span style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          backgroundColor: dotColor, opacity: 0.4,
          animation: 'ping 1.8s cubic-bezier(0,0,0.2,1) infinite',
        }} />
        <span style={{
          position: 'relative', display: 'block', width: '8px', height: '8px',
          borderRadius: '50%', backgroundColor: dotColor,
        }} />
      </span>

      <span style={{ fontSize: '12px', color, fontWeight: 500 }}>
        {emails[index]}
      </span>
      <span style={{ fontSize: '12px', color: mutedColor }}>secured a spot</span>

      {/* Ping animation keyframe via style tag */}
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
