import { HeroSequence } from '@/components/hero/HeroSequence'
import { SelectedWork } from '@/components/SelectedWork'
import { About } from '@/components/About'
import { ContourRule } from '@/components/ContourRule'
import { Reveal } from '@/components/Reveal'

export default function HomePage() {
  return (
    <>
      <HeroSequence>
        <SelectedWork />
      </HeroSequence>
      <ContourRule />
      <Reveal>
        <About />
      </Reveal>
    </>
  )
}
