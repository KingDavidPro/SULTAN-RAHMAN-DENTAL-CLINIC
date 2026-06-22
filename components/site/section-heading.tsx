import { cn } from '@/lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: 'center' | 'left'
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl text-left',
        className,
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            'inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary',
            align === 'center' && 'justify-center',
          )}
        >
          <span className="h-px w-6 bg-primary/40" aria-hidden="true" />
          {eyebrow}
          {align === 'center' ? (
            <span className="h-px w-6 bg-primary/40" aria-hidden="true" />
          ) : null}
        </span>
      ) : null}
      <h2 className="font-heading text-3xl font-medium leading-[1.1] tracking-tight text-foreground text-balance sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description ? (
        <p className="text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  )
}
