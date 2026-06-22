import Image from 'next/image'
import { CheckCircle2, Quote } from 'lucide-react'
import { doctor } from '@/lib/clinic-data'

export function DoctorSection() {
  return (
    <section id="doctor" className="scroll-mt-20 bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-border shadow-lg">
              <Image
                src={doctor.image || '/placeholder.svg'}
                alt={`Portrait of ${doctor.name}`}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-1/2 flex -translate-x-1/2 gap-3 rounded-2xl border border-border bg-card p-4 shadow-lg sm:left-6 sm:translate-x-0">
              {doctor.stats.map((stat) => (
                <div key={stat.label} className="px-3 text-center">
                  <div className="font-heading text-xl font-extrabold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 lg:mt-0">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Meet Your Dentist
            </span>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
              {doctor.name}
            </h2>
            <p className="mt-1 text-base font-medium text-muted-foreground">{doctor.title}</p>

            <p className="mt-6 text-base leading-relaxed text-muted-foreground">{doctor.bio}</p>

            <figure className="mt-6 rounded-2xl border border-border bg-accent/40 p-5">
              <Quote className="h-6 w-6 text-primary" />
              <blockquote className="mt-2 text-base font-medium italic leading-relaxed text-foreground">
                {doctor.philosophy}
              </blockquote>
            </figure>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {doctor.credentials.map((c) => (
                <li key={c} className="flex items-start gap-2.5 text-sm text-foreground/90">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
