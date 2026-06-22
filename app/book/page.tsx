import type { Metadata } from 'next'
import { ShieldCheck, Clock, HeartHandshake } from 'lucide-react'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { FloatingContact } from '@/components/site/floating-contact'
import { BookingForm } from '@/components/site/booking-form'

export const metadata: Metadata = {
  title: 'Book an Appointment',
  description:
    'Book your dental appointment at Sultan Rahman Dental Clinic in Freetown. Choose your service, branch, dentist, and preferred time in minutes.',
}

const assurances = [
  { icon: Clock, label: 'Confirmation within hours' },
  { icon: ShieldCheck, label: 'Your information stays private' },
  { icon: HeartHandshake, label: 'Gentle, patient-first care' },
]

export default function BookPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-secondary/30 pt-28 pb-20 sm:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
              Book Appointment
            </span>
            <h1 className="mt-5 font-heading text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
              Reserve your visit in a few easy steps
            </h1>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Tell us a little about you and your dental needs. Our team will confirm your
              appointment and answer any questions you have.
            </p>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {assurances.map((a) => (
                <li key={a.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <a.icon className="h-4 w-4 text-primary" />
                  {a.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12">
            <BookingForm />
          </div>
        </div>
      </main>
      <SiteFooter />
      <FloatingContact />
    </>
  )
}
