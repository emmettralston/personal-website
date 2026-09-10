'use client'
import { useEffect, useRef } from 'react'
import { site } from '@/content/site'

const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v)

// The name/identity block. Sits centred over the contour field and fades out
// early in the scroll track — then stays gone, leaving a long quiet stretch of
// pure explosion before the work section fades in.
//
// The fade is computed straight from the section's own geometry on scroll
// (rather than via a motion library) so it is deterministic: it always reaches
// exactly 0 and never drifts back in.
export function HeroText({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.opacity = '1'
      return
    }

    const update = () => {
      const sec = sectionRef.current
      if (!sec) return
      const rect = sec.getBoundingClientRect()
      const range = rect.height - window.innerHeight
      const p = range > 0 ? clamp(-rect.top / range, 0, 1) : 0
      // Gone by 16% of the track, and clamped so it can never come back.
      const o = 1 - clamp(p / 0.16, 0, 1)
      el.style.opacity = o.toFixed(3)
      el.style.transform = `translateY(${(-10 * (1 - o)).toFixed(2)}px)`
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [sectionRef])

  return (
    <div ref={ref} style={{ opacity: 1 }} className="pointer-events-none absolute inset-0 flex flex-col">
      {/* This band ends at the elevation of the contour field's innermost ring
          (the summed field peaks at 52% x / 60.9% y of the frame), and the name
          is bottom-aligned to it — so "Ralston" sits on that centre line. */}
      <div className="flex h-[61%] flex-col justify-end">
        <div className="mx-auto w-full max-w-5xl px-6 sm:px-8">
          <p className="mb-4 font-mono text-sm tracking-[0.06em] text-secondary">
            Physics · Computer Engineering · NYU &rsquo;28
          </p>
          <h1
            id="hero-name"
            className="font-display text-6xl font-normal leading-[0.98] tracking-tight sm:text-7xl"
          >
            {site.name}
          </h1>
        </div>
      </div>
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-8">
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-secondary">
        Trying to lean into my curiosity. 
          <span className="text-primary"> Here&apos;s what I&apos;ve been up to.</span>
        </p>
      </div>
    </div>
  )
}
