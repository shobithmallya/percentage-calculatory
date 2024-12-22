# Percentage Calculator Project Implementation Checklist

## Phase 0: Environment Setup
- [X] Install Visual Studio Code
  - Download from https://code.visualstudio.com/
  - Install recommended extensions from stack.md:
    - ESLint
    - Prettier
    - Tailwind CSS IntelliSense
    - TypeScript and JavaScript Language Features

- [X] Install Node.js v18.17 or higher
  - Download from https://nodejs.org/
  - Verify installation: `node --version`

- [X] Install pnpm
  ```bash
  npm install -g pnpm
  ```
  - Verify installation: `pnpm --version`

- [X] Install Git
  - Download from https://git-scm.com/
  - Verify installation: `git --version`

## Phase 1: Project Initialization

### 1.1 Create Project
- [X] Create new Next.js project:
  ```bash
  pnpm create next-app percentage-calculator --typescript --tailwind --app
  ```
  - When prompted:
    - ✔ Would you like to use TypeScript? Yes
    - ✔ Would you like to use ESLint? Yes
    - ✔ Would you like to use Tailwind CSS? Yes
    - ✔ Would you like to use `src/` directory? Yes
    - ✔ Would you like to use App Router? Yes
    - ✔ Would you like to customize the default import alias? No

### 1.2 Install Dependencies
- [X] Navigate to project directory:
  ```bash
  cd percentage-calculator
  ```

- [X] Install UI packages:
  ```bash
  pnpm add @radix-ui/react-accordion @radix-ui/react-toast class-variance-authority clsx tailwind-merge tailwindcss-animate @shadcn/ui
  ```

- [X] Install Supabase packages:
  ```bash
  pnpm add @supabase/supabase-js @supabase/auth-helpers-nextjs
  ```

- [X] Install SEO packages:
  ```bash
  pnpm add next-sitemap next-seo
  ```

- [X] Install utility packages:
  ```bash
  pnpm add date-fns zod uuid
  ```

### 1.3 Configure Environment
- [X] Create `.env.example` file in root:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
  NEXT_PUBLIC_SITE_URL=your_production_url
  ```

- [X] Create `.env.local` with actual values:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=<your_actual_supabase_url>
  NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_actual_supabase_anon_key>
  NEXT_PUBLIC_SITE_URL=http://localhost:3000
  ```

### 1.4 Set Up Project Structure
- [X] Create required directories:
  ```bash
  mkdir -p src/{app,components/{ui,calculator,layout,shared},lib/{supabase,utils,constants},hooks,services/{calculation,seo,cron},styles,types}
  ```

## Phase 2: Database Setup

### 2.1 Supabase Configuration
- [X] Create Supabase account at https://supabase.com
- [X] Create new project
- [X] Copy project URL and anon key to `.env.local`

### 2.2 Create Database Tables
- [X] Create calculations table:
  ```sql
  CREATE TABLE calculations (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      format_type VARCHAR(50) NOT NULL,
      value_x NUMERIC NOT NULL,
      value_y NUMERIC NOT NULL,
      result NUMERIC NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      last_accessed_at TIMESTAMPTZ,
      access_count INTEGER DEFAULT 0,
      is_automated BOOLEAN DEFAULT FALSE,
      calculation_steps JSONB,
      related_formats JSONB
  );
  ```

- [X] Create url_mappings table:
  ```sql
  CREATE TABLE url_mappings (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      original_slug VARCHAR(255) NOT NULL,
      mapped_slug VARCHAR(255) NOT NULL,
      is_misspelling BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      FOREIGN KEY (original_slug) REFERENCES calculations(slug)
  );
  ```

- [X] Create meta_information table:
  ```sql
  CREATE TABLE meta_information (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      calculation_id UUID NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      canonical_url VARCHAR(255) NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      FOREIGN KEY (calculation_id) REFERENCES calculations(id)
  );
  ```
## Phase 3: Core Implementation

