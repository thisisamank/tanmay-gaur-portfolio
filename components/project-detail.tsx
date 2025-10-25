"use client"

import { Button } from "@/components/ui/button"
import type { Project } from "@/lib/types"
import { ChevronLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ProjectDetailProps {
  project: Project
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-12">
      {/* Back Button - Netflix style */}
      <Link href="/work" className="inline-flex items-center gap-2 text-white hover:text-zinc-300 transition mb-8 font-bold">
        <ChevronLeft className="w-5 h-5" />
        Back to Portfolio
      </Link>

      {/* Header - Netflix style */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">{project.title}</h1>
        
        <div className="flex flex-wrap items-center gap-3 text-zinc-400">
          <span className="font-medium">{project.year}</span>
          {project.category && (
            <>
              <span className="text-zinc-600">•</span>
              <span className="px-2.5 py-1 bg-zinc-800 text-zinc-200 rounded text-xs font-bold uppercase tracking-wider border border-zinc-700">
                {project.category}
              </span>
            </>
          )}
          <span className="text-zinc-600">•</span>
          <span className="font-medium">{project.role}</span>
        </div>
      </div>

      {/* Video Player or Featured Image - Netflix style */}
      {project.videoUrl ? (
        <div className="relative w-full max-w-4xl mx-auto rounded-lg overflow-hidden mb-12 bg-black shadow-2xl">
          <video
            controls
            controlsList="nodownload"
            className="w-full h-auto aspect-video"
            poster={project.thumbnailUrl || "/placeholder.svg"}
            preload="metadata"
            style={{
              maxHeight: '80vh'
            }}
          >
            <source src={project.videoUrl} type="video/mp4" />
            <source src={project.videoUrl} type="video/webm" />
            <source src={project.videoUrl} type="video/ogg" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <div className="relative w-full max-w-4xl mx-auto rounded-lg overflow-hidden mb-12">
          <Image
            src={project.thumbnailUrl || "/placeholder.svg"}
            alt={project.title}
            width={1200}
            height={675}
            className="w-full h-auto object-cover"
            priority
            quality={75}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
          />
        </div>
      )}

      {/* Description - Netflix style */}
      <div className="prose prose-invert max-w-none mb-12">
        <p className="text-base md:text-lg text-zinc-300 leading-relaxed">{project.description}</p>
      </div>

      {/* Credits - Netflix style */}
      {project.credits.length > 0 && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Credits</h2>
          <ul className="space-y-2">
            {project.credits.map((credit, index) => (
              <li key={index} className="text-sm md:text-base text-zinc-300">
                {credit}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Gallery - Netflix style */}
      {project.stillImages.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.stillImages.map((image, index) => (
              <div key={index} className="relative aspect-video rounded-lg overflow-hidden bg-zinc-900">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${project.title} - Image ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  quality={75}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA - Netflix style */}
      <div className="border-t border-zinc-800 pt-12 text-center">
        <p className="text-zinc-400 mb-6 text-lg">Interested in working together?</p>
        <Link href="/#contact">
          <Button size="lg" className="bg-white hover:bg-white/90 text-black font-bold px-8 py-6 text-lg">
            Get in Touch
          </Button>
        </Link>
      </div>
    </article>
  )
}
