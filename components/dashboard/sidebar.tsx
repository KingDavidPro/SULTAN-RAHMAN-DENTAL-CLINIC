"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, CalendarCheck, Users, LogOut, Stethoscope, Database } from "lucide-react"
import { cn } from "@/lib/utils"
import { signOut } from "@/app/dashboard/actions"

const links = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/bookings", label: "Bookings", icon: CalendarCheck },
  { href: "/dashboard/patients", label: "Patients", icon: Users },
  { href: "/dashboard/diagnostics", label: "Diagnostics", icon: Database },
]

export function DashboardSidebar({ email }: { email: string }) {
  const pathname = usePathname()

  return (
    <aside className="flex h-full w-full flex-col gap-1 p-4">
      <div className="mb-4 flex items-center gap-2.5 px-2 py-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Stethoscope className="h-5 w-5" />
        </span>
        <div className="leading-none">
          <p className="font-heading text-sm font-bold text-foreground">Sultan Rahman</p>
          <p className="text-xs text-muted-foreground">Staff Dashboard</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {links.map((link) => {
          const active = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/70 hover:bg-secondary hover:text-foreground",
              )}
            >
              <link.icon className="h-4.5 w-4.5" />
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border pt-3">
        <p className="truncate px-3 pb-2 text-xs text-muted-foreground" title={email}>
          {email}
        </p>
        <form action={signOut}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground"
          >
            <LogOut className="h-4.5 w-4.5" />
            Sign out
          </button>
        </form>
      </div>
    </aside>
  )
}
