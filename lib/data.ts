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
}

export interface EmploymentHistory {
  role: string
  organization: string
  start: string
  end: string
}

export const portfolioData = {
  bio: {
    name: "Tanmay Gaur",
    title: "Multi-speciality Filmmaker / Media Producer",
    quote: "The indifference between risky and bold.",
    aboutText:
      "What do you get when you mix two unconventional and stubborn forces? Thankfully, a more balanced yet twice as unconventional and stubborn solution. Now what happens if it just so happens, that both elements of the original mixture come from long lines of service in the Army?…. Can someone who sounds vain, really be simply honest? How is it possible for someone to be both, 'outside the box' and 'by the book'? Why don't you dive deeper and find out? Let's talk.",
    skillsIntro:
      "Don't worry, I am not just some boastful, yet another over-confident youngster. If I couldn't live up to my claims, I know better than to bluff people much more adept to negotiations than myself. Here's a few of my skills I have a proven track record in executing.",
    photoUrl:
      "https://pub-f3452781d9104571a0e9e383ef6905ee.r2.dev/WhatsApp%20Image%202025-10-20%20at%2011.59.35%20PM.jpeg",
  },
  skills: [
    "Media Strategy",
    "Video Editing",
    "Film Production",
    "Film Direction",
    "Script Writing",
    "Copywriting",
    "Drone Piloteering",
    "Motion Graphics",
    "Team Management",
    "Crisis Management",
    "Generative AI",
  ],
  employment: [
    {
      role: "Associate Producer",
      organization: "Gaurs-The Film People",
      start: "June 2023",
      end: "September 2023",
    },
    {
      role: "Intern",
      organization: "Full Moon Productions",
      start: "September 2023",
      end: "May 2024",
    },
    {
      role: "Executive Producer",
      organization: "Gaurs-The Film People",
      start: "May 2024",
      end: "Present",
    },
  ],
  projects: [
    {
      id: "proj1",
      title: "Urban Perspectives",
      year: 2024,
      role: "Director",
      thumbnailUrl: "/urban-film-thumbnail.jpg",
      videoUrl: "/urban-film-video.jpg",
      description: "A cinematic exploration of city life through the lens of emerging artists.",
      credits: ["Producer: Tanmay Gaur", "Cinematographer: Alex Kumar", "Editor: Priya Singh"],
      stillImages: ["/urban-still-1.jpg", "/urban-still-2.jpg"],
      category: "Documentary",
    },
  ],
  contact: {
    phone: "+91 9891946529",
    email: "tanmaygaur.gaurfilms@gmail.com",
  },
}

export const featuredProjects = portfolioData.projects.slice(0, 2)
