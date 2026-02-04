# Defense-Tech Spending Tracker - Frontend

Bloomberg Terminal-style frontend for tracking US defense spending to tech companies.

## Live Site
- **Frontend**: https://boomberg.xyz
- **Backend API**: https://boomberg.xyz/api

## Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Recharts, D3.js
- **Deployment**: Cloudflare Pages

## Features
- Real-time search of defense contracts
- Bloomberg Terminal-style dark theme interface
- Interactive charts and visualizations
- NAICS industry classification tracking
- Contractor and recipient detail pages
- Social sharing with citations
- Mobile-responsive design

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Required variables:
- `NEXT_PUBLIC_API_URL`: Backend API URL (default: https://boomberg.xyz)

## Project Structure

```
defense-tech-frontend/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Dashboard (home page)
│   ├── contractor/          # Contractor detail pages
│   ├── recipient/           # Recipient detail pages
│   └── search/              # Search results page
├── components/              # React components
│   ├── dashboard/          # Dashboard panels
│   ├── search/             # Search components
│   ├── charts/             # Chart components
│   ├── citations/          # Citation display components
│   └── ui/                 # shadcn/ui components
├── lib/                    # Utility functions
│   ├── api.ts             # API client
│   ├── formatting.ts      # Number/currency formatting
│   └── utils.ts           # General utilities
├── types/                  # TypeScript type definitions
└── public/                 # Static assets
```

## Deployment

The frontend is automatically deployed to Cloudflare Pages on every push to `main`.

### Cloudflare Pages Configuration
- **Build command**: `npm run build`
- **Build output directory**: `out`
- **Environment variables**: Set `NEXT_PUBLIC_API_URL` in GitHub Actions secrets

## Backend API

The backend API is already deployed at `https://boomberg.xyz`.

### Available Endpoints:
- `GET /api/spending/summary` - Top spending contractors and recipients
- `GET /api/company/<name>` - Company details
- `GET /api/contracts/search` - Search contracts with filters
- `GET /api/stats` - Overall statistics

## Contributing

1. Create a feature branch
2. Make your changes
3. Test locally
4. Push and create a pull request

## License

MIT
