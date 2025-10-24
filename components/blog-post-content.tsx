"use client"

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
    <article className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-12">
      {/* Back Button - Netflix style */}
      <Link href="/blog" className="inline-flex items-center gap-2 text-white hover:text-zinc-300 transition mb-8 font-bold">
        <ChevronLeft className="w-5 h-5" />
        Back to Blog
      </Link>

      {/* Header - Netflix style */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">{post.title}</h1>

        <div className="flex flex-wrap items-center gap-3 text-zinc-400">
          <time className="font-medium">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 bg-zinc-800 text-zinc-200 rounded text-xs font-bold uppercase tracking-wider border border-zinc-700">
                  {tag}
                </span>
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

      {/* Excerpt - Netflix style */}
      <p className="text-lg md:text-xl text-zinc-300 leading-relaxed mb-8">{post.excerpt}</p>

      {/* Content - Netflix style */}
      <div className="prose prose-invert max-w-none mb-12">
        {post.blocks && post.blocks.length > 0 ? (
          post.blocks.map((block: any, index: number) => {
            // Render different block types
            if (block.type === "paragraph") {
              const text = block.paragraph?.rich_text?.map((t: any) => t.plain_text).join("") || ""
              if (!text) return null
              return (
                <p key={block.id || index} className="text-base md:text-lg text-zinc-300 leading-relaxed mb-6">
                  {text}
                </p>
              )
            }

            if (block.type === "heading_1") {
              const text = block.heading_1?.rich_text?.map((t: any) => t.plain_text).join("") || ""
              return (
                <h1 key={block.id || index} className="text-3xl md:text-4xl font-bold text-white mb-6 mt-10">
                  {text}
                </h1>
              )
            }

            if (block.type === "heading_2") {
              const text = block.heading_2?.rich_text?.map((t: any) => t.plain_text).join("") || ""
              return (
                <h2 key={block.id || index} className="text-2xl md:text-3xl font-bold text-white mb-4 mt-8">
                  {text}
                </h2>
              )
            }

            if (block.type === "heading_3") {
              const text = block.heading_3?.rich_text?.map((t: any) => t.plain_text).join("") || ""
              return (
                <h3 key={block.id || index} className="text-xl md:text-2xl font-bold text-white mb-4 mt-6">
                  {text}
                </h3>
              )
            }

            if (block.type === "bulleted_list_item") {
              const text = block.bulleted_list_item?.rich_text?.map((t: any) => t.plain_text).join("") || ""
              return (
                <li key={block.id || index} className="text-base md:text-lg text-zinc-300 leading-relaxed mb-2 ml-6 list-disc">
                  {text}
                </li>
              )
            }

            if (block.type === "numbered_list_item") {
              const text = block.numbered_list_item?.rich_text?.map((t: any) => t.plain_text).join("") || ""
              return (
                <li key={block.id || index} className="text-base md:text-lg text-zinc-300 leading-relaxed mb-2 ml-6 list-decimal">
                  {text}
                </li>
              )
            }

            if (block.type === "quote") {
              const text = block.quote?.rich_text?.map((t: any) => t.plain_text).join("") || ""
              return (
                <blockquote key={block.id || index} className="border-l-4 border-red-600 pl-6 py-2 my-6 italic text-zinc-300 bg-zinc-900/50 rounded-r">
                  {text}
                </blockquote>
              )
            }

            if (block.type === "code") {
              const text = block.code?.rich_text?.map((t: any) => t.plain_text).join("") || ""
              return (
                <pre key={block.id || index} className="bg-zinc-900 p-4 rounded overflow-x-auto my-6 border border-zinc-800">
                  <code className="text-sm text-zinc-300">{text}</code>
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
          <p className="text-base md:text-lg text-zinc-300 leading-relaxed">
            {post.content || "No content available for this post."}
          </p>
        )}
      </div>

      {/* CTA - Netflix style */}
      <div className="border-t border-zinc-800 pt-12 text-center">
        <p className="text-zinc-400 mb-6 text-lg">Have a project in mind?</p>
        <Link href="/#contact">
          <Button size="lg" className="bg-white hover:bg-white/90 text-black font-bold px-8 py-6 text-lg">
            Get in Touch
          </Button>
        </Link>
      </div>
    </article>
  )
}
