"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import {
  Upload,
  Loader2,
  Sparkles,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

type Analysis = {
  overallImpression: string
  observations: { area: string; finding: string }[]
  suggestedServices: string[]
  recommendation: string
  isLikelyTeethPhoto: boolean
}

export function SmileAnalyzer() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle")
  const [result, setResult] = useState<Analysis | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file.")
      return
    }
    if (file.size > 8 * 1024 * 1024) {
      setError("Please upload an image smaller than 8MB.")
      return
    }
    setError(null)
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result as string
      setPreview(dataUrl)
      analyze(dataUrl)
    }
    reader.readAsDataURL(file)
  }

  const analyze = async (image: string) => {
    setStatus("loading")
    setResult(null)
    setError(null)
    try {
      const res = await fetch("/api/smile-analyzer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Something went wrong.")
      setResult(data as Analysis)
      setStatus("done")
    } catch (e) {
      setStatus("error")
      setError(e instanceof Error ? e.message : "Something went wrong.")
    }
  }

  const reset = () => {
    setPreview(null)
    setResult(null)
    setError(null)
    setStatus("idle")
    if (inputRef.current) inputRef.current.value = ""
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
        />

        {!preview && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-secondary/40 px-6 py-14 text-center transition-colors hover:border-primary/50 hover:bg-secondary"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Upload className="h-7 w-7" />
            </span>
            <span className="font-heading text-lg font-bold text-foreground">Upload a smile photo</span>
            <span className="max-w-sm text-sm text-muted-foreground">
              Take a clear, well-lit photo of your smile or teeth. We&apos;ll share general observations and
              relevant services. JPG or PNG, up to 8MB.
            </span>
          </button>
        )}

        {preview && (
          <div className="grid gap-6">
            <div className="relative overflow-hidden rounded-2xl border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview || "/placeholder.svg"} alt="Your uploaded smile" className="h-56 w-full object-cover" />
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={reset}
                className="absolute right-3 top-3 gap-1.5"
              >
                <RotateCcw className="h-4 w-4" />
                New photo
              </Button>
            </div>

            {status === "loading" && (
              <div className="flex items-center justify-center gap-2.5 rounded-2xl bg-secondary/50 py-8 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                Analyzing your smile...
              </div>
            )}

            {status === "error" && (
              <p className="flex items-center gap-2 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
                <AlertTriangle className="h-4 w-4" />
                {error}
              </p>
            )}

            {status === "done" && result && (
              <div className="grid gap-5">
                {!result.isLikelyTeethPhoto ? (
                  <p className="flex items-center gap-2 rounded-xl bg-accent/40 px-4 py-3 text-sm text-foreground">
                    <AlertTriangle className="h-4 w-4 shrink-0" />
                    We couldn&apos;t clearly detect a smile in that photo. Try a closer, well-lit shot of your
                    teeth.
                  </p>
                ) : (
                  <>
                    <div className="rounded-2xl bg-primary/5 p-5">
                      <p className="flex items-center gap-2 text-sm font-semibold text-primary">
                        <Sparkles className="h-4 w-4" />
                        Overall impression
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-foreground">
                        {result.overallImpression}
                      </p>
                    </div>

                    <div className="grid gap-3">
                      {result.observations.map((o) => (
                        <div key={o.area} className="rounded-xl border border-border p-4">
                          <p className="text-sm font-semibold text-foreground">{o.area}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{o.finding}</p>
                        </div>
                      ))}
                    </div>

                    {result.suggestedServices.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold text-foreground">Services that may help</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {result.suggestedServices.map((s) => (
                            <span
                              key={s}
                              className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm font-medium text-foreground"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <p className="rounded-xl bg-secondary/50 p-4 text-sm leading-relaxed text-muted-foreground">
                      {result.recommendation}
                    </p>
                  </>
                )}

                <Button asChild className="gap-2">
                  <Link href="/book">
                    Book a consultation
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        This tool provides general, non-diagnostic information only and is not a substitute for a professional
        dental examination.
      </p>
    </div>
  )
}
