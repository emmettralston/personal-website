import fs from 'node:fs'
import path from 'node:path'
import { cache } from 'react'
import matter from 'gray-matter'
import { z } from 'zod'
import { sideProjects } from '@/content/side-projects'

export type ProjectKind = 'engineering' | 'research'

const FrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  kind: z.enum(['engineering', 'research']),
  role: z.string(),
  org: z.string(),
  period: z.coerce.string(),
  stack: z.array(z.string()),
  summary: z.string(),
  order: z.number(),
  featured: z.boolean(),
})

export type ProjectMeta = z.infer<typeof FrontmatterSchema>

const PROJECTS_DIR = path.join(process.cwd(), 'content', 'projects')

// Cached per request: a single /work render otherwise re-scans and re-parses
// the whole content directory three times.
const readAll = cache((): { meta: ProjectMeta; body: string }[] => {
  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith('.mdx'))
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), 'utf8')
    const { data, content } = matter(raw)
    const meta = FrontmatterSchema.parse(data)
    return { meta, body: content }
  })
})

export function getProjects(kind?: ProjectKind): ProjectMeta[] {
  return readAll()
    .map((p) => p.meta)
    .filter((m) => (kind ? m.kind === kind : true))
    .sort((a, b) => a.order - b.order)
}

export function getProject(slug: string): { meta: ProjectMeta; body: string } | null {
  return readAll().find((p) => p.meta.slug === slug) ?? null
}

export function getSideProjects() {
  return sideProjects
}
