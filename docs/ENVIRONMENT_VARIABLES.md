# Environment Variables Guide

This document outlines all environment variables needed for the filmmaker portfolio.

## Required Variables

### Cloudflare R2 (Asset Storage)
Only the public URL is needed for displaying images:
\`\`\`
NEXT_PUBLIC_R2_PUBLIC_URL=https://pub-f3452781d9104571a0e9e383ef6905ee.r2.dev
\`\`\`

### Notion API (Blog Integration)
\`\`\`
NOTION_API_KEY=your-notion-api-key
NOTION_DATABASE_ID=your-notion-database-id
\`\`\`

### Notion API (Portfolio Videos - Optional)
\`\`\`
NOTION_PROJECTS_DATABASE_ID=your-projects-database-id
\`\`\`

### Site Configuration
\`\`\`
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
\`\`\`

## How to Get API Keys

### Cloudflare R2 Public URL
- You already have this: `https://pub-f3452781d9104571a0e9e383ef6905ee.r2.dev`
- Just add it to your environment variables

### Notion API Key
1. Go to [Notion Integrations](https://www.notion.so/my-integrations)
2. Click "New integration"
3. Fill in the name and select your workspace
4. Click "Create integration"
5. Copy the "Internal Integration Token" - this is your `NOTION_API_KEY`

### Notion Database ID
1. Open your Notion database in a browser
2. Look at the URL: `https://notion.so/{DATABASE_ID}?v=...`
3. Copy the long string between `notion.so/` and `?` - this is your `NOTION_DATABASE_ID`
4. **Important:** Share your Notion database with the integration you created (click "Share" in Notion and add the integration)

## How to Set Variables

### Local Development
Create a `.env.local` file in the project root:
\`\`\`
NEXT_PUBLIC_R2_PUBLIC_URL=https://pub-f3452781d9104571a0e9e383ef6905ee.r2.dev
NOTION_API_KEY=your-key-here
NOTION_DATABASE_ID=your-blog-database-id
NOTION_PROJECTS_DATABASE_ID=your-projects-database-id
NEXT_PUBLIC_SITE_URL=http://localhost:3000
\`\`\`

### Vercel Deployment
1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable
5. Redeploy

## Security Notes

- Never commit `.env.local` to version control
- Use `.env.local` for local development only
- Always use Vercel's environment variables for production
- Keep your Notion API key private
