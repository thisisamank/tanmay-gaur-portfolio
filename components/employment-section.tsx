"use client"

import { portfolioData } from "@/lib/data"

export function EmploymentSection() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-12 md:py-20 bg-black border-t border-zinc-900">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8 md:mb-12">History of Employment</h2>

      <div className="space-y-3 md:space-y-4">
        {portfolioData.employment.map((job, index) => (
          <div
            key={index}
            className="netflix-card bg-zinc-900 hover:bg-zinc-800 border-l-4 border-red-600 pl-4 md:pl-6 pr-4 py-4 rounded-r transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-2">
              <h3 className="text-base md:text-lg lg:text-xl font-bold text-white">{job.role}</h3>
              <p className="text-xs md:text-sm text-zinc-500 font-medium">
                {job.start} – {job.end}
              </p>
            </div>
            <p className="text-sm md:text-base text-red-500 font-semibold">{job.organization}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
