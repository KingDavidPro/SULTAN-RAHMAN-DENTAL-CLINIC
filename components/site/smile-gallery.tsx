'use client'

import { useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { Clock, MoveHorizontal } from 'lucide-react'
import { SectionHeading } from '@/components/site/section-heading'
import {
  galleryCases,
  galleryCategories,
  type GalleryCase,
} from '@/lib/clinic-data'
import { cn } from '@/lib/utils'

function BeforeAfter({ item }: { item: GalleryCase }) {
  const [pos, setPos] = useState(50)
  const ref = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const update = useCallback((clientX: number) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const next = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.min(100, Math.max(0, next)))
  }, [])

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div
        ref={ref}
        className="relative aspect-[4/3] w-full cursor-ew-resize select-none touch-none"
        onPointerDown={(e) => {
          dragging.current = true
          ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
          update(e.clientX)
        }}
        onPointerMove={(e) => dragging.current && update(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerLeave={() => (dragging.current = false)}
      >
        <Image
          src={item.after || '/placeholder.svg'}
          alt={`After ${item.treatment}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        <span className="absolute right-3 top-3 z-10 rounded-full bg-success px-2.5 py-1 text-xs font-semibold text-success-foreground">
          After
        </span>

        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Image
            src={item.before || '/placeholder.svg'}
            alt={`Before ${item.treatment}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <span className="absolute left-3 top-3 rounded-full bg-foreground/80 px-2.5 py-1 text-xs font-semibold text-background">
            Before
          </span>
        </div>

        <div
          className="absolute inset-y-0 flex w-0.5 items-center justify-center bg-background"
          style={{ left: `${pos}%` }}
        >
          <span className="flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-background text-primary shadow-lg ring-1 ring-border">
            <MoveHorizontal className="h-4 w-4" />
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-heading text-base font-bold">{item.treatment}</h3>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
            <Clock className="h-3.5 w-3.5" />
            {item.duration}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
      </div>
    </div>
  )
}

export function SmileGallery() {
  const [active, setActive] = useState<(typeof galleryCategories)[number]>('All')
  const filtered =
    active === 'All' ? galleryCases : galleryCases.filter((c) => c.category === active)

  return (
    <section id="gallery" className="scroll-mt-20 bg-secondary/40 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Smile Transformations"
          title="Real results from real patients"
          description="Drag the slider on each case to reveal the before-and-after transformation."
        />

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                active === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background text-foreground/80 ring-1 ring-border hover:bg-secondary',
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {filtered.map((item) => (
            <BeforeAfter key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
