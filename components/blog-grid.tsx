"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import type { BlogPost } from "@/lib/types"

interface BlogGridProps {
  posts: BlogPost[]
}

export function BlogGrid({ posts }: BlogGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Link key={post.id} href={`/blog/${post.slug}`}>
          <article className="group cursor-pointer h-full flex flex-col">
            {/* Image */}
            <div className="relative h-48 bg-card rounded-lg overflow-hidden mb-4">
              <Image
                src={post.thumbnail || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col">
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
  )
}
