'use client'
import { useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ContourField } from './ContourField'
import { HeroText } from './HeroText'
import { WorkReveal } from './WorkReveal'

// Owns the single scroll track shared by the hero and the work section:
// text fades out → topo explodes outward → work cross-fades in as the
// explosion clears. `children` is the work section (a server component).
export function HeroSequence({ children }: { children: React.ReactNode }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  // Reduced motion: plain full-height hero, no pin, no explosion, no overlap.
  if (reduce) {
    return (
      <>
        <section
          ref={sectionRef}
          className="relative h-[100svh] overflow-hidden"
          aria-labelledby="hero-name"
        >
          <ContourField className="absolute inset-0 h-full w-full" />
          <HeroText sectionRef={sectionRef} />
        </section>
        {children}
      </>
    )
  }

  return (
    <>
      <section ref={sectionRef} className="relative h-[240svh]" aria-labelledby="hero-name">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <ContourField sectionRef={sectionRef} className="absolute inset-0 h-full w-full" />
          <HeroText sectionRef={sectionRef} />
        </div>
      </section>
      <WorkReveal sectionRef={sectionRef}>{children}</WorkReveal>
    </>
  )
}
