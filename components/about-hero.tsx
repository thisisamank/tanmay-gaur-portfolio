"use client"

import { portfolioData } from "@/lib/data"
import Image from "next/image"

export function AboutHero() {
  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-end pt-32 pb-20 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={portfolioData.bio.photoUrl || "/placeholder.svg"}
          alt={portfolioData.bio.name}
          fill
          className="object-cover"
          priority
        />
        {/* Netflix-style gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content - Netflix style */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 w-full">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">{portfolioData.bio.name}</h1>
          <p className="text-xl md:text-2xl text-white font-semibold mb-6">{portfolioData.bio.title}</p>
          <p className="text-base md:text-lg text-zinc-300 leading-relaxed max-w-2xl">{portfolioData.bio.aboutText}</p>
        </div>
      </div>
    </section>
  )
}
