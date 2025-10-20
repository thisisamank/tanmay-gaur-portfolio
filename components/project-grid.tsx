"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/lib/types"

interface ProjectGridProps {
  projects: Project[]
  selectedCategory?: string
}

export function ProjectGrid({ projects, selectedCategory }: ProjectGridProps) {
  const filteredProjects = selectedCategory ? projects.filter((p) => p.category === selectedCategory) : projects

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProjects.map((project) => (
        <Link key={project.id} href={`/work/${project.id}`}>
          <div className="group cursor-pointer">
            <div className="relative h-64 bg-card rounded-lg overflow-hidden mb-4">
              <Image
                src={project.thumbnailUrl || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition mb-2">
              {project.title}
            </h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{project.year}</span>
              {project.category && <Badge variant="secondary">{project.category}</Badge>}
            </div>
            <p className="text-sm text-muted-foreground">{project.role}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
