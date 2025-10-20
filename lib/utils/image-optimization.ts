export function getOptimizedImageUrl(
  imageKey: string,
  options?: {
    width?: number
    height?: number
    quality?: number
    format?: "webp" | "jpg" | "png"
  },
): string {
  const baseUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL
  if (!baseUrl) return imageKey

  const params = new URLSearchParams()
  if (options?.width) params.append("width", options.width.toString())
  if (options?.height) params.append("height", options.height.toString())
  if (options?.quality) params.append("quality", options.quality.toString())
  if (options?.format) params.append("format", options.format)

  const queryString = params.toString()
  return `${baseUrl}/${imageKey}${queryString ? `?${queryString}` : ""}`
}

export function generateSrcSet(imageKey: string, widths: number[] = [320, 640, 1024, 1280]): string {
  return widths
    .map((width) => {
      const url = getOptimizedImageUrl(imageKey, { width })
      return `${url} ${width}w`
    })
    .join(", ")
}
