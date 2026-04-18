import { ReactNode } from 'react'
import { Locale } from 'app/i18n'
import { DocumentLocale } from './document-locale'
import Footer from './footer'
import { Navbar } from './nav'

export function SiteShell({
  children,
  locale,
}: {
  children: ReactNode
  locale: Locale
}) {
  return (
    <>
      <DocumentLocale locale={locale} />
      <main
        lang={locale}
        className="mx-4 mt-8 flex min-w-0 max-w-3xl flex-auto flex-col px-2 md:mx-auto md:px-0"
      >
        <Navbar locale={locale} />
        {children}
        <Footer locale={locale} />
      </main>
    </>
  )
}
