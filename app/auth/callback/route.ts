import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      // Ensure a profile row exists — covers OAuth sign-ups where no
      // server action runs to create it. ignoreDuplicates means existing
      // rows (email/password users) are left untouched.
      await supabase.from('profiles').upsert(
        {
          id: data.user.id,
          full_name:
            data.user.user_metadata.full_name ??
            data.user.user_metadata.name ??
            null,
        },
        { onConflict: 'id', ignoreDuplicates: true },
      )

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=link_expired`)
}
