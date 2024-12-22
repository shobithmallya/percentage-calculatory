import { Metadata } from 'next';
import { calculationService } from '@/services/calculation/service';
import { seoService } from '@/services/seo/service';
import ResultDisplay from '@/components/calculator/ResultDisplay';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    calculation: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const calculation = await calculationService.getCalculationBySlug(params.calculation);
  if (!calculation) return {};
  
  const meta = seoService.generateMetaInfo(calculation);
  return {
    title: meta.title,
    description: meta.description,
    openGraph: meta.openGraph,
    alternates: {
      canonical: meta.canonical
    }
  };
}

export default async function CalculationPage({ params }: Props) {
  const calculation = await calculationService.getCalculationBySlug(params.calculation);
  
  if (!calculation) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">
        {calculation.formatType.replace(/_/g, ' ')} Calculator
      </h1>
      <ResultDisplay calculation={calculation} />
    </div>
  );
} 