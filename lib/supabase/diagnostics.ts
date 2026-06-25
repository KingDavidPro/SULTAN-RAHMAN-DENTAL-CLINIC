import "server-only"
import { Client } from "pg"

// The Supabase project that the v0 integration auto-provisioned.
// If the live connection still points here, the app is NOT using the
// user's existing database.
const MANAGED_PROJECT_REF = "rzzbqcungtijqitntcim"

export type TableInfo = {
  name: string
  rowEstimate: number
  rlsEnabled: boolean
  policyCount: number
}

export type RelationshipInfo = {
  fromTable: string
  fromColumn: string
  toTable: string
  toColumn: string
}

export type DiagnosticsResult = {
  ok: boolean
  error?: string
  projectRef: string | null
  projectUrl: string | null
  host: string | null
  database: string | null
  isManagedProject: boolean
  serverVersion: string | null
  tables: TableInfo[]
  relationships: RelationshipInfo[]
  authUserCount: number | null
}

function deriveRef(url: string | undefined): string | null {
  if (!url) return null
  const match = url.match(/https?:\/\/([a-z0-9]+)\.supabase\.co/i)
  return match ? match[1] : null
}

function connectionString(): string | undefined {
  // Prefer the direct (non-pooling) connection for schema introspection.
  const raw =
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL
  if (!raw) return undefined

  // Strip sslmode/ssl query params so they don't override the explicit
  // `ssl` client option below. Supabase presents a cert chain that node's
  // default verifier rejects; we handle TLS via the ssl option instead.
  try {
    const u = new URL(raw)
    u.searchParams.delete("sslmode")
    u.searchParams.delete("ssl")
    return u.toString()
  } catch {
    return raw.replace(/[?&]sslmode=[^&]*/gi, "").replace(/[?&]ssl=[^&]*/gi, "")
  }
}

export async function runDiagnostics(): Promise<DiagnosticsResult> {
  const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? null
  const projectRef = deriveRef(process.env.NEXT_PUBLIC_SUPABASE_URL)

  const base: DiagnosticsResult = {
    ok: false,
    projectRef,
    projectUrl,
    host: process.env.POSTGRES_HOST ?? null,
    database: process.env.POSTGRES_DATABASE ?? null,
    isManagedProject: projectRef === MANAGED_PROJECT_REF,
    serverVersion: null,
    tables: [],
    relationships: [],
    authUserCount: null,
  }

  const connStr = connectionString()
  if (!connStr) {
    return { ...base, error: "No POSTGRES_* connection string is configured." }
  }

  const client = new Client({
    connectionString: connStr,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 8000,
  })

  try {
    await client.connect()

    const versionRes = await client.query<{ version: string }>("select version()")
    const serverVersion = versionRes.rows[0]?.version ?? null

    // Tables in the public schema with RLS flag and row estimates.
    const tablesRes = await client.query<{
      table_name: string
      rls_enabled: boolean
      row_estimate: string
    }>(`
      select
        c.relname as table_name,
        c.relrowsecurity as rls_enabled,
        coalesce(c.reltuples, 0)::bigint as row_estimate
      from pg_class c
      join pg_namespace n on n.oid = c.relnamespace
      where n.nspname = 'public' and c.relkind = 'r'
      order by c.relname
    `)

    // Policy counts per table.
    const policiesRes = await client.query<{ tablename: string; count: string }>(`
      select tablename, count(*)::int as count
      from pg_policies
      where schemaname = 'public'
      group by tablename
    `)
    const policyMap = new Map(policiesRes.rows.map((r) => [r.tablename, Number(r.count)]))

    const tables: TableInfo[] = tablesRes.rows.map((r) => ({
      name: r.table_name,
      rowEstimate: Number(r.row_estimate),
      rlsEnabled: r.rls_enabled,
      policyCount: policyMap.get(r.table_name) ?? 0,
    }))

    // Foreign-key relationships within the public schema.
    const fkRes = await client.query<{
      from_table: string
      from_column: string
      to_table: string
      to_column: string
    }>(`
      select
        tc.table_name as from_table,
        kcu.column_name as from_column,
        ccu.table_name as to_table,
        ccu.column_name as to_column
      from information_schema.table_constraints tc
      join information_schema.key_column_usage kcu
        on tc.constraint_name = kcu.constraint_name and tc.table_schema = kcu.table_schema
      join information_schema.constraint_column_usage ccu
        on ccu.constraint_name = tc.constraint_name and ccu.table_schema = tc.table_schema
      where tc.constraint_type = 'FOREIGN KEY' and tc.table_schema = 'public'
      order by from_table, from_column
    `)
    const relationships: RelationshipInfo[] = fkRes.rows.map((r) => ({
      fromTable: r.from_table,
      fromColumn: r.from_column,
      toTable: r.to_table,
      toColumn: r.to_column,
    }))

    // Count of registered auth users (proves which auth store is connected).
    let authUserCount: number | null = null
    try {
      const authRes = await client.query<{ count: string }>("select count(*)::int as count from auth.users")
      authUserCount = Number(authRes.rows[0]?.count ?? 0)
    } catch {
      authUserCount = null
    }

    return {
      ...base,
      ok: true,
      serverVersion,
      tables,
      relationships,
      authUserCount,
    }
  } catch (err) {
    return {
      ...base,
      error: err instanceof Error ? err.message : "Failed to connect to the database.",
    }
  } finally {
    await client.end().catch(() => {})
  }
}
