import Link from 'next/link'
import { getBlogPosts } from 'app/blog/utils'
import { Locale } from 'app/i18n'

export function BlogPosts({ locale }: { locale: Locale }) {
  let allBlogs = getBlogPosts(locale)
  let blogPrefix = locale === 'fr' ? '/blog' : '/en/blog'

  return (
    <div className="space-y-2">
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="block w-fit text-[var(--muted-strong)] underline underline-offset-4 decoration-[var(--anchor)] hover:text-[var(--accent)]"
            href={`${blogPrefix}/${post.slug}`}
          >
            {post.metadata.title}
          </Link>
        ))}
    </div>
  )
}
