"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

const VALID_STATUSES = ["pending", "confirmed", "completed", "cancelled"] as const
export type BookingStatus = (typeof VALID_STATUSES)[number]

export async function updateBookingStatus(id: string, status: string) {
  if (!VALID_STATUSES.includes(status as BookingStatus)) {
    return { error: "Invalid status." }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: "Not authenticated." }

  const { error } = await supabase.from("bookings").update({ status }).eq("id", id)
  if (error) {
    console.log("[v0] Update status error:", error.message)
    return { error: "Could not update status." }
  }

  revalidatePath("/dashboard")
  revalidatePath("/dashboard/bookings")
  return { success: true }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/auth/login")
}
