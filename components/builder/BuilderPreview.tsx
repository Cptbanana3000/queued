'use client'

import type { BuilderState, Template } from '@/lib/types'

/* ── Per-template style maps ───────────────────────── */
const STYLES: Record<Template, {
  bg: string; text: string; muted: string; accent: string
  inputBg: string; inputBorder: string; inputText: string
  btnBg: string; btnText: string; badgeBg: string; badgeText: string
  countColor: string; font?: string
}> = {
  oat: {
    bg: '#FAF7F2', text: '#2C2C2A', muted: '#5F5E5A', accent: '#D85A30',
    inputBg: '#fff', inputBorder: '#D3D1C7', inputText: '#2C2C2A',
    btnBg: '#2C2C2A', btnText: '#FAF7F2', badgeBg: '#F0997B', badgeText: '#712B13',
    countColor: '#888780',
  },
  slate: {
    bg: '#F4F4F2', text: '#1a1a1a', muted: '#5F5E5A', accent: '#185FA5',
    inputBg: '#F4F4F2', inputBorder: '#D3D1C7', inputText: '#1a1a1a',
    btnBg: '#185FA5', btnText: '#fff', badgeBg: '#E6F1FB', badgeText: '#0C447C',
    countColor: '#888780',
  },
  ember: {
    bg: '#1C1917', text: '#FAF7F2', muted: '#888780', accent: '#EF9F27',
    inputBg: '#2C2C2A', inputBorder: '#444441', inputText: '#FAF7F2',
    btnBg: '#EF9F27', btnText: '#1C1917', badgeBg: 'transparent', badgeText: '#EF9F27',
    countColor: '#5F5E5A',
  },
  void: {
    bg: '#fff', text: '#000', muted: '#444', accent: '#000',
    inputBg: '#fff', inputBorder: '#000', inputText: '#000',
    btnBg: '#000', btnText: '#fff', badgeBg: 'transparent', badgeText: '#000',
    countColor: '#888', font: 'var(--font-mono)',
  },
}

interface BuilderPreviewProps {
  state: BuilderState
}

export default function BuilderPreview({ state }: BuilderPreviewProps) {
  const s = STYLES[state.template]
  const isVoid = state.template === 'void'
  const isEmber = state.template === 'ember'
  const fontFamily = s.font || 'var(--font-sans)'

  const productName = state.name || 'Your product name'
  const tagline = state.tagline || 'A punchy one-line tagline that explains what you do.'
  const buttonText = state.buttonText || 'Join waitlist'

  return (
    <div style={{ flex: 1, padding: '32px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', overflowY: 'auto', height: '100%' }}>
      {/* Browser chrome */}
      <div style={{
        width: '100%', maxWidth: '520px',
        backgroundColor: '#fff', borderRadius: '12px',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-lg)',
        overflow: 'hidden',
      }}>
        {/* Title bar */}
        <div style={{
          padding: '10px 14px', borderBottom: '1px solid var(--color-border)',
          display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'var(--color-surface-overlay)',
        }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FF5F57' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FEBC2E' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#28C840' }} />
          <div style={{
            flex: 1, marginLeft: '8px', padding: '4px 12px', borderRadius: '5px',
            backgroundColor: 'var(--color-surface)', fontSize: '11px', color: 'var(--color-text-muted)',
            textAlign: 'center',
          }}>
            queued.io/w/{state.slug || 'my-product'}
          </div>
        </div>

        {/* Preview content */}
        <div style={{ backgroundColor: s.bg, fontFamily }}>
          {/* Hero */}
          <div style={{ padding: '48px 32px', textAlign: isVoid ? 'center' : (state.template === 'slate' ? 'left' : 'center') }}>
            {/* Coming soon badge */}
            {state.comingSoon && (
              isEmber ? (
                <p style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: s.accent, margin: '0 0 16px' }}>
                  The waitlist is open
                </p>
              ) : isVoid ? (
                <div style={{ border: '1px solid #000', display: 'inline-block', padding: '3px 10px', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '14px' }}>
                  Waitlist open
                </div>
              ) : (
                <span style={{
                  display: 'inline-block', fontSize: '11px', padding: '3px 10px',
                  borderRadius: '20px', marginBottom: '12px',
                  backgroundColor: s.badgeBg, color: s.badgeText,
                }}>
                  Coming soon
                </span>
              )
            )}

            {/* Title */}
            <h3 style={{
              fontSize: isVoid ? '26px' : '28px', fontWeight: 500, color: s.text,
              margin: '0 0 10px', letterSpacing: '-0.5px',
            }}>
              {productName}
            </h3>

            {/* Tagline */}
            <p style={{
              fontSize: '14px', color: s.muted, margin: '0 auto 20px',
              maxWidth: '300px', lineHeight: 1.6,
              textAlign: 'center',
            }}>
              {tagline}
            </p>

            {/* Ember divider */}
            {isEmber && <div style={{ width: '36px', height: '1px', background: s.accent, margin: '0 auto 18px' }} />}

            {/* Signup form */}
            {isVoid ? (
              <div style={{ display: 'flex', maxWidth: '320px', margin: '0 auto 12px', border: '2px solid #000' }}>
                <input
                  placeholder="your@email.com"
                  disabled
                  style={{
                    flex: 1, padding: '10px 14px', border: 'none', borderRight: '2px solid #000',
                    background: '#fff', fontSize: '13px', color: '#000', outline: 'none', fontFamily,
                  }}
                />
                <button style={{
                  padding: '10px 14px', background: '#000', color: '#fff', border: 'none',
                  fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', fontFamily,
                  whiteSpace: 'nowrap',
                }}>
                  {buttonText}
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '8px', maxWidth: '320px', margin: '0 auto 10px' }}>
                <input
                  placeholder="your@email.com"
                  disabled
                  style={{
                    flex: 1, padding: '10px 14px', border: `1px solid ${s.inputBorder}`,
                    borderRadius: '8px', backgroundColor: s.inputBg, fontSize: '13px',
                    color: s.inputText, outline: 'none', fontFamily,
                  }}
                />
                <button style={{
                  padding: '10px 16px', backgroundColor: s.btnBg, color: s.btnText,
                  border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 500,
                  whiteSpace: 'nowrap', fontFamily,
                }}>
                  {buttonText}
                </button>
              </div>
            )}

            {/* Count */}
            {state.showCount && (
              <p style={{
                fontSize: isVoid ? '11px' : '12px', color: s.countColor,
                letterSpacing: isVoid ? '1px' : 'normal',
                textTransform: isVoid ? 'uppercase' : 'none',
                textAlign: 'center',
              }}>
                {isEmber ? '— 0 people already waiting —' : 'Join 0 others already waiting'}
              </p>
            )}
          </div>

          {/* Footer badge */}
          <div style={{
            padding: '14px 32px', textAlign: 'center',
            borderTop: `1px solid ${isEmber ? '#333' : isVoid ? '#000' : s.inputBorder}`,
            backgroundColor: isEmber ? '#141210' : isVoid ? '#000' : (state.template === 'oat' ? '#F2EDE4' : s.bg),
          }}>
            <p style={{
              fontSize: '11px', margin: 0, fontFamily,
              color: isEmber ? '#444441' : isVoid ? '#fff' : '#888780',
            }}>
              Made with{' '}
              <strong style={{ color: isEmber ? '#EF9F27' : isVoid ? '#fff' : s.text, fontWeight: 500 }}>
                Queued
              </strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
