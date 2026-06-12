function safeStringify(v: unknown): string {
  try {
    const seen = new WeakSet();
    return JSON.stringify(v, (_, val) => {
      if (val !== null && typeof val === "object") {
        if (seen.has(val)) return "[Circular]";
        seen.add(val);
      }
      return val;
    });
  } catch {
    return String(v);
  }
}

async function dbTest() {
  try {
    const { default: pg } = await import("pg");
    const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, connectionTimeoutMillis: 5000 });
    const r = await pool.query("SELECT 1 AS ok");
    await pool.end();
    return { ok: true, rows: r.rows };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? `${e.name}: ${e.message}` : String(e), stack: e instanceof Error ? e.stack : undefined };
  }
}

async function respondError(status: number, extra: Record<string, unknown>) {
  const body = safeStringify({
    ...extra,
    env: {
      DATABASE_URL: process.env.DATABASE_URL ? "set" : "missing",
      BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET ? "set" : "missing",
      BETTER_AUTH_URL: process.env.BETTER_AUTH_URL ? "set" : "missing",
      RESEND_API_KEY: process.env.RESEND_API_KEY ? "set" : "missing",
    },
  });
  console.error("auth error:", body);
  return new Response(body, { status, headers: { "content-type": "application/json" } });
}

export async function POST(req: Request) {
  try {
    const { auth, pool: authPool } = await import("@/lib/auth");
    if (!auth) {
      const { initError: err } = await import("@/lib/auth");
      return respondError(500, {
        error: "auth module failed to initialize",
        initError: err?.message,
        stack: err?.stack,
      });
    }

    const { toNextJsHandler } = await import("better-auth/next-js");
    const resp = await toNextJsHandler(auth).POST(req);

    if (resp.status === 500) {
      let bodyText = "";
      try { bodyText = await resp.text(); } catch {}
      const db = await dbTest();
      return respondError(500, {
        detail: "BetterAuth returned 500",
        betterAuthBody: bodyText.slice(0, 1000),
        dbConnectionTest: db,
      });
    }

    return resp;
  } catch (err) {
    return respondError(500, {
      error: err instanceof Error ? `${err.name}: ${err.message}` : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
  }
}

export async function GET(req: Request) {
  return POST(req);
}
