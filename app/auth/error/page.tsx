import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AuthErrorPage() {
  return (
    <main className="flex min-h-svh w-full items-center justify-center bg-secondary/40 p-6">
      <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
          <AlertTriangle className="h-6 w-6" />
        </span>
        <div>
          <h1 className="font-heading text-xl font-bold text-foreground">Link expired or invalid</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            This sign-in or reset link is no longer valid. Please request a new one.
          </p>
        </div>
        <div className="flex w-full flex-col gap-2">
          <Button asChild className="w-full">
            <Link href="/auth/reset">Request new link</Link>
          </Button>
          <Button asChild variant="ghost" className="w-full">
            <Link href="/auth/login">Back to sign in</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
