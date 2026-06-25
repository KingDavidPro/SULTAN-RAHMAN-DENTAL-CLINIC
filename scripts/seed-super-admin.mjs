/**
 * Seeds the initial Super Admin account into the CONNECTED Supabase project's
 * auth store, using the service role key. Idempotent: if the user already
 * exists, it updates their role/permissions and (optionally) resets the
 * development password.
 *
 * Run AFTER pointing the env vars at your existing Supabase project:
 *   node --env-file-if-exists=/vercel/share/.env.project scripts/seed-super-admin.mjs
 *
 * The development password defaults to 22601500 and can be overridden with
 * DEV_SUPER_ADMIN_PASSWORD. DEVELOPMENT USE ONLY — change before production.
 */
import { createClient } from "@supabase/supabase-js"

const SUPER_ADMIN = {
  name: "David Alieu Conteh",
  email: "contehdavidalieu@gmail.com",
  phone: "099810084",
  role: "super_admin",
  status: "active",
}

const PERMISSIONS = [
  "full_system_access",
  "user_management",
  "staff_approval",
  "staff_suspension",
  "patient_management",
  "appointment_management",
  "revenue_management",
  "expense_management",
  "profit_analytics",
  "website_management",
  "blog_management",
  "ai_analytics",
  "whatsapp_crm",
  "lead_tracking",
  "settings_management",
  "security_management",
]

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const password = process.env.DEV_SUPER_ADMIN_PASSWORD ?? "22601500"

if (!url || !serviceKey) {
  console.error("[seed] Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.")
  process.exit(1)
}

const ref = (url.match(/https?:\/\/([a-z0-9]+)\.supabase\.co/i) || [])[1]
console.log(`[seed] Target Supabase project ref: ${ref}`)

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

const app_metadata = { role: SUPER_ADMIN.role, status: SUPER_ADMIN.status, permissions: PERMISSIONS }
const user_metadata = { full_name: SUPER_ADMIN.name, phone: SUPER_ADMIN.phone }

async function findUserByEmail(email) {
  // Paginate through users to find a match (Admin API has no direct getByEmail).
  let page = 1
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 200 })
    if (error) throw error
    const match = data.users.find((u) => u.email?.toLowerCase() === email.toLowerCase())
    if (match) return match
    if (data.users.length < 200) return null
    page += 1
  }
}

async function main() {
  const existing = await findUserByEmail(SUPER_ADMIN.email)

  if (existing) {
    const { error } = await supabase.auth.admin.updateUserById(existing.id, {
      password,
      email_confirm: true,
      app_metadata,
      user_metadata,
    })
    if (error) throw error
    console.log(`[seed] Updated existing Super Admin (${SUPER_ADMIN.email}). Role/permissions synced, dev password reset.`)
  } else {
    const { error } = await supabase.auth.admin.createUser({
      email: SUPER_ADMIN.email,
      password,
      email_confirm: true,
      app_metadata,
      user_metadata,
    })
    if (error) throw error
    console.log(`[seed] Created Super Admin (${SUPER_ADMIN.email}).`)
  }

  console.log("[seed] Done. DEVELOPMENT PASSWORD IS SET — change it before production.")
}

main().catch((err) => {
  console.error("[seed] Failed:", err.message || err)
  process.exit(1)
})
