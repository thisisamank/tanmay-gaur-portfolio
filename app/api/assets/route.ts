import { getR2PublicUrl } from "@/lib/r2"
import type { ApiResponse } from "@/lib/types"

interface AssetRequest {
  key: string
  width?: number
  height?: number
  quality?: number
  format?: "webp" | "jpg" | "png" | "avif"
}

export async function GET(request: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url)
    const key = searchParams.get("key")

    if (!key) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Missing required parameter: key",
      }
      return Response.json(response, { status: 400 })
    }

    const width = searchParams.get("width")
    const height = searchParams.get("height")
    const quality = searchParams.get("quality")
    const format = searchParams.get("format")

    const assetData: AssetRequest = {
      key,
      ...(width && { width: Number.parseInt(width) }),
      ...(height && { height: Number.parseInt(height) }),
      ...(quality && { quality: Number.parseInt(quality) }),
      ...(format && { format: format as "webp" | "jpg" | "png" | "avif" }),
    }

    const url = getR2PublicUrl(key)

    const response: ApiResponse<{ url: string; asset: AssetRequest }> = {
      success: true,
      data: {
        url,
        asset: assetData,
      },
    }

    return Response.json(response)
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : "Failed to process asset request",
    }

    return Response.json(response, { status: 500 })
  }
}
