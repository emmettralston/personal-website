import type { ComponentPropsWithoutRef } from 'react'

type P<T extends keyof React.JSX.IntrinsicElements> = ComponentPropsWithoutRef<T>

// Styles for prose written in project MDX bodies. Without this map MDX renders
// bare HTML with no design-system styling, so any heading or list added to a
// body would fall out of the type scale.
//
// `h1` deliberately renders an <h2>: the page already owns the only <h1>, so a
// body heading can never collide with it.
export const mdxComponents = {
  h1: (props: P<'h2'>) => (
    <h2
      className="mb-4 mt-12 font-display text-2xl font-normal tracking-tight text-primary sm:text-3xl"
      {...props}
    />
  ),
  h2: (props: P<'h2'>) => (
    <h2
      className="mb-4 mt-12 font-display text-2xl font-normal tracking-tight text-primary sm:text-3xl"
      {...props}
    />
  ),
  h3: (props: P<'h3'>) => (
    <h3
      className="mb-3 mt-8 font-display text-xl font-normal tracking-tight text-primary"
      {...props}
    />
  ),
  // `p` owns its own rhythm via mt-6/first:mt-0 — so the body wrapper must NOT
  // also use space-y-*, or the margins compound.
  p: (props: P<'p'>) => (
    <p className="mt-6 text-lg leading-relaxed text-secondary first:mt-0" {...props} />
  ),
  ul: (props: P<'ul'>) => (
    <ul className="mt-6 list-disc space-y-2 pl-5 marker:text-muted" {...props} />
  ),
  ol: (props: P<'ol'>) => (
    <ol className="mt-6 list-decimal space-y-2 pl-5 marker:text-muted" {...props} />
  ),
  li: (props: P<'li'>) => <li className="text-lg leading-relaxed text-secondary" {...props} />,
  a: (props: P<'a'>) => (
    <a
      className="text-primary underline decoration-hair underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
      {...props}
    />
  ),
  // Emphasis by colour, not weight — the site has no bold anywhere.
  strong: (props: P<'strong'>) => <strong className="font-normal text-primary" {...props} />,
  blockquote: (props: P<'blockquote'>) => (
    <blockquote
      className="mt-6 border-l border-hair pl-5 text-lg leading-relaxed text-muted"
      {...props}
    />
  ),
  hr: () => <hr aria-hidden="true" className="contour-dots my-10 h-px border-0" />,
}
