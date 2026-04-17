'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.remove('light', 'dark')
  root.classList.add(theme)
}

function getPreferredTheme(): Theme {
  const storedTheme = window.localStorage.getItem('theme')
  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        d="M12 4V2m0 20v-2m8-8h2M2 12h2m13.657 5.657 1.414 1.414M4.929 4.929l1.414 1.414m11.314-1.414-1.414 1.414M6.343 17.657l-1.414 1.414M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    }

    return 'light'
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const preferredTheme = getPreferredTheme()
    applyTheme(preferredTheme)
    setTheme(preferredTheme)
    setMounted(true)
  }, [])

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    window.localStorage.setItem('theme', nextTheme)
    applyTheme(nextTheme)
    setTheme(nextTheme)
  }

  const label = mounted
    ? theme === 'dark'
      ? 'Switch to light mode'
      : 'Switch to dark mode'
    : 'Toggle theme'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="theme-toggle flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border)] text-[var(--muted)] transition-all duration-300 hover:text-[var(--foreground)]"
    >
      <span
        key={theme}
        className={`theme-toggle-icon inline-flex items-center justify-center ${
          mounted ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {mounted && theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </span>
    </button>
  )
}
