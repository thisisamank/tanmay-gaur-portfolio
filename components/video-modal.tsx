"use client"

import { Maximize2, Minimize2, Pause, Play, Volume2, VolumeX, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  url: string
}

export function VideoModal({ isOpen, onClose, title, url }: VideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      } else if (e.key === " ") {
        e.preventDefault()
        handlePlayPause()
      } else if (e.key === "m") {
        handleMuteToggle()
      } else if (e.key === "f") {
        handleFullscreenToggle()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

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

  const handleFullscreenToggle = async () => {
    if (!containerRef.current) return

    try {
      if (!isFullscreen) {
        if (containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen()
          setIsFullscreen(true)
        }
      } else {
        if (document.fullscreenElement) {
          await document.exitFullscreen()
          setIsFullscreen(false)
        }
      }
    } catch (err) {
      console.error("Fullscreen error:", err)
    }
  }

  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={onClose}>
      <div
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
        onMouseMove={handleMouseMove}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-10 bg-black/60 hover:bg-black/80 p-2 rounded-full transition ${showControls ? "opacity-100" : "opacity-0"
            }`}
          title="Close (Esc)"
        >
          <X size={24} className="text-white" />
        </button>

        {/* Video */}
        <video ref={videoRef} src={url} className="w-full h-full object-contain" onMouseMove={handleMouseMove} />

        {/* Controls */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-6 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"
            }`}
        >
          {/* Progress bar */}
          <div className="mb-4 flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="0"
              onChange={(e) => {
                if (videoRef.current) {
                  videoRef.current.currentTime = (Number.parseFloat(e.target.value) / 100) * videoRef.current.duration
                }
              }}
              className="flex-1 h-1 bg-white/30 rounded cursor-pointer accent-accent"
            />
          </div>

          {/* Control buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePlayPause}
                className="bg-accent hover:bg-accent/90 p-2 rounded-full transition"
                title="Play/Pause (Space)"
              >
                {isPlaying ? (
                  <Pause size={20} className="text-white fill-white" />
                ) : (
                  <Play size={20} className="text-white fill-white" />
                )}
              </button>
              <button
                onClick={handleMuteToggle}
                className="bg-black/60 hover:bg-black/80 p-2 rounded-full transition"
                title="Mute (M)"
              >
                {isMuted ? <VolumeX size={20} className="text-white" /> : <Volume2 size={20} className="text-white" />}
              </button>
            </div>

            <div className="text-white text-sm font-semibold flex-1 text-center">{title}</div>

            <button
              onClick={handleFullscreenToggle}
              className="bg-black/60 hover:bg-black/80 p-2 rounded-full transition"
              title="Fullscreen (F)"
            >
              {isFullscreen ? (
                <Minimize2 size={20} className="text-white" />
              ) : (
                <Maximize2 size={20} className="text-white" />
              )}
            </button>
          </div>

          {/* Keyboard shortcuts hint */}
          <div className="text-white/50 text-xs mt-4 text-center">
            Space: Play/Pause | M: Mute | F: Fullscreen | Esc: Close
          </div>
        </div>
      </div>
    </div>
  )
}
