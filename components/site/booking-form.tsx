'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, ChevronLeft, ChevronRight, Loader2, CalendarCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  clinic,
  services,
  dentists,
  timeSlots,
  dentalConcerns,
} from '@/lib/clinic-data'
import { cn } from '@/lib/utils'

type FormState = {
  fullName: string
  phone: string
  whatsapp: string
  email: string
  date: string
  time: string
  branch: string
  service: string
  dentist: string
  firstVisit: string
  concerns: string[]
  allergies: string
  medication: string
  diabetes: boolean
  pregnancy: boolean
  highBloodPressure: boolean
  notes: string
  consentContact: boolean
  consentAssessment: boolean
}

const initial: FormState = {
  fullName: '',
  phone: '',
  whatsapp: '',
  email: '',
  date: '',
  time: '',
  branch: clinic.branches[0],
  service: '',
  dentist: 'No preference',
  firstVisit: 'Yes',
  concerns: [],
  allergies: '',
  medication: '',
  diabetes: false,
  pregnancy: false,
  highBloodPressure: false,
  notes: '',
  consentContact: false,
  consentAssessment: false,
}

const steps = ['Your details', 'Appointment', 'Health', 'Confirm']

export function BookingForm() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormState>(initial)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const toggleConcern = (c: string) =>
    setForm((f) => ({
      ...f,
      concerns: f.concerns.includes(c)
        ? f.concerns.filter((x) => x !== c)
        : [...f.concerns, c],
    }))

  const canProceed = () => {
    if (step === 0) return form.fullName.trim() && form.phone.trim()
    if (step === 1) return form.date && form.time && form.service
    if (step === 3) return form.consentContact && form.consentAssessment
    return true
  }

  const submit = async () => {
    setStatus('submitting')
    setError(null)
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }
      setStatus('success')
    } catch (e) {
      setStatus('error')
      setError(e instanceof Error ? e.message : 'Something went wrong.')
    }
  }

  if (status === 'success') {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
          <CheckCircle2 className="h-9 w-9" />
        </span>
        <h2 className="mt-5 font-heading text-2xl font-bold">Appointment requested!</h2>
        <p className="mt-2 text-muted-foreground">
          Thank you, {form.fullName.split(' ')[0] || 'there'}. We&apos;ve received your request for{' '}
          <span className="font-medium text-foreground">{form.service}</span> on{' '}
          <span className="font-medium text-foreground">{form.date}</span> at{' '}
          <span className="font-medium text-foreground">{form.time}</span>. Our team will contact
          you shortly to confirm.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button asChild>
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      <ol className="flex items-center justify-between">
        {steps.map((label, i) => (
          <li key={label} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-colors',
                  i < step
                    ? 'bg-success text-success-foreground'
                    : i === step
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-muted-foreground',
                )}
              >
                {i < step ? <CheckCircle2 className="h-5 w-5" /> : i + 1}
              </span>
              <span
                className={cn(
                  'hidden text-xs font-medium sm:block',
                  i === step ? 'text-foreground' : 'text-muted-foreground',
                )}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <span
                className={cn(
                  'mx-2 h-0.5 flex-1 rounded',
                  i < step ? 'bg-success' : 'bg-border',
                )}
              />
            )}
          </li>
        ))}
      </ol>

      <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
        {step === 0 && (
          <div className="grid gap-5">
            <h2 className="font-heading text-xl font-bold">Patient information</h2>
            <div className="grid gap-1.5">
              <Label htmlFor="fullName">Full name *</Label>
              <Input id="fullName" value={form.fullName} onChange={(e) => set('fullName', e.target.value)} placeholder="Aminata Kamara" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="phone">Phone number *</Label>
                <Input id="phone" type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+232 ..." />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="whatsapp">WhatsApp number</Label>
                <Input id="whatsapp" type="tel" value={form.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} placeholder="+232 ..." />
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@example.com" />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-5">
            <h2 className="font-heading text-xl font-bold">Appointment details</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="date">Preferred date *</Label>
                <Input id="date" type="date" value={form.date} onChange={(e) => set('date', e.target.value)} />
              </div>
              <div className="grid gap-1.5">
                <Label>Preferred time *</Label>
                <Select value={form.time} onValueChange={(v) => set('time', v)}>
                  <SelectTrigger><SelectValue placeholder="Select a time" /></SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label>Service *</Label>
              <Select value={form.service} onValueChange={(v) => set('service', v)}>
                <SelectTrigger><SelectValue placeholder="Choose a service" /></SelectTrigger>
                <SelectContent>
                  {services.map((s) => <SelectItem key={s.slug} value={s.title}>{s.title}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label>Branch</Label>
                <Select value={form.branch} onValueChange={(v) => set('branch', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {clinic.branches.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <Label>Preferred dentist</Label>
                <Select value={form.dentist} onValueChange={(v) => set('dentist', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {dentists.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label>Is this your first visit?</Label>
              <div className="flex gap-2">
                {['Yes', 'No'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => set('firstVisit', opt)}
                    className={cn(
                      'flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors',
                      form.firstVisit === opt
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-background text-muted-foreground hover:bg-secondary',
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Dental concerns</Label>
              <div className="flex flex-wrap gap-2">
                {dentalConcerns.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => toggleConcern(c)}
                    className={cn(
                      'rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
                      form.concerns.includes(c)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-background text-muted-foreground hover:bg-secondary',
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-5">
            <h2 className="font-heading text-xl font-bold">Medical information</h2>
            <p className="text-sm text-muted-foreground">
              This helps us keep you safe. All information is confidential.
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="allergies">Allergies</Label>
                <Input id="allergies" value={form.allergies} onChange={(e) => set('allergies', e.target.value)} placeholder="e.g. Penicillin" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="medication">Current medication</Label>
                <Input id="medication" value={form.medication} onChange={(e) => set('medication', e.target.value)} placeholder="e.g. None" />
              </div>
            </div>
            <div className="grid gap-3">
              <Label>Do any of these apply?</Label>
              {([
                ['diabetes', 'Diabetes'],
                ['pregnancy', 'Pregnancy'],
                ['highBloodPressure', 'High blood pressure'],
              ] as const).map(([key, label]) => (
                <label key={key} className="flex items-center gap-3 rounded-xl border border-border bg-background p-3.5 text-sm">
                  <Checkbox
                    checked={form[key] as boolean}
                    onCheckedChange={(v) => set(key, Boolean(v))}
                  />
                  {label}
                </label>
              ))}
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="notes">Anything else we should know?</Label>
              <Textarea id="notes" rows={4} value={form.notes} onChange={(e) => set('notes', e.target.value)} placeholder="Describe your symptoms or concerns..." />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-5">
            <h2 className="font-heading text-xl font-bold">Review &amp; confirm</h2>
            <dl className="grid gap-3 rounded-2xl bg-secondary/50 p-5 text-sm">
              {[
                ['Name', form.fullName || '\u2014'],
                ['Phone', form.phone || '\u2014'],
                ['Service', form.service || '\u2014'],
                ['Date & time', form.date ? `${form.date} at ${form.time}` : '\u2014'],
                ['Branch', form.branch],
                ['Dentist', form.dentist],
                ['Concerns', form.concerns.length ? form.concerns.join(', ') : 'None'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="text-right font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="grid gap-3">
              <label className="flex items-start gap-3 text-sm">
                <Checkbox className="mt-0.5" checked={form.consentContact} onCheckedChange={(v) => set('consentContact', Boolean(v))} />
                I consent to being contacted about my appointment by phone, WhatsApp, or email.
              </label>
              <label className="flex items-start gap-3 text-sm">
                <Checkbox className="mt-0.5" checked={form.consentAssessment} onCheckedChange={(v) => set('consentAssessment', Boolean(v))} />
                I understand that online assessments are not a diagnosis and a consultation is required.
              </label>
            </div>
            {error && (
              <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>
            )}
          </div>
        )}

        <div className="mt-8 flex items-center justify-between gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0 || status === 'submitting'}
            className="gap-1.5"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>

          {step < steps.length - 1 ? (
            <Button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              disabled={!canProceed()}
              className="gap-1.5"
            >
              Continue
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={submit}
              disabled={!canProceed() || status === 'submitting'}
              className="gap-2"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <CalendarCheck className="h-4 w-4" />
                  Confirm booking
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
