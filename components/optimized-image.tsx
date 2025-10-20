"use client"

import Image from "next/image"
import { getOptimizedImageUrl, generatePictureSourceSet } from "@/lib/r2"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
  quality?: number
  format?: "webp" | "jpg" | "png" | "avif"
  responsive?: boolean
}

export function OptimizedImage({
  src,
  alt,
  width = 1200,
  height = 800,
  priority = false,
  className,
  quality = 80,
  format = "webp",
  responsive = true,
}: OptimizedImageProps) {
  const optimizedUrl = getOptimizedImageUrl(src, {
    width,
    height,
    quality,
    format,
  })

  if (responsive) {
    const sources = generatePictureSourceSet(src)

    return (
      <picture>
        {sources.map((source) => (
          <source key={source.type} srcSet={source.srcSet} type={source.type} />
        ))}
        <img
          src={optimizedUrl || "/placeholder.svg"}
          alt={alt}
          className={className}
          loading={priority ? "eager" : "lazy"}
        />
      </picture>
    )
  }

  return (
    <Image
      src={optimizedUrl || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  )
}
