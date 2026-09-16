import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getBlogPosts } from 'app/blog/utils'

export async function generateStaticParams() {
  let posts = getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function Blog({ params }: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  let post = getBlogPosts().find((post) => post.slug === slug)

  const env = process.env.NODE_ENV

  if (!post) {
    notFound()
  }

  if (!post.published && env === 'production') {
    notFound()
  }

  return (
    <section>
      <h1 className="title font-serif font-medium text-3xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-4 mb-8 text-sm">
        <p className="text-xs font-mono text-neutral-400">
          {formatDate(post.metadata.publishedAt)} {post.metadata.updatedAt && `(Last updated: ${formatDate(post.metadata.updatedAt)})`}
        </p>
      </div>
      <article className="prose">
        <CustomMDX dir={post.dir} source={post.content} />
      </article>
    </section>
  )
}
