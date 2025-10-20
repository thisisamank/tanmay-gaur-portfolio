"use client"

import Image from "next/image"
import { portfolioData } from "@/lib/data"

export function AboutHero() {
  return (
    <section className="relative min-h-screen flex items-end pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={portfolioData.bio.photoUrl || "/placeholder.svg"}
          alt={portfolioData.bio.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-12">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 text-balance">{portfolioData.bio.name}</h1>
        <p className="text-2xl text-accent font-semibold mb-6">{portfolioData.bio.title}</p>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">{portfolioData.bio.aboutText}</p>
      </div>
    </section>
  )
}
