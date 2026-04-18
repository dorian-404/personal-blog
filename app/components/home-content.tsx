import Link from 'next/link'
import { ReactNode } from 'react'
import { getDictionary, Locale } from 'app/i18n'

export function HomeContent({
  children,
  locale,
}: {
  children: ReactNode
  locale: Locale
}) {
  const dictionary = getDictionary(locale)
  const blogPath = locale === 'fr' ? '/blog' : '/en/blog'

  return (
    <section className="space-y-6">
      <div className="space-y-1.5">
        <h2 className="text-[1.85rem] font-medium tracking-[-0.03em] text-[var(--foreground)]">
          dorian michaël
        </h2>
        <h3 className="text-[1rem] text-[var(--muted-soft)]">
          {dictionary.home.role}
        </h3>
      </div>

      <div className="max-w-[54rem] space-y-5 text-[0.94rem] leading-[1.65] text-[var(--muted-strong)]">
        <section className="space-y-2">
          <h2 className="text-[1.18rem] font-medium text-[var(--foreground)]">
            {dictionary.home.stints}
          </h2>
          <ul className="list-disc space-y-2 pl-5 marker:text-[var(--muted-soft)]">
            <li>{dictionary.home.stintsItems[0]}</li>
            <li>{dictionary.home.stintsItems[1]}</li>
            <li>
              {dictionary.home.stintsItems[2].replace(
                dictionary.home.blogLabel,
                ''
              )}
              <Link
                href={blogPath}
                className="text-[var(--accent)] underline underline-offset-4 decoration-[var(--anchor)]"
              >
                {dictionary.home.blogLabel}
              </Link>
              .
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-[1.18rem] font-medium text-[var(--foreground)]">
            {dictionary.home.interests}
          </h2>
          <ul className="list-disc space-y-2 pl-5 marker:text-[var(--muted-soft)]">
            {dictionary.home.interestItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-[1.18rem] font-medium text-[var(--foreground)]">
              {dictionary.home.writingAbout}
            </h2>
            <p className="text-[var(--muted)]">{dictionary.home.writingBlurb}</p>
          </div>
          {children}
        </section>
      </div>
    </section>
  )
}
