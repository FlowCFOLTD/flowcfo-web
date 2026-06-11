export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { auth } = await import("@/lib/auth");
    const { toNextJsHandler } = await import("better-auth/next-js");
    const handler = toNextJsHandler(auth);
    return await handler.POST(req);
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? `${err.name}: ${err.message}` : String(err),
        stack: err instanceof Error ? err.stack : undefined,
      }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}

export async function GET(req: Request) {
  return POST(req);
}
