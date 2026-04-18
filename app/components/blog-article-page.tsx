import { notFound } from 'next/navigation'
import { ArticleMeta, ArticleSidebar } from 'app/components/article-ui'
import { CustomMDX } from 'app/components/mdx'
import { Locale } from 'app/i18n'
import { formatDate, getBlogPost } from 'app/blog/utils'
import { baseUrl } from 'app/sitemap'

export function BlogArticlePage({
  locale,
  slug,
}: {
  locale: Locale
  slug: string
}) {
  const post = getBlogPost(locale, slug)

  if (!post) {
    notFound()
  }

  const postPath =
    locale === 'fr' ? `/blog/${post.slug}` : `/en/blog/${post.slug}`

  return (
    <section className="relative mx-auto w-full max-w-6xl">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}${postPath}`,
            author: {
              '@type': 'Person',
              name: 'Dorian Michaël',
            },
          }),
        }}
      />
      <ArticleSidebar headings={post.headings} locale={locale} />
      <div className="w-full max-w-[720px] lg:pt-1">
        <h1 className="title text-[2rem] font-medium leading-[1.2] tracking-[-0.07em] text-[var(--foreground)]">
          {post.metadata.title}
        </h1>
        <ArticleMeta
          date={formatDate(post.metadata.publishedAt, locale)}
          readingTime={post.readingTime}
          tags={post.tags}
          locale={locale}
        />
        <article className="prose max-w-none">
          <CustomMDX source={post.content} />
        </article>
      </div>
    </section>
  )
}
