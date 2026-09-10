import { describe, it, expect } from 'vitest'
import { stepPoints, DEFAULT_PHYSICS } from '@/lib/contour-physics'
import type { Point } from '@/lib/contours'

function pt(over: Partial<Point> = {}): Point {
  return { bx: 100, by: 100, x: 100, y: 100, vx: 0, vy: 0, ...over }
}

describe('stepPoints', () => {
  it('leaves a resting point at rest when no pointer', () => {
    const p = pt()
    stepPoints([p], null, DEFAULT_PHYSICS)
    expect(p.x).toBeCloseTo(100, 5)
    expect(p.y).toBeCloseTo(100, 5)
  })

  it('pulls a displaced point back toward rest', () => {
    const p = pt({ x: 140 })
    stepPoints([p], null, DEFAULT_PHYSICS)
    expect(p.x).toBeLessThan(140)
    expect(p.x).toBeGreaterThan(100)
  })

  it('pushes a point away from a nearby pointer', () => {
    const p = pt()
    stepPoints([p], { x: 90, y: 100 }, DEFAULT_PHYSICS) // pointer to the left
    expect(p.vx).toBeGreaterThan(0) // pushed right, away from pointer
  })

  it('ignores a pointer beyond the radius', () => {
    const p = pt()
    stepPoints([p], { x: 100 + DEFAULT_PHYSICS.radius + 10, y: 100 }, DEFAULT_PHYSICS)
    expect(p.x).toBeCloseTo(100, 5)
  })
})
