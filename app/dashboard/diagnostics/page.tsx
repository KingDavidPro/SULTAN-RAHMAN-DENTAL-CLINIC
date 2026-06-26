import type { Metadata } from "next"
import { runDiagnostics } from "@/lib/supabase/diagnostics"
import {
  Database,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  ShieldOff,
  Link2,
  KeyRound,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Connection Diagnostics",
  robots: { index: false, follow: false },
}

// Always read live values; never cache.
export const dynamic = "force-dynamic"

export default async function DiagnosticsPage() {
  const result = await runDiagnostics()

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-bold text-foreground">Supabase Connection Diagnostics</h1>
        <p className="text-sm text-muted-foreground">
          Live verification of which Supabase project and database this deployment is using.
        </p>
      </header>

      {/* Connection verdict */}
      {result.isManagedProject ? (
        <div className="flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/10 p-4">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
          <div className="text-sm">
            <p className="font-semibold text-destructive">Connected to the auto-created project</p>
            <p className="text-foreground/80">
              This deployment is pointing at the Vercel-provisioned Supabase project
              {" "}
              <code className="rounded bg-background px-1 py-0.5">{result.projectRef}</code>, not your existing
              database. Update the Supabase environment variables in Settings to your existing project, then reload
              this page.
            </p>
          </div>
        </div>
      ) : result.ok ? (
        <div className="flex items-start gap-3 rounded-2xl border border-primary/30 bg-primary/10 p-4">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div className="text-sm">
            <p className="font-semibold text-foreground">Connected to your existing database</p>
            <p className="text-foreground/80">
              This deployment is using project{" "}
              <code className="rounded bg-background px-1 py-0.5">{result.projectRef}</code>, which is not the
              auto-created project. Tables, auth, and policies below come from this database.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/10 p-4">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
          <div className="text-sm">
            <p className="font-semibold text-destructive">Could not connect to the database</p>
            <p className="text-foreground/80">{result.error}</p>
          </div>
        </div>
      )}

      {/* Connection details */}
      <section className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center gap-2">
          <Database className="h-4.5 w-4.5 text-primary" />
          <h2 className="font-heading text-sm font-bold text-foreground">Connection</h2>
        </div>
        <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
          <DetailRow label="Project URL" value={result.projectUrl ?? "—"} mono />
          <DetailRow label="Project Ref" value={result.projectRef ?? "—"} mono />
          <DetailRow label="Database Host" value={result.host ?? "—"} mono />
          <DetailRow label="Database Name" value={result.database ?? "—"} mono />
          <DetailRow label="Postgres Version" value={result.serverVersion?.split(" on ")[0] ?? "—"} />
          <DetailRow
            label="Auth Users"
            value={result.authUserCount === null ? "—" : String(result.authUserCount)}
          />
        </dl>
      </section>

      {/* Tables */}
      <section className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="h-4.5 w-4.5 text-primary" />
            <h2 className="font-heading text-sm font-bold text-foreground">
              Tables ({result.tables.length})
            </h2>
          </div>
        </div>

        {result.tables.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No tables found in the <code className="rounded bg-secondary px-1">public</code> schema.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="py-2 pr-4 font-medium">Table</th>
                  <th className="py-2 pr-4 font-medium">Rows (est.)</th>
                  <th className="py-2 pr-4 font-medium">RLS</th>
                  <th className="py-2 font-medium">Policies</th>
                </tr>
              </thead>
              <tbody>
                {result.tables.map((t) => (
                  <tr key={t.name} className="border-b border-border/60 last:border-0">
                    <td className="py-2.5 pr-4 font-mono text-foreground">{t.name}</td>
                    <td className="py-2.5 pr-4 text-foreground/80">{t.rowEstimate}</td>
                    <td className="py-2.5 pr-4">
                      {t.rlsEnabled ? (
                        <span className="inline-flex items-center gap-1 text-primary">
                          <ShieldCheck className="h-4 w-4" /> On
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-destructive">
                          <ShieldOff className="h-4 w-4" /> Off
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 text-foreground/80">{t.policyCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Relationships */}
      <section className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center gap-2">
          <Link2 className="h-4.5 w-4.5 text-primary" />
          <h2 className="font-heading text-sm font-bold text-foreground">
            Relationships ({result.relationships.length})
          </h2>
        </div>
        {result.relationships.length === 0 ? (
          <p className="text-sm text-muted-foreground">No foreign-key relationships found.</p>
        ) : (
          <ul className="flex flex-col gap-2 text-sm">
            {result.relationships.map((r, i) => (
              <li key={i} className="flex flex-wrap items-center gap-1.5 font-mono text-foreground/80">
                <span className="text-foreground">{r.fromTable}.{r.fromColumn}</span>
                <KeyRound className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-foreground">{r.toTable}.{r.toColumn}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

function DetailRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className={`break-all text-sm text-foreground ${mono ? "font-mono" : ""}`}>{value}</dd>
    </div>
  )
}
