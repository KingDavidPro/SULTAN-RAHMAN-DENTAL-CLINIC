import Link from 'next/link'
import { Phone, Mail, MapPin, MessageCircle, Clock, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/site/section-heading'
import { clinic, whatsappLink } from '@/lib/clinic-data'

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20 bg-secondary/40 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Visit Us"
          title="Get in touch with our team"
          description="We are conveniently located in central Freetown with branches across the city."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href={clinic.phoneHref}
                className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
              >
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold">Call us</span>
                <span className="text-sm text-muted-foreground">{clinic.phone}</span>
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
              >
                <MessageCircle className="h-5 w-5 text-success" />
                <span className="text-sm font-semibold">WhatsApp</span>
                <span className="text-sm text-muted-foreground">Chat with us instantly</span>
              </a>
              <a
                href={`mailto:${clinic.email}`}
                className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
              >
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold">Email</span>
                <span className="break-all text-sm text-muted-foreground">{clinic.email}</span>
              </a>
              <div className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-5">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold">Address</span>
                <span className="text-sm text-muted-foreground">{clinic.address}</span>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="font-heading text-sm font-bold">Opening Hours</span>
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                {clinic.hours.map((h) => (
                  <li key={h.day} className="flex items-center justify-between gap-4">
                    <span className="text-muted-foreground">{h.day}</span>
                    <span className="font-medium">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-primary p-6 text-primary-foreground">
              <h3 className="font-heading text-lg font-bold">Ready to book?</h3>
              <p className="mt-1 text-sm text-primary-foreground/80">
                Reserve your appointment online in under two minutes.
              </p>
              <Button asChild size="lg" variant="secondary" className="mt-4 gap-2">
                <Link href="/book">
                  <Calendar className="h-5 w-5" />
                  Book Appointment
                </Link>
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
            <iframe
              title="Map of Sultan Rahman Dental Clinic, Freetown"
              src="https://www.google.com/maps?q=Freetown%20Sierra%20Leone&output=embed"
              className="h-full min-h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
