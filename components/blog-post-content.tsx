"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { BlogPost } from "@/lib/types"
import { ChevronLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface BlogPostContentProps {
  post: BlogPost & { blocks?: unknown[] }
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <Link href="/blog" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition mb-8">
        <ChevronLeft className="w-4 h-4" />
        Back to Blog
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">{post.title}</h1>

        <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
          <time>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Featured Image */}
      {post.thumbnail && (
        <div className="relative w-full max-w-4xl mx-auto rounded-lg overflow-hidden mb-12">
          <Image
            src={post.thumbnail || "/placeholder.svg"}
            alt={post.title}
            width={1200}
            height={675}
            className="w-full h-auto object-cover"
            priority
            quality={75}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            unoptimized={post.thumbnail?.includes('prod-files-secure.s3.us-west-2.amazonaws.com') ||
              post.thumbnail?.includes('r2.dev') ||
              post.thumbnail?.includes('upload.wikimedia.org')}
          />
        </div>
      )}

      {/* Excerpt */}
      <p className="text-xl text-muted-foreground leading-relaxed mb-8">{post.excerpt}</p>

      {/* Content */}
      <div className="prose prose-invert max-w-none mb-12">
        {post.blocks && post.blocks.length > 0 ? (
          post.blocks.map((block: any, index: number) => {
            // Render different block types
            if (block.type === "paragraph") {
              const text = block.paragraph?.rich_text?.map((t: any) => t.plain_text).join("") || ""
              if (!text) return null
              return (
                <p key={block.id || index} className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {text}
                </p>
              )
            }

            if (block.type === "heading_1") {
              const text = block.heading_1?.rich_text?.map((t: any) => t.plain_text).join("") || ""
              return (
                <h1 key={block.id || index} className="text-4xl font-bold text-foreground mb-6 mt-8">
                  {text}
                </h1>
              )
            }

            if (block.type === "heading_2") {
              const text = block.heading_2?.rich_text?.map((t: any) => t.plain_text).join("") || ""
              return (
                <h2 key={block.id || index} className="text-3xl font-bold text-foreground mb-4 mt-8">
                  {text}
                </h2>
              )
            }

            if (block.type === "heading_3") {
              const text = block.heading_3?.rich_text?.map((t: any) => t.plain_text).join("") || ""
              return (
                <h3 key={block.id || index} className="text-2xl font-bold text-foreground mb-4 mt-6">
                  {text}
                </h3>
              )
            }

            if (block.type === "bulleted_list_item") {
              const text = block.bulleted_list_item?.rich_text?.map((t: any) => t.plain_text).join("") || ""
              return (
                <li key={block.id || index} className="text-lg text-muted-foreground leading-relaxed mb-2 ml-6 list-disc">
                  {text}
                </li>
              )
            }

            if (block.type === "numbered_list_item") {
              const text = block.numbered_list_item?.rich_text?.map((t: any) => t.plain_text).join("") || ""
              return (
                <li key={block.id || index} className="text-lg text-muted-foreground leading-relaxed mb-2 ml-6 list-decimal">
                  {text}
                </li>
              )
            }

            if (block.type === "quote") {
              const text = block.quote?.rich_text?.map((t: any) => t.plain_text).join("") || ""
              return (
                <blockquote key={block.id || index} className="border-l-4 border-accent pl-6 py-2 my-6 italic text-muted-foreground">
                  {text}
                </blockquote>
              )
            }

            if (block.type === "code") {
              const text = block.code?.rich_text?.map((t: any) => t.plain_text).join("") || ""
              return (
                <pre key={block.id || index} className="bg-secondary/50 p-4 rounded-lg overflow-x-auto my-6">
                  <code className="text-sm text-foreground">{text}</code>
                </pre>
              )
            }

            if (block.type === "image") {
              const url = block.image?.file?.url || block.image?.external?.url
              if (!url) return null

              // For external URLs, use unoptimized to avoid timeout issues
              const isExternal = url.includes('prod-files-secure.s3.us-west-2.amazonaws.com') ||
                url.includes('r2.dev') ||
                url.includes('upload.wikimedia.org')

              return (
                <div key={block.id || index} className="relative w-full max-w-4xl mx-auto rounded-lg overflow-hidden my-8">
                  <Image
                    src={url}
                    alt="Blog content image"
                    width={800}
                    height={450}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                    quality={75}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    unoptimized={isExternal}
                    priority={false}
                  />
                </div>
              )
            }

            return null
          })
        ) : (
          <p className="text-lg text-muted-foreground leading-relaxed">
            {post.content || "No content available for this post."}
          </p>
        )}
      </div>

      {/* CTA */}
      <div className="border-t border-border pt-12 text-center">
        <p className="text-muted-foreground mb-6">Have a project in mind?</p>
        <Link href="/contact">
          <Button size="lg" className="bg-accent hover:bg-accent/90">
            Get in Touch
          </Button>
        </Link>
      </div>
    </article>
  )
}
