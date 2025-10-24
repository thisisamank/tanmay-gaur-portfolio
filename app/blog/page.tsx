import { BlogGrid } from "@/components/blog-grid"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { getBlogPosts } from "@/lib/notion"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | Tanmay Gaur",
  description: "Thoughts on filmmaking, production, and creative storytelling.",
}

export default async function BlogPage() {
  let posts = []
  let error = null

  try {
    posts = await getBlogPosts()
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load blog posts"
  }

  return (
    <main className="min-h-screen bg-black">
      <Navigation />

      {/* Hero Section - Netflix style */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-16 pt-32">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Blog</h1>
        <p className="text-base md:text-lg text-zinc-400 max-w-2xl">
          Thoughts on filmmaking, production, and creative storytelling.
        </p>
      </section>

      {/* Blog Posts */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 pb-20">
        {error ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 text-center">
            <p className="text-zinc-400">
              Blog posts are not yet configured. Please set up your Notion API credentials to enable blog functionality.
            </p>
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 text-center">
            <p className="text-zinc-400">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <BlogGrid posts={posts} />
        )}
      </section>

      <Footer />
    </main>
  )
}
