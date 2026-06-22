import Link from 'next/link'
import Image from 'next/image'
import { Calendar, MessageCircle, Phone, ShieldCheck, Sparkles, HeartHandshake, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { clinic, whatsappLink } from '@/lib/clinic-data'

const trustItems = [
  { icon: Award, label: 'Experienced dental team' },
  { icon: Sparkles, label: 'Modern technology' },
  { icon: HeartHandshake, label: 'Patient-centered care' },
  { icon: ShieldCheck, label: `${clinic.patientsServed} successful smiles` },
]

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
      <Image
        src="/images/hero-smile.png"
        alt="Smiling patient at Sultan Rahman Dental Clinic in Freetown"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/55 to-foreground/10"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 pt-28 pb-16 sm:px-6 lg:px-8 lg:pt-32">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-background/15 px-4 py-1.5 text-sm font-medium text-background ring-1 ring-background/25 backdrop-blur">
            <span className="flex h-2 w-2 rounded-full bg-success" />
            Now accepting new patients in Freetown
          </span>

          <h1 className="mt-6 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-background text-balance sm:text-5xl lg:text-6xl">
            Your Smile Deserves Expert Care in Freetown
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-background/85">
            Braces &bull; Whitening &bull; Implants &bull; General Dentistry &bull; Emergency Care
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" className="gap-2 text-base">
              <Link href="/book">
                <Calendar className="h-5 w-5" />
                Book Appointment
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="gap-2 text-base"
            >
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
                WhatsApp Now
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="gap-2 bg-emergency text-emergency-foreground text-base hover:bg-emergency/90"
            >
              <a href={clinic.emergencyHref}>
                <Phone className="h-5 w-5" />
                Emergency Care
              </a>
            </Button>
          </div>

          <ul className="mt-10 grid max-w-xl grid-cols-2 gap-x-6 gap-y-4">
            {trustItems.map((item) => (
              <li key={item.label} className="flex items-center gap-2.5 text-background/90">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-background/15 ring-1 ring-background/20 backdrop-blur">
                  <item.icon className="h-4 w-4 text-background" />
                </span>
                <span className="text-sm font-medium">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
