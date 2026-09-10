'use client'
import { useEffect, useState } from 'react'
import { nextTheme, type Theme } from '@/lib/theme'

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    const current = (document.documentElement.getAttribute('data-theme') as Theme) ?? 'dark'
    setTheme(current)
  }, [])

  function toggle() {
    const t = nextTheme((theme ?? 'dark') as Theme)
    setTheme(t)
    document.documentElement.setAttribute('data-theme', t)
    try {
      localStorage.setItem('theme', t)
    } catch {}
    window.dispatchEvent(new Event('themechange'))
  }

  const label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      className="font-mono text-xs text-secondary hover:text-accent"
    >
      {theme === 'dark' ? 'light' : 'dark'}
    </button>
  )
}
