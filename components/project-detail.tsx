"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Project } from "@/lib/types"
import { ChevronLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ProjectDetailProps {
  project: Project
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <Link href="/work" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition mb-8">
        <ChevronLeft className="w-4 h-4" />
        Back to Portfolio
      </Link>

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 text-balance">{project.title}</h1>
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-lg text-muted-foreground">{project.year}</span>
              {project.category && <Badge>{project.category}</Badge>}
              <span className="text-lg text-muted-foreground">{project.role}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden mb-12">
        <Image
          src={project.thumbnailUrl || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Description */}
      <div className="prose prose-invert max-w-none mb-12">
        <p className="text-lg text-muted-foreground leading-relaxed">{project.description}</p>
      </div>

      {/* Credits */}
      {project.credits.length > 0 && (
        <div className="bg-card rounded-lg p-6 mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-4">Credits</h2>
          <ul className="space-y-2">
            {project.credits.map((credit, index) => (
              <li key={index} className="text-muted-foreground">
                {credit}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Gallery */}
      {project.stillImages.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.stillImages.map((image, index) => (
              <div key={index} className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${project.title} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="border-t border-border pt-12 text-center">
        <p className="text-muted-foreground mb-6">Interested in working together?</p>
        <Link href="/#contact">
          <Button size="lg" className="bg-accent hover:bg-accent/90">
            Get in Touch
          </Button>
        </Link>
      </div>
    </article>
  )
}
