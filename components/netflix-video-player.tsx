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
  const [isMuted, setIsMuted] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
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

  // Pause video when switching to a different video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0 // Reset video to beginning
      videoRef.current.load() // Reload video to show poster
      setIsPlaying(false)
    }
    // Reset description expansion when changing videos
    setIsDescriptionExpanded(false)
  }, [selectedIndex])

  // Preload adjacent videos for faster switching
  useEffect(() => {
    const preloadNextVideos = () => {
      const nextIndex = (selectedIndex + 1) % projects.length
      const prevIndex = selectedIndex === 0 ? projects.length - 1 : selectedIndex - 1
      
      // Preload next and previous videos
      if (projects[nextIndex]?.videoUrl) {
        const nextVideo = document.createElement('link')
        nextVideo.rel = 'prefetch'
        nextVideo.as = 'video'
        nextVideo.href = projects[nextIndex].videoUrl
        document.head.appendChild(nextVideo)
      }
      
      if (projects[prevIndex]?.videoUrl) {
        const prevVideo = document.createElement('link')
        prevVideo.rel = 'prefetch'
        prevVideo.as = 'video'
        prevVideo.href = projects[prevIndex].videoUrl
        document.head.appendChild(prevVideo)
      }
    }

    // Preload after a short delay to prioritize current video
    const timer = setTimeout(preloadNextVideos, 2000)
    return () => clearTimeout(timer)
  }, [selectedIndex, projects])

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
    // Pause current video before switching
    if (videoRef.current) {
      videoRef.current.pause()
    }
    setSelectedIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1))
    setIsPlaying(false)
    setProgress(0) // Reset progress to 0
  }

  const handleNext = () => {
    // Pause current video before switching
    if (videoRef.current) {
      videoRef.current.pause()
    }
    setSelectedIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1))
    setIsPlaying(false)
    setProgress(0) // Reset progress to 0
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
                className="w-full h-full object-cover cursor-pointer"
                muted={isMuted}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onClick={handlePlayPause}
                preload="auto"
                playsInline
                crossOrigin="anonymous"
              />

              {/* Netflix-style gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Center Play/Pause Button - only show when not playing */}
              {!isPlaying && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all duration-300 pointer-events-none"
                >
                  <Play size={64} className="text-white fill-white drop-shadow-lg" />
                </div>
              )}

              {/* Controls - visible on hover - Netflix style */}
              <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                {/* Top controls - Action buttons only */}
                <div className="flex justify-end gap-2 pointer-events-auto">
                  <button
                    onClick={handleMuteToggle}
                    className="bg-black/70 hover:bg-black/90 backdrop-blur-sm p-2.5 md:p-3 rounded-full transition-all hover:scale-110 border border-white/10"
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? (
                      <VolumeX size={20} className="text-white" />
                    ) : (
                      <Volume2 size={20} className="text-white" />
                    )}
                  </button>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-black/70 hover:bg-black/90 backdrop-blur-sm p-2.5 md:p-3 rounded-full transition-all hover:scale-110 border border-white/10"
                    title="Fullscreen"
                  >
                    <Maximize size={20} className="text-white" />
                  </button>
                </div>

                {/* Bottom controls */}
                <div className="space-y-3 pointer-events-auto">
                  {/* Progress bar - Netflix style */}
                  <div
                    className="h-1 bg-white/20 hover:h-1.5 rounded-full cursor-pointer transition-all relative group/progress"
                    onClick={handleProgressClick}
                  >
                    <div
                      className="h-full bg-red-600 rounded-full transition-all relative"
                      style={{ width: `${progress}%` }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  {/* Control buttons */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handlePlayPause}
                      className="bg-white/90 hover:bg-white p-2.5 rounded-full transition-all hover:scale-110"
                    >
                      {isPlaying ? (
                        <Pause size={22} className="text-black" />
                      ) : (
                        <Play size={22} className="text-black fill-black" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation arrows - Netflix style */}
            {projects.length > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 backdrop-blur-sm p-2 md:p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 hover:scale-110 z-20 border border-white/10"
                >
                  <ChevronLeft size={24} className="text-white" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 backdrop-blur-sm p-2 md:p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 hover:scale-110 z-20 border border-white/10"
                >
                  <ChevronRight size={24} className="text-white" />
                </button>
              </>
            )}
          </div>

          {/* Project Info Sidebar - Netflix style */}
          <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* Title and Metadata */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">{selectedProject.title}</h3>
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-green-400 font-semibold text-sm">{selectedProject.year}</span>
                {selectedProject.category && (
                  <span className="px-3 py-1 bg-white/10 text-white/90 rounded border border-white/20 text-xs font-medium uppercase tracking-wide">
                    {selectedProject.category}
                  </span>
                )}
              </div>
            </div>

            {/* Description with Read More */}
            {selectedProject.description && (
              <div className="overflow-hidden">
                <p className={`text-white/80 text-base leading-relaxed transition-all duration-300 ${isDescriptionExpanded ? '' : 'line-clamp-3'
                  }`}>
                  {selectedProject.description}
                </p>
                {selectedProject.description.length > 150 && (
                  <button
                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                    className="text-accent hover:text-accent/80 text-sm font-medium mt-2 transition-colors inline-flex items-center gap-1"
                  >
                    {isDescriptionExpanded ? (
                      <>
                        Read Less
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </>
                    ) : (
                      <>
                        Read More
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </>
                    )}
                  </button>
                )}
              </div>
            )}

            {/* Role */}
            {selectedProject.role && (
              <div className="pt-4 border-t border-white/10">
                <span className="text-white/50 text-sm">Role: </span>
                <span className="text-white font-medium">{selectedProject.role}</span>
              </div>
            )}

            {/* Credits */}
            {selectedProject.credits && selectedProject.credits.length > 0 && (
              <div className="pt-4 border-t border-white/10">
                <h4 className="text-sm font-semibold text-white/50 mb-3">Cast & Crew</h4>
                <div className="space-y-2">
                  {selectedProject.credits.map((credit, index) => (
                    <div
                      key={index}
                      className="text-white/80 text-sm"
                    >
                      {credit}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Video Grid - Netflix Episodes style */}
        <div className="mt-12">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-6">More from Portfolio</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project, index) => (
              <div
                key={project.id}
                onClick={() => {
                  // Pause current video before switching
                  if (videoRef.current) {
                    videoRef.current.pause()
                  }
                  setSelectedIndex(index)
                  setIsPlaying(false)
                  setProgress(0) // Reset progress to 0
                }}
                className={`group cursor-pointer transition-all duration-200 ${index === selectedIndex ? "ring-2 ring-white rounded-md" : ""
                  }`}
              >
                <div className="relative aspect-video bg-black rounded-md overflow-hidden mb-3">
                  <video
                    src={project.videoUrl}
                    poster={project.thumbnailUrl || DEFAULT_THUMBNAIL}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    muted
                    preload="auto"
                    playsInline
                    crossOrigin="anonymous"
                  />

                  {/* Overlay with Play icon */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <Play size={48} className="text-white fill-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                  </div>

                  {/* Index number - Netflix style */}
                  <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-bold">
                    {index + 1}
                  </div>
                </div>

                {/* Title and metadata */}
                <div className="px-1">
                  <h4 className="text-white font-semibold text-sm mb-1 line-clamp-1 group-hover:text-white/90 transition">
                    {project.title}
                  </h4>
                  <div className="flex items-center gap-2 text-white/50 text-xs">
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
