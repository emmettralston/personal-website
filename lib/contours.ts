export interface Point {
  bx: number
  by: number
  x: number
  y: number
  vx: number
  vy: number
}
// One iso-level of the height field. `points` are the dots that lie on that
// contour line (extracted by marching squares, so contours never cross — they
// nest and merge at saddles exactly like a real topographic map).
export interface Ring {
  points: Point[]
  accent: boolean
  opacity: number
  radius: number
}
export interface FieldPeak {
  x: number
  y: number
  amp: number
  sx: number
  sy: number
}
export interface ContourConfig {
  width: number
  height: number
  peaks: FieldPeak[]
  cell: number
  levels: number
  accentLevels: number[]
}

const REF_W = 680
const REF_H = 472

// Peaks authored in the reference box, summed into one smooth elevation field.
// Two dominant hills plus a lower bump create a saddle between them.
const REF_PEAKS: FieldPeak[] = [
  { x: 130, y: 350, amp: 1.0, sx: 250, sy: 210 },
  { x: 570, y: 130, amp: 0.9, sx: 270, sy: 220 },
  { x: 400, y: 330, amp: 0.42, sx: 150, sy: 150 },
]

export function defaultConfig(width: number, height: number): ContourConfig {
  const kx = width / REF_W
  const ky = height / REF_H
  const peaks = REF_PEAKS.map((p) => ({
    x: p.x * kx,
    y: p.y * ky,
    amp: p.amp,
    sx: p.sx * kx,
    sy: p.sy * ky,
  }))
  return { width, height, peaks, cell: 8, levels: 16, accentLevels: [4, 9, 13] }
}

function fieldAt(x: number, y: number, peaks: FieldPeak[]): number {
  let v = 0
  for (const p of peaks) {
    const dx = (x - p.x) / p.sx
    const dy = (y - p.y) / p.sy
    v += p.amp * Math.exp(-0.5 * (dx * dx + dy * dy))
  }
  return v
}

// Marching squares: sample the field on a grid, then for each iso-level emit a
// dot wherever the level crosses a grid edge (linear interpolation). Each edge
// is visited once, so dots are evenly spaced (~cell) along non-crossing contours.
export function buildContours(cfg: ContourConfig): Ring[] {
  const { width, height, peaks, cell, levels, accentLevels } = cfg
  const cols = Math.ceil(width / cell)
  const rows = Math.ceil(height / cell)

  const F: number[][] = []
  let maxV = 0
  for (let i = 0; i <= cols; i++) {
    F[i] = []
    for (let j = 0; j <= rows; j++) {
      const v = fieldAt(i * cell, j * cell, peaks)
      F[i][j] = v
      if (v > maxV) maxV = v
    }
  }

  const rings: Ring[] = []
  for (let l = 0; l < levels; l++) {
    const level = (maxV * (l + 1)) / (levels + 1)
    const points: Point[] = []
    // horizontal edges
    for (let j = 0; j <= rows; j++) {
      for (let i = 0; i < cols; i++) {
        const a = F[i][j] - level
        const b = F[i + 1][j] - level
        if (a < 0 !== b < 0) {
          const t = a / (a - b)
          const x = (i + t) * cell
          const y = j * cell
          points.push({ bx: x, by: y, x, y, vx: 0, vy: 0 })
        }
      }
    }
    // vertical edges
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i <= cols; i++) {
        const a = F[i][j] - level
        const b = F[i][j + 1] - level
        if (a < 0 !== b < 0) {
          const t = a / (a - b)
          const x = i * cell
          const y = (j + t) * cell
          points.push({ bx: x, by: y, x, y, vx: 0, vy: 0 })
        }
      }
    }
    const accent = accentLevels.includes(l)
    rings.push({ points, accent, opacity: accent ? 0.9 : 0.5, radius: accent ? 0.85 : 0.62 })
  }
  return rings
}
