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
  const [videoError, setVideoError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const playerContainerRef = useRef<HTMLDivElement>(null)

  const selectedProject = projects[selectedIndex]

  // Validate that projects have video URLs
  if (!projects || projects.length === 0) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-md p-8 text-center">
        <p className="text-zinc-400">No video projects available.</p>
      </div>
    )
  }

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

  // Pause video when switching to a different video and scroll to player on mobile
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0 // Reset video to beginning
      videoRef.current.load() // Reload video to show poster
      setIsPlaying(false)
      setVideoError(false) // Reset error state
    }
    // Reset description expansion when changing videos
    setIsDescriptionExpanded(false)

    // Scroll to player on mobile/tablet when video changes
    if (playerContainerRef.current && typeof window !== 'undefined') {
      // Only auto-scroll on smaller screens (mobile/tablet)
      if (window.innerWidth < 1024) {
        // Small delay to ensure DOM is updated
        setTimeout(() => {
          const element = playerContainerRef.current
          if (element) {
            // Get element position
            const elementPosition = element.getBoundingClientRect().top + window.scrollY
            // Offset for fixed navigation (80px for nav height)
            const offsetPosition = elementPosition - 100
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            })
          }
        }, 100)
      }
    }
  }, [selectedIndex])

  // Optimized: Only preload next video on user interaction (not automatically)
  useEffect(() => {
    // Cleanup any existing prefetch links to avoid memory leaks
    const existingPrefetch = document.querySelectorAll('link[rel="prefetch"][as="video"]')
    existingPrefetch.forEach(link => link.remove())

    // Only preload if user has interacted (video is playing or was played)
    if (isPlaying) {
      const nextIndex = (selectedIndex + 1) % projects.length

      if (projects[nextIndex]?.videoUrl) {
        const nextVideo = document.createElement('link')
        nextVideo.rel = 'prefetch'
        nextVideo.as = 'video'
        nextVideo.href = projects[nextIndex].videoUrl
        document.head.appendChild(nextVideo)
      }
    }
  }, [isPlaying, selectedIndex, projects])

  const handlePlayPause = async () => {
    if (!videoRef.current) return

    try {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        // Check if video has an error (but allow play attempt even without src as we use source tags)
        if (videoRef.current.error) {
          console.error("[v0] Video has error:", videoRef.current.error)
          setVideoError(true)
          return
        }

        await videoRef.current.play()
        setIsPlaying(true)
      }
    } catch (error) {
      console.error("[v0] Play error:", error)
      console.error("[v0] Video URL:", selectedProject.videoUrl)
      console.error("[v0] Video readyState:", videoRef.current?.readyState)
      setVideoError(true)
      setIsPlaying(false)
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
      <div className="space-y-8 md:space-y-12">
        {/* Featured Video Player and Info */}
        <div ref={playerContainerRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Video Player - Takes 2 columns */}
          <div className="lg:col-span-2 relative group">
            {/* Main Video Container */}
            <div className="relative aspect-video bg-black rounded overflow-hidden shadow-2xl">
              <video
                ref={videoRef}
                poster={selectedProject.thumbnailUrl || DEFAULT_THUMBNAIL}
                className="w-full h-full object-cover"
                muted={isMuted}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onError={(e) => {
                  console.error("[v0] Video error:", e)
                  console.error("[v0] Video URL:", selectedProject.videoUrl)
                  console.error("[v0] Error details:", videoRef.current?.error)
                  setVideoError(true)
                }}
                onLoadedMetadata={() => {
                  console.log("[v0] Video loaded successfully:", selectedProject.title)
                  setVideoError(false)
                }}
                onCanPlay={() => {
                  console.log("[v0] Video can play:", selectedProject.title)
                }}
                preload="metadata"
                playsInline
                controls={false}
              >
                <source src={selectedProject.videoUrl!} type="video/mp4" />
                <source src={selectedProject.videoUrl!} type="video/webm" />
                Your browser does not support the video tag.
              </video>

              {/* Netflix-style gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Clickable overlay for play/pause or error message */}
              {videoError ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-10">
                  <div className="text-center p-6 max-w-md">
                    <p className="text-white text-lg font-bold mb-2">Unable to load video</p>
                    <p className="text-zinc-400 text-sm">
                      The video source may not be available. Please check the video URL or try another project.
                    </p>
                  </div>
                </div>
              ) : !isPlaying ? (
                <button
                  onClick={handlePlayPause}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-all duration-300 cursor-pointer group/play z-10"
                  aria-label="Play video"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border-2 border-white/80 group-hover/play:border-white group-hover/play:scale-110 transition-all">
                    <Play size={40} className="text-white fill-white ml-1" />
                  </div>
                </button>
              ) : (
                <button
                  onClick={handlePlayPause}
                  className="absolute inset-0 cursor-pointer z-10 opacity-0"
                  aria-label="Pause video"
                />
              )}

              {/* Controls - visible on hover - Netflix style */}
              <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20">
                {/* Top controls - Action buttons only */}
                <div className="flex justify-end gap-2 pointer-events-auto">
                  <button
                    onClick={handleMuteToggle}
                    className="bg-zinc-900/80 hover:bg-zinc-800 backdrop-blur-sm p-2.5 md:p-3 rounded-full transition-all hover:scale-110 border border-zinc-700"
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
                    className="bg-zinc-900/80 hover:bg-zinc-800 backdrop-blur-sm p-2.5 md:p-3 rounded-full transition-all hover:scale-110 border border-zinc-700"
                    title="Fullscreen"
                  >
                    <Maximize size={20} className="text-white" />
                  </button>
                </div>

                {/* Bottom controls */}
                <div className="space-y-3 pointer-events-auto">
                  {/* Progress bar - Netflix style */}
                  <div
                    className="h-1 bg-zinc-600/50 hover:h-1.5 rounded-full cursor-pointer transition-all relative group/progress"
                    onClick={handleProgressClick}
                  >
                    <div
                      className="h-full bg-red-600 rounded-full transition-all relative"
                      style={{ width: `${progress}%` }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity shadow-lg" />
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
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-zinc-900/80 hover:bg-zinc-800 backdrop-blur-sm p-2 md:p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 hover:scale-110 z-20 border border-zinc-700"
                >
                  <ChevronLeft size={28} className="text-white" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-zinc-900/80 hover:bg-zinc-800 backdrop-blur-sm p-2 md:p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 hover:scale-110 z-20 border border-zinc-700"
                >
                  <ChevronRight size={28} className="text-white" />
                </button>
              </>
            )}
          </div>

          {/* Project Info Sidebar - Netflix style */}
          <div className="lg:col-span-1 space-y-5 lg:sticky lg:top-24 lg:self-start">
            {/* Title and Metadata */}
            <div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">{selectedProject.title}</h3>
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="text-emerald-400 font-bold text-base">{selectedProject.year}</span>
                {selectedProject.category && (
                  <span className="px-2.5 py-1 bg-zinc-800 text-zinc-200 rounded text-xs font-bold uppercase tracking-wider border border-zinc-700">
                    {selectedProject.category}
                  </span>
                )}
              </div>
            </div>

            {/* Description with Read More */}
            {selectedProject.description && (
              <div className="overflow-hidden">
                <p className={`text-zinc-300 text-sm md:text-base leading-relaxed transition-all duration-300 ${isDescriptionExpanded ? '' : 'line-clamp-3'
                  }`}>
                  {selectedProject.description}
                </p>
                {selectedProject.description.length > 150 && (
                  <button
                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                    className="text-white hover:text-zinc-300 text-sm font-bold mt-3 transition-colors inline-flex items-center gap-1.5"
                  >
                    {isDescriptionExpanded ? (
                      <>
                        Show Less
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                        </svg>
                      </>
                    ) : (
                      <>
                        Show More
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </>
                    )}
                  </button>
                )}
              </div>
            )}

            {/* Role */}
            {selectedProject.role && (
              <div className="pt-4 border-t border-zinc-800">
                <span className="text-zinc-500 text-sm font-semibold">Role: </span>
                <span className="text-white font-semibold">{selectedProject.role}</span>
              </div>
            )}

            {/* Credits */}
            {selectedProject.credits && selectedProject.credits.length > 0 && (
              <div className="pt-4 border-t border-zinc-800">
                <h4 className="text-xs font-bold text-zinc-500 mb-3 uppercase tracking-wider">Cast & Crew</h4>
                <div className="space-y-2">
                  {selectedProject.credits.map((credit, index) => (
                    <div
                      key={index}
                      className="text-zinc-300 text-sm"
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
        <div className="mt-8 md:mt-12">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-6">More from Portfolio</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
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
                className={`netflix-card group cursor-pointer transition-all duration-200 rounded overflow-hidden ${index === selectedIndex ? "ring-2 ring-white shadow-lg shadow-white/20" : "ring-0"
                  }`}
              >
                <div className="relative aspect-video bg-black overflow-hidden">
                  <video
                    poster={project.thumbnailUrl || DEFAULT_THUMBNAIL}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    muted
                    preload="none"
                    playsInline
                  >
                    <source src={project.videoUrl} type="video/mp4" />
                    <source src={project.videoUrl} type="video/webm" />
                  </video>

                  {/* Overlay with Play icon */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                      <Play size={24} className="text-black fill-black ml-0.5" />
                    </div>
                  </div>

                  {/* Index number - Netflix style */}
                  <div className="absolute top-2 left-2 bg-zinc-900/90 backdrop-blur-sm px-2 py-0.5 rounded text-white text-xs font-bold border border-zinc-700">
                    {index + 1}
                  </div>
                </div>

                {/* Title and metadata */}
                <div className="p-3 bg-zinc-900 group-hover:bg-zinc-800 transition-colors">
                  <h4 className="text-white font-bold text-xs md:text-sm mb-1 line-clamp-1 group-hover:text-white transition">
                    {project.title}
                  </h4>
                  <div className="flex items-center gap-2 text-zinc-500 text-xs">
                    <span className="font-medium">{project.year}</span>
                    {project.category && (
                      <>
                        <span>•</span>
                        <span className="font-medium">{project.category}</span>
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
