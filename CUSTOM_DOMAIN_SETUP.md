# Custom Domain Setup - boomberg.xyz

## Add Custom Domain to Cloudflare Pages

### Option 1: Via Cloudflare Dashboard (Recommended)

1. Go to https://dash.cloudflare.com/f0e77a4afb82879a38889ec5a1107b40/pages/view/defense-tech-frontend
2. Click the **"Custom domains"** tab
3. Click **"Set up a custom domain"**
4. Enter: `boomberg.xyz`
5. Click **"Continue"**
6. Cloudflare will automatically configure DNS (since domain is already in Cloudflare)
7. Wait 1-2 minutes for SSL certificate provisioning

### Option 2: Via Cloudflare API

```bash
ACCOUNT_ID="f0e77a4afb82879a38889ec5a1107b40"
PROJECT_NAME="defense-tech-frontend"
DOMAIN="boomberg.xyz"

# Get your API token from wrangler
# Then run:
curl -X POST "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects/$PROJECT_NAME/domains" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data "{\"name\":\"$DOMAIN\"}"
```

## Verify Domain

After adding the domain:

```bash
curl -I https://boomberg.xyz
# Should return 200 OK

curl https://boomberg.xyz | grep -o '<title>[^<]*</title>'
# Should show: <title>Defense-Tech Spending Tracker | boomberg.xyz</title>
```

## DNS Configuration (Auto-configured)

Since boomberg.xyz is already in Cloudflare, DNS will be automatically configured:

- **CNAME Record:** `boomberg.xyz` → `defense-tech-frontend.pages.dev`
- **SSL/TLS:** Automatic (Universal SSL)
- **Proxy Status:** Proxied (orange cloud)

## Result

Your dashboard will be accessible at:
- ✅ https://boomberg.xyz (primary custom domain)
- https://defense-tech-frontend.pages.dev (pages.dev subdomain)
