import Link from 'next/link'
import type { ProjectMeta } from '@/lib/content'
import { Section } from './Section'
import { ProjectRow } from './work/ProjectRow'

// The entrance is owned by WorkReveal, which cross-fades this whole block in
// as the hero explosion clears — so nothing here animates on its own.
//
// NOTE: `pt-[14vh]` and the heading's `mb-8` are load-bearing for that
// cross-fade (they set where the heading lands relative to mid-screen).
// Don't change them, and don't add anything above the <h2>.
export function MyWork({ projects }: { projects: ProjectMeta[] }) {
  return (
    <Section className="pb-20 pt-[14vh]">
      <h2 className="mb-8 font-display text-2xl font-normal tracking-tight sm:text-3xl">My Work</h2>
      <ul>
        {projects.map((p, i) => (
          <ProjectRow key={p.slug} project={p} index={i} showKind />
        ))}
      </ul>
      <p className="mt-8 font-mono text-xs">
        <Link
          href="/work"
          className="group relative inline-block text-secondary transition-colors hover:text-accent"
        >
          All My Work →
          <span
            aria-hidden="true"
            className="absolute -bottom-1.5 left-0 h-px w-0 bg-accent transition-[width] duration-300 group-hover:w-full motion-reduce:transition-none"
          />
        </Link>
      </p>
    </Section>
  )
}
