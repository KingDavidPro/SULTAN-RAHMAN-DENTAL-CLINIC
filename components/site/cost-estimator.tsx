"use client"

import { useState } from "react"
import Link from "next/link"
import { Loader2, Calculator, AlertTriangle, ArrowRight, Receipt } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { dentalConcerns } from "@/lib/clinic-data"

type Estimate = {
  summary: string
  lineItems: { service: string; priceRange: string; reason: string }[]
  estimatedTotalRange: string
  notes: string
}

export function CostEstimator() {
  const [concern, setConcern] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle")
  const [result, setResult] = useState<Estimate | null>(null)
  const [error, setError] = useState<string | null>(null)

  const estimate = async (text: string) => {
    const value = text.trim()
    if (!value || status === "loading") return
    setStatus("loading")
    setResult(null)
    setError(null)
    try {
      const res = await fetch("/api/cost-estimator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ concern: value }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Something went wrong.")
      setResult(data as Estimate)
      setStatus("done")
    } catch (e) {
      setStatus("error")
      setError(e instanceof Error ? e.message : "Something went wrong.")
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="grid gap-2">
          <label htmlFor="concern" className="text-sm font-semibold text-foreground">
            Describe what you need
          </label>
          <Textarea
            id="concern"
            rows={3}
            value={concern}
            onChange={(e) => setConcern(e.target.value)}
            placeholder="e.g. My front teeth are stained and slightly crooked, and I'd like a brighter, straighter smile."
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {dentalConcerns.slice(0, 6).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setConcern((prev) => (prev ? `${prev}, ${c.toLowerCase()}` : c))}
              className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              + {c}
            </button>
          ))}
        </div>

        <Button
          type="button"
          onClick={() => estimate(concern)}
          disabled={status === "loading" || !concern.trim()}
          className="mt-4 w-full gap-2"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Estimating...
            </>
          ) : (
            <>
              <Calculator className="h-4 w-4" />
              Estimate my cost
            </>
          )}
        </Button>

        {status === "error" && (
          <p className="mt-4 flex items-center gap-2 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
            <AlertTriangle className="h-4 w-4" />
            {error}
          </p>
        )}

        {status === "done" && result && (
          <div className="mt-6 grid gap-5">
            <p className="text-sm leading-relaxed text-foreground">{result.summary}</p>

            <div className="grid gap-3">
              {result.lineItems.map((item) => (
                <div key={item.service} className="rounded-xl border border-border p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-semibold text-foreground">{item.service}</p>
                    <p className="shrink-0 font-mono text-sm font-semibold text-primary">{item.priceRange}</p>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{item.reason}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between gap-3 rounded-2xl bg-primary/5 p-5">
              <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Receipt className="h-4 w-4 text-primary" />
                Estimated total
              </span>
              <span className="font-heading text-lg font-bold text-primary">{result.estimatedTotalRange}</span>
            </div>

            <p className="rounded-xl bg-secondary/50 p-4 text-sm leading-relaxed text-muted-foreground">
              {result.notes}
            </p>

            <Button asChild className="gap-2">
              <Link href="/book">
                Book a consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        Estimates are approximate and based on typical price ranges. Your exact cost is confirmed during an
        in-person consultation.
      </p>
    </div>
  )
}
