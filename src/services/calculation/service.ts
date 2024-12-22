import { CalculationFormat, Calculation, CalculationStep } from '@/types/calculation';
import { supabase } from '@/lib/supabase/client';

function generateSlug(format: CalculationFormat, x: number, y: number): string {
  switch (format) {
    case CalculationFormat.PERCENTAGE_OF:
      return `what-is-${x}-percent-of-${y}`;
    case CalculationFormat.RATIO_TO_PERCENT:
      return `${x}-by-${y}-as-a-percent`;
    case CalculationFormat.OUT_OF_PERCENTAGE:
      return `${x}-out-of-${y}-as-a-percentage`;
    case CalculationFormat.PERCENT_DIFFERENCE:
      return `percent-difference-of-${x}-and-${y}`;
    case CalculationFormat.IS_WHAT_PERCENT:
      return `${x}-is-what-percentage-of-${y}`;
    case CalculationFormat.PERCENT_OFF:
      return `${x}-percent-off-${y}`;
  }
}

function calculateResult(format: CalculationFormat, x: number, y: number): { result: number; steps: CalculationStep[] } {
  switch (format) {
    case CalculationFormat.PERCENTAGE_OF: {
      const result = (x / 100) * y;
      const steps = [
        {
          stepNumber: 1,
          description: 'Convert percentage to decimal',
          formula: `${x}% = ${x}/100 = ${x/100}`,
          intermediateResult: x/100
        },
        {
          stepNumber: 2,
          description: 'Multiply decimal by the number',
          formula: `${x/100} × ${y} = ${result}`,
          intermediateResult: result
        }
      ];
      return { result, steps };
    }

    case CalculationFormat.RATIO_TO_PERCENT: {
      const result = (x / y) * 100;
      const steps = [
        {
          stepNumber: 1,
          description: 'Divide the first number by the second number',
          formula: `${x} ÷ ${y} = ${x/y}`,
          intermediateResult: x/y
        },
        {
          stepNumber: 2,
          description: 'Multiply by 100 to get percentage',
          formula: `${x/y} × 100 = ${result}%`,
          intermediateResult: result
        }
      ];
      return { result, steps };
    }

    case CalculationFormat.OUT_OF_PERCENTAGE: {
      const result = (x / y) * 100;
      const steps = [
        {
          stepNumber: 1,
          description: 'Divide the part by the whole',
          formula: `${x} ÷ ${y} = ${x/y}`,
          intermediateResult: x/y
        },
        {
          stepNumber: 2,
          description: 'Convert to percentage',
          formula: `${x/y} × 100 = ${result}%`,
          intermediateResult: result
        }
      ];
      return { result, steps };
    }

    case CalculationFormat.PERCENT_DIFFERENCE: {
      const difference = Math.abs(y - x);
      const average = (x + y) / 2;
      const result = (difference / average) * 100;
      const steps = [
        {
          stepNumber: 1,
          description: 'Find the absolute difference between the numbers',
          formula: `|${y} - ${x}| = ${difference}`,
          intermediateResult: difference
        },
        {
          stepNumber: 2,
          description: 'Calculate the average of the two numbers',
          formula: `(${x} + ${y}) ÷ 2 = ${average}`,
          intermediateResult: average
        },
        {
          stepNumber: 3,
          description: 'Divide difference by average and multiply by 100',
          formula: `(${difference} ÷ ${average}) × 100 = ${result}%`,
          intermediateResult: result
        }
      ];
      return { result, steps };
    }

    case CalculationFormat.IS_WHAT_PERCENT: {
      const result = (x / y) * 100;
      const steps = [
        {
          stepNumber: 1,
          description: 'Divide the first number by the second number',
          formula: `${x} ÷ ${y} = ${x/y}`,
          intermediateResult: x/y
        },
        {
          stepNumber: 2,
          description: 'Convert to percentage',
          formula: `${x/y} × 100 = ${result}%`,
          intermediateResult: result
        }
      ];
      return { result, steps };
    }

    case CalculationFormat.PERCENT_OFF: {
      const discount = (x / 100) * y;
      const result = y - discount;
      const steps = [
        {
          stepNumber: 1,
          description: 'Calculate the discount amount',
          formula: `${x}% of ${y} = (${x}/100) × ${y} = ${discount}`,
          intermediateResult: discount
        },
        {
          stepNumber: 2,
          description: 'Subtract discount from original price',
          formula: `${y} - ${discount} = ${result}`,
          intermediateResult: result
        }
      ];
      return { result, steps };
    }

    default:
      throw new Error('Calculation type not implemented');
  }
}

export const calculationService = {
  async performCalculation(format: CalculationFormat, x: number, y: number): Promise<Calculation> {
    // Check if calculation exists
    const slug = generateSlug(format, x, y);
    const { data: existingCalc } = await supabase
      .from('calculations')
      .select('*')
      .eq('slug', slug)
      .single();

    if (existingCalc) {
      // Update access count and return existing calculation
      await supabase
        .from('calculations')
        .update({ 
          access_count: existingCalc.access_count + 1,
          last_accessed_at: new Date().toISOString()
        })
        .eq('id', existingCalc.id);
      
      return existingCalc as Calculation;
    }

    // Perform new calculation
    const { result, steps } = calculateResult(format, x, y);

    // Create new calculation record
    const calculation: Omit<Calculation, 'id'> = {
      formatType: format,
      valueX: x,
      valueY: y,
      result,
      slug,
      createdAt: new Date(),
      lastAccessedAt: new Date(),
      accessCount: 1,
      isAutomated: false,
      calculationSteps: steps,
      relatedFormats: [] // Will be populated by generateRelatedCalculations
    };

    const { data, error } = await supabase
      .from('calculations')
      .insert(calculation)
      .select()
      .single();

    if (error) throw error;
    return data as Calculation;
  },

  async getCalculationBySlug(slug: string): Promise<Calculation | null> {
    const { data, error } = await supabase
      .from('calculations')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    return data as Calculation | null;
  },

  async generateRelatedCalculations(calculation: Calculation): Promise<void> {
    // Generate related calculations using the same numbers
    const relatedFormats = Object.values(CalculationFormat)
      .filter(format => format !== calculation.formatType)
      .map(format => ({
        formatType: format,
        slug: generateSlug(format, calculation.valueX, calculation.valueY),
        description: `Calculate ${calculation.valueX} and ${calculation.valueY} as ${format}`,
        result: calculateResult(format, calculation.valueX, calculation.valueY).result
      }));

    await supabase
      .from('calculations')
      .update({ related_formats: relatedFormats })
      .eq('id', calculation.id);
  }
};
