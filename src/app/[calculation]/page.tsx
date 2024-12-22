import { calculationService } from "@/services/calculation/service";
import ResultDisplay from "@/components/calculator/ResultDisplay";
import { notFound } from "next/navigation";

interface Props {
  params: {
    calculation: string;
  };
}

export default async function CalculationPage({ params }: Props) {
  const { calculation: calculationSlug } = await params; // Ensure `params` is awaited

  console.log('Fetching calculation for slug:', calculationSlug);

  const calculation = await calculationService.getCalculationBySlug(calculationSlug);

  console.log('Calculation:', calculation);

  if (!calculation) {
    notFound();
  }

  const formatType = calculation.formatType?.replace(/_/g, ' ') || 'Unknown';

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">
        {formatType} Calculator
      </h1>
      <ResultDisplay calculation={calculation} />
    </div>
  );
}
  