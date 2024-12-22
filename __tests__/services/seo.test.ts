import { seoService } from '@/services/seo/service';
import { Calculation, CalculationFormat } from '@/types/calculation';

describe('seoService', () => {
  const mockCalculation: Calculation = {
    id: 'test-id',
    formatType: CalculationFormat.PERCENTAGE_OF,
    valueX: 10,
    valueY: 200,
    result: 20,
    slug: 'what-is-10-percent-of-200',
    createdAt: new Date(),
    lastAccessedAt: new Date(),
    accessCount: 1,
    isAutomated: false,
    calculationSteps: [
      {
        stepNumber: 1,
        description: 'Convert percentage to decimal',
        formula: '10% = 10/100 = 0.1',
        intermediateResult: 0.1
      }
    ],
    relatedFormats: []
  };

  beforeEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://test.com';
  });

  describe('generateMetaInfo', () => {
    it('should generate correct meta information', () => {
      const meta = seoService.generateMetaInfo(mockCalculation);

      expect(meta.title).toContain('Calculate what is 10% of 200');
      expect(meta.description).toContain('Step-by-step solution with detailed explanation');
      expect(meta.canonical).toBe('https://test.com/what-is-10-percent-of-200');
      expect(meta.schema).toBeDefined();
      expect(meta.schema).toHaveProperty('@type', 'MathSolver');
      expect(meta.schema).toHaveProperty('steps');
    });

    it('should include all required meta properties', () => {
      const meta = seoService.generateMetaInfo(mockCalculation);
      
      expect(meta).toHaveProperty('title');
      expect(meta).toHaveProperty('description');
      expect(meta).toHaveProperty('canonical');
      expect(meta.openGraph).toBeDefined();
      expect(meta.openGraph).toHaveProperty('title');
      expect(meta.openGraph).toHaveProperty('description');
      expect(meta.openGraph).toHaveProperty('url');
    });
  });

  describe('generateSiteMetadata', () => {
    it('should generate correct site metadata', () => {
      const metadata = seoService.generateSiteMetadata();

      expect(metadata.title.default).toContain('Percentage Calculator');
      expect(metadata.description).toContain('step-by-step solutions');
      expect(metadata.keywords).toContain('percentage calculator');
      expect(metadata.openGraph).toBeDefined();
      expect(metadata.openGraph.images).toHaveLength(1);
    });
  });

  describe('generateBreadcrumbs', () => {
    it('should generate correct breadcrumbs', () => {
      const breadcrumbs = seoService.generateBreadcrumbs(mockCalculation);

      expect(breadcrumbs['@type']).toBe('BreadcrumbList');
      expect(breadcrumbs.itemListElement).toHaveLength(2);
      expect(breadcrumbs.itemListElement[0].name).toBe('Home');
      expect(breadcrumbs.itemListElement[1].position).toBe(2);
    });

    it('should generate home-only breadcrumbs when no calculation provided', () => {
      const breadcrumbs = seoService.generateBreadcrumbs();

      expect(breadcrumbs.itemListElement).toHaveLength(1);
      expect(breadcrumbs.itemListElement[0].name).toBe('Home');
    });
  });
}); 