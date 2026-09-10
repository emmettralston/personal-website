import Link from 'next/link'
import { Section } from './Section'

// A short "who I am" intro that hands off to the deeper /outside page.
// Deliberately covers background/origin rather than curiosity, the hero
// already carries the curiosity line, so this shouldn't echo it.
export function About() {
  return (
    <Section className="py-20">
      <h2 className="mb-6 font-display text-2xl font-normal tracking-tight sm:text-3xl">About</h2>
      <p className="max-w-2xl text-lg leading-relaxed text-secondary">
        I&rsquo;m a fourth-year student in NYU&rsquo;s five-year dual-degree program, studying physics in the College of Arts and
        Science and computer engineering at Tandon. I have professional experience building AI systems as well as in semiconductor research.
        I grew up in Washington State and swam competitively into college. Most of my hobbies stem from Washington's outdoors: skiing, 
        fly-fishing, hiking, surfing, but I also enjoy playing guitar, urban sketching, and cooking.
      </p>
      <p className="mt-8 font-mono text-xs">
        <Link
          href="/outside"
          className="group relative inline-block text-secondary transition-colors hover:text-accent"
        >
          What I do outside →
          <span
            aria-hidden="true"
            className="absolute -bottom-1.5 left-0 h-px w-0 bg-accent transition-[width] duration-300 group-hover:w-full motion-reduce:transition-none"
          />
        </Link>
      </p>
    </Section>
  )
}
