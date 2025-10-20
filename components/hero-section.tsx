"use client"

import Image from "next/image"
import Link from "next/link"
import { portfolioData } from "@/lib/data"
import { Play, Info } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-end justify-start overflow-hidden pt-16">
      <div className="absolute inset-0 z-0">
        <Image
          src={portfolioData.bio.photoUrl || "/placeholder.svg"}
          alt="Tanmay Gaur"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 pb-20 md:pb-32 md:px-12">
        <h1 className="text-6xl md:text-7xl font-bold mb-4 text-foreground text-balance">{portfolioData.bio.name}</h1>
        <p className="text-2xl md:text-3xl text-accent mb-6 font-semibold">{portfolioData.bio.title}</p>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 italic max-w-xl">"{portfolioData.bio.quote}"</p>

        {/* Netflix-style action buttons */}
        <div className="flex gap-4 items-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded font-semibold transition"
          >
            <Play size={20} />
            View Portfolio
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 bg-secondary/50 hover:bg-secondary/70 text-foreground px-8 py-3 rounded font-semibold transition"
          >
            <Info size={20} />
            Learn More
          </Link>
        </div>
      </div>
    </section>
  )
}
