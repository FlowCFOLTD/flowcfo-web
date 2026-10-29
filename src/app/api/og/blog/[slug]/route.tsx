import { ImageResponse } from "next/og";
import { getEditorialPost } from "@/lib/blog";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getEditorialPost(slug);
  if (!post) return new Response("Not found", { status: 404 });

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "linear-gradient(135deg, #f8fcfa 0%, #eaf6f0 100%)", color: "#123e3b", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 66, height: 66, borderRadius: 20, background: "#123e3b", color: "#f5fbf8", fontSize: 36, fontWeight: 700 }}>F</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>FlowCFO <span style={{ color: "#087f75", fontSize: 20, fontWeight: 600 }}>BLOG</span></div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 1020 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#087f75", fontSize: 20, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>{post.category}</div>
        <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.1, letterSpacing: -2 }}>{post.title}</div>
        <div style={{ fontSize: 23, color: "#526760" }}>Clear, practical financial guidance for the decisions that matter.</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "2px solid #d2e5dc", paddingTop: 24, color: "#60766e", fontSize: 18, letterSpacing: 2 }}><span>FLOWCFO.NET/BLOG</span><span style={{ display: "flex", gap: 10 }}><i style={{ width: 16, height: 16, borderRadius: 8, background: "#087f75" }} /><i style={{ width: 10, height: 10, borderRadius: 5, background: "#c9ec88" }} /></span></div>
    </div>,
    { width: 1200, height: 630, headers: { "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400" } },
  );
}
