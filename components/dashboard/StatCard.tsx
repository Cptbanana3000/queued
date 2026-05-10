interface StatCardProps {
  label: string
  value: string | number
  sub?: string
  accent?: boolean
}

export default function StatCard({ label, value, sub, accent }: StatCardProps) {
  return (
    <div style={{
      backgroundColor: 'var(--color-surface-raised)',
      border: '1px solid var(--color-border)',
      borderRadius: '12px',
      padding: '20px 22px',
    }}>
      <p style={{
        fontSize: '12px',
        fontWeight: 500,
        color: 'var(--color-text-muted)',
        margin: '0 0 8px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      }}>
        {label}
      </p>
      <p style={{
        fontSize: '28px',
        fontWeight: 600,
        color: accent ? 'var(--color-brand)' : 'var(--color-text)',
        margin: '0',
        letterSpacing: '-0.8px',
        lineHeight: 1,
      }}>
        {value}
      </p>
      {sub && (
        <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: '6px 0 0' }}>
          {sub}
        </p>
      )}
    </div>
  )
}
