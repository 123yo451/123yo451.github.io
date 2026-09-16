import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

export function BlogPosts() {
  let allBlogs = getBlogPosts()

  if (process.env.NODE_ENV === "production")
    allBlogs = allBlogs.filter((blog) => blog.metadata.published)

  return (
    <div>
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
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col gap-1.5">
              <p className="font-mono text-muted-foreground text-xs font-light tabular-nums">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
              <p className="text-neutral-600 hover:text-neutral-900 text-xl font-medium">
                {post.metadata.title}
                {!post.metadata.published && <span className="text-neutral-300 italic">{" "}(draft)</span>}
              </p>
            </div>
          </Link>
        ))}
    </div>
  )
}
