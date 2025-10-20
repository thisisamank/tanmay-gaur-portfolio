import { portfolioData } from "@/lib/data"
import type { ApiResponse, Project } from "@/lib/types"

export async function GET(): Promise<Response> {
  try {
    const projects: Project[] = portfolioData.projects

    const response: ApiResponse<Project[]> = {
      success: true,
      data: projects,
    }

    return Response.json(response)
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch projects",
    }

    return Response.json(response, { status: 500 })
  }
}
