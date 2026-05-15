import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service',
  alternates: { canonical: 'https://www.queuedapp.dev/terms' },
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

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p style={{ fontSize: '14px', color: '#999', margin: 0 }}>Last updated: May 2026</p>
        </div>

        <Section title="1. Acceptance of Terms">
          <P>By accessing or using Queued ("the Service"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.</P>
          <P>These terms apply to all users of Queued, including visitors, registered users, and paying subscribers.</P>
        </Section>

        <Section title="2. Description of Service">
          <P>Queued is a waitlist builder that allows individuals and businesses ("Users") to create and publish waitlist pages, collect email sign-ups from visitors ("Subscribers"), and manage their waitlists through a dashboard.</P>
          <P>We offer a free tier and a paid Pro plan. Features available under each plan are described on our pricing page and may change over time.</P>
        </Section>

        <Section title="3. Account Registration">
          <P>To use Queued you must create an account with a valid email address and password. You are responsible for keeping your credentials secure and for all activity that occurs under your account.</P>
          <P>You must be at least 16 years old to create an account. By registering, you confirm that the information you provide is accurate and that you will keep it up to date.</P>
        </Section>

        <Section title="4. Acceptable Use">
          <P>You agree not to use Queued to:</P>
          <ul style={{ margin: '0 0 12px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '6px' }}>Collect email addresses without the knowledge or consent of Subscribers</li>
            <li style={{ marginBottom: '6px' }}>Send spam or unsolicited communications to your Subscribers</li>
            <li style={{ marginBottom: '6px' }}>Publish waitlists for illegal products, services, or activities</li>
            <li style={{ marginBottom: '6px' }}>Impersonate another person or organisation</li>
            <li style={{ marginBottom: '6px' }}>Attempt to gain unauthorised access to the Service or its infrastructure</li>
            <li style={{ marginBottom: '6px' }}>Scrape, reverse-engineer, or copy any part of the Service</li>
          </ul>
          <P>We reserve the right to suspend or terminate accounts that violate these rules without notice.</P>
        </Section>

        <Section title="5. Subscription and Billing">
          <P>The Pro plan is billed monthly at the price listed on our pricing page. Payments are processed securely through Stripe. By subscribing, you authorise Stripe to charge your payment method on a recurring basis.</P>
          <P>You may cancel your subscription at any time from your account settings. Cancellation takes effect at the end of the current billing period — you will not receive a refund for time already paid.</P>
          <P>We reserve the right to change pricing with at least 14 days' notice to active subscribers.</P>
        </Section>

        <Section title="6. Your Content and Subscriber Data">
          <P>You retain ownership of all content you create in Queued, including your waitlist pages and any branding or copy you provide.</P>
          <P>You are solely responsible for the Subscriber data you collect through your waitlists. By using Queued, you confirm that you have a lawful basis for collecting that data and that you will handle it in compliance with applicable privacy laws (including GDPR where relevant).</P>
          <P>We do not sell or share your Subscriber data with third parties. You may export it at any time on the Pro plan.</P>
        </Section>

        <Section title="7. Intellectual Property">
          <P>Queued, its name, logo, templates, and all related software are the property of the Service and are protected by copyright and other intellectual property laws.</P>
          <P>You may not reproduce, distribute, or create derivative works from any part of the Service without our written permission.</P>
        </Section>

        <Section title="8. Termination">
          <P>You may delete your account at any time. Upon deletion, your waitlists and associated Subscriber data will be permanently removed.</P>
          <P>We may suspend or terminate your account if you breach these Terms, if required by law, or if the Service is discontinued. In the case of discontinuation, we will provide reasonable notice.</P>
        </Section>

        <Section title="9. Disclaimer of Warranties">
          <P>The Service is provided "as is" without warranties of any kind, express or implied. We do not guarantee that Queued will be uninterrupted, error-free, or that any defects will be corrected.</P>
          <P>We are not responsible for any loss of data, revenue, or opportunity resulting from your use of the Service.</P>
        </Section>

        <Section title="10. Limitation of Liability">
          <P>To the fullest extent permitted by law, Queued's total liability to you for any claim arising out of or relating to these Terms or the Service shall not exceed the amount you paid us in the three months preceding the claim.</P>
          <P>We are not liable for any indirect, incidental, special, or consequential damages.</P>
        </Section>

        <Section title="11. Changes to These Terms">
          <P>We may update these Terms from time to time. When we do, we will update the "Last updated" date at the top of this page. Continued use of the Service after changes are posted constitutes acceptance of the updated Terms.</P>
          <P>For significant changes, we will notify active users by email.</P>
        </Section>

        <Section title="12. Contact">
          <P>If you have any questions about these Terms, please contact us at <a href="mailto:dondakirme@gmail.com" style={{ color: '#0a0a0a', fontWeight: 500 }}>dondakirme@gmail.com</a>.</P>
        </Section>
      </div>
    </div>
  )
}
