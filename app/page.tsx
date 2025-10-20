"use client"

import { BlogSection } from "@/components/blog-section"
import { NetflixVideoPlayer } from "@/components/netflix-video-player"
import type { BlogPost, Project } from "@/lib/types"
import { Info, Mail, Phone, Play } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Home() {
  const [activeTab, setActiveTab] = useState("about")
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [blogLoading, setBlogLoading] = useState(true)
  const [projects, setProjects] = useState<Project[]>([])
  const [projectsLoading, setProjectsLoading] = useState(true)

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch("/api/blog")
        const data = await response.json()
        if (data.success && data.data) {
          setBlogPosts(data.data)
        }
      } catch (error) {
        console.log("[v0] Failed to fetch blog posts:", error)
      } finally {
        setBlogLoading(false)
      }
    }

    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects")
        const data = await response.json()
        if (data.success && data.data) {
          setProjects(data.data)
        }
      } catch (error) {
        console.log("[v0] Failed to fetch projects:", error)
      } finally {
        setProjectsLoading(false)
      }
    }

    fetchBlogPosts()
    fetchProjects()
  }, [])

  const skills = [
    "Media Strategy",
    "Video Editing",
    "Film Production",
    "Film Direction",
    "Script Writing",
    "Copywriting",
    "Drone Piloteering",
    "Motion Graphics",
    "Team Management",
    "Crisis Management",
  ]

  const employment = [
    {
      role: "Executive Producer",
      company: "Gaurs - The Film People",
      period: "May 2024 - Present",
    },
    {
      role: "Intern",
      company: "Full Moon Productions",
      period: "September 2023 - May 2024",
    },
    {
      role: "Associate Producer",
      company: "Gaurs - The Film People",
      period: "June 2023 - September 2023",
    },
  ]

  // Filter projects that have video URLs
  const videoProjects = projects.filter(project => project.videoUrl)

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Netflix-style Hero Section */}
      <section className="relative h-screen flex items-end justify-start overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://pub-f3452781d9104571a0e9e383ef6905ee.r2.dev/WhatsApp%20Image%202025-10-20%20at%2011.59.35%20PM.jpeg"
            alt="Tanmay Gaur"
            fill
            className="object-cover will-change-auto"
            priority
            quality={90}
            sizes="100vw"
          />
          {/* Netflix-style gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        </div>

        {/* Hero Content - Netflix style */}
        <div className="relative z-10 w-full max-w-2xl px-6 md:px-16 pb-32 md:pb-40">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white leading-tight">Tanmay Gaur</h1>
          <p className="text-xl md:text-2xl text-white mb-3 font-medium">
            Multi-speciality Filmmaker / Media Producer
          </p>
          <p className="text-base md:text-lg text-white/80 mb-8 max-w-xl leading-relaxed">
            "The indifference between risky and bold."
          </p>

          {/* Netflix-style action buttons */}
          <div className="flex gap-3 items-center flex-wrap">
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-black px-6 py-3 rounded font-bold transition-all transform hover:scale-105 shadow-lg"
            >
              <Play size={24} className="fill-black" />
              View Portfolio
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded font-bold transition-all transform hover:scale-105"
            >
              <Info size={20} />
              More Info
            </a>
          </div>
        </div>
      </section>

      {/* About Section - Netflix style */}
      <section id="about" className="py-16 md:py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 md:gap-12">
          {/* Tabs Navigation - Netflix style */}
          <div className="md:col-span-1">
            <div className="flex md:flex-col gap-2 md:gap-3 sticky top-20">
              {["about", "skills", "employment"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2.5 text-left font-semibold transition-all capitalize rounded-md ${activeTab === tab
                    ? "text-white bg-accent/90"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="md:col-span-3">
            {activeTab === "about" && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">About</h2>
                <p className="text-base md:text-lg text-white/80 leading-relaxed">
                  What do you get when you mix two unconventional and stubborn forces? Thankfully, a more balanced yet
                  twice as unconventional and stubborn solution. Now what happens if it just so happens, that both
                  elements of the original mixture come from long lines of service in the Army?….
                </p>
                <p className="text-base md:text-lg text-white/80 leading-relaxed">
                  Can someone who sounds vain, really be simply honest? How is it possible for someone to be both,
                  'outside the box' and 'by the book'? Why don't you dive deeper and find out? Let's talk.
                </p>
              </div>
            )}

            {activeTab === "skills" && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Skills & Expertise</h2>
                <p className="text-base md:text-lg text-white/70 leading-relaxed mb-8">
                  A proven track record across diverse areas of filmmaking and media production.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {skills.map((skill) => (
                    <div
                      key={skill}
                      className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/50 px-4 py-3 rounded-md transition-all text-center group"
                    >
                      <p className="text-white/90 font-medium text-sm group-hover:text-white transition">{skill}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "employment" && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Employment History</h2>
                <p className="text-base md:text-lg text-white/70 leading-relaxed mb-8">
                  Professional experience across production companies and media organizations.
                </p>
                <div className="space-y-4">
                  {employment.map((job, index) => (
                    <div key={index} className="bg-white/5 border-l-4 border-accent pl-6 pr-4 py-4 rounded-r-md hover:bg-white/10 transition-all">
                      <h3 className="text-lg font-bold text-white mb-1">{job.role}</h3>
                      <p className="text-accent font-semibold text-sm mb-1">{job.company}</p>
                      <p className="text-white/50 text-xs">{job.period}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Portfolio Section - Netflix style */}
      <section id="portfolio" className="py-16 md:py-24 px-6 md:px-16 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">Featured Work</h2>
          <p className="text-base md:text-lg text-white/70 mb-10 max-w-3xl leading-relaxed">
            Explore my latest projects across commercials, documentaries, and visual storytelling.
          </p>
          {projectsLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/20 border-t-accent"></div>
                <span className="text-white/60 text-sm">Loading...</span>
              </div>
            </div>
          ) : videoProjects.length > 0 ? (
            <NetflixVideoPlayer projects={videoProjects} />
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-md p-8 text-center">
              <p className="text-white/60">
                No video projects available. Add projects with video URLs to your Notion database.
              </p>
            </div>
          )}
        </div>
      </section>

      {!blogLoading && <BlogSection posts={blogPosts} />}

      {/* Contact Section - Netflix style */}
      <section id="contact" className="py-16 md:py-24 px-6 md:px-16 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Get in Touch</h2>
          <p className="text-base md:text-lg text-white/70 mb-12 max-w-2xl">
            Ready to bring your vision to life? Let's collaborate on your next project.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="tel:+919891946529"
              className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-6 py-5 rounded-md transition-all group"
            >
              <div className="p-3 bg-accent/20 rounded-full group-hover:bg-accent/30 transition">
                <Phone size={20} className="text-accent" />
              </div>
              <div className="text-left flex-1">
                <p className="text-xs text-white/50 mb-1">Phone</p>
                <p className="font-semibold text-white">+91 9891946529</p>
              </div>
            </a>

            <a
              href="mailto:tanmaygaur.gaurfilms@gmail.com"
              className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-6 py-5 rounded-md transition-all group"
            >
              <div className="p-3 bg-accent/20 rounded-full group-hover:bg-accent/30 transition">
                <Mail size={20} className="text-accent" />
              </div>
              <div className="text-left flex-1">
                <p className="text-xs text-white/50 mb-1">Email</p>
                <p className="font-semibold text-white text-sm">tanmaygaur.gaurfilms@gmail.com</p>
              </div>
            </a>
          </div>

          <p className="text-white/40 text-xs mt-12 text-center italic">
            Aman Kumar, Tussi Great ho, tumpe jaan nisaar. I promise I'll live up to you in a similar fashion in the
            future.
          </p>
        </div>
      </section>

      {/* Footer - Netflix style */}
      <footer className="border-t border-white/10 py-12 px-6 md:px-16 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-white/40 text-sm">&copy; 2025 Tanmay Gaur. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
