import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { FloatingContact } from '@/components/site/floating-contact'
import { SectionHeading } from '@/components/site/section-heading'
import { services } from '@/lib/clinic-data'

export const metadata: Metadata = {
  title: 'Dental Services',
  description:
    'Explore the full range of dental services at Sultan Rahman Dental Clinic in Freetown, from general dentistry to implants and emergency care.',
}

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-background pt-28 pb-20 sm:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Services"
            title="Expert care for every smile"
            description="Whether you need a routine checkup or advanced treatment, our team delivers world-class dental care with comfort and compassion."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <service.icon className="h-6 w-6" />
                </span>
                <div className="mt-4 flex items-center gap-2">
                  <h3 className="font-heading text-lg font-bold">{service.title}</h3>
                </div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {service.short}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
      <FloatingContact />
    </>
  )
}
