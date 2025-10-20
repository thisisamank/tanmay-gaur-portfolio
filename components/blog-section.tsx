"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import type { BlogPost } from "@/lib/types"

interface BlogSectionProps {
  posts: BlogPost[]
}

export function BlogSection({ posts }: BlogSectionProps) {
  if (!posts || posts.length === 0) {
    return null
  }

  // Show only the first 3 posts
  const displayPosts = posts.slice(0, 3)

  return (
    <section className="py-20 md:py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Latest Blogs</h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
          Insights, stories, and deep dives into filmmaking, production, and creative direction.
        </p>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <article className="group cursor-pointer h-full flex flex-col rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                {/* Image */}
                <div className="relative h-48 bg-card overflow-hidden">
                  <Image
                    src={post.thumbnail || "/placeholder.svg?height=192&width=400&query=blog"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col bg-secondary/20 p-4">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition mb-2 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">{post.excerpt}</p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <time className="text-xs text-muted-foreground">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                    {post.tags && post.tags.length > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {post.tags[0]}
                      </Badge>
                    )}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded font-semibold transition"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  )
}
