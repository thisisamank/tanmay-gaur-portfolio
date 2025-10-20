export const SITE_CONFIG = {
  name: "Tanmay Gaur",
  title: "Multi-speciality Filmmaker & Media Producer",
  description:
    "Filmmaker and media producer specializing in commercials, documentaries, and innovative visual narratives.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://tanmaygaur.com",
  ogImage: "/og-image.jpg",
  links: {
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  },
}

export const NAVIGATION_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

export const PROJECT_CATEGORIES = ["Commercial", "Documentary", "Drone", "Music Video", "Corporate", "Other"] as const

export const SKILLS_CATEGORIES = {
  production: ["Media Strategy", "Film Production", "Film Direction", "Team Management"],
  technical: ["Video Editing", "Motion Graphics", "Drone Piloteering", "Script Writing"],
  creative: ["Copywriting", "Crisis Management"],
}