### 3.1 Set Up Type Definitions
- [X] Create `src/types/calculation.ts`:
  ```typescript:src/types/calculation.ts
  export enum CalculationFormat {
    PERCENTAGE_OF = 'percentage_of',
    RATIO_TO_PERCENT = 'ratio_to_percent',
    OUT_OF_PERCENTAGE = 'out_of_percentage',
    PERCENT_DIFFERENCE = 'percent_difference',
    IS_WHAT_PERCENT = 'is_what_percent',
    PERCENT_OFF = 'percent_off'
  }

  export interface Calculation {
    id: string;
    formatType: CalculationFormat;
    valueX: number;
    valueY: number;
    result: number;
    slug: string;
    createdAt: Date;
    lastAccessedAt?: Date;
    accessCount: number;
    isAutomated: boolean;
    calculationSteps: CalculationStep[];
    relatedFormats: RelatedFormat[];
  }

  export interface CalculationStep {
    stepNumber: number;
    description: string;
    formula?: string;
    intermediateResult?: number;
  }

  export interface RelatedFormat {
    formatType: CalculationFormat;
    slug: string;
    description: string;
    result: number;
  }
  ```

### 3.2 Implement Supabase Client
- [X] Create `src/lib/supabase/client.ts`:
  ```typescript:src/lib/supabase/client.ts
  import { createClient } from '@supabase/supabase-js';

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  export const supabase = createClient(supabaseUrl, supabaseKey);
  ```

### 3.3 Implement Core Services

#### 3.3.1 Calculation Service
- [X] Create `src/services/calculation/service.ts`:
  ```typescript:src/services/calculation/service.ts
  import { CalculationFormat, Calculation } from '@/types/calculation';
  import { supabase } from '@/lib/supabase/client';

  export const calculationService = {
    async performCalculation(format: CalculationFormat, x: number, y: number): Promise<Calculation> {
      // Implementation for each calculation type
      
      // Return calculation result with steps
    },

    async getCalculationBySlug(slug: string): Promise<Calculation | null> {
      const { data, error } = await supabase
        .from('calculations')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error) throw error;
      return data;
    },

    // Add other calculation methods
  };
  ```

#### 3.3.2 SEO Service
- [X] Create `src/services/seo/service.ts`:
  ```typescript:src/services/seo/service.ts
  import { Calculation } from '@/types/calculation';

  export const seoService = {
    generateMetaInfo(calculation: Calculation) {
      // Generate meta title, description based on calculation
      return {
        title: `Calculate ${calculation.valueX}% of ${calculation.valueY}`,
        description: `Learn how to calculate ${calculation.valueX}% of ${calculation.valueY} with step-by-step explanation. Get instant results and related calculations.`,
        // Add other meta properties
      };
    },
    // Add other SEO methods
  };
  ```

### 3.4 Implement UI Components

#### 3.4.1 Layout Components
- [ ] Create `src/components/layout/Header.tsx`:
  ```typescript:src/components/layout/Header.tsx
  export default function Header() {
    return (
      <header className="w-full py-4 border-b">
        <nav className="container mx-auto px-4">
          {/* Add navigation items */}
        </nav>
      </header>
    );
  }
  ```

- [ ] Create `src/components/layout/Footer.tsx`:
  ```typescript:src/components/layout/Footer.tsx
  export default function Footer() {
    return (
      <footer className="w-full py-8 border-t mt-auto">
        <div className="container mx-auto px-4">
          {/* Add footer content */}
        </div>
      </footer>
    );
  }
  ```

#### 3.4.2 Calculator Components
- [ ] Create `src/components/calculator/CalculatorForm.tsx`:
  ```typescript:src/components/calculator/CalculatorForm.tsx
  import { useState } from 'react';
  import { CalculationFormat } from '@/types/calculation';

  export default function CalculatorForm() {
    const [values, setValues] = useState({
      format: CalculationFormat.PERCENTAGE_OF,
      valueX: '',
      valueY: ''
    });

    // Add form handling logic
    return (
      <form className="space-y-4">
        {/* Add form fields */}
      </form>
    );
  }
  ```

- [ ] Create `src/components/calculator/ResultDisplay.tsx`:
  ```typescript:src/components/calculator/ResultDisplay.tsx
  import { Calculation } from '@/types/calculation';

  interface Props {
    calculation: Calculation;
  }

  export default function ResultDisplay({ calculation }: Props) {
    return (
      <div className="rounded-lg border p-4">
        {/* Display calculation result */}
      </div>
    );
  }
  ```

