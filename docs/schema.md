# Schema Design Documentation

## 1. Database Schema (Supabase)

### 1.1 Calculations Table
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

-- Indexes
CREATE INDEX idx_calculations_slug ON calculations(slug);
CREATE INDEX idx_calculations_format_type ON calculations(format_type);
CREATE INDEX idx_calculations_values ON calculations(value_x, value_y);
CREATE INDEX idx_calculations_last_accessed ON calculations(last_accessed_at);
```

### 1.2 URL Mappings Table
```sql
CREATE TABLE url_mappings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    original_slug VARCHAR(255) NOT NULL,
    mapped_slug VARCHAR(255) NOT NULL,
    is_misspelling BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (original_slug) REFERENCES calculations(slug)
);

-- Indexes
CREATE INDEX idx_url_mappings_slugs ON url_mappings(original_slug, mapped_slug);
```

### 1.3 Meta Information Table
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

-- Indexes
CREATE INDEX idx_meta_calculation_id ON meta_information(calculation_id);
```

## 2. TypeScript Types/Interfaces

### 2.1 Calculation Types
```typescript
// Calculation Format Types
export enum CalculationFormat {
  PERCENTAGE_OF = 'percentage_of',
  RATIO_TO_PERCENT = 'ratio_to_percent',
  OUT_OF_PERCENTAGE = 'out_of_percentage',
  PERCENT_DIFFERENCE = 'percent_difference',
  IS_WHAT_PERCENT = 'is_what_percent',
  PERCENT_OFF = 'percent_off'
}

// Base Calculation Interface
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

// Calculation Steps
export interface CalculationStep {
  stepNumber: number;
  description: string;
  formula?: string;
  intermediateResult?: number;
}

// Related Format
export interface RelatedFormat {
  formatType: CalculationFormat;
  slug: string;
  description: string;
  result: number;
}
```

### 2.2 URL and Routing Types
```typescript
export interface URLMapping {
  id: string;
  originalSlug: string;
  mappedSlug: string;
  isMisspelling: boolean;
  createdAt: Date;
}

export interface MetaInformation {
  id: string;
  calculationId: string;
  title: string;
  description: string;
  canonicalUrl: string;
  createdAt: Date;
}
```

### 2.3 Service Types
```typescript
export interface CalculationService {
  performCalculation(format: CalculationFormat, x: number, y: number): Promise<Calculation>;
  getCalculationBySlug(slug: string): Promise<Calculation | null>;
  generateRelatedCalculations(calculation: Calculation): Promise<RelatedFormat[]>;
  updateAccessCount(calculationId: string): Promise<void>;
}

export interface URLService {
  generateSlug(format: CalculationFormat, x: number, y: number): string;
  handleRedirect(slug: string): Promise<string | null>;
  addMisspellingMapping(originalSlug: string, misspelledSlug: string): Promise<void>;
}

export interface MetaService {
  generateMetaInfo(calculation: Calculation): Promise<MetaInformation>;
  updateCanonicalUrl(calculationId: string, url: string): Promise<void>;
}
```

### 2.4 CRON Job Types
```typescript
export interface CRONJobConfig {
  combinationsPerFormat: number;
  batchSize: number;
  retryAttempts: number;
  delayBetweenBatches: number;
}

export interface GeneratedCombination {
  format: CalculationFormat;
  valueX: number;
  valueY: number;
}

export interface CRONJobResult {
  successful: number;
  failed: number;
  errors: Error[];
  timestamp: Date;
}
```

## 3. Database Policies (Supabase RLS)

### 3.1 Read Access
```sql
CREATE POLICY "Enable read access for all users" ON calculations
    FOR SELECT
    TO public
    USING (true);
```

### 3.2 Insert Access
```sql
CREATE POLICY "Enable insert for automated processes" ON calculations
    FOR INSERT
    TO service_role
    WITH CHECK (true);
```

### 3.3 Update Access
```sql
CREATE POLICY "Enable access count updates" ON calculations
    FOR UPDATE
    TO service_role
    USING (true)
    WITH CHECK (true);
```

## 4. Database Functions

### 4.1 Update Access Count
```sql
CREATE OR REPLACE FUNCTION update_calculation_access()
RETURNS TRIGGER AS $$
BEGIN
    NEW.access_count := OLD.access_count + 1;
    NEW.last_accessed_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_calculation_access_trigger
    BEFORE UPDATE ON calculations
    FOR EACH ROW
    EXECUTE FUNCTION update_calculation_access();
```

### 4.2 Clean URL Generation
```sql
CREATE OR REPLACE FUNCTION generate_clean_slug(
    format_type VARCHAR,
    value_x NUMERIC,
    value_y NUMERIC
) RETURNS VARCHAR AS $$
BEGIN
    RETURN LOWER(
        REPLACE(
            REPLACE(
                format_type || '-' || value_x || '-' || value_y,
                ' ', '-'
            ),
            '_', '-'
        )
    );
END;
$$ LANGUAGE plpgsql;
```

This schema design provides a solid foundation for:
1. Efficient data storage and retrieval
2. Type safety throughout the application
3. Proper database indexing for performance
4. Clear separation of concerns
5. Scalability considerations
6. Security through RLS policies