import { Calculation } from '@/types/calculation';

interface Props {
  calculation: Calculation;
}

export default function ResultDisplay({ calculation }: { calculation: any }) {
    return (
      <div className="rounded-lg border p-4">
        <h2 className="text-xl font-bold">Result: {calculation.result}</h2>
        <p>
          {calculation.format_type?.replace(/_/g, ' ') || 'Unknown'} calculation
        </p>
        <h3 className="font-semibold">Steps:</h3>
        <ul>
          {calculation.calculation_steps.map((step: any) => (
            <li key={step.stepNumber}>
              <strong>Step {step.stepNumber}:</strong> {step.description} ({step.formula})
            </li>
          ))}
        </ul>
      </div>
    );
  }  