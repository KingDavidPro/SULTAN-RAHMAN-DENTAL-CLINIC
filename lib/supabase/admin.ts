import { createClient } from "@supabase/supabase-js"

// Server-only Supabase client using the service role key.
// NEVER import this in client components. It bypasses RLS and must
// only be used in route handlers / server actions for trusted writes
// (e.g. saving a public booking request into a staff-protected table).
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  )
}
