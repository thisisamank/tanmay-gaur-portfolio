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
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Portfolio</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          A collection of my work across commercials, documentaries, and innovative visual projects.
        </p>
      </section>

      {/* Filter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === undefined ? "default" : "outline"}
            onClick={() => setSelectedCategory(undefined)}
            className="rounded-full"
          >
            All Projects
          </Button>
          {PROJECT_CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <ProjectGrid projects={portfolioData.projects as Project[]} selectedCategory={selectedCategory} />
      </section>

      <Footer />
    </main>
  )
}
