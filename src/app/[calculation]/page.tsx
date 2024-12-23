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
      <div className=" max-w-screen-xl mx-auto px-8 py-4 border-l border-r border-grid border-b">
        <h1 className="text-3xl font-bold text-center mb-8">
        {calculation.format_type?.replace(/_/g, ' ') || 'Unknown'} Calculator
        </h1>
        <ResultDisplay calculation={calculation} />
      </div>
    );
  }
  