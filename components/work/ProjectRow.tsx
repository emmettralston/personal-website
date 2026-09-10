import Link from 'next/link'
import type { ProjectMeta } from '@/lib/content'

const KIND_LABEL = { engineering: 'Engineering', research: 'Research' } as const

// One row, two registers: a plain-language summary anyone can read, and the
// technical detail (kind · org · period, then the stack) in mono for readers
// who want specifics. Shared by the homepage list and /work.
export function ProjectRow({
  project,
  index,
  showKind = false,
}: {
  project: ProjectMeta
  index: number
  showKind?: boolean
}) {
  const meta = [showKind ? KIND_LABEL[project.kind] : null, project.org, project.period]
    .filter(Boolean)
    .join(' · ')

  return (
    <li className="group relative">
      <div aria-hidden="true" className="contour-dots h-px" />
      <div className="flex gap-4 py-6 sm:gap-6">
        <span aria-hidden="true" className="w-6 shrink-0 pt-2 font-mono text-xs text-muted">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            {/* The link wraps only the title, so its accessible name is the
                title alone; the ::after overlay makes the whole row clickable.
                The link must stay unpositioned or inset-0 would resolve to it. */}
            <h3 className="font-display text-xl font-normal tracking-tight">
              <Link
                href={`/work/${project.slug}`}
                className="transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-accent"
              >
                <span className="relative inline-block">
                  {project.title}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1.5 left-0 h-px w-0 bg-accent transition-[width] duration-300 group-hover:w-full group-focus-within:w-full motion-reduce:transition-none"
                  />
                </span>
              </Link>
            </h3>
            <span className="shrink-0 font-mono text-xs text-muted">{meta}</span>
          </div>
          <p className="mt-2 max-w-2xl text-secondary">{project.summary}</p>
          <p className="mt-3 font-mono text-xs text-muted">{project.stack.join(' · ')}</p>
        </div>
      </div>
    </li>
  )
}
