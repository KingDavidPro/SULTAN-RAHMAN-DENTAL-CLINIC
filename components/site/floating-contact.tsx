'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MessageCircle, Phone, Calendar, X, Plus } from 'lucide-react'
import { clinic, whatsappLink } from '@/lib/clinic-data'
import { cn } from '@/lib/utils'

export function FloatingContact() {
  const [open, setOpen] = useState(false)

  const actions = [
    {
      label: 'WhatsApp Now',
      href: whatsappLink(),
      external: true,
      icon: MessageCircle,
      className: 'bg-success text-success-foreground',
    },
    {
      label: 'Call Clinic',
      href: clinic.phoneHref,
      external: false,
      icon: Phone,
      className: 'bg-card text-foreground ring-1 ring-border',
    },
    {
      label: 'Book Appointment',
      href: '/book',
      external: false,
      icon: Calendar,
      className: 'bg-primary text-primary-foreground',
    },
  ]

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <div
        className={cn(
          'flex flex-col items-end gap-2.5 transition-all duration-300',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none translate-y-2 opacity-0',
        )}
      >
        {actions.map((a) => {
          const content = (
            <>
              <span className="text-sm font-semibold">{a.label}</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-background/20">
                <a.icon className="h-4 w-4" />
              </span>
            </>
          )
          const classes = cn(
            'flex items-center gap-2.5 rounded-full py-1.5 pl-4 pr-1.5 shadow-lg transition-transform hover:scale-105',
            a.className,
          )
          return a.external ? (
            <a key={a.label} href={a.href} target="_blank" rel="noopener noreferrer" className={classes}>
              {content}
            </a>
          ) : a.href.startsWith('/') ? (
            <Link key={a.label} href={a.href} className={classes} onClick={() => setOpen(false)}>
              {content}
            </Link>
          ) : (
            <a key={a.label} href={a.href} className={classes}>
              {content}
            </a>
          )
        })}
      </div>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close contact menu' : 'Open contact menu'}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-transform hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
      </button>
    </div>
  )
}
