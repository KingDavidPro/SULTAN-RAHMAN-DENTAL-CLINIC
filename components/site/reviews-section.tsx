import { Star, Quote } from 'lucide-react'
import { SectionHeading } from '@/components/site/section-heading'
import { clinic, testimonials } from '@/lib/clinic-data'

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            i < count
              ? 'h-4 w-4 fill-chart-4 text-chart-4'
              : 'h-4 w-4 text-muted-foreground/30'
          }
        />
      ))}
    </div>
  )
}

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function ReviewsSection() {
  return (
    <section id="reviews" className="scroll-mt-20 bg-secondary/40 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Patient Stories"
          title="Loved by patients across Freetown"
        />

        <div className="mx-auto mt-8 flex max-w-xl flex-col items-center gap-4 rounded-2xl border border-border bg-card p-6 text-center shadow-sm sm:flex-row sm:justify-center sm:text-left">
          <div className="flex items-center gap-3">
            <svg className="h-8 w-8" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.5 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.9a5 5 0 0 1-2.2 3.3v2.7h3.6c2.1-2 3.2-4.9 3.2-7.9z" />
              <path fill="#34A853" d="M12 23c2.9 0 5.4-1 7.2-2.6l-3.6-2.7c-1 .7-2.3 1.1-3.6 1.1-2.8 0-5.1-1.9-6-4.4H2.3v2.8A11 11 0 0 0 12 23z" />
              <path fill="#FBBC05" d="M6 14.4a6.6 6.6 0 0 1 0-4.2V7.4H2.3a11 11 0 0 0 0 9.8z" />
              <path fill="#EA4335" d="M12 5.5c1.6 0 3 .5 4.1 1.6l3.1-3.1A11 11 0 0 0 2.3 7.4L6 10.2C6.9 7.7 9.2 5.5 12 5.5z" />
            </svg>
            <div>
              <div className="font-heading text-2xl font-semibold leading-none">
                {clinic.rating}
              </div>
              <Stars count={5} />
            </div>
          </div>
          <div className="sm:border-l sm:border-border sm:pl-4">
            <p className="text-sm text-muted-foreground">
              Based on <span className="font-semibold text-foreground">{clinic.reviewCount} Google reviews</span>
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <Quote className="h-7 w-7 text-accent-foreground/40" />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-foreground/90">
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent font-heading text-sm font-bold text-accent-foreground">
                  {initials(t.name)}
                </span>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.treatment}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
