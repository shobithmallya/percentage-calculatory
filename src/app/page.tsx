"use client"

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import CalculatorForm from '@/components/calculator/CalculatorForm';
import ResultDisplay from '@/components/calculator/ResultDisplay';

export default function Home() {
  const [calculationResult, setCalculationResult] = useState(null);

  return (
    <div className="flex flex-col bg-background text-foreground max-w-screen-xl mx-auto">
      <main className="flex-grow flex-col items-center justify-center  border-l border-r border-grid">
        <section className="text-center mt-12">
          <Badge variant="secondary" className='m-4 rounded-xl'>#1 Percentage Calculator</Badge>
          <h1 className="text-6xl font-bold mb-4">Welcome to Our Service</h1>
          <p className="mt-2 text-lg text-gray-600">Your description goes here. This is where you can explain what your service is about.</p>
          <Separator className='mt-8' />
        </section>
        <CalculatorForm setCalculationResult={setCalculationResult} />
        {calculationResult && <ResultDisplay calculation={calculationResult} />}
      </main>
    </div>
  );
}
