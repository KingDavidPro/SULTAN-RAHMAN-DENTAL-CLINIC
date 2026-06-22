export type Booking = {
  id: string
  full_name: string
  phone: string
  whatsapp: string | null
  email: string | null
  preferred_date: string | null
  preferred_time: string | null
  branch: string | null
  service: string | null
  dentist: string | null
  first_visit: string | null
  concerns: string[] | null
  allergies: string | null
  medication: string | null
  diabetes: boolean
  pregnancy: boolean
  high_blood_pressure: boolean
  notes: string | null
  status: string
  created_at: string
}

export const STATUS_META: Record<string, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-accent text-accent-foreground" },
  confirmed: { label: "Confirmed", className: "bg-primary/10 text-primary" },
  completed: { label: "Completed", className: "bg-success/15 text-success" },
  cancelled: { label: "Cancelled", className: "bg-destructive/10 text-destructive" },
}
