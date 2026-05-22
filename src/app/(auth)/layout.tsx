export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-flow-obsidian text-white selection:bg-flow-gold selection:text-flow-black">
      {children}
    </div>
  );
}
