"use client"

import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { NetflixVideoPlayer } from "@/components/netflix-video-player"
import { ProjectGrid } from "@/components/project-grid"
import { PROJECT_CATEGORIES } from "@/lib/constants"
import type { Project } from "@/lib/types"
import { useEffect, useState } from "react"

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects")
        const data = await response.json()
        if (data.success && data.data) {
          setProjects(data.data)
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Filter projects based on selected category
  const filteredProjects = selectedCategory 
    ? projects.filter(p => p.category === selectedCategory)
    : projects

  // Separate video projects and non-video projects
  const videoProjects = filteredProjects.filter(p => p.videoUrl)
  const nonVideoProjects = filteredProjects.filter(p => !p.videoUrl)

  return (
    <main className="min-h-screen bg-black">
      <Navigation />

      {/* Hero Section - Netflix style */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-16 pt-32">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Portfolio</h1>
        <p className="text-base md:text-lg text-zinc-400 max-w-2xl">
          A collection of my work across commercials, documentaries, and innovative visual projects.
        </p>
      </section>

      {/* Filter Section - Netflix style */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 mb-12">
        <div className="flex flex-wrap gap-2 md:gap-3">
          <button
            onClick={() => setSelectedCategory(undefined)}
            className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full font-bold text-sm md:text-base transition-all ${
              selectedCategory === undefined
                ? "bg-white text-black hover:bg-white/90"
                : "bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700"
            }`}
          >
            All Projects
          </button>
          {PROJECT_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full font-bold text-sm md:text-base transition-all ${
                selectedCategory === category
                  ? "bg-white text-black hover:bg-white/90"
                  : "bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 pb-20">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-zinc-800 border-t-red-600"></div>
              <span className="text-zinc-500 text-sm">Loading projects...</span>
            </div>
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 text-center">
            <p className="text-zinc-400">
              No projects available. Please set up your Notion projects database.
            </p>
          </div>
        ) : (
          <div className="space-y-16">
            {/* Video Projects - Netflix Player */}
            {videoProjects.length > 0 && (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Video Projects</h2>
                <NetflixVideoPlayer projects={videoProjects} />
              </div>
            )}

            {/* Non-Video Projects - Grid */}
            {nonVideoProjects.length > 0 && (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                  {videoProjects.length > 0 ? "Other Projects" : "All Projects"}
                </h2>
                <ProjectGrid projects={nonVideoProjects} selectedCategory={undefined} />
              </div>
            )}
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}
