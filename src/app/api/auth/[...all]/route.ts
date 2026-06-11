import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const runtime = "edge";

const handler = toNextJsHandler(auth);

async function handle(req: Request) {
  try {
    const method = req.method.toUpperCase();
    if (method === "POST") return await handler.POST(req);
    return await handler.GET(req);
  } catch (err) {
    const body = JSON.stringify({
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
    return new Response(body, {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}

export const POST = handle;
export const GET = handle;
