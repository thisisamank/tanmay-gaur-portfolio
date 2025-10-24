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
    "Generative AI",
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

  // Filter projects that have video URLs and are featured
  const videoProjects = projects.filter(project => project.videoUrl && project.featured)

  return (
    <main className="min-h-screen bg-black text-foreground">
      {/* Netflix-style Hero Section */}
      <section className="relative h-[85vh] md:h-screen flex items-end justify-start overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://pub-f3452781d9104571a0e9e383ef6905ee.r2.dev/WhatsApp%20Image%202025-10-20%20at%2011.59.35%20PM.jpeg"
            alt="Tanmay Gaur"
            fill
            className="object-cover will-change-auto"
            priority
            quality={75}
            sizes="100vw"
            unoptimized={true}
          />
          {/* Netflix-style gradient overlays - more aggressive */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Hero Content - Netflix style */}
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-12 lg:px-16 pb-24 md:pb-32 lg:pb-40 max-w-[1400px] mx-auto">
          <div className="max-w-2xl">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 text-white leading-none tracking-tight">
              Tanmay Gaur
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white mb-4 font-semibold">
              Multi-speciality Filmmaker / Media Producer
            </p>
            <p className="text-sm sm:text-base md:text-lg text-white/90 mb-6 md:mb-8 max-w-xl leading-relaxed font-medium">
              "The difference between risky and bold."
            </p>

            {/* Netflix-style action buttons */}
            <div className="flex gap-3 items-center flex-wrap">
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-white/90 text-black px-6 md:px-8 py-2.5 md:py-3 rounded-md font-bold text-base md:text-lg transition-all duration-200 shadow-lg"
              >
                <Play size={24} className="fill-black" />
                View Portfolio
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center gap-2 bg-zinc-600/70 hover:bg-zinc-600/90 backdrop-blur-sm text-white px-6 md:px-8 py-2.5 md:py-3 rounded-md font-bold text-base md:text-lg transition-all duration-200"
              >
                <Info size={20} />
                More Info
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Netflix style */}
      <section id="about" className="py-12 md:py-20 px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-4 gap-6 md:gap-12">
          {/* Tabs Navigation - Netflix style */}
          <div className="md:col-span-1">
            <div className="flex md:flex-col gap-2 sticky top-20">
              {["about", "skills", "employment"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 text-left font-bold transition-all capitalize text-sm md:text-base rounded ${activeTab === tab
                    ? "text-white bg-zinc-800 border-l-4 border-red-600"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900/50"
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
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">About</h2>
                <div className="space-y-4">
                  <p className="text-sm md:text-base lg:text-lg text-zinc-300 leading-relaxed">
                    What do you get when you mix two unconventional and stubborn forces? Thankfully, a more balanced yet
                    twice as unconventional and stubborn solution. Now what happens if it just so happens, that both
                    elements of the original mixture come from long lines of service in the Army?….
                  </p>
                  <p className="text-sm md:text-base lg:text-lg text-zinc-300 leading-relaxed">
                    Can someone who sounds vain, really be simply honest? How is it possible for someone to be both,
                    'outside the box' and 'by the book'? Why don't you dive deeper and find out? Let's talk.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "skills" && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">Skills & Expertise</h2>
                <p className="text-sm md:text-base lg:text-lg text-zinc-400 leading-relaxed mb-8">
                  Don't worry, I am not just some boastful, yet another over-confident youngster. If I couldn't live up to my claims, I know better than to bluff people much more adept to negotiations than myself.
                  Here's a few of my skills I have a proven track record in executing.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                  {skills.map((skill) => (
                    <div
                      key={skill}
                      className="netflix-card bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 px-3 md:px-4 py-2.5 md:py-3 rounded transition-all text-center cursor-default"
                    >
                      <p className="text-white font-semibold text-xs md:text-sm">{skill}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "employment" && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">History of employment</h2>
                <p className="text-sm md:text-base lg:text-lg text-zinc-400 leading-relaxed mb-8">
                  I know, I know. A second generation who got everything served to him on a silver platter. But are you sure that's the case? You absolutely certain what you see as a risk isn't really the boldest hiring decision you'll make?? You know what they say about high risk situations?
                </p>
                <div className="space-y-3">
                  {employment.map((job, index) => (
                    <div
                      key={index}
                      className="netflix-card bg-zinc-900 hover:bg-zinc-800 border-l-4 border-red-600 pl-4 md:pl-6 pr-4 py-4 rounded-r transition-all"
                    >
                      <h3 className="text-base md:text-lg font-bold text-white mb-1">{job.role}</h3>
                      <p className="text-red-500 font-semibold text-xs md:text-sm mb-1">{job.company}</p>
                      <p className="text-zinc-500 text-xs">{job.period}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Portfolio Section - Netflix style */}
      <section id="portfolio" className="py-12 md:py-20 px-4 sm:px-6 md:px-12 lg:px-16 bg-black">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-white">Portfolio</h2>
          <p className="text-sm md:text-base lg:text-lg text-zinc-400 mb-8 md:mb-10 max-w-3xl leading-relaxed">
            Now, finally, what you're really here for, some of my top picks from the projects I've worked on. I suggest you read the blogs section after this, I guarantee you'll notice what I can achieve is far greater than what you've guessed so far.
          </p>
          {projectsLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-zinc-800 border-t-red-600"></div>
                <span className="text-zinc-500 text-sm">Loading...</span>
              </div>
            </div>
          ) : videoProjects.length > 0 ? (
            <NetflixVideoPlayer projects={videoProjects} />
          ) : (
            <div className="bg-zinc-900 border border-zinc-800 rounded-md p-8 text-center">
              <p className="text-zinc-400">
                No featured video projects available. Mark projects as featured and add video URLs in your Notion database.
              </p>
            </div>
          )}
        </div>
      </section>

      {!blogLoading && <BlogSection posts={blogPosts} />}

      {/* Contact Section - Netflix style */}
      <section id="contact" className="py-12 md:py-20 px-4 sm:px-6 md:px-12 lg:px-16 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white">Get in Touch</h2>
          <p className="text-sm md:text-base lg:text-lg text-zinc-400 mb-8 md:mb-12 max-w-2xl">
            As I have said before, Let's Talk.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <a
              href="tel:+919891946529"
              className="netflix-card flex items-center gap-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 px-5 py-5 rounded transition-all group"
            >
              <div className="p-3 bg-red-600/20 rounded-full group-hover:bg-red-600/30 transition">
                <Phone size={20} className="text-red-500" />
              </div>
              <div className="text-left flex-1">
                <p className="text-xs text-zinc-500 mb-1 font-semibold">Phone</p>
                <p className="font-semibold text-white text-sm md:text-base">+91 9891946529</p>
              </div>
            </a>

            <a
              href="mailto:tanmaygaur.gaurfilms@gmail.com"
              className="netflix-card flex items-center gap-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 px-5 py-5 rounded transition-all group"
            >
              <div className="p-3 bg-red-600/20 rounded-full group-hover:bg-red-600/30 transition">
                <Mail size={20} className="text-red-500" />
              </div>
              <div className="text-left flex-1">
                <p className="text-xs text-zinc-500 mb-1 font-semibold">Email</p>
                <p className="font-semibold text-white text-xs md:text-sm break-all">tanmaygaur.gaurfilms@gmail.com</p>
              </div>
            </a>
          </div>

        </div>
      </section>

      {/* Footer - Netflix style */}
      <footer className="border-t border-zinc-900 py-12 px-4 sm:px-6 md:px-12 lg:px-16 bg-black">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center">
            <p className="text-zinc-600 text-xs md:text-sm">&copy; 2025 Tanmay Gaur. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
