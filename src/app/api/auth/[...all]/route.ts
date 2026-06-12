import { auth, initError } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    if (!auth || initError) {
      return Response.json(
        { error: "auth module failed to initialize", detail: initError?.message },
        { status: 500 }
      );
    }

    const { toNextJsHandler } = await import("better-auth/next-js");
    return toNextJsHandler(auth).POST(req);
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  return POST(req);
}
