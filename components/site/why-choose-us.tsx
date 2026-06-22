import Image from 'next/image'
import {
  Cpu,
  Users,
  Sofa,
  Siren,
  CalendarCheck,
  Star,
  type LucideIcon,
} from 'lucide-react'
import { whyChooseUs } from '@/lib/clinic-data'

const icons: LucideIcon[] = [Cpu, Users, Sofa, Siren, CalendarCheck, Star]

export function WhyChooseUs() {
  return (
    <section className="relative isolate overflow-hidden bg-primary py-20 text-primary-foreground sm:py-24">
      <Image
        src="/images/clinic-interior.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-15"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-primary/80" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground/80">
            Why Choose Us
          </span>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
            A dental experience built around you
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item, i) => {
            const Icon = icons[i]
            return (
              <div
                key={item.title}
                className="rounded-2xl bg-background/10 p-6 ring-1 ring-background/15 backdrop-blur-sm"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-background/15">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-heading text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">
                  {item.detail}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
