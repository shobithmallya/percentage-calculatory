"use client"

import { useState } from 'react';
import { CalculationFormat } from '@/types/calculation';
import { calculationService } from '@/services/calculation/service';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface CalculatorFormProps {
    setCalculationResult: (result: any) => void; // Adjust type as needed
}

export default function CalculatorForm({ setCalculationResult }: CalculatorFormProps) {
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
            setCalculationResult(calculationResult); // Set the result in the parent component
            router.push(`/${calculationResult.slug}`); // Update the route
        } catch (err) {
            setError('An error occurred while performing the calculation.');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mx-auto px-4">
            <div className='space-y-2 mb-8'>
                <label htmlFor="format">Calculation Type:</label>
                <Tabs value={format} onValueChange={(value) => setFormat(value as CalculationFormat)} className="p-2 w-full">
                    <TabsList className="grid grid-cols-5 h-auto">
                        <TabsTrigger className="px-4 py-2 h-auto" value={CalculationFormat.PERCENTAGE_OF}>What is X% of Y</TabsTrigger>
                        <TabsTrigger className="px-4 py-2 h-auto" value={CalculationFormat.RATIO_TO_PERCENT}>X/Y as a percent</TabsTrigger>
                        <TabsTrigger className="px-4 py-2 h-auto" value={CalculationFormat.OUT_OF_PERCENTAGE}>X out of Y as a percentage</TabsTrigger>
                        <TabsTrigger className="px-4 py-2 h-auto" value={CalculationFormat.PERCENT_DIFFERENCE}>Percent Difference Between X and Y</TabsTrigger>
                        <TabsTrigger className="px-4 py-2 h-auto" value={CalculationFormat.IS_WHAT_PERCENT}>X is what percentage of Y</TabsTrigger>
                    </TabsList>
                    <TabsContent value={format}>
                        {/* Content can be added here if needed */}
                    </TabsContent>
                </Tabs>
            </div>
            <Card className="w-full">
                <CardContent className="space-y-6 p-6">
                    <div className="space-y-2">
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
                    <div className="space-y-2">
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

                    {/* Calculate Button */}
                    <div>
                        <Button type="submit" className="w-auto">
                            Calculate
                        </Button>
                    </div>

                    {error && <p className="text-red-500">{error}</p>}
                </CardContent>
            </Card>

        </form>
    );
} 