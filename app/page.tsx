"use client"

import Image from "next/image"
import { Mail, Phone, Play, Info } from "lucide-react"
import { useState, useEffect } from "react"
import { NetflixVideoPlayer } from "@/components/netflix-video-player"
import { BlogSection } from "@/components/blog-section"
import type { BlogPost } from "@/lib/types"

export default function Home() {
  const [activeTab, setActiveTab] = useState("about")
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [blogLoading, setBlogLoading] = useState(true)

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

    fetchBlogPosts()
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

  const videos = [
    {
      title: "Statements and Statement List",
      url: "https://pub-c0052b015a214c8584bf0cf89522c2ef.r2.dev/001.%20Statements%20and%20Statement%20List.mp4",
    },
    {
      title: "Blocks Nested Scopes",
      url: "https://pub-c0052b015a214c8584bf0cf89522c2ef.r2.dev/002.%20Blocks%20Nested%20Scopes.mp4",
    },
    {
      title: "Different AST Formats",
      url: "https://pub-c0052b015a214c8584bf0cf89522c2ef.r2.dev/003.%20Different%20AST%20Formats.mp4",
    },
  ]

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Netflix-style Hero Section */}
      <section className="relative h-screen flex items-end justify-start overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://pub-f3452781d9104571a0e9e383ef6905ee.r2.dev/WhatsApp%20Image%202025-10-20%20at%2011.59.35%20PM.jpeg"
            alt="Tanmay Gaur"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-3xl px-6 md:px-12 pb-20 md:pb-32">
          <h1 className="text-6xl md:text-7xl font-bold mb-4 text-foreground text-balance">Tanmay Gaur</h1>
          <p className="text-2xl md:text-3xl text-accent mb-2 font-semibold">
            Multi-speciality Filmmaker / Media Producer
          </p>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 italic max-w-2xl">
            "The indifference between risky and bold."
          </p>

          {/* Netflix-style action buttons */}
          <div className="flex gap-4 items-center flex-wrap">
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded font-semibold transition"
            >
              <Play size={20} />
              View Portfolio
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-secondary/50 hover:bg-secondary/70 text-foreground px-8 py-3 rounded font-semibold transition"
            >
              <Info size={20} />
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Tabs Navigation */}
          <div className="md:col-span-1">
            <div className="flex md:flex-col gap-2 md:gap-4 border-b md:border-b-0 md:border-r border-secondary pb-4 md:pb-0 md:pr-8">
              {["about", "skills", "employment"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-left font-semibold transition capitalize ${
                    activeTab === tab
                      ? "text-accent border-b-2 md:border-b-0 md:border-r-2 border-accent"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="md:col-span-2">
            {activeTab === "about" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h2 className="text-4xl font-bold text-foreground">About</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  What do you get when you mix two unconventional and stubborn forces? Thankfully, a more balanced yet
                  twice as unconventional and stubborn solution. Now what happens if it just so happens, that both
                  elements of the original mixture come from long lines of service in the Army?….
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Can someone who sounds vain, really be simply honest? How is it possible for someone to be both,
                  'outside the box' and 'by the book'? Why don't you dive deeper and find out? Let's talk.
                </p>
              </div>
            )}

            {activeTab === "skills" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h2 className="text-4xl font-bold text-foreground">Skills</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Don't worry, I am not just some boastful, yet another over-confident youngster. If I couldn't live up
                  to my claims, I know better than to bluff people much more adept to negotiations than myself.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  Here's a few of my skills I have a proven track record in executing:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {skills.map((skill) => (
                    <div
                      key={skill}
                      className="bg-secondary/30 hover:bg-secondary/50 border border-secondary px-4 py-3 rounded text-center font-semibold transition"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "employment" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h2 className="text-4xl font-bold text-foreground">Employment History</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I know, I know. A second generation who got everything served to him on a silver platter. But are you
                  sure that's the case? You absolutely certain what you see as a risk isn't really the boldest hiring
                  decision you'll make?? You know what they say about high risk situations?
                </p>
                <div className="space-y-6 mt-8">
                  {employment.map((job, index) => (
                    <div key={index} className="border-l-2 border-accent pl-6 py-2">
                      <h3 className="text-xl font-bold text-foreground">{job.role}</h3>
                      <p className="text-accent font-semibold">{job.company}</p>
                      <p className="text-muted-foreground text-sm">{job.period}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 md:py-32 px-6 md:px-12 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Select Portfolio</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            Now, finally, what you're really here for, some of my top picks from the projects I've worked on. I suggest
            you read the blogs section after this, I guarantee you'll notice what I can achieve is far greater than what
            you've guessed so far.
          </p>
          <NetflixVideoPlayer videos={videos} />
        </div>
      </section>

      {!blogLoading && <BlogSection posts={blogPosts} />}

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Let's Talk</h2>
          <p className="text-lg text-muted-foreground mb-12">
            As I have said before, Let's Talk. Reach out through any of these channels.
          </p>

          <div className="flex flex-col md:flex-row gap-8 justify-center items-center md:items-start">
            <a
              href="tel:+919891946529"
              className="flex items-center gap-3 bg-secondary/30 hover:bg-secondary/50 border border-secondary px-8 py-4 rounded-lg transition group"
            >
              <Phone size={24} className="text-accent group-hover:scale-110 transition" />
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-semibold text-foreground">+91 9891946529</p>
              </div>
            </a>

            <a
              href="mailto:tanmaygaur.gaurfilms@gmail.com"
              className="flex items-center gap-3 bg-secondary/30 hover:bg-secondary/50 border border-secondary px-8 py-4 rounded-lg transition group"
            >
              <Mail size={24} className="text-accent group-hover:scale-110 transition" />
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-semibold text-foreground">tanmaygaur.gaurfilms@gmail.com</p>
              </div>
            </a>
          </div>

          <p className="text-muted-foreground text-sm mt-12 italic">
            Aman Kumar, Tussi Great ho, tumpe jaan nisaar. I promise I'll live up to you in a similar fashion in the
            future.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-secondary py-8 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground text-sm">
          <p>&copy; 2025 Tanmay Gaur. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
