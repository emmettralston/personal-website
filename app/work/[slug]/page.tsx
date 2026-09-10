import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { compileMDX } from 'next-mdx-remote/rsc'
import { getProject, getProjects } from '@/lib/content'
import { Section } from '@/components/Section'
import { ProjectMeta } from '@/components/work/ProjectMeta'
import { mdxComponents } from '@/components/mdx'

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return { title: project.meta.title, description: project.meta.summary }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()
  const { content } = await compileMDX({ source: project.body, components: mdxComponents })

  return (
    <Section className="pb-16 pt-32">
      <p className="mb-3 font-mono text-xs tracking-[0.14em] text-muted">
        {project.meta.kind.charAt(0).toUpperCase() + project.meta.kind.slice(1)}
      </p>
      <h1 className="mb-10 font-display text-4xl font-normal tracking-tight sm:text-5xl">
        {project.meta.title}
      </h1>
      <ProjectMeta meta={project.meta} />
      <div aria-hidden="true" className="contour-dots mb-10 h-px max-w-2xl" />
      <div className="max-w-2xl">{content}</div>
      <p className="mt-12 font-mono text-xs">
        <Link
          href="/work"
          className="group relative inline-block text-secondary transition-colors hover:text-accent"
        >
          ← My Work
          <span
            aria-hidden="true"
            className="absolute -bottom-1.5 left-0 h-px w-0 bg-accent transition-[width] duration-300 group-hover:w-full motion-reduce:transition-none"
          />
        </Link>
      </p>
    </Section>
  )
}
