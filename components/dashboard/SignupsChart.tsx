'use client'

import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from 'recharts'

interface ChartPoint {
  date: string   // 'YYYY-MM-DD'
  signups: number
}

interface SignupsChartProps {
  data: ChartPoint[]
  plan: 'free' | 'pro'
}

function formatDate(dateStr: string) {
  const [, month, day] = dateStr.split('-')
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${monthNames[parseInt(month) - 1]} ${parseInt(day)}`
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      backgroundColor: 'var(--color-surface-raised)',
      border: '1px solid var(--color-border)',
      borderRadius: '8px',
      padding: '10px 14px',
      fontSize: '13px',
    }}>
      <p style={{ color: 'var(--color-text-muted)', margin: '0 0 4px' }}>{formatDate(label)}</p>
      <p style={{ color: 'var(--color-text)', fontWeight: 600, margin: 0 }}>
        {payload[0].value} {payload[0].value === 1 ? 'signup' : 'signups'}
      </p>
    </div>
  )
}

export default function SignupsChart({ data, plan }: SignupsChartProps) {
  const isPro = plan === 'pro'
  const hasData = data.some(d => d.signups > 0)

  // Show every 5th label to avoid clutter across 30 days
  const tickFormatter = (dateStr: string, index: number) =>
    index % 5 === 0 ? formatDate(dateStr) : ''

  const chart = (
    <div style={{
      backgroundColor: 'var(--color-surface-raised)',
      border: '1px solid var(--color-border)',
      borderRadius: '12px',
      padding: '20px 20px 12px',
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 2px' }}>
            Signups over time
          </p>
          <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: 0 }}>
            Last 30 days
          </p>
        </div>
      </div>

      <div style={{ position: 'relative' }}>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={data} barSize={8} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--color-border)" strokeDasharray="0" />
            <XAxis
              dataKey="date"
              tickFormatter={tickFormatter}
              tick={{ fontSize: 11, fill: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)' }}
              axisLine={false}
              tickLine={false}
              interval={0}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 11, fill: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)' }}
              axisLine={false}
              tickLine={false}
              width={36}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--color-surface-inset)' }} />
            <Bar dataKey="signups" fill="var(--color-text)" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

        {!hasData && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0 }}>
              No signups yet
            </p>
          </div>
        )}
      </div>
    </div>
  )

  if (isPro) return chart

  // Free plan — blur the chart and show upgrade prompt
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ filter: 'blur(3px)', pointerEvents: 'none', userSelect: 'none' }}>
        {chart}
      </div>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: '10px',
      }}>
        <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text)', margin: 0 }}>
          Signups chart is a Pro feature
        </p>
        <a
          href="/settings"
          style={{
            padding: '8px 18px', borderRadius: '7px', fontSize: '13px', fontWeight: 600,
            backgroundColor: 'var(--color-text)', color: '#fff', textDecoration: 'none',
          }}
        >
          Upgrade to Pro
        </a>
      </div>
    </div>
  )
}
