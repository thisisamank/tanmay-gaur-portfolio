import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { BlogPostContent } from "@/components/blog-post-content"
import { getBlogPostBySlug, getBlogPosts } from "@/lib/notion"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params

  try {
    const post = await getBlogPostBySlug(slug)

    if (!post) {
      return {
        title: "Post Not Found",
      }
    }

    return {
      title: `${post.title} | Blog`,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: [post.thumbnail],
      },
    }
  } catch {
    return {
      title: "Blog Post",
    }
  }
}

export async function generateStaticParams() {
  try {
    const posts = await getBlogPosts()
    return posts.map((post: { slug: string }) => ({
      slug: post.slug,
    }))
  } catch {
    return []
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params

  try {
    const post = await getBlogPostBySlug(slug)

    if (!post) {
      notFound()
    }

    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-16">
          <BlogPostContent post={post} />
        </div>
        <Footer />
      </main>
    )
  } catch {
    notFound()
  }
}
