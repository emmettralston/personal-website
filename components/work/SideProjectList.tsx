import { getSideProjects } from '@/lib/content'
import { SectionHeading } from '../SectionHeading'

// Mirrors ProjectRow's markup (index, divider, title treatment, meta line,
// stack line) so side projects read as the same kind of row, not a separate
// style. Side projects don't carry role/org/period, so the meta line only
// shows the year; the stack line renders only when one is set.
export function SideProjectList() {
  const items = getSideProjects()
  if (items.length === 0) return null
  return (
    <div className="py-8">
      <SectionHeading>Projects</SectionHeading>
      <ul>
        {items.map((s, i) => (
          <li key={s.title} className="group relative">
            <div aria-hidden="true" className="contour-dots h-px" />
            <div className="flex gap-4 py-6 sm:gap-6">
              <span aria-hidden="true" className="w-6 shrink-0 pt-2 font-mono text-xs text-muted">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <h3 className="font-display text-xl font-normal tracking-tight">
                    {s.href ? (
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-accent"
                      >
                        <span className="relative inline-block">
                          {s.title}
                          <span
                            aria-hidden="true"
                            className="absolute -bottom-1.5 left-0 h-px w-0 bg-accent transition-[width] duration-300 group-hover:w-full group-focus-within:w-full motion-reduce:transition-none"
                          />
                        </span>
                      </a>
                    ) : (
                      s.title
                    )}
                  </h3>
                  <span className="shrink-0 font-mono text-xs text-muted">{s.year}</span>
                </div>
                <p className="mt-2 max-w-2xl text-secondary">{s.description}</p>
                {s.stack && s.stack.length > 0 && (
                  <p className="mt-3 font-mono text-xs text-muted">{s.stack.join(' · ')}</p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
