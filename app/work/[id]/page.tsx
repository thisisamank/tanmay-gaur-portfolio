import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProjectDetail } from "@/components/project-detail"
import { portfolioData } from "@/lib/data"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

interface ProjectPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params
  const project = portfolioData.projects.find((p) => p.id === id)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: `${project.title} | ${portfolioData.bio.name}`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.thumbnailUrl],
    },
  }
}

export async function generateStaticParams() {
  return portfolioData.projects.map((project) => ({
    id: project.id,
  }))
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params
  const project = portfolioData.projects.find((p) => p.id === id)

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        <ProjectDetail project={project} />
      </div>
      <Footer />
    </main>
  )
}
