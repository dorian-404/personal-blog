import { Locale, getDictionary } from 'app/i18n'
import { BlogPosts } from './posts'
import { HomeContent } from './home-content'

export function HomePageContent({ locale }: { locale: Locale }) {
  return (
    <HomeContent locale={locale}>
      <BlogPosts locale={locale} />
    </HomeContent>
  )
}

export function BlogIndexContent({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale)

  return (
    <section className="-mt-8 space-y-6">
      <div className="space-y-1">
        <h1 className="text-[1.85rem] font-medium tracking-[-0.03em] text-[var(--foreground)]">
          {dictionary.blog.title}
        </h1>
        <p className="text-[var(--muted)]">{dictionary.blog.description}</p>
      </div>
      <BlogPosts locale={locale} />
    </section>
  )
}
