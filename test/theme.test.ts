import { describe, it, expect } from 'vitest'
import { nextTheme } from '@/lib/theme'

describe('nextTheme', () => {
  it('toggles dark to light', () => {
    expect(nextTheme('dark')).toBe('light')
  })
  it('toggles light to dark', () => {
    expect(nextTheme('light')).toBe('dark')
  })
})
