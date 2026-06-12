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

function maskUrl(url: string | undefined): string {
  if (!url) return "missing";
  try {
    const u = new URL(url);
    return `${u.protocol}//${u.username}:***@${u.hostname}:${u.port || '5432'}/${u.pathname.replace(/^\//, '')}`;
  } catch {
    return url;
  }
}

async function respondError(status: number, extra: Record<string, unknown>) {
  const body = safeStringify({
    ...extra,
    env: {
      DATABASE_URL: maskUrl(process.env.DATABASE_URL),
      BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET ? "set" : "missing",
      BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || "missing",
      RESEND_API_KEY: process.env.RESEND_API_KEY ? "set" : "missing",
      NODE_ENV: process.env.NODE_ENV || "not set",
    },
  });
  console.error("auth error:", body);
  return new Response(body, { status, headers: { "content-type": "application/json" } });
}

export async function POST(req: Request) {
  try {
    const { getAuth } = await import("@/lib/auth");
    const { auth, initError } = getAuth();
    if (!auth || initError) {
      return respondError(500, {
        error: "auth module failed to initialize",
        initError: initError?.message,
        stack: initError?.stack,
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
