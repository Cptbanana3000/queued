export default function LandingBleed() {
  return (
    <section className="section-pad" style={{ background: '#1C1917', paddingTop: '80px', paddingBottom: '80px', textAlign: 'center' }}>
      <p style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#EF9F27', margin: '0 0 20px' }}>
        Your page. Your vibe.
      </p>
      <h2 style={{ fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 500, color: '#FAF7F2', margin: '0 0 12px', letterSpacing: '-1.2px', lineHeight: 1.1 }}>
        Built to make your<br />launch memorable
      </h2>
      <p style={{ fontSize: '15px', color: '#888780', margin: '0 auto 36px', maxWidth: '360px', lineHeight: 1.6 }}>
        Every template is designed to collect signups fast and leave a lasting impression.
      </p>

      {/* Divider rule */}
      <div style={{ width: '40px', height: '1px', background: '#EF9F27', margin: '0 auto 40px' }} />

      {/* Demo card (Ember style) */}
      <div style={{
        background: '#231F1C', border: '1px solid #333', borderRadius: '14px',
        maxWidth: '440px', margin: '0 auto', padding: '40px 32px', textAlign: 'center',
      }}>
        <p style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#EF9F27', margin: '0 0 14px' }}>
          The waitlist is open
        </p>
        <p style={{ fontSize: '24px', fontWeight: 500, color: '#FAF7F2', margin: '0 0 8px', letterSpacing: '-0.5px' }}>
          Your product name
        </p>
        <p style={{ fontSize: '14px', color: '#888780', margin: '0 0 22px' }}>
          A bold tagline that says exactly what you do.
        </p>
        <div style={{ display: 'flex', gap: '8px', maxWidth: '300px', margin: '0 auto 10px' }}>
          <input
            placeholder="your@email.com"
            style={{
              flex: 1, padding: '11px 14px', border: '1px solid #444441',
              borderRadius: '8px', background: '#2C2C2A', fontSize: '13px',
              color: '#FAF7F2', outline: 'none', fontFamily: 'var(--font-sans)',
            }}
          />
          <button style={{
            padding: '11px 18px', background: '#EF9F27', color: '#1C1917',
            border: 'none', borderRadius: '8px', fontSize: '13px', cursor: 'pointer',
            fontWeight: 500, whiteSpace: 'nowrap',
          }}>
            Join
          </button>
        </div>
        <p style={{ fontSize: '11px', color: '#5F5E5A' }}>— 240 people already waiting —</p>
      </div>
    </section>
  )
}
