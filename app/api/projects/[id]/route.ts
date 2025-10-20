import { portfolioData } from "@/lib/data"
import type { ApiResponse, Project } from "@/lib/types"

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const { id } = await params
    const project = portfolioData.projects.find((p) => p.id === id)

    if (!project) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Project not found",
      }
      return Response.json(response, { status: 404 })
    }

    const response: ApiResponse<Project> = {
      success: true,
      data: project as Project,
    }

    return Response.json(response)
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch project",
    }

    return Response.json(response, { status: 500 })
  }
}
