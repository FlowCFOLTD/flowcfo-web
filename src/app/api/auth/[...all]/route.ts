import { auth, initError } from "@/lib/auth";

const ALLOWED_ORIGINS = new Set([
  "https://flowcfo.net",
  "https://www.flowcfo.net",
  ...(process.env.NODE_ENV === "development"
    ? ["http://localhost:3002", "http://localhost:3000"]
    : []),
]);

function corsHeaders(req: Request) {
  const origin = req.headers.get("origin");
  const headers = new Headers({ Vary: "Origin" });
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Credentials", "true");
    headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    headers.set(
      "Access-Control-Allow-Headers",
      req.headers.get("access-control-request-headers") || "Content-Type, Authorization"
    );
    headers.append("Vary", "Access-Control-Request-Headers");
  }
  return headers;
}

function withCors(req: Request, response: Response) {
  const headers = new Headers(response.headers);
  corsHeaders(req).forEach((value, key) => {
    if (key.toLowerCase() === "vary" && headers.has("vary")) {
      headers.set("vary", `${headers.get("vary")}, ${value}`);
    } else {
      headers.set(key, value);
    }
  });
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");
  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return new Response(null, { status: 403, headers: corsHeaders(req) });
  }
  return new Response(null, { status: 204, headers: corsHeaders(req) });
}

export async function POST(req: Request) {
  try {
    if (!auth || initError) {
      return withCors(req, Response.json(
        { error: "auth module failed to initialize", detail: initError?.message },
        { status: 500 }
      ));
    }

    const { toNextJsHandler } = await import("better-auth/next-js");
    return withCors(req, await toNextJsHandler(auth).POST(req));
  } catch (err) {
    return withCors(req, Response.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    ));
  }
}

export async function GET(req: Request) {
  return POST(req);
}
