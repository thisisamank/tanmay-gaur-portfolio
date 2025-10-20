"use client"

import type { BlogPost } from "@/lib/types"
import Image from "next/image"
import Link from "next/link"

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
    <section className="py-16 md:py-24 px-6 md:px-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">Latest Stories</h2>
        <p className="text-base md:text-lg text-white/70 mb-10 max-w-3xl">
          Insights, stories, and deep dives into filmmaking, production, and creative direction.
        </p>

        {/* Blog Grid - Netflix style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <article className="group cursor-pointer transition-all duration-200">
                {/* Image */}
                <div className="relative aspect-video bg-black rounded-md overflow-hidden mb-3">
                  <Image
                    src={post.thumbnail || "/placeholder.svg?height=192&width=400&query=blog"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                </div>

                {/* Content */}
                <div className="px-1">
                  <h3 className="text-base font-semibold text-white group-hover:text-white/90 transition mb-2 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-sm text-white/60 mb-3 line-clamp-2">{post.excerpt}</p>

                  {/* Footer */}
                  <div className="flex items-center gap-3">
                    <time className="text-xs text-white/40">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                    {post.tags && post.tags.length > 0 && (
                      <>
                        <span className="text-white/40">•</span>
                        <span className="text-xs text-white/50">{post.tags[0]}</span>
                      </>
                    )}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* View All Link - Netflix style */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white px-8 py-3 rounded-md font-semibold transition-all"
          >
            Explore More Stories
          </Link>
        </div>
      </div>
    </section>
  )
}
