"use client"

import { Carousel } from "@/components/carousel"
import { portfolioData } from "@/lib/data"
import { useRouter } from "next/navigation"

export function RecentWorkSection() {
  const router = useRouter()

  // Get all projects sorted by year (most recent first)
  const recentProjects = [...portfolioData.projects]
    .sort((a, b) => b.year - a.year)
    .map((p) => ({
      id: p.id,
      title: p.title,
      thumbnail: p.thumbnailUrl,
      year: p.year,
      role: p.role,
    }))

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-border">
      <Carousel
        items={recentProjects}
        title="Recent Work"
        onItemClick={(item) => {
          router.push(`/work/${item.id}`)
        }}
      />
    </section>
  )
}
