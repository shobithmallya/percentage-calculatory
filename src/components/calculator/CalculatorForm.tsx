"use client"

import { useState } from 'react';
import { CalculationFormat } from '@/types/calculation';
import { calculationService } from '@/services/calculation/service';
import { useRouter } from 'next/navigation';

export default function CalculatorForm() {
  const [valueX, setValueX] = useState<number>(0);
  const [valueY, setValueY] = useState<number>(0);
  const [format, setFormat] = useState<CalculationFormat>(CalculationFormat.PERCENTAGE_OF);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      const calculationResult = await calculationService.performCalculation(format, valueX, valueY);
      router.push(`/${calculationResult.slug}`);
    } catch (err) {
      setError('An error occurred while performing the calculation.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="valueX">Value X:</label>
        <input
          type="number"
          id="valueX"
          value={valueX}
          onChange={(e) => setValueX(Number(e.target.value))}
          className="border p-2"
          required
        />
      </div>
      <div>
        <label htmlFor="valueY">Value Y:</label>
        <input
          type="number"
          id="valueY"
          value={valueY}
          onChange={(e) => setValueY(Number(e.target.value))}
          className="border p-2"
          required
        />
      </div>
      <div>
        <label htmlFor="format">Calculation Type:</label>
        <select
          id="format"
          value={format}
          onChange={(e) => setFormat(e.target.value as CalculationFormat)}
          className="border p-2"
        >
          <option value={CalculationFormat.PERCENTAGE_OF}>What is X% of Y</option>
          <option value={CalculationFormat.RATIO_TO_PERCENT}>X/Y as a percent</option>
          <option value={CalculationFormat.OUT_OF_PERCENTAGE}>X out of Y as a percentage</option>
          <option value={CalculationFormat.PERCENT_DIFFERENCE}>Percent Difference Between X and Y</option>
          <option value={CalculationFormat.IS_WHAT_PERCENT}>X is what percentage of Y</option>
          <option value={CalculationFormat.PERCENT_OFF}>X% off Y</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-600 text-white p-2">Calculate</button>

      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
} 