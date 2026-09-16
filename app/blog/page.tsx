import { BlogPosts } from '@/components/posts'

export const metadata = {
  title: 'Posts',
  description: 'All my blog posts.',
}

export default function Page() {
  return (
    <section>
      <BlogPosts />
    </section>
  )
}
