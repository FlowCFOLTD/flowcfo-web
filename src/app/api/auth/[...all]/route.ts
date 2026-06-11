export async function POST(req: Request) {
  try {
    const { auth } = await import("@/lib/auth");
    if (!auth) {
      const { initError: err } = await import("@/lib/auth");
      return new Response(
        JSON.stringify({
          error: "auth module failed to initialize",
          initError: err?.message,
          stack: err?.stack,
          env: {
            NODE_ENV: process.env.NODE_ENV,
            DATABASE_URL: process.env.DATABASE_URL ? "set" : "missing",
            BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET ? "set" : "missing",
            BETTER_AUTH_URL: process.env.BETTER_AUTH_URL ? "set" : "missing",
          },
        }),
        { status: 500, headers: { "content-type": "application/json" } },
      );
    }
    const { toNextJsHandler } = await import("better-auth/next-js");
    return await toNextJsHandler(auth).POST(req);
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? `${err.name}: ${err.message}` : String(err),
        stack: err instanceof Error ? err.stack : undefined,
        env: {
          NODE_ENV: process.env.NODE_ENV,
          DATABASE_URL: process.env.DATABASE_URL ? "set" : "missing",
          BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET ? "set" : "missing",
          BETTER_AUTH_URL: process.env.BETTER_AUTH_URL ? "set" : "missing",
        },
      }),
      { status: 500, headers: { "content-type": "application/json" } },
    );
  }
}

export async function GET(req: Request) {
  return POST(req);
}
