"use client"

import type { BlogPost } from "@/lib/types"
import Image from "next/image"
import Link from "next/link"

interface BlogGridProps {
  posts: BlogPost[]
}

export function BlogGrid({ posts }: BlogGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
      {posts.map((post) => (
        <Link key={post.id} href={`/blog/${post.slug}`}>
          <article className="netflix-card group cursor-pointer h-full flex flex-col rounded overflow-hidden bg-zinc-900 hover:bg-zinc-800 transition-all">
            {/* Image */}
            <div className="relative aspect-video bg-black overflow-hidden">
              <Image
                src={post.thumbnail || "/placeholder.svg?height=192&width=400&query=blog"}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
                quality={60}
              />

              {/* Hover overlay with gradient - Netflix style */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col p-4">
              <h3 className="text-sm md:text-base font-bold text-white mb-2 line-clamp-2">
                {post.title}
              </h3>

              <p className="text-xs md:text-sm text-zinc-400 mb-3 line-clamp-2 flex-1">{post.excerpt}</p>

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
  )
}
