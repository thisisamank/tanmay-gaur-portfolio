import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { BlogGrid } from "@/components/blog-grid"
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
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Blog</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Thoughts on filmmaking, production, and creative storytelling.
        </p>
      </section>

      {/* Blog Posts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {error ? (
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <p className="text-muted-foreground">
              Blog posts are not yet configured. Please set up your Notion API credentials to enable blog functionality.
            </p>
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <BlogGrid posts={posts} />
        )}
      </section>

      <Footer />
    </main>
  )
}
