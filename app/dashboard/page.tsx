import Link from "next/link"
import { CalendarCheck, Clock, CheckCircle2, Users, ArrowRight } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { type Booking, STATUS_META } from "@/lib/bookings"
import { StatusSelect } from "@/components/dashboard/status-select"

function startOfWeek() {
  const d = new Date()
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(d.setDate(diff))
  monday.setHours(0, 0, 0, 0)
  return monday.toISOString()
}

export default async function DashboardOverview() {
  const supabase = await createClient()
  const { data } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false })

  const bookings = (data ?? []) as Booking[]
  const weekStart = startOfWeek()

  const total = bookings.length
  const pending = bookings.filter((b) => b.status === "pending").length
  const confirmed = bookings.filter((b) => b.status === "confirmed").length
  const thisWeek = bookings.filter((b) => b.created_at >= weekStart).length
  const uniquePatients = new Set(bookings.map((b) => b.phone)).size

  const stats = [
    { label: "Total bookings", value: total, icon: CalendarCheck },
    { label: "Pending", value: pending, icon: Clock },
    { label: "Confirmed", value: confirmed, icon: CheckCircle2 },
    { label: "Unique patients", value: uniquePatients, icon: Users },
  ]

  // Service popularity
  const serviceCounts = bookings.reduce<Record<string, number>>((acc, b) => {
    const key = b.service ?? "Unspecified"
    acc[key] = (acc[key] ?? 0) + 1
    return acc
  }, {})
  const topServices = Object.entries(serviceCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
  const maxService = topServices[0]?.[1] ?? 1

  const recent = bookings.slice(0, 6)

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Overview</h1>
        <p className="text-sm text-muted-foreground">
          {thisWeek} new {thisWeek === 1 ? "request" : "requests"} this week.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <s.icon className="h-5 w-5 text-primary" />
            </div>
            <p className="mt-2 font-heading text-3xl font-bold text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <section className="rounded-2xl border border-border bg-card p-6 lg:col-span-2">
          <h2 className="font-heading text-lg font-bold text-foreground">Popular services</h2>
          <div className="mt-4 grid gap-4">
            {topServices.length === 0 && (
              <p className="text-sm text-muted-foreground">No bookings yet.</p>
            )}
            {topServices.map(([name, count]) => (
              <div key={name} className="grid gap-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="truncate text-foreground">{name}</span>
                  <span className="font-medium text-muted-foreground">{count}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${(count / maxService) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold text-foreground">Recent requests</h2>
            <Link
              href="/dashboard/bookings"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-3">
            {recent.length === 0 && <p className="text-sm text-muted-foreground">No bookings yet.</p>}
            {recent.map((b) => {
              const meta = STATUS_META[b.status] ?? STATUS_META.pending
              return (
                <div
                  key={b.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border p-4"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-foreground">{b.full_name}</p>
                    <p className="truncate text-sm text-muted-foreground">
                      {b.service ?? "—"} · {b.preferred_date ?? "No date"}
                    </p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${meta.className}`}>
                    {meta.label}
                  </span>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
