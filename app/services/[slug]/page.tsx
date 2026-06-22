import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, CheckCircle2, ChevronRight, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { FloatingContact } from '@/components/site/floating-contact'
import { services, whatsappLink } from '@/lib/clinic-data'

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) return {}
  return { title: service.title, description: service.short }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) notFound()

  const Icon = service.icon

  return (
    <>
      <SiteHeader />
      <main className="bg-background pb-20 pt-24 sm:pt-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/services" className="hover:text-primary">Services</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{service.title}</span>
          </nav>

          <div className="mt-8 flex flex-col gap-4 rounded-3xl border border-border bg-accent/40 p-8">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Icon className="h-7 w-7" />
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
                {service.title}
              </h1>
              <span className="rounded-full bg-background px-3 py-1 text-xs font-semibold text-primary ring-1 ring-border">
                {service.category}
              </span>
            </div>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
              {service.overview}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="gap-2">
                <Link href="/book">
                  <Calendar className="h-5 w-5" />
                  Book this treatment
                </Link>
              </Button>
              <span className="text-sm text-muted-foreground">
                Estimated range: <span className="font-semibold text-foreground">{service.priceRange}</span>
              </span>
            </div>
          </div>

          <section className="mt-12">
            <h2 className="font-heading text-2xl font-bold">Benefits</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {service.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2.5 rounded-xl border border-border bg-card p-4 text-sm">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  {b}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="font-heading text-2xl font-bold">What to expect</h2>
            <ol className="mt-5 space-y-4">
              {service.procedure.map((p, i) => (
                <li key={p.step} className="flex gap-4 rounded-xl border border-border bg-card p-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-sm font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-semibold">{p.step}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-12">
            <h2 className="font-heading text-2xl font-bold">Frequently asked questions</h2>
            <Accordion type="single" collapsible className="mt-4 w-full">
              {service.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left font-heading text-base font-semibold">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <section className="mt-12 flex flex-col items-start gap-4 rounded-3xl bg-primary p-8 text-primary-foreground sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-heading text-xl font-bold">Ready to get started?</h2>
              <p className="mt-1 text-sm text-primary-foreground/80">
                Book your {service.title.toLowerCase()} consultation today.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary" className="gap-2">
                <Link href="/book">
                  <Calendar className="h-5 w-5" />
                  Book Now
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="gap-2 bg-success text-success-foreground hover:bg-success/90"
              >
                <a href={whatsappLink(`Hello, I'm interested in ${service.title}.`)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
      <FloatingContact />
    </>
  )
}
