"use client"

import { portfolioData } from "@/lib/data"
import { Badge } from "@/components/ui/badge"

export function SkillsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-foreground mb-6">Skills & Expertise</h2>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">{portfolioData.bio.skillsIntro}</p>
      </div>

      <div className="flex flex-wrap gap-3">
        {portfolioData.skills.map((skill) => (
          <Badge
            key={skill}
            variant="secondary"
            className="text-base py-2 px-4 hover:bg-accent hover:text-accent-foreground transition"
          >
            {skill}
          </Badge>
        ))}
      </div>
    </section>
  )
}
