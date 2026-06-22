import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardSidebar } from "@/components/dashboard/sidebar"

export const metadata: Metadata = {
  title: "Staff Dashboard",
  robots: { index: false, follow: false },
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/auth/login")

  return (
    <div className="flex min-h-svh bg-secondary/30">
      <div className="sticky top-0 hidden h-svh w-64 shrink-0 border-r border-border bg-card lg:block">
        <DashboardSidebar email={user.email ?? "Staff"} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="border-b border-border bg-card px-4 py-3 lg:hidden">
          <DashboardSidebar email={user.email ?? "Staff"} />
        </div>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
