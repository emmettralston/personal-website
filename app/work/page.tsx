import type { Metadata } from 'next'
import { getProjects } from '@/lib/content'
import { Section } from '@/components/Section'
import { ProjectGroup } from '@/components/work/ProjectGroup'
import { SideProjectList } from '@/components/work/SideProjectList'
import { Reveal } from '@/components/Reveal'

export const metadata: Metadata = {
  title: 'My Work',
  description: 'Engineering work and semiconductor research by Emmett Ralston.',
}

export default function WorkPage() {
  const engineering = getProjects('engineering')
  const research = getProjects('research')
  return (
    <Section className="pb-16 pt-32">
      <h1 className="mb-10 font-display text-4xl font-normal tracking-tight sm:text-5xl">
        My Work
      </h1>
      <Reveal>
        <ProjectGroup title="Engineering" projects={engineering} />
      </Reveal>
      <Reveal>
        <ProjectGroup title="Research" projects={research} />
      </Reveal>
      <Reveal>
        <SideProjectList />
      </Reveal>
    </Section>
  )
}
