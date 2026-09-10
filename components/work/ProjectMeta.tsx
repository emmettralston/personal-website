import type { ProjectMeta as Meta } from '@/lib/content'

export function ProjectMeta({ meta }: { meta: Meta }) {
  return (
    <dl className="mb-10 grid grid-cols-2 gap-x-8 gap-y-4 font-mono text-xs sm:grid-cols-4">
      <div>
        <dt className="mb-1 text-muted">role</dt>
        <dd className="text-secondary">{meta.role}</dd>
      </div>
      <div>
        <dt className="mb-1 text-muted">org</dt>
        <dd className="text-secondary">{meta.org}</dd>
      </div>
      <div>
        <dt className="mb-1 text-muted">period</dt>
        <dd className="text-secondary">{meta.period}</dd>
      </div>
      <div>
        <dt className="mb-1 text-muted">stack</dt>
        <dd className="text-secondary">{meta.stack.join(', ')}</dd>
      </div>
    </dl>
  )
}
