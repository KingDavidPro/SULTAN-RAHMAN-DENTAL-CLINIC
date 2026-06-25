"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState, useTransition } from "react"
import { Loader2, Mail, CheckCircle2 } from "lucide-react"
import { sendPasswordReset } from "@/app/auth/actions"

export default function ResetPasswordPage() {
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (formData: FormData) => {
    setError(null)
    startTransition(async () => {
      const result = await sendPasswordReset(formData)
      if (result?.error) setError(result.error)
      else setSent(true)
    })
  }

  return (
    <main className="flex min-h-svh w-full items-center justify-center bg-secondary/40 p-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Mail className="h-6 w-6" />
          </span>
          <div>
            <h1 className="font-heading text-xl font-bold text-foreground">Reset password</h1>
            <p className="text-sm text-muted-foreground">We&apos;ll email you a secure link to set a new password.</p>
          </div>
        </div>

        {sent ? (
          <div className="flex flex-col items-center gap-4 rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
            <CheckCircle2 className="h-10 w-10 text-primary" />
            <p className="text-sm text-foreground">
              If an account exists for that email, a password setup link is on its way. Check your inbox.
            </p>
            <Link href="/auth/login" className="text-sm text-primary hover:underline">
              Back to sign in
            </Link>
          </div>
        ) : (
          <form
            action={handleSubmit}
            className="flex flex-col gap-5 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
          >
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required />
            </div>
            {error && (
              <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
            )}
            <Button type="submit" className="w-full gap-2" disabled={isPending}>
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {isPending ? "Sending..." : "Send reset link"}
            </Button>
            <Link href="/auth/login" className="text-center text-xs text-muted-foreground hover:text-foreground">
              Back to sign in
            </Link>
          </form>
        )}
      </div>
    </main>
  )
}
