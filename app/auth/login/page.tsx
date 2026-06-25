"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { Loader2, Lock, ShieldCheck, Terminal } from "lucide-react"
import { devSuperAdminLogin } from "@/app/auth/actions"
import { SUPER_ADMIN } from "@/lib/auth/super-admin"

const IS_DEV = process.env.NODE_ENV !== "production"

export default function StaffLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDevPending, startDevLogin] = useTransition()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      router.push("/dashboard")
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unable to sign in.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDevLogin = () => {
    setError(null)
    startDevLogin(async () => {
      const result = await devSuperAdminLogin()
      if (result?.error) setError(result.error)
    })
  }

  return (
    <main className="flex min-h-svh w-full items-center justify-center bg-secondary/40 p-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Lock className="h-6 w-6" />
          </span>
          <div>
            <h1 className="font-heading text-xl font-bold text-foreground">Staff Portal</h1>
            <p className="text-sm text-muted-foreground">Sultan Rahman Dental Clinic</p>
          </div>
        </div>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-5 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
        >
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="staff@sultanrahmandental.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="/auth/reset" className="text-xs text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
          )}
          <Button type="submit" className="w-full gap-2" disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
          <Link href="/" className="text-center text-xs text-muted-foreground hover:text-foreground">
            Back to website
          </Link>
        </form>

        {IS_DEV && (
          <div className="mt-6 flex flex-col gap-4 rounded-3xl border border-dashed border-primary/40 bg-primary/5 p-5">
            <div className="flex items-center gap-2 text-primary">
              <Terminal className="h-4 w-4" />
              <p className="text-xs font-bold uppercase tracking-wide">Development Only</p>
            </div>

            <Button
              type="button"
              variant="secondary"
              className="w-full gap-2"
              onClick={handleDevLogin}
              disabled={isDevPending}
            >
              {isDevPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
              {isDevPending ? "Signing in..." : "Enter Admin Dashboard (Development)"}
            </Button>

            <dl className="grid gap-1 text-xs text-foreground/80">
              <div className="flex justify-between gap-2">
                <dt className="text-muted-foreground">Name</dt>
                <dd className="font-medium">{SUPER_ADMIN.name}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-muted-foreground">Email</dt>
                <dd className="font-medium break-all">{SUPER_ADMIN.email}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-muted-foreground">Role</dt>
                <dd className="font-medium">Super Admin</dd>
              </div>
            </dl>

            <p className="text-[11px] leading-relaxed text-muted-foreground">
              Development use only. Set or reset the password through Supabase Auth
              {" "}(Authentication &rarr; Users), or use &ldquo;Forgot password?&rdquo; above. This panel and the
              shortcut never appear in production.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
