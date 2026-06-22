import { NextResponse, type NextRequest } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

type BookingPayload = {
  fullName?: string
  phone?: string
  whatsapp?: string
  email?: string
  date?: string
  time?: string
  branch?: string
  service?: string
  dentist?: string
  firstVisit?: string
  concerns?: string[]
  allergies?: string
  medication?: string
  diabetes?: boolean
  pregnancy?: boolean
  highBloodPressure?: boolean
  notes?: string
  consentContact?: boolean
  consentAssessment?: boolean
}

export async function POST(request: NextRequest) {
  let body: BookingPayload
  try {
    body = (await request.json()) as BookingPayload
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const fullName = body.fullName?.trim()
  const phone = body.phone?.trim()

  if (!fullName || !phone) {
    return NextResponse.json({ error: "Name and phone number are required." }, { status: 400 })
  }

  if (!body.consentContact || !body.consentAssessment) {
    return NextResponse.json({ error: "Please accept the required consents." }, { status: 400 })
  }

  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from("bookings")
    .insert({
      full_name: fullName,
      phone,
      whatsapp: body.whatsapp?.trim() || null,
      email: body.email?.trim() || null,
      preferred_date: body.date || null,
      preferred_time: body.time || null,
      branch: body.branch || null,
      service: body.service || null,
      dentist: body.dentist || null,
      first_visit: body.firstVisit || null,
      concerns: body.concerns ?? [],
      allergies: body.allergies?.trim() || null,
      medication: body.medication?.trim() || null,
      diabetes: Boolean(body.diabetes),
      pregnancy: Boolean(body.pregnancy),
      high_blood_pressure: Boolean(body.highBloodPressure),
      notes: body.notes?.trim() || null,
      status: "pending",
    })
    .select("id")
    .single()

  if (error) {
    console.log("[v0] Booking insert error:", error.message)
    return NextResponse.json({ error: "Could not save your booking. Please try again." }, { status: 500 })
  }

  return NextResponse.json({ id: data.id, success: true }, { status: 201 })
}
