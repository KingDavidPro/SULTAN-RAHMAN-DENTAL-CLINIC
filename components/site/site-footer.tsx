import Link from 'next/link'
import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react'
import { clinic, services, whatsappLink } from '@/lib/clinic-data'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
                  <path d="M12 2c-1.6 0-2.5.8-4 .8S5.2 2 4 3C2.6 4.2 2.6 7 3.4 10.4c.5 2.2.7 4 1.3 6.5C5.3 19.4 6 22 7.4 22c1.2 0 1.5-1.7 2-3.4.5-1.7.9-2.6 2.6-2.6s2.1.9 2.6 2.6c.5 1.7.8 3.4 2 3.4 1.4 0 2.1-2.6 2.7-5.1.6-2.5.8-4.3 1.3-6.5C23.4 7 23.4 4.2 22 3c-1.2-1-2.5-.2-4-.2s-2.4-.8-4-.8z" />
                </svg>
              </span>
              <span className="font-heading text-lg font-semibold">Sultan Rahman</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Freetown&apos;s premier dental clinic, delivering world-class, compassionate
              care for every smile.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{clinic.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a href={clinic.phoneHref} className="transition-colors hover:text-primary">
                  {clinic.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href={`mailto:${clinic.email}`} className="transition-colors hover:text-primary">
                  {clinic.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="h-4 w-4 shrink-0 text-primary" />
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary"
                >
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">Opening Hours</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {clinic.hours.map((h) => (
                <li key={h.day} className="flex items-start gap-2.5">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    <span className="block font-medium text-foreground">{h.day}</span>
                    {h.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {clinic.name}. All rights reserved.
          </p>
          <p>Freetown, Sierra Leone</p>
        </div>
      </div>
    </footer>
  )
}
