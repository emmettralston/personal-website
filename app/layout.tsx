import type { Metadata } from 'next'
import { Fraunces, Public_Sans, Space_Mono } from 'next/font/google'
import { THEME_SCRIPT } from '@/lib/theme'
import { site } from '@/content/site'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import './globals.css'

const fraunces = Fraunces({ subsets: ['latin'], display: 'swap', variable: '--font-fraunces' })
const publicSans = Public_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-public-sans' })
// A monospace with real character (Colophon's Space Mono) for the label/kicker
// register — neither the sterile grotesque-mono nor the flat typewriter.
const labelMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-label',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · physics & computer engineering`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${publicSans.variable} ${labelMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-surface focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
