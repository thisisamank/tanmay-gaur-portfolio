# Notion Portfolio Database Setup Guide

This guide explains how to set up Notion databases for your portfolio data.

## Required Databases

You need to create **4 separate Notion databases** for different types of portfolio data:

### 1. Portfolio Projects Database

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

### 2. Skills Database

**Database Name:** "Skills"

**Properties:**
| Property Name | Property Type | Description |
|---------------|---------------|-------------|
| **Name** | Title | Skill name |
| **Category** | Select | Technical, Creative, Management, etc. |
| **Order** | Number | Display order (lower numbers first) |
| **Published** | Checkbox | Whether to display publicly |

**Sample Data:**
- Name: "Video Editing"
- Category: "Technical"
- Order: 1
- Published: ✓

### 3. Employment History Database

**Database Name:** "Employment History"

**Properties:**
| Property Name | Property Type | Description |
|---------------|---------------|-------------|
| **Role** | Title | Job title |
| **Organization** | Rich Text | Company name |
| **Start Date** | Date | Start date |
| **End Date** | Date | End date (leave empty for current) |
| **Description** | Rich Text | Job description |
| **Order** | Number | Display order (higher numbers first) |
| **Published** | Checkbox | Whether to display publicly |

**Sample Data:**
- Role: "Executive Producer"
- Organization: "Gaurs-The Film People"
- Start Date: May 2024
- End Date: (empty for current)
- Description: "Leading production teams and managing film projects"
- Order: 3
- Published: ✓

### 4. Bio Information Database

**Database Name:** "Bio Information"

**Properties:**
| Property Name | Property Type | Description |
|---------------|---------------|-------------|
| **Name** | Title | Your name |
| **Title** | Rich Text | Professional title |
| **Quote** | Rich Text | Personal quote |
| **About Text** | Rich Text | About section text |
| **Skills Intro** | Rich Text | Skills section introduction |
| **Photo** | Files | Profile photo |
| **Phone** | Phone | Contact phone |
| **Email** | Email | Contact email |
| **Published** | Checkbox | Whether to display publicly |

**Sample Data:**
- Name: "Tanmay Gaur"
- Title: "Multi-speciality Filmmaker / Media Producer"
- Quote: "The indifference between risky and bold."
- About Text: "What do you get when you mix two unconventional and stubborn forces?..."
- Skills Intro: "Don't worry, I am not just some boastful, yet another over-confident youngster..."
- Phone: "+91 9891946529"
- Email: "tanmaygaur.gaurfilms@gmail.com"
- Published: ✓

## Setup Steps

1. **Create each database** in Notion with the properties listed above
2. **Add sample data** to test the integration
3. **Share each database** with your Notion integration
4. **Copy the database IDs** from the URLs
5. **Add the database IDs** to your `.env.local` file

## Database IDs

After creating each database, copy the database ID from the URL:
- URL format: `https://notion.so/{DATABASE_ID}?v=...`
- Add each ID to your environment variables

## Environment Variables

Add these to your `.env.local` file:

```
NOTION_PROJECTS_DATABASE_ID=your-projects-database-id
NOTION_SKILLS_DATABASE_ID=your-skills-database-id
NOTION_EMPLOYMENT_DATABASE_ID=your-employment-database-id
NOTION_BIO_DATABASE_ID=your-bio-database-id
```

## Testing

After setup, test the API endpoints:
- `/api/portfolio/projects` - Get all projects
- `/api/portfolio/skills` - Get all skills
- `/api/portfolio/employment` - Get employment history
- `/api/portfolio/bio` - Get bio information

## Notes

- **Published checkbox** controls whether items appear on the website
- **Order fields** control the display sequence
- **Featured checkbox** controls which projects appear in the featured section
- **Slug field** is used for project URLs
- **Files** can be uploaded directly to Notion or linked from external sources
