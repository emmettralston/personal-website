'use client'
import { useEffect, useRef } from 'react'
import { buildContours, defaultConfig, type Ring } from '@/lib/contours'
import { stepPoints, DEFAULT_PHYSICS, type Pointer } from '@/lib/contour-physics'

type Props = {
  className?: string
  // When provided, the field "explodes" outward as this section scrolls past —
  // progress is derived from the section's own position (no framer dependency),
  // so it stays correct even when the tab is backgrounded.
  sectionRef?: React.RefObject<HTMLElement | null>
}

function themeColors() {
  const cs = getComputedStyle(document.documentElement)
  return {
    dot: cs.getPropertyValue('--contour-dot').trim() || '#54626f',
    accent: cs.getPropertyValue('--accent').trim() || '#be3a2b',
  }
}

const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v)

export function ContourField({ className, sectionRef }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = wrap.clientWidth
    let height = wrap.clientHeight
    let rings: Ring[] = buildContours(defaultConfig(width, height))
    let colors = themeColors()
    const pointer: Pointer & { on: boolean } = { x: 0, y: 0, on: false }
    let raf = 0
    let visible = true
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    function fit() {
      width = wrap!.clientWidth
      height = wrap!.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = Math.round(width * dpr)
      canvas!.height = Math.round(height * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      rings = buildContours(defaultConfig(width, height))
      colors = themeColors()
    }

    // 0 while the hero is fully in view, ramps to 1 as its tall section scrolls by.
    function scrollProgress() {
      const el = sectionRef?.current
      if (!el || reduce) return 0
      const rect = el.getBoundingClientRect()
      const range = rect.height - window.innerHeight
      return range > 0 ? clamp(-rect.top / range, 0, 1) : 0
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height)
      const p = scrollProgress()
      // A radial shock-wave: every dot is pushed the SAME distance outward along
      // its own radius from centre, so the field blows open from the middle and
      // travels outward. (Displacing each dot in *proportion* to its distance
      // would be a uniform scale about the centre — which just reads as a zoom.)
      // Starts as the hero text is fading, stays expanding across the long quiet
      // stretch, and clears just before the work section fades in.
      const e = p <= 0 ? 0 : Math.pow(clamp((p - 0.08) / 0.88, 0, 1), 1.8)
      const fade = 1 - clamp((p - 0.56) / 0.22, 0, 1)
      const maxPush = Math.hypot(width, height) * 0.62
      const cx = width / 2
      const cy = height / 2

      for (const ring of rings) {
        const alpha = ring.opacity * fade
        if (alpha < 0.01) continue
        ctx!.globalAlpha = alpha
        ctx!.fillStyle = ring.accent ? colors.accent : colors.dot
        if (!reduce) stepPoints(ring.points, pointer.on && e < 0.05 ? pointer : null, DEFAULT_PHYSICS)
        for (const pt of ring.points) {
          let x = pt.x
          let y = pt.y
          if (e > 0) {
            const dx = pt.bx - cx
            const dy = pt.by - cy
            const d = Math.hypot(dx, dy) || 1
            const push = e * maxPush
            // unit radius outward, plus a slight tangential swirl
            x += (dx / d) * push - (dy / d) * push * 0.12
            y += (dy / d) * push + (dx / d) * push * 0.12
          }
          ctx!.beginPath()
          ctx!.arc(x, y, ring.radius * (1 + e * 0.9), 0, Math.PI * 2)
          ctx!.fill()
        }
      }
      ctx!.globalAlpha = 1
      if (!reduce && visible) raf = requestAnimationFrame(draw)
    }

    function onMove(ev: PointerEvent) {
      const r = canvas!.getBoundingClientRect()
      pointer.x = ((ev.clientX - r.left) / r.width) * width
      pointer.y = ((ev.clientY - r.top) / r.height) * height
      pointer.on = true
    }
    function onLeave() {
      pointer.on = false
    }

    fit()
    draw()

    const ro = new ResizeObserver(() => fit())
    ro.observe(wrap)
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible && !reduce && !raf) raf = requestAnimationFrame(draw)
        if (!visible && raf) {
          cancelAnimationFrame(raf)
          raf = 0
        }
      },
      { threshold: 0 }
    )
    io.observe(wrap)
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onScheme = () => {
      colors = themeColors()
    }
    mq.addEventListener('change', onScheme)
    window.addEventListener('themechange', onScheme)
    if (!reduce) {
      wrap.addEventListener('pointermove', onMove)
      wrap.addEventListener('pointerleave', onLeave)
    }

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      mq.removeEventListener('change', onScheme)
      window.removeEventListener('themechange', onScheme)
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerleave', onLeave)
    }
  }, [sectionRef])

  return (
    <div ref={wrapRef} className={className} aria-hidden="true" style={{ touchAction: 'none' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  )
}
