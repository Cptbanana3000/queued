export const WAITLIST_DOMAIN = 'queuedapp.dev'

export function waitlistUrl(slug: string, ref?: string | null): string {
  const base = `https://${slug}.${WAITLIST_DOMAIN}`
  return ref ? `${base}?ref=${ref}` : base
}
