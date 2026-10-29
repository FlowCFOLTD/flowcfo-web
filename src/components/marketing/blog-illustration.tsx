const paletteByVariant: Record<string, { wash: string; ink: string; accent: string; pale: string }> = {
  "cash-vs-profit": { wash: "#eaf6f0", ink: "#155d53", accent: "#e9a83d", pale: "#b9e1d1" },
  forecast: { wash: "#eef4fc", ink: "#315d98", accent: "#47b59c", pale: "#c5daf2" },
  "bill-calendar": { wash: "#f5f1ff", ink: "#6951a3", accent: "#eea348", pale: "#ddd1f3" },
  receivables: { wash: "#eef8f7", ink: "#16766f", accent: "#f0ab42", pale: "#c5e9df" },
  pricing: { wash: "#fbf3e8", ink: "#8b5c24", accent: "#168d7f", pale: "#f3dab1" },
  comparison: { wash: "#eef3f1", ink: "#37564f", accent: "#efad45", pale: "#cfdfd9" },
  separation: { wash: "#eef5fb", ink: "#33648c", accent: "#e7a644", pale: "#c5ddec" },
  "irregular-income": { wash: "#f1f5ed", ink: "#527344", accent: "#eaa63d", pale: "#d3e4bd" },
};

export function BlogIllustration({ variant, title, compact = false }: { variant: string; title: string; compact?: boolean }) {
  const colors = paletteByVariant[variant] ?? paletteByVariant.forecast;
  const bars = variant === "bill-calendar" ? [48, 72, 54, 87, 65] : variant === "pricing" ? [40, 57, 75, 69, 91] : [38, 63, 51, 82, 67];
  return (
    <div role="img" aria-label={`Illustration: ${title}`} className={`relative overflow-hidden rounded-2xl ${compact ? "h-44" : "h-64 md:h-80"}`} style={{ background: colors.wash }}>
      <div aria-hidden="true" className="absolute -right-16 -top-20 h-64 w-64 rounded-full opacity-50" style={{ background: colors.pale }} />
      <div aria-hidden="true" className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full opacity-50" style={{ background: colors.pale }} />
      <svg viewBox="0 0 640 360" className="absolute inset-0 h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="83" y="45" width="474" height="270" rx="24" fill="white" fillOpacity=".92" />
        <path d="M112 91H528" stroke={colors.pale} strokeWidth="2" />
        <circle cx="127" cy="69" r="5" fill={colors.accent} />
        <circle cx="146" cy="69" r="5" fill={colors.pale} />
        <circle cx="165" cy="69" r="5" fill={colors.pale} />
        <rect x="113" y="112" width="164" height="62" rx="12" fill={colors.wash} />
        <rect x="128" y="128" width="67" height="7" rx="3.5" fill={colors.ink} fillOpacity=".35" />
        <rect x="128" y="145" width="115" height="14" rx="7" fill={colors.ink} />
        <rect x="293" y="112" width="236" height="62" rx="12" fill={colors.wash} />
        <path d="M314 153L347 140L379 147L411 125L444 134L477 119L509 126" stroke={colors.ink} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M314 160H509" stroke={colors.pale} strokeWidth="2" />
        {bars.map((height, index) => <rect key={index} x={119 + index * 43} y={276 - height} width="24" height={height} rx="8" fill={index === 3 ? colors.accent : colors.pale} />)}
        <path d="M112 281H334" stroke={colors.ink} strokeOpacity=".15" strokeWidth="2" />
        <rect x="365" y="194" width="164" height="88" rx="14" fill={colors.ink} />
        <path d="M389 222H495" stroke="white" strokeOpacity=".55" strokeWidth="6" strokeLinecap="round" />
        <path d="M389 243H458" stroke="white" strokeOpacity=".32" strokeWidth="6" strokeLinecap="round" />
        <circle cx="500" cy="260" r="13" fill={colors.accent} />
      </svg>
      <span className="absolute bottom-5 left-5 rounded-full border border-white/70 bg-white/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.13em] text-[#35564f]">FlowCFO field notes</span>
    </div>
  );
}
