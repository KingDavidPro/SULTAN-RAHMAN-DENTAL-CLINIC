"use server"

import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { createClient } from "@/lib/supabase/server"
import { SUPER_ADMIN, isDev } from "@/lib/auth/super-admin"

// Development-only temporary credential. Change/remove before production.
const DEV_SUPER_ADMIN_PASSWORD = process.env.DEV_SUPER_ADMIN_PASSWORD ?? "22601500"

/**
 * Development-only shortcut that signs in as the Super Admin account.
 * This action refuses to run in production.
 */
export async function devSuperAdminLogin() {
  if (!isDev()) {
    return { error: "Development login is disabled in production." }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: SUPER_ADMIN.email,
    password: DEV_SUPER_ADMIN_PASSWORD,
  })

  if (error) {
    return {
      error:
        "Dev login failed. Ensure the Super Admin account is seeded in the connected Supabase project with the dev password.",
    }
  }

  redirect("/dashboard")
}

/** Sends a password reset / setup email to the given address. */
export async function sendPasswordReset(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim()
  if (!email) return { error: "Email is required." }

  const supabase = await createClient()
  const origin = (await headers()).get("origin") ?? ""

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=/auth/update-password`,
  })

  if (error) {
    return { error: "Could not send the reset email. Please try again." }
  }
  return { success: true }
}

/** Sets a new password for the currently authenticated (recovery) session. */
export async function updatePassword(formData: FormData) {
  const password = String(formData.get("password") ?? "")
  const confirm = String(formData.get("confirm") ?? "")

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." }
  }
  if (password !== confirm) {
    return { error: "Passwords do not match." }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { error: "Your reset link has expired. Please request a new one." }
  }

  const { error } = await supabase.auth.updateUser({ password })
  if (error) {
    return { error: "Could not update your password. Please try again." }
  }

  redirect("/dashboard")
}
