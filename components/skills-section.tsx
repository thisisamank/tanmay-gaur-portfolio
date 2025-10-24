"use client"

import { portfolioData } from "@/lib/data"

export function SkillsSection() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-12 md:py-20 bg-black">
      <div className="mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">Skills & Expertise</h2>
        <p className="text-sm md:text-base lg:text-lg text-zinc-400 leading-relaxed max-w-3xl">{portfolioData.bio.skillsIntro}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
        {portfolioData.skills.map((skill) => (
          <div
            key={skill}
            className="netflix-card bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 px-3 md:px-4 py-2.5 md:py-3 rounded transition-all text-center cursor-default"
          >
            <p className="text-white font-semibold text-xs md:text-sm">{skill}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