### 3.5 Implement Custom Hooks
- [ ] Create `src/hooks/useCalculation.ts`:
  ```typescript:src/hooks/useCalculation.ts
  import { useState } from 'react';
  import { calculationService } from '@/services/calculation/service';
  import { CalculationFormat, Calculation } from '@/types/calculation';

  export function useCalculation() {
    const [result, setResult] = useState<Calculation | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    // Add calculation logic
    
    return { result, loading, error };
  }
  ```

## Phase 4: Route Implementation

### 4.1 Configure Root Layout
- [ ] Update `src/app/layout.tsx`:
  ```typescript:src/app/layout.tsx
  import { Inter } from 'next/font/google';
  import Header from '@/components/layout/Header';
  import Footer from '@/components/layout/Footer';
  import '@/styles/globals.css';

  const inter = Inter({ subsets: ['latin'] });

  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </body>
      </html>
    );
  }
  ```

### 4.2 Implement Landing Page
- [ ] Update `src/app/page.tsx`:
  ```typescript:src/app/page.tsx
  import CalculatorForm from '@/components/calculator/CalculatorForm';

  export default function Home() {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">
          Percentage Calculator
        </h1>
        <CalculatorForm />
      </div>
    );
  }
  ```

### 4.3 Implement Dynamic Routes
- [ ] Create `src/app/[calculation]/page.tsx`:
  ```typescript:src/app/[calculation]/page.tsx
  import { calculationService } from '@/services/calculation/service';
  import ResultDisplay from '@/components/calculator/ResultDisplay';

  export default async function CalculationPage({
    params
  }: {
    params: { calculation: string }
  }) {
    const calculation = await calculationService.getCalculationBySlug(params.calculation);
    
    if (!calculation) {
      return <div>Calculation not found</div>;
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <ResultDisplay calculation={calculation} />
      </div>
    );
  }
  ```
## Phase 5: SEO Implementation

### 5.1 Configure SEO Basics
- [ ] Create `src/app/robots.ts`:
  ```typescript:src/app/robots.ts
  import { MetadataRoute } from 'next';

  export default function robots(): MetadataRoute.Robots {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
      },
      sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
    };
  }
  ```

