export function SectionHeading({
  kicker,
  children,
}: {
  kicker?: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-8">
      {kicker && <p className="mb-2 font-mono text-xs tracking-[0.08em] text-muted">{kicker}</p>}
      <h2 className="font-display text-2xl font-normal tracking-tight sm:text-3xl">{children}</h2>
    </div>
  )
}
