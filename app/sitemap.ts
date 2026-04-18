import { getBlogPosts } from 'app/blog/utils'

export const baseUrl = 'https://mishaeldorian.com'

export default async function sitemap() {
  let frenchBlogs = getBlogPosts('fr').map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let englishBlogs = getBlogPosts('en').map((post) => ({
    url: `${baseUrl}/en/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let routes = ['', '/blog', '/en', '/en/blog'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...frenchBlogs, ...englishBlogs]
}
