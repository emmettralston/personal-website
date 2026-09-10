import Link from 'next/link'
import { site } from '@/content/site'

export function Nav() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-8 sm:px-8">
        <Link
          href="/"
          aria-label={`${site.name} home`}
          className="font-mono text-base tracking-[0.12em] text-primary transition-colors hover:text-accent"
        >
          {site.wordmark}
        </Link>
        <ul className="flex items-center gap-8">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group relative inline-block font-mono text-base text-primary transition-colors hover:text-accent"
              >
                {item.label}
                {/* hairline that draws in from the left on hover */}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1.5 left-0 h-px w-0 bg-accent transition-[width] duration-300 group-hover:w-full motion-reduce:transition-none"
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
