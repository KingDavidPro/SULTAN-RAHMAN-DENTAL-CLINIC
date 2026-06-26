// Central definition of the Super Admin account and the permission model.
// NOTE: No password is stored here. The initial password is set only when
// seeding via the service role (see scripts/seed-super-admin.ts), and should
// be changed through Supabase Auth before production.

export const SUPER_ADMIN = {
  name: "David Alieu Conteh",
  email: "contehdavidalieu@gmail.com",
  phone: "099810084",
  role: "super_admin",
  status: "active",
} as const

export const SUPER_ADMIN_PERMISSIONS = [
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
] as const

export type Permission = (typeof SUPER_ADMIN_PERMISSIONS)[number]

// The app_metadata payload attached to the Supabase Auth user. app_metadata
// can only be modified with the service role, so it is safe to trust for
// authorization checks.
export const SUPER_ADMIN_APP_METADATA = {
  role: SUPER_ADMIN.role,
  status: SUPER_ADMIN.status,
  permissions: SUPER_ADMIN_PERMISSIONS,
}

export function isDev() {
  return process.env.NODE_ENV !== "production"
}

type UserLike = {
  app_metadata?: { role?: string; permissions?: string[] } | null
} | null

export function isSuperAdmin(user: UserLike): boolean {
  return user?.app_metadata?.role === "super_admin"
}

export function hasPermission(user: UserLike, permission: Permission): boolean {
  if (!user?.app_metadata) return false
  if (user.app_metadata.role === "super_admin") return true
  return Boolean(user.app_metadata.permissions?.includes(permission))
}
