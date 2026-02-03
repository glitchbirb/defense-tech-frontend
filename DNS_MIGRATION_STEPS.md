# DNS Migration Steps - Option 1 Setup

## Goal
- `boomberg.xyz` → Frontend dashboard (Cloudflare Pages)
- `api.boomberg.xyz` → Backend API (Hetzner server at 172.64.80.1)

## Step 1: Add API Subdomain (Backend)

In Cloudflare DNS dashboard:

1. Go to https://dash.cloudflare.com → Select boomberg.xyz domain
2. Click **DNS** → **Records**
3. Add new record:
   - **Type:** A
   - **Name:** api
   - **IPv4 address:** 172.64.80.1 (your Hetzner server IP)
   - **Proxy status:** Proxied (orange cloud)
   - **TTL:** Auto
4. Click **Save**

## Step 2: Add Custom Domain to Pages (Frontend)

In Cloudflare Pages dashboard:

1. Go to https://dash.cloudflare.com/f0e77a4afb82879a38889ec5a1107b40/pages/view/defense-tech-frontend
2. Click **"Custom domains"** tab
3. Click **"Set up a custom domain"**
4. Enter: `boomberg.xyz`
5. Click **"Continue"**
6. Cloudflare will automatically configure:
   - CNAME record: `boomberg.xyz` → `defense-tech-frontend.pages.dev`
   - SSL certificate (1-2 minutes)

## Step 3: Update Backend API (on Hetzner)

SSH into your Hetzner server and update the API to accept requests from api.boomberg.xyz:

```bash
ssh root@172.64.80.1

# Update your backend configuration to accept api.boomberg.xyz
# This depends on your backend setup (Flask, nginx, etc.)
# You may need to update CORS settings or allowed hosts
```

## Step 4: Verify Setup

Wait 2-3 minutes for DNS propagation, then test:

```bash
# Test frontend
curl -I https://boomberg.xyz
# Should return 200 OK from Cloudflare Pages

# Test API
curl https://api.boomberg.xyz/api/health
# Should return: {"status":"ok",...}

# Test API stats
curl https://api.boomberg.xyz/api/stats
# Should return defense contract statistics
```

## Expected Timeline
- DNS changes: 1-2 minutes (Cloudflare is fast)
- SSL provisioning: 1-2 minutes
- Total: ~5 minutes

## Rollback Plan (if needed)

If something goes wrong, you can quickly rollback:

```bash
# In Cloudflare DNS, change the A record for @ back to 172.64.80.1
# Remove the api subdomain
# This will restore boomberg.xyz → backend API
```

## Current Status
- ✅ Frontend rebuilt with API URL: https://api.boomberg.xyz
- ✅ Frontend deployed to Cloudflare Pages
- ⏳ DNS records need to be updated (Steps 1-2)
- ⏳ Backend may need CORS/host updates (Step 3)
