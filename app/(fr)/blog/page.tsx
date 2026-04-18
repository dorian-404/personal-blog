import { getDictionary } from 'app/i18n'
import { BlogIndexContent } from 'app/components/blog-page-content'

export const metadata = {
  title: 'Blog',
  description: getDictionary('fr').blog.description,
}

export default function FrenchBlogPage() {
  return <BlogIndexContent locale="fr" />
}
