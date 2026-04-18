import Link from 'next/link'
import { getDictionary, Locale } from 'app/i18n'
import { LanguageToggle } from './language-toggle'
import { ThemeToggle } from './theme-toggle'

export function Navbar({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale)
  const prefix = locale === 'fr' ? '' : '/en'

  const navItems = {
    [`${prefix || '/'}`]: {
      name: dictionary.nav.home,
    },
    [`${prefix}/blog`]: {
      name: dictionary.nav.blog,
    },
    [`${prefix}/projects`]: {
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
            {Object.entries(navItems).map(([path, { name }]) => (
              <Link
                key={path}
                href={path}
                className="m-1 flex relative align-middle px-2 py-1 text-[var(--muted)] transition-all hover:text-[var(--foreground)]"
              >
                {name}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <LanguageToggle locale={locale} />
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </aside>
  )
}
