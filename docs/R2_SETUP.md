# Cloudflare R2 Setup Guide

This guide explains how to set up Cloudflare R2 for asset storage and optimization.

## Prerequisites

- Cloudflare account with R2 enabled
- R2 bucket created
- API token generated

## Environment Variables

Add the following environment variables to your `.env.local` file:

\`\`\`
NEXT_PUBLIC_R2_PUBLIC_URL=https://your-bucket.your-domain.com
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_ACCESS_KEY_ID=your-access-key-id
CLOUDFLARE_SECRET_ACCESS_KEY=your-secret-access-key
CLOUDFLARE_BUCKET_NAME=your-bucket-name
\`\`\`

## Setup Steps

1. **Create R2 Bucket**
   - Go to Cloudflare Dashboard → R2
   - Click "Create bucket"
   - Enter bucket name and select region
   - Click "Create bucket"

2. **Generate API Token**
   - Go to R2 Settings
   - Click "Create API token"
   - Select "Edit" permissions
   - Copy the credentials

3. **Configure Custom Domain (Optional)**
   - In R2 bucket settings, click "Connect Domain"
   - Add your custom domain or use Cloudflare's default URL

4. **Add Environment Variables**
   - Copy the credentials from step 2
   - Add them to your Vercel project environment variables

## Usage

### Upload Assets

\`\`\`typescript
import { uploadToR2 } from "@/lib/r2"

const file = new File(["content"], "image.jpg", { type: "image/jpeg" })
const asset = await uploadToR2(file, "images/image.jpg")
\`\`\`

### Optimize Images

\`\`\`typescript
import { getOptimizedImageUrl } from "@/lib/r2"

const url = getOptimizedImageUrl("images/image.jpg", {
  width: 800,
  height: 600,
  quality: 80,
  format: "webp",
})
\`\`\`

### Generate Responsive Images

\`\`\`typescript
import { generateResponsiveImageSrcSet } from "@/lib/r2"

const srcSet = generateResponsiveImageSrcSet("images/image.jpg")
\`\`\`

## Image Optimization Features

- **Automatic Format Selection**: Serves AVIF, WebP, or JPEG based on browser support
- **Responsive Images**: Generates multiple sizes for different devices
- **Quality Control**: Adjust compression quality (1-100)
- **Caching**: Long-term caching for optimized assets
- **CDN**: Global distribution through Cloudflare's network

## Best Practices

1. **Organize Assets**: Use folder structure like `images/projects/`, `images/blog/`, etc.
2. **Naming**: Use descriptive names with lowercase and hyphens
3. **Optimization**: Always use optimized URLs for production
4. **Caching**: Set appropriate cache headers for different asset types
5. **Monitoring**: Monitor R2 usage and costs in Cloudflare Dashboard

## Troubleshooting

### 401 Unauthorized
- Check API credentials are correct
- Verify API token has "Edit" permissions

### 403 Forbidden
- Ensure bucket name is correct
- Check bucket permissions

### Slow Performance
- Verify custom domain is configured
- Check image optimization parameters
- Monitor Cloudflare Analytics

## References

- [Cloudflare R2 Documentation](https://developers.cloudflare.com/r2/)
- [Image Optimization Guide](https://developers.cloudflare.com/images/)
