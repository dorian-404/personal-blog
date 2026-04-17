import Link from 'next/link'
import { getBlogPosts } from 'app/blog/utils'

export function BlogPosts() {
  let allBlogs = getBlogPosts()

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
            href={`/blog/${post.slug}`}
          >
            {post.metadata.title}
          </Link>
        ))}
    </div>
  )
}
