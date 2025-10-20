"use client"

import { useState, useRef } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react"
import { VideoModal } from "./video-modal"

interface VideoCardProps {
  title: string
  url: string
  thumbnail?: string
}

export function VideoCard({ title, url, thumbnail }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleFullscreen = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <div
        className="relative group cursor-pointer overflow-hidden rounded-lg bg-secondary/40"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          if (videoRef.current) {
            videoRef.current.pause()
            setIsPlaying(false)
          }
        }}
      >
        {/* Video Container */}
        <div className="relative aspect-video bg-black overflow-hidden">
          <video
            ref={videoRef}
            src={url}
            className="w-full h-full object-cover"
            muted={isMuted}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          {/* Netflix-style gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Play button overlay - visible when not hovering or not playing */}
          {!isHovered && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all duration-300">
              <Play size={48} className="text-white fill-white" />
            </div>
          )}

          {/* Controls - visible on hover */}
          {isHovered && (
            <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {/* Top controls */}
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleFullscreen}
                  className="bg-black/60 hover:bg-black/80 p-2 rounded-full transition"
                  title="Fullscreen"
                >
                  <Maximize size={20} className="text-white" />
                </button>
                <button
                  onClick={handleMuteToggle}
                  className="bg-black/60 hover:bg-black/80 p-2 rounded-full transition"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <VolumeX size={20} className="text-white" />
                  ) : (
                    <Volume2 size={20} className="text-white" />
                  )}
                </button>
              </div>

              {/* Bottom controls */}
              <div className="flex items-center justify-between">
                <button
                  onClick={handlePlayPause}
                  className="bg-accent hover:bg-accent/90 p-3 rounded-full transition transform hover:scale-110"
                >
                  {isPlaying ? (
                    <Pause size={24} className="text-white fill-white" />
                  ) : (
                    <Play size={24} className="text-white fill-white" />
                  )}
                </button>
                <div className="text-white text-sm font-semibold">{title}</div>
              </div>
            </div>
          )}
        </div>

        {/* Title - visible when not hovering */}
        {!isHovered && (
          <div className="p-4 bg-secondary/40 group-hover:bg-secondary/60 transition">
            <h3 className="text-foreground font-semibold truncate">{title}</h3>
          </div>
        )}
      </div>

      <VideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={title} url={url} />
    </>
  )
}
