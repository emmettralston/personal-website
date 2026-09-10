import { describe, it, expect } from 'vitest'
import { altFromFilename, getOutsidePhotos } from '@/lib/photos'

describe('altFromFilename', () => {
  it('strips a leading sort-order number and capitalizes', () => {
    expect(altFromFilename('1-backcountry-skiing.jpg')).toBe('Backcountry skiing')
  })
  it('handles underscores', () => {
    expect(altFromFilename('02_guitar_night.webp')).toBe('Guitar night')
  })
  it('handles a filename with no order prefix', () => {
    expect(altFromFilename('urban-sketching.png')).toBe('Urban sketching')
  })
  it('falls back to a generic label if the name is empty after stripping', () => {
    expect(altFromFilename('3.jpg')).toBe('Photo')
  })
})

describe('getOutsidePhotos', () => {
  it('returns an array (empty until photos are added to public/outside/)', () => {
    expect(Array.isArray(getOutsidePhotos())).toBe(true)
  })
})
