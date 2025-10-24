"use client"

import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { ProjectGrid } from "@/components/project-grid"
import { Button } from "@/components/ui/button"
import { PROJECT_CATEGORIES } from "@/lib/constants"
import { portfolioData } from "@/lib/data"
import type { Project } from "@/lib/types"
import { useState } from "react"

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)

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
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === undefined ? "default" : "outline"}
            onClick={() => setSelectedCategory(undefined)}
            className="rounded-full bg-white text-black hover:bg-white/90 border-none font-bold"
          >
            All Projects
          </Button>
          {PROJECT_CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category
                ? "rounded-full bg-white text-black hover:bg-white/90 border-none font-bold"
                : "rounded-full bg-zinc-800 text-white hover:bg-zinc-700 border-zinc-700 font-bold"
              }
            >
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 pb-20">
        <ProjectGrid projects={portfolioData.projects as Project[]} selectedCategory={selectedCategory} />
      </section>

      <Footer />
    </main>
  )
}
