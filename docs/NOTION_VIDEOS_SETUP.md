# Notion Videos Database Setup Guide

This guide explains how to set up a Notion database for your video projects only.

## Required Database

Create **1 Notion database** for your video projects:

### Portfolio Projects Database

**Database Name:** "Portfolio Projects"

**Properties:**
| Property Name | Property Type | Description |
|---------------|---------------|-------------|
| **Title** | Title | Project name |
| **Slug** | Rich Text | URL-friendly identifier (e.g., "urban-perspectives") |
| **Year** | Number | Project year |
| **Role** | Rich Text | Your role in the project |
| **Thumbnail** | Files | Project thumbnail image |
| **Video URL** | URL | Link to project video |
| **Description** | Rich Text | Project description |
| **Credits** | Multi-select | List of credits (Producer, Cinematographer, etc.) |
| **Still Images** | Files | Gallery of still images |
| **Category** | Select | Commercial, Documentary, Drone, Music Video, Corporate, Other |
| **Featured** | Checkbox | Whether to show in featured section |
| **Published** | Checkbox | Whether to display publicly |

**Sample Data:**
- Title: "Urban Perspectives"
- Slug: "urban-perspectives"
- Year: 2024
- Role: "Director"
- Description: "A cinematic exploration of city life through the lens of emerging artists."
- Credits: "Producer: Tanmay Gaur", "Cinematographer: Alex Kumar", "Editor: Priya Singh"
- Category: "Documentary"
- Featured: ✓
- Published: ✓

## Setup Steps

1. **Create the database** in Notion with the properties listed above
2. **Add sample data** to test the integration
3. **Share the database** with your Notion integration
4. **Copy the database ID** from the URL
5. **Add the database ID** to your `.env.local` file

## Database ID

After creating the database, copy the database ID from the URL:
- URL format: `https://notion.so/{DATABASE_ID}?v=...`
- Add the ID to your environment variables

## Environment Variables

Add this to your `.env.local` file:

```
NOTION_PROJECTS_DATABASE_ID=your-projects-database-id
```

## How It Works

- **Dynamic Videos**: Videos are now fetched from your Notion database instead of hardcoded
- **Fallback System**: If Notion is not configured or fails, the site uses your existing static project data
- **No Breaking Changes**: Your current portfolio continues to work exactly as before
- **Optional Enhancement**: Only add Notion if you want dynamic video management

## Testing

After setup, test the API endpoint:
- `/api/projects` - Get all projects (from Notion if configured, otherwise static data)

## Notes

- **Published checkbox** controls whether projects appear on the website
- **Featured checkbox** controls which projects appear in the featured section
- **Slug field** is used for project URLs
- **Files** can be uploaded directly to Notion or linked from external sources
- **All other portfolio data** (bio, skills, employment) remains static and unchanged
