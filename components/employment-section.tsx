"use client"

import { portfolioData } from "@/lib/data"

export function EmploymentSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
      <h2 className="text-4xl font-bold text-foreground mb-12">History of Employment</h2>

      <div className="space-y-8">
        {portfolioData.employment.map((job, index) => (
          <div key={index} className="border-l-4 border-accent pl-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-2">
              <h3 className="text-2xl font-bold text-foreground">{job.role}</h3>
              <p className="text-sm text-muted-foreground">
                {job.start} – {job.end}
              </p>
            </div>
            <p className="text-lg text-accent font-semibold">{job.organization}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
