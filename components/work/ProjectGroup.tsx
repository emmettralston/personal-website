import type { ProjectMeta } from '@/lib/content'
import { ProjectRow } from './ProjectRow'
import { SectionHeading } from '../SectionHeading'

export function ProjectGroup({
  kicker,
  title,
  projects,
}: {
  kicker?: string
  title: string
  projects: ProjectMeta[]
}) {
  return (
    <div className="py-8">
      <SectionHeading kicker={kicker}>{title}</SectionHeading>
      <ul>
        {projects.map((p, i) => (
          <ProjectRow key={p.slug} project={p} index={i} />
        ))}
      </ul>
    </div>
  )
}