- [ ] Create `src/app/sitemap.ts`:
  ```typescript:src/app/sitemap.ts
  import { MetadataRoute } from 'next';
  import { supabase } from '@/lib/supabase/client';

  export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const { data: calculations } = await supabase
      .from('calculations')
      .select('slug, last_accessed_at')
      .order('last_accessed_at', { ascending: false })
      .limit(1000);

    return [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      ...(calculations?.map((calc) => ({
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/${calc.slug}`,
        lastModified: new Date(calc.last_accessed_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      })) ?? []),
    ];
  }
  ```

### 5.2 Implement Schema Markup
- [ ] Create `src/lib/utils/schema.ts`:
  ```typescript:src/lib/utils/schema.ts
  import { Calculation } from '@/types/calculation';

  export function generateCalculatorSchema(calculation: Calculation) {
    return {
      '@context': 'https://schema.org',
      '@type': 'MathSolver',
      name: `Calculate ${calculation.valueX}% of ${calculation.valueY}`,
      description: `Step-by-step solution for calculating ${calculation.valueX}% of ${calculation.valueY}`,
      eduQuestionType: 'Percentage Calculation',
      text: `What is ${calculation.valueX}% of ${calculation.valueY}?`,
      resultText: `The result is ${calculation.result}`,
    };
  }
  ```

### 5.3 Implement Metadata
- [ ] Update `src/app/layout.tsx` metadata:
  ```typescript:src/app/layout.tsx
  export const metadata = {
    title: {
      default: 'Percentage Calculator - Easy & Free Online Tool',
      template: '%s | Percentage Calculator'
    },
    description: 'Free online percentage calculator with step-by-step solutions. Calculate percentages easily with our user-friendly tool.',
    keywords: ['percentage calculator', 'percent calculator', 'calculate percentage'],
  };
  ```

- [ ] Create dynamic metadata in `src/app/[calculation]/page.tsx`:
  ```typescript:src/app/[calculation]/page.tsx
  export async function generateMetadata({ params }: { params: { calculation: string } }) {
    const calc = await calculationService.getCalculationBySlug(params.calculation);
    if (!calc) return {};

    return {
      title: `Calculate ${calc.valueX}% of ${calc.valueY}`,
      description: `Learn how to calculate ${calc.valueX}% of ${calc.valueY}. Step-by-step solution and explanation provided.`,
      openGraph: {
        title: `Calculate ${calc.valueX}% of ${calc.valueY}`,
        description: `Step-by-step solution for calculating ${calc.valueX}% of ${calc.valueY}`,
      },
    };
  }
  ```

## Phase 6: Testing & Deployment

### 6.1 Set Up Testing
- [ ] Install testing packages:
  ```bash
  pnpm add -D jest @testing-library/react @testing-library/jest-dom @types/jest jest-environment-jsdom
  ```

- [ ] Create `jest.config.js`:
  ```javascript:jest.config.js
  const nextJest = require('next/jest');

  const createJestConfig = nextJest({
    dir: './',
  });

  const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
  };

  module.exports = createJestConfig(customJestConfig);
  ```

- [ ] Create `jest.setup.js`:
  ```javascript:jest.setup.js
  import '@testing-library/jest-dom';
  ```

### 6.2 Write Basic Tests
- [ ] Create `__tests__/services/calculation.test.ts`:
  ```typescript:__tests__/services/calculation.test.ts
  import { calculationService } from '@/services/calculation/service';
  import { CalculationFormat } from '@/types/calculation';

  describe('calculationService', () => {
    it('should calculate percentage correctly', async () => {
      const result = await calculationService.performCalculation(
        CalculationFormat.PERCENTAGE_OF,
        10,
        200
      );
      expect(result.result).toBe(20);
    });
  });
  ```

### 6.3 Configure Vercel Deployment
- [ ] Create `vercel.json`:
  ```json:vercel.json
  {
    "git": {
      "deploymentEnabled": {
        "main": true
      }
    },
    "crons": [
      {
        "path": "/api/cron/generate-calculations",
        "schedule": "0 0 * * *"
      }
    ]
  }
  ```

## Phase 7: Final Steps & Launch

### 7.1 Performance Optimization
- [ ] Implement caching headers in `src/app/[calculation]/page.tsx`:
  ```typescript:src/app/[calculation]/page.tsx
  export const revalidate = 3600; // Cache for 1 hour

  export async function generateStaticParams() {
    const { data: calculations } = await supabase
      .from('calculations')
      .select('slug')
      .order('access_count', { ascending: false })
      .limit(1000);

    return calculations?.map(calc => ({
      calculation: calc.slug
    })) ?? [];
  }
  ```

### 7.2 Error Handling
- [ ] Create `src/app/error.tsx`:
  ```typescript:src/app/error.tsx
  'use client';

  export default function Error({
    error,
    reset,
  }: {
    error: Error;
    reset: () => void;
  }) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </div>
    );
  }
  ```

### 7.3 Analytics Setup
- [ ] Add Google Analytics in `src/app/layout.tsx`:
  ```typescript:src/app/layout.tsx
  import Script from 'next/script';

  // Add inside head
  <Script
    strategy="afterInteractive"
    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
  />
  <Script
    id="google-analytics"
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{
      __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
      `,
    }}
  />
  ```

### 7.4 Pre-launch Checklist
- [ ] Run Lighthouse audit and fix issues
- [ ] Test all calculation types manually
- [ ] Verify mobile responsiveness
- [ ] Check all meta tags and schema markup
- [ ] Verify robots.txt and sitemap.xml
- [ ] Test error boundaries
- [ ] Check loading states
- [ ] Verify API endpoints
- [ ] Test CRON job functionality
- [ ] Verify database indexes
- [ ] Check environment variables in Vercel

### 7.5 Launch Steps
- [ ] Deploy to production:
  ```bash
  git push origin main
  ```
- [ ] Verify deployment in Vercel dashboard
- [ ] Submit sitemap to Google Search Console
- [ ] Monitor error reporting in Vercel
- [ ] Set up uptime monitoring (e.g., UptimeRobot)
- [ ] Monitor initial performance metrics
- [ ] Set up daily backup routine for database