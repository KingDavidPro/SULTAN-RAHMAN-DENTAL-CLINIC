"use client"

import { useMemo, useState } from "react"
import { Search, Phone, MessageCircle, Mail, Calendar, MapPin, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { StatusSelect } from "@/components/dashboard/status-select"
import { type Booking, STATUS_META } from "@/lib/bookings"

function formatDate(value: string | null) {
  if (!value) return "—"
  return new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
}

export function BookingsTable({ bookings }: { bookings: Booking[] }) {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState("all")
  const [active, setActive] = useState<Booking | null>(null)

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      const matchStatus = filter === "all" || b.status === filter
      const q = query.trim().toLowerCase()
      const matchQuery =
        !q ||
        b.full_name.toLowerCase().includes(q) ||
        b.phone.toLowerCase().includes(q) ||
        (b.service ?? "").toLowerCase().includes(q)
      return matchStatus && matchQuery
    })
  }, [bookings, query, filter])

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, phone, service"
            className="pl-9"
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {Object.entries(STATUS_META).map(([key, meta]) => (
              <SelectItem key={key} value={key}>
                {meta.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="hidden grid-cols-[1.5fr_1fr_1fr_1fr_auto] gap-4 border-b border-border bg-secondary/50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground lg:grid">
          <span>Patient</span>
          <span>Service</span>
          <span>Date</span>
          <span>Requested</span>
          <span>Status</span>
        </div>

        {filtered.length === 0 && (
          <p className="px-5 py-10 text-center text-sm text-muted-foreground">No bookings found.</p>
        )}

        <ul className="divide-y divide-border">
          {filtered.map((b) => {
            const meta = STATUS_META[b.status] ?? STATUS_META.pending
            return (
              <li
                key={b.id}
                className="grid grid-cols-1 gap-3 px-5 py-4 transition-colors hover:bg-secondary/30 lg:grid-cols-[1.5fr_1fr_1fr_1fr_auto] lg:items-center lg:gap-4"
              >
                <button
                  type="button"
                  onClick={() => setActive(b)}
                  className="text-left"
                >
                  <p className="font-medium text-foreground hover:text-primary">{b.full_name}</p>
                  <p className="text-sm text-muted-foreground lg:hidden">{b.service ?? "—"}</p>
                </button>
                <span className="hidden text-sm text-foreground lg:block">{b.service ?? "—"}</span>
                <span className="hidden text-sm text-muted-foreground lg:block">
                  {formatDate(b.preferred_date)}
                </span>
                <span className="hidden text-sm text-muted-foreground lg:block">
                  {formatDate(b.created_at)}
                </span>
                <div className="flex items-center justify-between gap-2">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold lg:hidden ${meta.className}`}>
                    {meta.label}
                  </span>
                  <StatusSelect id={b.id} status={b.status} />
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
          {active && (
            <>
              <DialogHeader>
                <DialogTitle className="font-heading text-xl">{active.full_name}</DialogTitle>
              </DialogHeader>

              <div className="grid gap-4">
                <div className="flex flex-wrap gap-2">
                  <a
                    href={`tel:${active.phone}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm font-medium text-foreground"
                  >
                    <Phone className="h-3.5 w-3.5" /> {active.phone}
                  </a>
                  {active.whatsapp && (
                    <a
                      href={`https://wa.me/${active.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-success/15 px-3 py-1.5 text-sm font-medium text-success"
                    >
                      <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                    </a>
                  )}
                  {active.email && (
                    <a
                      href={`mailto:${active.email}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm font-medium text-foreground"
                    >
                      <Mail className="h-3.5 w-3.5" /> {active.email}
                    </a>
                  )}
                </div>

                <dl className="grid gap-2.5 rounded-2xl bg-secondary/40 p-4 text-sm">
                  <Row icon={<Calendar className="h-4 w-4" />} label="Preferred">
                    {formatDate(active.preferred_date)} {active.preferred_time ? `· ${active.preferred_time}` : ""}
                  </Row>
                  <Row label="Service">{active.service ?? "—"}</Row>
                  <Row label="Dentist">{active.dentist ?? "No preference"}</Row>
                  <Row icon={<MapPin className="h-4 w-4" />} label="Branch">
                    {active.branch ?? "—"}
                  </Row>
                  <Row label="First visit">{active.first_visit ?? "—"}</Row>
                  <Row label="Concerns">
                    {active.concerns && active.concerns.length > 0 ? active.concerns.join(", ") : "None"}
                  </Row>
                </dl>

                <div className="grid gap-2.5 rounded-2xl border border-border p-4 text-sm">
                  <p className="font-semibold text-foreground">Medical</p>
                  <Row label="Allergies">{active.allergies || "None reported"}</Row>
                  <Row label="Medication">{active.medication || "None reported"}</Row>
                  <Row label="Flags">
                    {[
                      active.diabetes && "Diabetes",
                      active.pregnancy && "Pregnancy",
                      active.high_blood_pressure && "High blood pressure",
                    ]
                      .filter(Boolean)
                      .join(", ") || "None"}
                  </Row>
                  {active.notes && <Row label="Notes">{active.notes}</Row>}
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-muted-foreground">Update status</span>
                  <StatusSelect id={active.id} status={active.status} />
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

function Row({
  label,
  children,
  icon,
}: {
  label: string
  children: React.ReactNode
  icon?: React.ReactNode
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="flex items-center gap-1.5 text-muted-foreground">
        {icon}
        {label}
      </dt>
      <dd className="text-right font-medium text-foreground">{children}</dd>
    </div>
  )
}
