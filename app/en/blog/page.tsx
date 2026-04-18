import { getDictionary } from 'app/i18n'
import { BlogIndexContent } from 'app/components/blog-page-content'

export const metadata = {
  title: 'Blog',
  description: getDictionary('en').blog.description,
}

export default function EnglishBlogPage() {
  return <BlogIndexContent locale="en" />
}
