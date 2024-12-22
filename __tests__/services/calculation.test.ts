import { calculationService } from '@/services/calculation/service';
import { CalculationFormat } from '@/types/calculation';
import { supabase } from '@/lib/supabase/client';

// Mock Supabase client
jest.mock('@/lib/supabase/client', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn(() => ({ data: null, error: null }))
        }))
      })),
      insert: jest.fn((data) => ({
        select: jest.fn(() => ({
          single: jest.fn(() => ({
            data: {
              id: 'test-id',
              ...data,
              createdAt: expect.any(Date),
              lastAccessedAt: expect.any(Date)
            },
            error: null
          }))
        }))
      })),
      update: jest.fn(() => ({
        eq: jest.fn(() => Promise.resolve())
      }))
    }))
  }
}));

describe('calculationService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('performCalculation', () => {
    it('should calculate percentage of correctly', async () => {
      const result = await calculationService.performCalculation(
        CalculationFormat.PERCENTAGE_OF,
        10,
        200
      );
      expect(result.result).toBeCloseTo(20);
      expect(result.calculationSteps).toBeDefined();
      expect(result.calculationSteps.length).toBe(2);
    });

    it('should calculate ratio to percent correctly', async () => {
      const result = await calculationService.performCalculation(
        CalculationFormat.RATIO_TO_PERCENT,
        10,
        200
      );
      expect(result.result).toBeCloseTo(5);
      expect(result.calculationSteps).toBeDefined();
      expect(result.calculationSteps.length).toBe(2);
    });

    it('should calculate percent difference correctly', async () => {
      const result = await calculationService.performCalculation(
        CalculationFormat.PERCENT_DIFFERENCE,
        100,
        200
      );
      expect(result.result).toBeCloseTo(66.66666666666666);
      expect(result.calculationSteps).toBeDefined();
      expect(result.calculationSteps.length).toBe(3);
    });

    it('should calculate percent off correctly', async () => {
      const result = await calculationService.performCalculation(
        CalculationFormat.PERCENT_OFF,
        10,
        200
      );
      expect(result.result).toBeCloseTo(180);
      expect(result.calculationSteps).toBeDefined();
      expect(result.calculationSteps.length).toBe(2);
    });
  });

  describe('generateSlug', () => {
    it('should generate correct slugs for different formats', async () => {
      const percentageOf = await calculationService.performCalculation(
        CalculationFormat.PERCENTAGE_OF,
        10,
        200
      );
      expect(percentageOf.slug).toBe('what-is-10-percent-of-200');

      const ratioToPercent = await calculationService.performCalculation(
        CalculationFormat.RATIO_TO_PERCENT,
        10,
        200
      );
      expect(ratioToPercent.slug).toBe('10-by-200-as-a-percent');
    });
  });

  describe('calculation steps', () => {
    it('should include step-by-step explanation', async () => {
      const result = await calculationService.performCalculation(
        CalculationFormat.PERCENTAGE_OF,
        10,
        200
      );
      
      expect(result.calculationSteps).toBeDefined();
      expect(result.calculationSteps.length).toBeGreaterThan(0);
      expect(result.calculationSteps[0]).toHaveProperty('description');
      expect(result.calculationSteps[0]).toHaveProperty('formula');
    });
  });
}); 