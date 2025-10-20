import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AboutHero } from "@/components/about-hero"
import { SkillsSection } from "@/components/skills-section"
import { EmploymentSection } from "@/components/employment-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | Tanmay Gaur",
  description: "Learn more about Tanmay Gaur, a multi-speciality filmmaker and media producer.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <AboutHero />
      <SkillsSection />
      <EmploymentSection />
      <Footer />
    </main>
  )
}
