'use client'

import { useLanguage } from './language-provider'

type Heading = {
  level: number
  title: string
  slug: string
}

export function ArticleSidebar({ headings }: { headings: Heading[] }) {
  const { dictionary } = useLanguage()

  if (headings.length === 0) {
    return null
  }

  return (
    <aside className="pointer-events-none absolute left-0 top-1 hidden xl:block">
      <div className="pointer-events-auto sticky top-24 w-[150px] -translate-x-[20rem] space-y-5">
        <p className="text-[0.78rem] uppercase tracking-[0.18em] text-[var(--muted-soft)]">
          {dictionary.article.onThisPage}
        </p>
        <nav>
          <ul className="space-y-2.5 text-[0.8rem] leading-5 text-[var(--muted)]">
            {headings.map((heading) => (
              <li
                key={heading.slug}
                className={heading.level === 3 ? 'pl-3' : undefined}
              >
                <a
                  href={`#${heading.slug}`}
                  className="block max-w-[150px] whitespace-normal break-words text-balance hover:text-[var(--foreground)]"
                >
                  {heading.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}

export function ArticleMeta({
  date,
  readingTime,
  tags,
}: {
  date: string
  readingTime: number
  tags: string[]
}) {
  const { dictionary } = useLanguage()

  return (
    <div className="mt-3 mb-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--muted-soft)]">
      <p className="text-sm">{date}</p>
      <span aria-hidden="true">·</span>
      <p className="text-sm">
        {readingTime} {dictionary.article.minRead}
      </p>
      {tags.length > 0 ? (
        <>
          <span aria-hidden="true">·</span>
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[0.78rem] lowercase tracking-[0.12em] text-[var(--muted)]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}
