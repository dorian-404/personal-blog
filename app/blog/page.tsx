import { BlogPosts } from 'app/components/posts'

export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
}

export default function Page() {
  return (
    <section className="-mt-8 space-y-6">
      {/* <h1 className="text-[2rem] font-medium tracking-[-0.03em] text-[var(--foreground)]">
        Blogr
      </h1> */}
      <BlogPosts />
    </section>
  )
}
