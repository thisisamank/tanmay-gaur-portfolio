export interface Project {
  id: string
  title: string
  year: number
  role: string
  thumbnailUrl: string
  videoUrl?: string
  description: string
  credits: string[]
  stillImages: string[]
  category?: "Commercial" | "Documentary" | "Drone" | "Music Video" | "Corporate" | "Other"
}

export interface BlogPost {
  id: string
  title: string
  date: string
  excerpt: string
  thumbnail: string
  slug: string
  content?: string
  tags?: string[]
}

export interface EmploymentHistory {
  role: string
  organization: string
  start: string
  end: string
  description?: string
}

export interface PortfolioData {
  bio: {
    name: string
    title: string
    quote: string
    aboutText: string
    photoUrl: string
  }
  skills: string[]
  employment: EmploymentHistory[]
  projects: Project[]
  contact: {
    phone: string
    email: string
  }
}

export interface CarouselItem {
  id: string
  title: string
  thumbnail: string
  year?: number
  role?: string
  excerpt?: string
  date?: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export interface NotionPage {
  id: string
  title: string
  properties: Record<string, unknown>
}
