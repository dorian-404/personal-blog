import { notFound } from 'next/navigation'
import { ArticleMeta, ArticleSidebar } from 'app/components/article-ui'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getBlogPosts } from 'app/blog/utils'
import { baseUrl } from 'app/sitemap'


// 

export async function generateStaticParams() {
  let posts = getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  let { slug } = await params
  let post = getBlogPosts().find((post) => post.slug === slug)
  if (!post) {
    return
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  let { slug } = await params
  let post = getBlogPosts().find((post) => post.slug === slug)

  if (!post) {
    notFound()
  }

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
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'Dorian Michaël',
            },
          }),
        }}
      />
      <ArticleSidebar headings={post.headings} />
      <div className="w-full max-w-[720px] lg:pt-1">
        <h1 className="title text-[2rem] font-medium tracking-[-0.07em] leading-[1.2] text-[var(--foreground)]">
          {post.metadata.title}
        </h1>
        <ArticleMeta
          date={formatDate(post.metadata.publishedAt)}
          readingTime={post.readingTime}
          tags={post.tags}
        />
        <article className="prose max-w-none">
          <CustomMDX source={post.content} />
        </article>
      </div>
    </section>
  )
}
