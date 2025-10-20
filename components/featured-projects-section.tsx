"use client"

import { Carousel } from "@/components/carousel"
import { featuredProjects } from "@/lib/data"
import { useRouter } from "next/navigation"

export function FeaturedProjectsSection() {
  const router = useRouter()

  const carouselProjects = featuredProjects.map((p) => ({
    id: p.id,
    title: p.title,
    thumbnail: p.thumbnailUrl,
    year: p.year,
    role: p.role,
  }))

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Carousel
        items={carouselProjects}
        title="Featured Projects"
        onItemClick={(item) => {
          router.push(`/work/${item.id}`)
        }}
      />
    </section>
  )
}
