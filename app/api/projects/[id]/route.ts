import { portfolioData } from "@/lib/data"
import { getPortfolioProjects } from "@/lib/notion"
import type { ApiResponse, Project } from "@/lib/types"

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const { id } = await params
    
    // Try to get project from Notion first
    let project: Project | undefined
    
    try {
      const projects = await getPortfolioProjects()
      project = projects.find((p: Project) => p.id === id)
      
      // If not found in Notion, try static data
      if (!project) {
        project = portfolioData.projects.find((p) => p.id === id) as Project | undefined
      }
    } catch (error) {
      console.warn("Failed to fetch from Notion, using static data:", error)
      project = portfolioData.projects.find((p) => p.id === id) as Project | undefined
    }

    if (!project) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Project not found",
      }
      return Response.json(response, { status: 404 })
    }

    const response: ApiResponse<Project> = {
      success: true,
      data: project,
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
