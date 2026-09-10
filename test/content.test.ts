import { describe, it, expect } from 'vitest'
import { getProjects, getProject, getSideProjects } from '@/lib/content'

describe('content layer', () => {
  it('loads all three projects', () => {
    expect(getProjects()).toHaveLength(3)
  })
  it('filters by kind', () => {
    expect(getProjects('research').every((p) => p.kind === 'research')).toBe(true)
    expect(getProjects('engineering')).toHaveLength(2)
  })
  it('sorts by order ascending', () => {
    const eng = getProjects('engineering').map((p) => p.order)
    expect(eng).toEqual([...eng].sort((a, b) => a - b))
  })
  it('returns a project body by slug', () => {
    const p = getProject('domify')
    expect(p?.meta.title).toBe('Domify')
    expect(p?.body.length).toBeGreaterThan(50)
  })
  it('returns null for an unknown slug', () => {
    expect(getProject('nope')).toBeNull()
  })
  it('exposes side projects', () => {
    expect(Array.isArray(getSideProjects())).toBe(true)
  })

  // The row layout assumes both registers are populated and that summaries stay
  // short enough to keep row heights even.
  it('every project has a non-empty, concise summary', () => {
    for (const p of getProjects()) {
      expect(p.summary.length, `${p.slug} summary`).toBeGreaterThan(0)
      expect(p.summary.length, `${p.slug} summary`).toBeLessThan(200)
    }
  })
  it('every project has a non-empty stack', () => {
    for (const p of getProjects()) {
      expect(p.stack.length, `${p.slug} stack`).toBeGreaterThan(0)
    }
  })
})
