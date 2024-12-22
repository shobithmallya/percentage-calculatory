import { calculationService } from '@/services/calculation/service';
import { seoService } from '@/services/seo/service';
import { CalculationFormat } from '@/types/calculation';

export default async function TestPage() {
  // Test calculation
  const calculation = await calculationService.performCalculation(
    CalculationFormat.RATIO_TO_PERCENT,
    4000,
    5000
  );

  // Get SEO metadata
  const meta = seoService.generateMetaInfo(calculation);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Results</h1>
      
      <div className="space-y-6">
        {/* Calculation Result */}
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-bold mb-2">Calculation Result:</h2>
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(calculation, null, 2)}
          </pre>
        </div>

        {/* SEO Data */}
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-bold mb-2">SEO Metadata:</h2>
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(meta, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}