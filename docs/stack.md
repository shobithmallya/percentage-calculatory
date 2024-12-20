# Tech Stack and Packages Documentation

## Core Technologies

### Framework
- Next.js 14 (App Router)
- TypeScript
- React 18
- Shadcn Components ONLY for frontend

### Database
- Supabase
  - PostgreSQL for data storage
  - Row Level Security
  - Real-time capabilities (if needed)

### Deployment
- Vercel
  - Edge Functions
  - Analytics
  - Edge Caching

## Required Packages

### UI Components
```json
{
  "dependencies": {
    "@radix-ui/react-accordion": "^latest",
    "@radix-ui/react-toast": "^latest",
    "class-variance-authority": "^latest",
    "clsx": "^latest",
    "tailwind-merge": "^latest",
    "tailwindcss-animate": "^latest",
    "@shadcn/ui": "^latest"
  }
}
```

### Database & API
```json
{
  "dependencies": {
    "@supabase/supabase-js": "^latest",
    "@supabase/auth-helpers-nextjs": "^latest"
  }
}
```

### SEO & Metadata
```json
{
  "dependencies": {
    "next-sitemap": "^latest",
    "next-seo": "^latest"
  }
}
```

### Development Tools
```json
{
  "devDependencies": {
    "typescript": "^latest",
    "autoprefixer": "^latest",
    "postcss": "^latest",
    "tailwindcss": "^latest",
    "eslint": "^latest",
    "eslint-config-next": "^latest",
    "@types/node": "^latest",
    "@types/react": "^latest",
    "@types/react-dom": "^latest"
  }
}
```

### Utilities
```json
{
  "dependencies": {
    "date-fns": "^latest",
    "zod": "^latest",
    "uuid": "^latest"
  }
}
```

## Development Environment Setup

### Required Tools
- Node.js (v18.17 or higher)
- pnpm (recommended) or npm
- Git

### Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=your_production_url
```

### VSCode Extensions
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features

## Setup Instructions

1. Clone repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Set up environment variables
4. Initialize Supabase:
   ```bash
   pnpm supabase init
   ```
5. Start development server:
   ```bash
   pnpm dev
   ```

## Build & Deployment

### Build Command
```bash
pnpm build
```

### Deployment Configuration
- Platform: Vercel
- Build Command: `pnpm build`
- Output Directory: `.next`
- Install Command: `pnpm install`
- Environment Variables: As specified above