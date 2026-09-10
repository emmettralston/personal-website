export function Section({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return <section className={`mx-auto max-w-5xl px-6 sm:px-8 ${className}`}>{children}</section>
}
