import type { Point } from './contours'

export interface Pointer {
  x: number
  y: number
}
export interface PhysicsParams {
  radius: number
  spring: number
  friction: number
  push: number
}

export const DEFAULT_PHYSICS: PhysicsParams = {
  radius: 125,
  spring: 0.05,
  friction: 0.87,
  push: 1.15,
}

// Advances every point one tick: a spring toward its rest position, damping,
// and a soft radial push away from the pointer. Mutates points in place.
export function stepPoints(points: Point[], pointer: Pointer | null, p: PhysicsParams): void {
  for (let i = 0; i < points.length; i++) {
    const pt = points[i]
    let ax = (pt.bx - pt.x) * p.spring
    let ay = (pt.by - pt.y) * p.spring
    if (pointer) {
      const dx = pt.x - pointer.x
      const dy = pt.y - pointer.y
      const dd = Math.sqrt(dx * dx + dy * dy)
      if (dd < p.radius && dd > 0.01) {
        let f = 1 - dd / p.radius
        f = f * f
        ax += (dx / dd) * f * p.push
        ay += (dy / dd) * f * p.push
      }
    }
    pt.vx = (pt.vx + ax) * p.friction
    pt.vy = (pt.vy + ay) * p.friction
    pt.x += pt.vx
    pt.y += pt.vy
  }
}
