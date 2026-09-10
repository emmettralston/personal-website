import type { Metadata } from 'next'
import Image from 'next/image'
import { site } from '@/content/site'
import { getOutsidePhotos } from '@/lib/photos'
import { Section } from '@/components/Section'
import { ContourRule } from '@/components/ContourRule'
import { Reveal } from '@/components/Reveal'

export const metadata: Metadata = {
  title: 'Outside',
  description: 'Away from a screen: the outdoors, and the hobbies I treat as a creative outlet.',
}

export default function OutsidePage() {
  const photos = getOutsidePhotos()

  return (
    <Section className="pb-16 pt-32">
      <p className="mb-3 font-mono text-xs tracking-[0.14em] text-muted">{site.outside.lede}</p>
      <h1 className="mb-10 font-display text-4xl font-normal tracking-tight sm:text-5xl">Outside</h1>
      <div className="max-w-2xl space-y-6 text-lg leading-relaxed text-secondary">
        {site.outside.paragraphs.map((para, i) => (
          <Reveal key={i}>
            <p>{para}</p>
          </Reveal>
        ))}
      </div>
      {/* Drop image files into public/outside/ (name them "1-...", "2-..." to
          control order) and they replace these placeholders automatically,
          no code change needed. See lib/photos.ts. */}
      <Reveal>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {photos.length > 0
            ? photos.map((photo) => (
                <div
                  key={photo.src}
                  className="relative aspect-[4/5] overflow-hidden border border-hair bg-surface"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 640px) 33vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))
            : [0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="flex aspect-[4/5] items-center justify-center border border-hair bg-surface"
                >
                  <span className="font-mono text-xs text-muted">photo</span>
                </div>
              ))}
        </div>
      </Reveal>
      <ContourRule />
    </Section>
  )
}
