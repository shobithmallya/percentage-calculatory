import CalculatorForm from '@/components/calculator/CalculatorForm';

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Welcome to the Percentage Calculator</h1>
      <CalculatorForm />
    </div>
  );
}
