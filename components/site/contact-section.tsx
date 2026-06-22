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
          description="Find us at Congress Junction, Eastern Old Road, Kissy, Freetown. Call, message us on WhatsApp, or drop by the clinic."
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

            <div className="rounded-2xl border border-border bg-card p-5">
              <span className="text-sm font-semibold">Follow us</span>
              <div className="mt-3 flex items-center gap-2.5">
                <a
                  href={clinic.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Sultan Rahman Dental Clinic on Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z" />
                  </svg>
                </a>
                <a
                  href={clinic.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Sultan Rahman Dental Clinic on TikTok"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    <path d="M16.5 3c.3 2.1 1.6 3.7 3.5 4v2.5c-1.3.1-2.5-.3-3.6-1v6.6a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v2.7a2.9 2.9 0 1 0 2 2.8V3h2.8z" />
                  </svg>
                </a>
                <a
                  href={clinic.social.googleBusiness}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Sultan Rahman Dental Clinic on Google"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                    <path fill="#4285F4" d="M22.5 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.9a5 5 0 0 1-2.2 3.3v2.7h3.6c2.1-2 3.2-4.9 3.2-7.9z" />
                    <path fill="#34A853" d="M12 23c2.9 0 5.4-1 7.2-2.6l-3.6-2.7c-1 .7-2.3 1.1-3.6 1.1-2.8 0-5.1-1.9-6-4.4H2.3v2.8A11 11 0 0 0 12 23z" />
                    <path fill="#FBBC05" d="M6 14.4a6.6 6.6 0 0 1 0-4.2V7.4H2.3a11 11 0 0 0 0 9.8z" />
                    <path fill="#EA4335" d="M12 5.5c1.6 0 3 .5 4.1 1.6l3.1-3.1A11 11 0 0 0 2.3 7.4L6 10.2C6.9 7.7 9.2 5.5 12 5.5z" />
                  </svg>
                </a>
              </div>
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
              title="Map of Sultan Rahman Dental Clinic, Kissy, Freetown"
              src={`https://www.google.com/maps?q=${encodeURIComponent(clinic.mapQuery)}&output=embed`}
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
