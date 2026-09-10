'use client'
import { useEffect, useRef } from 'react'

const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v)

// Pulls the work section up so it overlaps the hero track's trailing
// scroll-away (a sticky element always needs one viewport of scroll to unpin,
// which otherwise reads as a blank screen), then cross-fades it in over the
// tail of the explosion. By the time the track ends it is fully opaque and
// sitting at the top of the viewport.
export function WorkReveal({
  sectionRef,
  children,
}: {
  sectionRef: React.RefObject<HTMLElement | null>
  children: React.ReactNode
}) {
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
      // Fades in as the block rises into frame and reaches full brightness by
      // the time its heading is around the middle of the viewport — well before
      // the end of the track, so you are never scrolling through dim content.
      el.style.opacity = clamp((p - 0.56) / 0.16, 0, 1).toFixed(3)
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
    <div ref={ref} className="relative" style={{ marginTop: '-100svh' }}>
      {children}
    </div>
  )
}
