import { portfolioData } from "@/lib/data"
import { getPortfolioProjects } from "@/lib/notion"
import type { ApiResponse, Project } from "@/lib/types"

export async function GET(): Promise<Response> {
  try {
    // Try to get projects from Notion first, fallback to static data
    let projects: Project[]

    try {
      projects = await getPortfolioProjects()
      // If no projects from Notion, use static data
      if (projects.length === 0) {
        projects = portfolioData.projects as Project[]
      }
    } catch (error) {
      console.warn("Failed to fetch projects from Notion, using static data:", error)
      projects = portfolioData.projects as Project[]
    }

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
