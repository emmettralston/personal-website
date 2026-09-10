import fs from 'node:fs'
import path from 'node:path'
import { cache } from 'react'

export interface Photo {
  src: string
  alt: string
}

const OUTSIDE_DIR = path.join(process.cwd(), 'public', 'outside')
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif'])

// Turns "1-backcountry-skiing.jpg" into "Backcountry skiing": strips a
// leading sort-order number, swaps separators for spaces, capitalizes.
// Exported so the derivation itself is unit-testable.
export function altFromFilename(file: string): string {
  const base = path.basename(file, path.extname(file))
  const withoutOrder = base.replace(/^\d+[-_]?/, '')
  const words = withoutOrder.replace(/[-_]+/g, ' ').trim()
  if (!words) return 'Photo'
  return words.charAt(0).toUpperCase() + words.slice(1)
}

// Reads every image dropped into public/outside/, sorted by filename (name
// files "1-...", "2-..." to control order). Returns [] if the folder is
// missing or empty, so the page can fall back to placeholder tiles.
export const getOutsidePhotos = cache((): Photo[] => {
  if (!fs.existsSync(OUTSIDE_DIR)) return []
  return fs
    .readdirSync(OUTSIDE_DIR)
    .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
    .sort()
    .map((file) => ({ src: `/outside/${file}`, alt: altFromFilename(file) }))
})
