import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { ProjectDetail } from "@/components/project-detail"
import { getPortfolioProjects } from "@/lib/notion"
import type { Project } from "@/lib/types"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

interface ProjectPageProps {
  params: Promise<{ id: string }>
}

// Revalidate every 60 seconds to fetch fresh project data
export const revalidate = 60

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params
  
  try {
    const projects = await getPortfolioProjects()
    const project = projects.find((p: Project) => p.id === id)

    if (!project) {
      return {
        title: "Project Not Found",
      }
    }

    return {
      title: `${project.title} | Tanmay Gaur`,
      description: project.description,
      openGraph: {
        title: project.title,
        description: project.description,
        images: [project.thumbnailUrl],
      },
    }
  } catch {
    return {
      title: "Project | Tanmay Gaur",
    }
  }
}

export async function generateStaticParams() {
  try {
    const projects = await getPortfolioProjects()
    return projects.map((project: Project) => ({
      id: project.id,
    }))
  } catch {
    return []
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params

  try {
    const projects = await getPortfolioProjects()
    const project = projects.find((p: Project) => p.id === id)

    if (!project) {
      notFound()
    }

    return (
      <main className="min-h-screen bg-black">
        <Navigation />
        <div className="pt-16">
          <ProjectDetail project={project} />
        </div>
        <Footer />
      </main>
    )
  } catch (error) {
    console.error("Failed to fetch project:", error)
    notFound()
  }
}
