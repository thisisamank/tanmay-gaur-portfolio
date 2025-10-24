import { AboutHero } from "@/components/about-hero"
import { EmploymentSection } from "@/components/employment-section"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { SkillsSection } from "@/components/skills-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | Tanmay Gaur",
  description: "Learn more about Tanmay Gaur, a multi-speciality filmmaker and media producer.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navigation />
      <AboutHero />
      <SkillsSection />
      <EmploymentSection />
      <Footer />
    </main>
  )
}
