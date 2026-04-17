'use client'

import Link from 'next/link'
import { LanguageToggle } from './language-toggle'
import { useLanguage } from './language-provider'
import { ThemeToggle } from './theme-toggle'

export function Navbar() {
  const { dictionary } = useLanguage()

  const navItems = {
    '/': {
      name: dictionary.nav.home,
    },
    '/blog': {
      name: dictionary.nav.blog,
    },
    '/projects': {
      name: dictionary.nav.projects,
    },
  }

  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="mx-auto w-full max-w-3xl lg:sticky lg:top-20">
        <nav
          className="fade relative flex flex-row items-center justify-between overflow-visible px-0 pb-0 md:relative scroll-pr-6"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="m-1 flex align-middle relative py-1 px-2 transition-all text-[var(--muted)] hover:text-[var(--foreground)]"
                >
                  {name}
                </Link>
              )
            })}
          </div>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </aside>
  )
}
