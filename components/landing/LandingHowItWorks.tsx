const STEPS = [
  {
    num: '1',
    title: 'Create your page',
    desc: 'Enter your product name, tagline, pick a template and toggle your sections. Takes under a minute.',
  },
  {
    num: '2',
    title: 'Share your link',
    desc: 'Get a Queued link instantly. Connect your own custom domain anytime on Pro.',
  },
  {
    num: '3',
    title: 'Watch signups grow',
    desc: 'Track every signup in your dashboard in real time. Export your list when you\'re ready to launch.',
  },
]

export default function LandingHowItWorks() {
  return (
    <section className="section-pad" style={{ background: '#fff', paddingTop: '80px', paddingBottom: '80px', borderBottom: '1px solid #e8e8e8' }}>
      <p style={{ fontSize: '11px', fontWeight: 500, color: '#999', letterSpacing: '1.5px', textTransform: 'uppercase', margin: '0 0 8px', textAlign: 'center' }}>
        How it works
      </p>
      <h2 style={{ fontSize: '32px', fontWeight: 500, color: '#0a0a0a', margin: '0 0 48px', letterSpacing: '-0.8px', textAlign: 'center' }}>
        Three steps. That&apos;s it.
      </h2>

      <div className="r-grid-3" style={{ maxWidth: '760px', margin: '0 auto' }}>
        {STEPS.map(step => (
          <div key={step.num}>
            <div style={{
              fontSize: '13px', fontWeight: 500, color: '#BA7517',
              background: '#FAEEDA', width: '28px', height: '28px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px',
            }}>
              {step.num}
            </div>
            <p style={{ fontSize: '16px', fontWeight: 500, color: '#0a0a0a', margin: '0 0 8px' }}>{step.title}</p>
            <p style={{ fontSize: '14px', color: '#666', margin: 0, lineHeight: 1.6 }}>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
