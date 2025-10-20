import { SITE_CONFIG } from "@/lib/constants"

export interface SeoMetadata {
  title: string
  description: string
  image?: string
  url?: string
  type?: "website" | "article"
  author?: string
  publishedDate?: string
  modifiedDate?: string
}

export function generateMetadata(seo: SeoMetadata) {
  return {
    title: `${seo.title} | ${SITE_CONFIG.name}`,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      image: seo.image || SITE_CONFIG.ogImage,
      url: seo.url || SITE_CONFIG.url,
      type: seo.type || "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      image: seo.image || SITE_CONFIG.ogImage,
    },
  }
}
