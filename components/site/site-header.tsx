'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, Phone, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
  SheetHeader,
} from '@/components/ui/sheet'
import { clinic, whatsappLink } from '@/lib/clinic-data'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/#services', label: 'Services' },
  { href: '/#gallery', label: 'Smile Gallery' },
  { href: '/tools', label: 'Smile Tools' },
  { href: '/#doctor', label: 'Meet the Doctor' },
  { href: '/#reviews', label: 'Reviews' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/#contact', label: 'Contact' },
]

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label={clinic.name}>
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
          <path d="M12 2c-1.6 0-2.5.8-4 .8S5.2 2 4 3C2.6 4.2 2.6 7 3.4 10.4c.5 2.2.7 4 1.3 6.5C5.3 19.4 6 22 7.4 22c1.2 0 1.5-1.7 2-3.4.5-1.7.9-2.6 2.6-2.6s2.1.9 2.6 2.6c.5 1.7.8 3.4 2 3.4 1.4 0 2.1-2.6 2.7-5.1.6-2.5.8-4.3 1.3-6.5C23.4 7 23.4 4.2 22 3c-1.2-1-2.5-.2-4-.2s-2.4-.8-4-.8z" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-heading text-base font-extrabold tracking-tight text-foreground">
          Sultan Rahman
        </span>
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Dental Clinic
        </span>
      </span>
    </Link>
  )
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-border bg-background/85 backdrop-blur-md'
          : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="ghost" size="sm" className="gap-2">
            <a href={clinic.phoneHref}>
              <Phone className="h-4 w-4" />
              <span className="hidden xl:inline">{clinic.phone}</span>
            </a>
          </Button>
          <Button asChild size="sm" className="gap-2">
            <Link href="/book">Book Appointment</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Button asChild size="sm" className="gap-1.5">
            <Link href="/book">Book</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88%] max-w-sm">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-4 flex flex-col gap-1 px-4">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="rounded-lg px-3 py-3 text-base font-medium text-foreground/90 transition-colors hover:bg-secondary"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-2 p-4">
                <Button asChild className="w-full">
                  <Link href="/book">Book Appointment</Link>
                </Button>
                <Button asChild variant="outline" className="w-full gap-2">
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp Now
                  </a>
                </Button>
                <Button asChild variant="ghost" className="w-full gap-2">
                  <a href={clinic.phoneHref}>
                    <Phone className="h-4 w-4" />
                    {clinic.phone}
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
