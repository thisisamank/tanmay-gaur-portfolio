"use client"

import type React from "react"

import type { Project } from "@/lib/types"
import { ChevronLeft, ChevronRight, Maximize, Pause, Play, Volume2, VolumeX } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { VideoModal } from "./video-modal"

interface NetflixVideoPlayerProps {
  projects: Project[]
}

const DEFAULT_THUMBNAIL =
  "https://pub-f3452781d9104571a0e9e383ef6905ee.r2.dev/joshua-rawson-harris-NjpvdAEni4Q-unsplash%20(1).jpg"

export function NetflixVideoPlayer({ projects }: NetflixVideoPlayerProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  const selectedProject = projects[selectedIndex]

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100)
      }
    }

    video.addEventListener("timeupdate", updateProgress)
    return () => video.removeEventListener("timeupdate", updateProgress)
  }, [])

  const handlePlayPause = async () => {
    if (!videoRef.current) return

    try {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        await videoRef.current.play()
        setIsPlaying(true)
      }
    } catch (error) {
      console.error("[v0] Play error:", error)
    }
  }

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const percent = (e.clientX - rect.left) / rect.width
      videoRef.current.currentTime = percent * videoRef.current.duration
    }
  }

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1))
    setIsPlaying(false)
  }

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1))
    setIsPlaying(false)
  }

  return (
    <>
      <div className="space-y-8">
        {/* Featured Video Player and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player - Takes 2 columns */}
          <div className="lg:col-span-2 relative group">
            {/* Main Video Container */}
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                src={selectedProject.videoUrl!}
                poster={selectedProject.thumbnailUrl || DEFAULT_THUMBNAIL}
                className="w-full h-full object-cover"
                muted={isMuted}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Netflix-style gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {!isPlaying && (
                <button
                  className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all duration-300 cursor-pointer hover:bg-black/10 w-full h-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePlayPause()
                  }}
                  type="button"
                  aria-label="Play video"
                >
                  <Play size={64} className="text-white fill-white drop-shadow-lg" />
                </button>
              )}

              {/* Controls - visible on hover */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                {/* Top controls - Action buttons only */}
                <div className="flex justify-end gap-3 pointer-events-auto">
                  <button
                    onClick={handleMuteToggle}
                    className="bg-black/60 hover:bg-black/80 p-3 rounded-full transition transform hover:scale-110"
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? (
                      <VolumeX size={24} className="text-white" />
                    ) : (
                      <Volume2 size={24} className="text-white" />
                    )}
                  </button>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-black/60 hover:bg-black/80 p-3 rounded-full transition transform hover:scale-110"
                    title="Fullscreen"
                  >
                    <Maximize size={24} className="text-white" />
                  </button>
                </div>

                {/* Bottom controls */}
                <div className="space-y-4 pointer-events-auto">
                  {/* Progress bar */}
                  <div
                    className="h-1 bg-white/30 hover:h-2 rounded-full cursor-pointer transition-all group/progress"
                    onClick={handleProgressClick}
                  >
                    <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${progress}%` }} />
                  </div>

                  {/* Play button */}
                  <div className="flex items-center">
                    <button
                      onClick={handlePlayPause}
                      className="bg-accent hover:bg-accent/90 p-3 rounded-full transition transform hover:scale-110"
                    >
                      {isPlaying ? (
                        <Pause size={28} className="text-white fill-white" />
                      ) : (
                        <Play size={28} className="text-white fill-white" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 p-3 rounded-full transition opacity-0 group-hover:opacity-100 z-10"
            >
              <ChevronLeft size={28} className="text-white" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 p-3 rounded-full transition opacity-0 group-hover:opacity-100 z-10"
            >
              <ChevronRight size={28} className="text-white" />
            </button>
          </div>

          {/* Project Info Sidebar - Netflix style */}
          <div className="lg:col-span-1 space-y-6">
            {/* Title and Metadata */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{selectedProject.title}</h3>
              <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-sm mb-4">
                <span className="font-semibold text-foreground">{selectedProject.year}</span>
                {selectedProject.category && (
                  <>
                    <span>•</span>
                    <span className="px-2 py-1 bg-accent/20 text-accent rounded text-xs font-semibold">
                      {selectedProject.category}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Role */}
            {selectedProject.role && (
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-2">Role</h4>
                <p className="text-foreground">{selectedProject.role}</p>
              </div>
            )}

            {/* Description */}
            {selectedProject.description && (
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-2">About</h4>
                <p className="text-foreground leading-relaxed">{selectedProject.description}</p>
              </div>
            )}

            {/* Credits */}
            {selectedProject.credits && selectedProject.credits.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-2">Credits</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.credits.map((credit, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-secondary/50 text-foreground rounded-full text-sm"
                    >
                      {credit}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Video Grid */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">More Videos</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {projects.map((project, index) => (
              <div
                key={project.id}
                onClick={() => {
                  setSelectedIndex(index)
                  setIsPlaying(false)
                }}
                className={`relative group cursor-pointer overflow-hidden rounded-lg transition transform hover:scale-105 ${index === selectedIndex ? "ring-2 ring-accent" : ""
                  }`}
              >
                <div className="relative aspect-video bg-black">
                  <video
                    src={project.videoUrl}
                    poster={project.thumbnailUrl || DEFAULT_THUMBNAIL}
                    className="w-full h-full object-cover"
                    muted
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                    <Play size={40} className="text-white fill-white opacity-0 group-hover:opacity-100 transition" />
                  </div>

                  {/* Title and metadata overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                    <p className="text-white text-sm font-semibold truncate mb-1">{project.title}</p>
                    <div className="flex items-center gap-2 text-white/70 text-xs">
                      <span>{project.year}</span>
                      {project.category && (
                        <>
                          <span>•</span>
                          <span>{project.category}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedProject.title}
        url={selectedProject.videoUrl!}
      />
    </>
  )
}
