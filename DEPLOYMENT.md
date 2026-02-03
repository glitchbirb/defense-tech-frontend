# Deployment Guide

## Deploy to Cloudflare Pages (Recommended)

### Step 1: Connect GitHub Repository

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select your account
3. Click **"Workers & Pages"** in the left sidebar
4. Click **"Create application"**
5. Click **"Pages"** tab
6. Click **"Connect to Git"**

### Step 2: Select Repository

1. Click **"Add account"** (if first time) or select your GitHub account
2. Authorize Cloudflare Pages to access your GitHub repositories
3. Select **`defense-tech-frontend`** from the repository list
4. Click **"Begin setup"**

### Step 3: Configure Build Settings

```
Framework preset: Next.js
Branch: main
Build command: npm run build
Build output directory: .next
Root directory: /
Environment variables:
  - NEXT_PUBLIC_API_URL: https://boomberg.xyz
```

### Step 4: Deploy

1. Click **"Save and Deploy"**
2. Wait for the build to complete (~2-3 minutes)
3. Your site will be live at: `https://defense-tech-frontend.pages.dev`

### Step 5: Add Custom Domain (Optional)

1. Go to your Cloudflare Pages project
2. Click **"Custom domains"** tab
3. Click **"Set up a custom domain"**
4. Enter your domain (e.g., `defense-tech.boomberg.xyz`)
5. Follow the DNS configuration instructions

---

## Alternative: Deploy via CLI

### Prerequisites

Set up Cloudflare API token:

```bash
export CLOUDFLARE_API_TOKEN=your_token_here
```

### Deploy

```bash
npx wrangler pages deploy .next --project-name defense-tech-frontend
```

---

## Verify Deployment

1. Visit your Cloudflare Pages URL
2. Check the API connection: https://your-site.pages.dev/
3. Verify data loads from boomberg.xyz backend

---

## Troubleshooting

### Build fails

- Check that `NEXT_PUBLIC_API_URL` is set correctly
- Verify build output directory is `.next`
- Check build logs for errors

### API not connecting

- Verify `NEXT_PUBLIC_API_URL` environment variable
- Check that boomberg.xyz API is accessible
- Check browser console for CORS errors

### Page not loading

- Clear browser cache
- Check Cloudflare Pages deployment logs
- Verify Next.js build completed successfully
