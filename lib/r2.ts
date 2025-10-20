export function getR2PublicUrl(key: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_R2_PUBLIC_URL is not configured")
  }
  return `${baseUrl}/${key}`
}

export function getOptimizedImageUrl(
  key: string,
  options?: {
    width?: number
    height?: number
    quality?: number
    format?: "webp" | "jpg" | "png" | "avif"
    fit?: "scale-down" | "contain" | "cover" | "crop" | "pad"
  },
): string {
  const baseUrl = getR2PublicUrl(key)

  if (!options) {
    return baseUrl
  }

  const params = new URLSearchParams()

  if (options.width) params.append("width", options.width.toString())
  if (options.height) params.append("height", options.height.toString())
  if (options.quality) params.append("quality", options.quality.toString())
  if (options.format) params.append("format", options.format)
  if (options.fit) params.append("fit", options.fit)

  const queryString = params.toString()
  return queryString ? `${baseUrl}?${queryString}` : baseUrl
}

export function generateResponsiveImageSrcSet(
  key: string,
  widths: number[] = [320, 640, 1024, 1280, 1920],
  format: "webp" | "jpg" | "png" | "avif" = "webp",
): string {
  return widths
    .map((width) => {
      const url = getOptimizedImageUrl(key, { width, format })
      return `${url} ${width}w`
    })
    .join(", ")
}

export function generatePictureSourceSet(
  key: string,
  widths: number[] = [320, 640, 1024, 1280, 1920],
): Array<{ srcSet: string; type: string }> {
  return [
    {
      srcSet: generateResponsiveImageSrcSet(key, widths, "avif"),
      type: "image/avif",
    },
    {
      srcSet: generateResponsiveImageSrcSet(key, widths, "webp"),
      type: "image/webp",
    },
    {
      srcSet: generateResponsiveImageSrcSet(key, widths, "jpg"),
      type: "image/jpeg",
    },
  ]
}
