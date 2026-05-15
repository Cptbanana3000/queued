import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  alternates: { canonical: 'https://www.queuedapp.dev/privacy' },
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section style={{ marginBottom: '40px' }}>
    <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#0a0a0a', margin: '0 0 12px', letterSpacing: '-0.3px' }}>
      {title}
    </h2>
    <div style={{ fontSize: '15px', color: '#444', lineHeight: 1.8 }}>
      {children}
    </div>
  </section>
)

const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ margin: '0 0 12px' }}>{children}</p>
)

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: '100dvh', backgroundColor: '#fff', fontFamily: 'var(--font-sans)' }}>
      {/* Nav */}
      <nav style={{
        padding: '0 40px', height: '56px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', borderBottom: '1px solid #e8e8e8',
        position: 'sticky', top: 0, background: '#fff', zIndex: 100,
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <span style={{
            width: '28px', height: '28px', background: '#0a0a0a', borderRadius: '6px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '13px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono)',
          }}>Q</span>
          <span style={{ fontSize: '15px', fontWeight: 500, color: '#0a0a0a', letterSpacing: '-0.3px' }}>Queued</span>
        </Link>
        <Link href="/" style={{ fontSize: '13px', color: '#666', textDecoration: 'none' }}>← Back to home</Link>
      </nav>

      {/* Content */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '60px 40px 100px' }}>
        {/* Header */}
        <div style={{ marginBottom: '48px', paddingBottom: '32px', borderBottom: '1px solid #e8e8e8' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#0a0a0a', margin: '0 0 10px', letterSpacing: '-0.8px' }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: '14px', color: '#999', margin: 0 }}>Last updated: May 2026</p>
        </div>

        <Section title="1. Who We Are">
          <P>Queued is a waitlist builder available at <a href="https://www.queuedapp.dev" style={{ color: '#0a0a0a', fontWeight: 500 }}>queuedapp.dev</a>. This policy explains what personal data we collect, why we collect it, and how we handle it.</P>
          <P>If you have questions, contact us at <a href="mailto:dondakirme@gmail.com" style={{ color: '#0a0a0a', fontWeight: 500 }}>dondakirme@gmail.com</a>.</P>
        </Section>

        <Section title="2. Data We Collect">
          <P><strong style={{ color: '#0a0a0a', fontWeight: 600 }}>Account data:</strong> When you sign up, we collect your email address, full name (optional), and a hashed password.</P>
          <P><strong style={{ color: '#0a0a0a', fontWeight: 600 }}>Billing data:</strong> If you subscribe to the Pro plan, your payment details are collected and stored by Stripe. We receive only a customer ID and subscription status — we never see or store your card number.</P>
          <P><strong style={{ color: '#0a0a0a', fontWeight: 600 }}>Usage data:</strong> We collect basic information about how you use the Service — such as pages visited and actions taken — to improve the product. This is not linked to identifiable individuals.</P>
          <P><strong style={{ color: '#0a0a0a', fontWeight: 600 }}>Subscriber data:</strong> When visitors sign up to a waitlist you create on Queued, their email addresses are stored on our servers on your behalf. You are the data controller for this data; we process it only to provide the Service.</P>
        </Section>

        <Section title="3. How We Use Your Data">
          <ul style={{ margin: '0 0 12px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '6px' }}>To provide, maintain, and improve the Service</li>
            <li style={{ marginBottom: '6px' }}>To process payments and manage your subscription</li>
            <li style={{ marginBottom: '6px' }}>To send transactional emails (account confirmation, password reset, billing receipts)</li>
            <li style={{ marginBottom: '6px' }}>To respond to support requests</li>
            <li style={{ marginBottom: '6px' }}>To comply with legal obligations</li>
          </ul>
          <P>We do not sell your data. We do not use your data for advertising.</P>
        </Section>

        <Section title="4. Subscriber Data (Data You Collect)">
          <P>As a Queued user, you collect email addresses from people who sign up to your waitlists. You are responsible for ensuring you have a lawful basis to collect this data and that you handle it in accordance with applicable law.</P>
          <P>We store this data securely on your behalf. We do not use your Subscribers' email addresses for any purpose beyond providing the Service to you. You can export or delete this data at any time from your dashboard.</P>
        </Section>

        <Section title="5. Third-Party Services">
          <P>We use a small number of trusted third parties to operate the Service:</P>
          <ul style={{ margin: '0 0 12px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '6px' }}><strong style={{ color: '#0a0a0a', fontWeight: 600 }}>Supabase</strong> — database and authentication. Your account data and waitlist data are stored on Supabase infrastructure.</li>
            <li style={{ marginBottom: '6px' }}><strong style={{ color: '#0a0a0a', fontWeight: 600 }}>Stripe</strong> — payment processing. Billing data is handled entirely by Stripe and subject to <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#0a0a0a', fontWeight: 500 }}>Stripe's Privacy Policy</a>.</li>
            <li style={{ marginBottom: '6px' }}><strong style={{ color: '#0a0a0a', fontWeight: 600 }}>Vercel</strong> — hosting and infrastructure for the web application.</li>
          </ul>
          <P>These providers are contractually bound to handle data securely and only for the purposes we specify.</P>
        </Section>

        <Section title="6. Cookies">
          <P>Queued uses only essential cookies necessary to keep you signed in and maintain your session. We do not use tracking or advertising cookies.</P>
        </Section>

        <Section title="7. Data Retention">
          <P>We retain your account data for as long as your account is active. If you delete your account, your data and your Subscribers' data are permanently deleted within 30 days.</P>
          <P>Billing records may be retained for longer where required by law.</P>
        </Section>

        <Section title="8. Security">
          <P>We take reasonable technical and organisational measures to protect your data, including encrypted connections (HTTPS), hashed passwords, and access controls. No method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</P>
        </Section>

        <Section title="9. Your Rights">
          <P>Depending on where you live, you may have the right to:</P>
          <ul style={{ margin: '0 0 12px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '6px' }}>Access the personal data we hold about you</li>
            <li style={{ marginBottom: '6px' }}>Correct inaccurate data</li>
            <li style={{ marginBottom: '6px' }}>Request deletion of your data</li>
            <li style={{ marginBottom: '6px' }}>Export your data in a portable format</li>
            <li style={{ marginBottom: '6px' }}>Object to or restrict certain processing</li>
          </ul>
          <P>To exercise any of these rights, email us at <a href="mailto:dondakirme@gmail.com" style={{ color: '#0a0a0a', fontWeight: 500 }}>dondakirme@gmail.com</a>. We will respond within 30 days.</P>
        </Section>

        <Section title="10. Changes to This Policy">
          <P>We may update this policy from time to time. When we do, we will update the date at the top of this page. Continued use of the Service after changes are posted means you accept the updated policy.</P>
          <P>For material changes, we will notify you by email if you have an active account.</P>
        </Section>

        <Section title="11. Contact">
          <P>Questions about this policy? Email us at <a href="mailto:dondakirme@gmail.com" style={{ color: '#0a0a0a', fontWeight: 500 }}>dondakirme@gmail.com</a>.</P>
        </Section>
      </div>
    </div>
  )
}
