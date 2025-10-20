export async function fetchFromNotion(endpoint: string) {
  const notionToken = process.env.NOTION_API_KEY
  const notionDatabaseId = process.env.NOTION_DATABASE_ID

  if (!notionToken || !notionDatabaseId) {
    throw new Error("Notion API credentials not configured")
  }

  const response = await fetch(`https://api.notion.com/v1/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${notionToken}`,
      "Notion-Version": "2022-06-28",
    },
  })

  if (!response.ok) {
    throw new Error(`Notion API error: ${response.statusText}`)
  }

  return response.json()
}

export async function fetchFromCloudflareR2(key: string) {
  const r2Url = process.env.NEXT_PUBLIC_R2_PUBLIC_URL
  if (!r2Url) {
    throw new Error("Cloudflare R2 URL not configured")
  }
  return `${r2Url}/${key}`
}
