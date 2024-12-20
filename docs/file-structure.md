# File Structure Documentation

## Project Root Structure
```
percentage-calculator/
├── .github/                    # GitHub Actions workflows
├── .husky/                     # Git hooks
├── src/                        # Source code
├── public/                     # Static files
├── scripts/                    # Build and utility scripts
├── __tests__/                  # Test files
├── .env.example               
├── .eslintrc.js
├── .prettierrc
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

## Source Code Structure
```
src/
├── app/                        # Next.js 14 App Router
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Landing page
│   ├── not-found.tsx          # 404 page
│   ├── error.tsx              # Error boundary
│   ├── loading.tsx            # Loading UI
│   ├── manifest.ts            # PWA manifest
│   ├── sitemap.ts             # Dynamic sitemap
│   ├── robots.ts              # Robots.txt configuration
│   │
│   ├── [calculation]/         # Dynamic calculation routes
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── opengraph-image.tsx
│   │
│   └── api/                   # API routes
│       ├── calculation/
│       ├── cron/
│       └── meta/
│
├── components/                 # React components
│   ├── ui/                    # Shadcn UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── ...
│   │
│   ├── calculator/            # Calculator components
│   │   ├── CalculatorForm.tsx
│   │   ├── ResultDisplay.tsx
│   │   ├── StepByStep.tsx
│   │   └── RelatedCalculations.tsx
│   │
│   ├── layout/               # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   │
│   └── shared/               # Shared components
│       ├── ErrorBoundary.tsx
│       ├── LoadingSpinner.tsx
│       └── SEOHead.tsx
│
├── lib/                      # Library code
│   ├── supabase/            # Supabase client
│   │   ├── client.ts
│   │   └── types.ts
│   │
│   ├── utils/               # Utility functions
│   │   ├── calculations.ts
│   │   ├── formatting.ts
│   │   ├── validation.ts
│   │   └── seo.ts
│   │
│   └── constants/           # Constants and configurations
│       ├── routes.ts
│       ├── metadata.ts
│       └── calculations.ts
│
├── hooks/                   # Custom React hooks
│   ├── useCalculation.ts
│   ├── useURLGeneration.ts
│   └── useSEOMeta.ts
│
├── services/               # Business logic services
│   ├── calculation/
│   │   ├── types.ts
│   │   ├── service.ts
│   │   └── utils.ts
│   │
│   ├── seo/
│   │   ├── types.ts
│   │   ├── service.ts
│   │   └── utils.ts
│   │
│   └── cron/
│       ├── types.ts
│       ├── service.ts
│       └── utils.ts
│
├── styles/                # Global styles
│   ├── globals.css
│   └── calculations.css
│
└── types/                # TypeScript type definitions
    ├── calculation.ts
    ├── api.ts
    └── common.ts
```

## Key Directory Details

### 1. App Directory Structure
```typescript
interface AppDirectoryStructure {
    layout: {
        purpose: 'Root layout with providers and global UI',
        includes: [
            'Supabase provider',
            'Theme provider',
            'Toast notifications',
            'SEO defaults'
        ]
    },
    page: {
        purpose: 'Landing page with calculator selection',
        components: [
            'CalculatorSelector',
            'RecentCalculations',
            'SEOContent'
        ]
    },
    'dynamic-routes': {
        pattern: '[calculation]',
        handles: [
            'URL parsing',
            'Calculation fetching',
            'Meta generation'
        ]
    }
}
```

### 2. Components Organization
```typescript
interface ComponentOrganization {
    ui: {
        purpose: 'Shadcn UI components',
        styling: 'Tailwind CSS',
        configuration: 'components.json'
    },
    calculator: {
        purpose: 'Core calculator functionality',
        pattern: 'Compound components'
    },
    layout: {
        purpose: 'Page structure components',
        reusability: 'High'
    },
    shared: {
        purpose: 'Common utility components',
        usage: 'Cross-application'
    }
}
```

### 3. Services Layer
```typescript
interface ServicesLayer {
    calculation: {
        purpose: 'Business logic for calculations',
        responsibilities: [
            'Calculation execution',
            'Result caching',
            'Error handling'
        ]
    },
    seo: {
        purpose: 'SEO optimization logic',
        responsibilities: [
            'Meta generation',
            'Sitemap updates',
            'Schema markup'
        ]
    },
    cron: {
        purpose: 'Automated tasks',
        responsibilities: [
            'Route generation',
            'Cache management',
            'Database cleanup'
        ]
    }
}
```

### 4. Library Code Organization
```typescript
interface LibraryOrganization {
    supabase: {
        purpose: 'Database client configuration',
        includes: ['Type definitions', 'Client setup']
    },
    utils: {
        purpose: 'Shared utility functions',
        categories: [
            'Calculations',
            'Formatting',
            'Validation',
            'SEO'
        ]
    },
    constants: {
        purpose: 'Application constants',
        types: ['Routes', 'Metadata', 'Configurations']
    }
}
```

## File Naming Conventions

### 1. Component Files
- PascalCase for component files
- `.tsx` extension for components
- Type files paired with components use `.types.ts`

### 2. Utility Files
- camelCase for utility files
- `.ts` extension for utilities
- Test files use `.test.ts` or `.spec.ts`

### 3. Page Files
- `page.tsx` for route pages
- `layout.tsx` for layouts
- `loading.tsx` for loading states
- `error.tsx` for error boundaries

## Import Organization

### 1. Import Order
```typescript
// 1. React and Next.js imports
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// 2. External library imports
import { clsx } from 'clsx'

// 3. Components imports
import { Button } from '@/components/ui'

// 4. Hooks imports
import { useCalculation } from '@/hooks'

// 5. Utils and types imports
import { formatNumber } from '@/lib/utils'
import type { CalculationType } from '@/types'
```

This file structure is designed to:
1. Follow Next.js 14 best practices
2. Maintain clear separation of concerns
3. Support scalability and maintainability
4. Optimize for developer experience
5. Enable efficient testing and deployment