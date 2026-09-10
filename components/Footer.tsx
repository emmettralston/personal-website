import { site } from '@/content/site'
import { ThemeToggle } from './ThemeToggle'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mx-auto mt-24 max-w-5xl border-t border-hair px-6 py-10 font-mono text-xs text-secondary sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <ul className="flex gap-5">
          <li>
            <a className="hover:text-accent" href={`mailto:${site.socials.email}`}>
              email
            </a>
          </li>
          <li>
            <a className="hover:text-accent" href={site.socials.github} target="_blank" rel="noreferrer">
              github
            </a>
          </li>
          <li>
            <a className="hover:text-accent" href={site.socials.linkedin} target="_blank" rel="noreferrer">
              linkedin
            </a>
          </li>
        </ul>
        <div className="flex items-center gap-5">
          <ThemeToggle />
          <span className="text-muted">© {year}</span>
        </div>
      </div>
    </footer>
  )
}
