import { getBlogPosts } from "@/lib/notion"
import type { ApiResponse, BlogPost } from "@/lib/types"

export async function GET(): Promise<Response> {
  try {
    const posts = await getBlogPosts()

    const response: ApiResponse<BlogPost[]> = {
      success: true,
      data: posts,
    }

    return Response.json(response)
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch blog posts",
    }

    return Response.json(response, { status: 500 })
  }
}
