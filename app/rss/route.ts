import { baseUrl } from 'app/sitemap'
import { getBlogPosts } from 'app/blog/utils'
import { Locale } from 'app/i18n'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const locale = searchParams.get('lang') === 'en' ? 'en' : 'fr'
  let allBlogs = await getBlogPosts(locale as Locale)
  const blogPrefix = locale === 'fr' ? '/blog' : '/en/blog'
  const title = locale === 'fr' ? 'Dorian Michael' : 'Dorian Michael'
  const description =
    locale === 'fr'
      ? 'Flux RSS du blog en français'
      : 'English RSS feed for the blog'

  const itemsXml = allBlogs
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1
      }
      return 1
    })
    .map(
      (post) =>
        `<item>
          <title>${post.metadata.title}</title>
          <link>${baseUrl}${blogPrefix}/${post.slug}</link>
          <description>${post.metadata.summary || ''}</description>
          <pubDate>${new Date(
            post.metadata.publishedAt
          ).toUTCString()}</pubDate>
        </item>`
    )
    .join('\n')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>${title}</title>
        <link>${baseUrl}</link>
        <description>${description}</description>
        ${itemsXml}
    </channel>
  </rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}
