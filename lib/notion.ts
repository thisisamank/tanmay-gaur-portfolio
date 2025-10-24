export interface NotionBlockText {
  type: "text"
  text: {
    content: string
    link: string | null
  }
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: string
  }
  plain_text: string
  href: string | null
}

export interface NotionBlock {
  object: string
  id: string
  type: string
  [key: string]: unknown
}

export interface NotionDatabaseItem {
  id: string
  properties: {
    Title?: {
      title: Array<{ plain_text: string }>
    }
    Slug?: {
      rich_text: Array<{ plain_text: string }>
    }
    Date?: {
      date: {
        start: string
      }
    }
    Excerpt?: {
      rich_text: Array<{ plain_text: string }>
    }
    Thumbnail?: {
      files: Array<{ file: { url: string } }>
    }
    Tags?: {
      multi_select: Array<{ name: string }>
    }
    Published?: {
      checkbox: boolean
    }
    [key: string]: unknown
  }
}

async function getNotionHeaders() {
  const token = process.env.NOTION_API_KEY
  if (!token) {
    throw new Error("NOTION_API_KEY is not set")
  }

  return {
    Authorization: `Bearer ${token}`,
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json",
  }
}

export async function queryNotionDatabase(databaseId: string, filter?: unknown) {
  const headers = await getNotionHeaders()

  const body: any = {}

  if (filter) {
    body.filter = filter
  }

  // Only add sorts if we're querying the blog database (which has Date property)
  if (databaseId === process.env.NOTION_DATABASE_ID) {
    body.sorts = [
      {
        property: "Date",
        direction: "descending",
      },
    ]
  }

  const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error(`Notion API error: ${response.statusText}`)
  }

  return response.json()
}

export async function getNotionBlockChildren(blockId: string) {
  const headers = await getNotionHeaders()

  const response = await fetch(`https://api.notion.com/v1/blocks/${blockId}/children`, {
    headers,
  })

  if (!response.ok) {
    throw new Error(`Notion API error: ${response.statusText}`)
  }

  return response.json()
}

export async function getBlogPosts() {
  const databaseId = process.env.NOTION_DATABASE_ID
  if (!databaseId) {
    console.warn("NOTION_DATABASE_ID is not set - returning empty blog posts")
    return []
  }

  const data = await queryNotionDatabase(databaseId)

  return data.results.map((item: NotionDatabaseItem) => ({
    id: item.id,
    title: item.properties.Title?.title[0]?.plain_text || "Untitled",
    slug: item.properties.Slug?.rich_text[0]?.plain_text || "",
    date: item.properties.Date?.date?.start || new Date().toISOString(),
    excerpt: item.properties.Excerpt?.rich_text[0]?.plain_text || "",
    thumbnail: item.properties.Thumbnail?.files[0]?.file?.url || "/placeholder.svg",
    tags: item.properties.Tags?.multi_select?.map((tag: { name: string }) => tag.name) || [],
  }))
}

export async function getBlogPostBySlug(slug: string) {
  const databaseId = process.env.NOTION_DATABASE_ID
  if (!databaseId) {
    throw new Error("NOTION_DATABASE_ID is not set")
  }

  const data = await queryNotionDatabase(databaseId, {
    property: "Slug",
    rich_text: {
      equals: slug,
    },
  })

  if (data.results.length === 0) {
    return null
  }

  const item = data.results[0] as NotionDatabaseItem
  const blocks = await getNotionBlockChildren(item.id)

  return {
    id: item.id,
    title: item.properties.Title?.title[0]?.plain_text || "Untitled",
    slug: item.properties.Slug?.rich_text[0]?.plain_text || "",
    date: item.properties.Date?.date?.start || new Date().toISOString(),
    excerpt: item.properties.Excerpt?.rich_text[0]?.plain_text || "",
    thumbnail: item.properties.Thumbnail?.files[0]?.file?.url || "/placeholder.svg",
    tags: item.properties.Tags?.multi_select?.map((tag: { name: string }) => tag.name) || [],
    blocks: blocks.results,
  }
}

// Portfolio projects function (videos only)
export async function getPortfolioProjects() {
  const databaseId = process.env.NOTION_PROJECTS_DATABASE_ID
  if (!databaseId) {
    console.warn("NOTION_PROJECTS_DATABASE_ID is not set - returning empty projects")
    return []
  }

  try {
    const data = await queryNotionDatabase(databaseId)

    const projects = data.results.map((item: NotionDatabaseItem) => {
      const properties = item.properties as any
      return {
        id: item.id,
        title: properties.Title?.title?.[0]?.plain_text || "Untitled",
        slug: properties.Slug?.rich_text?.[0]?.plain_text || "",
        year: properties.Year?.number || new Date().getFullYear(),
        role: properties.Role?.rich_text?.[0]?.plain_text || "",
        thumbnailUrl: properties.Thumbnail?.files?.[0]?.file?.url || "/placeholder.svg",
        videoUrl: properties["Video URL"]?.url || undefined,
        description: properties.Description?.rich_text?.[0]?.plain_text || "",
        credits: properties.Credits?.multi_select?.map((credit: { name: string }) => credit.name) || [],
        stillImages: properties["Still Images"]?.files?.map((file: { file: { url: string } }) => file.file.url) || [],
        category: (properties.Category?.select?.name as "Commercial" | "Documentary" | "Drone" | "Music Video" | "Corporate" | "Other") || "Other",
        featured: properties.Featured?.checkbox || false,
        sNo: properties.SNo?.number || 0,
      }
    })

    // Sort by SNo field (ascending)
    return projects.sort((a: any, b: any) => (a.sNo || 0) - (b.sNo || 0))
  } catch (error) {
    console.error("Error fetching projects from Notion:", error)
    return []
  }
}
