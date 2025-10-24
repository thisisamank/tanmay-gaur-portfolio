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
    <section className="py-12 md:py-20 px-4 sm:px-6 md:px-12 lg:px-16 bg-black">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-white">Blogs</h2>
        <p className="text-sm md:text-base lg:text-lg text-zinc-400 mb-8 md:mb-10 max-w-3xl">
          Unfiltered thoughts, bold takes, and behind-the-scenes stories from a mind that refuses to stay in line.
        </p>

        {/* Blog Grid - Netflix style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {displayPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <article className="netflix-card group cursor-pointer transition-all duration-300 rounded overflow-hidden bg-zinc-900 hover:bg-zinc-800">
                {/* Image */}
                <div className="relative aspect-video bg-black overflow-hidden">
                  <Image
                    src={post.thumbnail || "/placeholder.svg?height=192&width=400&query=blog"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                    quality={75}
                    unoptimized={post.thumbnail?.includes('prod-files-secure.s3.us-west-2.amazonaws.com') ||
                      post.thumbnail?.includes('r2.dev') ||
                      post.thumbnail?.includes('upload.wikimedia.org')}
                    priority={false}
                  />

                  {/* Hover overlay with gradient - Netflix style */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-sm md:text-base font-bold text-white group-hover:text-white transition mb-2 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs md:text-sm text-zinc-400 mb-3 line-clamp-2">{post.excerpt}</p>

                  {/* Footer */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <time className="text-xs text-zinc-500 font-medium">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                    {post.tags && post.tags.length > 0 && (
                      <>
                        <span className="text-zinc-600">•</span>
                        <span className="text-xs text-zinc-500 font-medium">{post.tags[0]}</span>
                      </>
                    )}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* View All Link - Netflix style */}
        <div className="mt-10 md:mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 text-white px-8 py-3 rounded-md font-bold text-sm md:text-base transition-all"
          >
            Explore More Stories
          </Link>
        </div>
      </div>
    </section>
  )
}
