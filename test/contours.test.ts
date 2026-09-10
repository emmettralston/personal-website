import { describe, it, expect } from 'vitest'
import { buildContours, defaultConfig } from '@/lib/contours'

describe('buildContours', () => {
  const cfg = defaultConfig(680, 472)

  it('creates one ring per iso-level', () => {
    expect(buildContours(cfg)).toHaveLength(cfg.levels)
  })

  it('is deterministic', () => {
    expect(buildContours(cfg)).toEqual(buildContours(cfg))
  })

  it('initializes each point at rest (x==bx, zero velocity)', () => {
    const rings = buildContours(cfg)
    const ring = rings.find((r) => r.points.length > 0)!
    const p = ring.points[0]
    expect(p.x).toBe(p.bx)
    expect(p.y).toBe(p.by)
    expect(p.vx).toBe(0)
    expect(p.vy).toBe(0)
  })

  it('produces contour dots spread along each level', () => {
    const ring = buildContours(cfg).find((r) => r.points.length > 20)
    expect(ring).toBeDefined()
  })

  it('marks configured accent levels', () => {
    const accentCount = buildContours(cfg).filter((r) => r.accent).length
    expect(accentCount).toBe(cfg.accentLevels.length)
  })
})
