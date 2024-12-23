"use client"

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CalculatorForm from '@/components/calculator/CalculatorForm';
import ResultDisplay from '@/components/calculator/ResultDisplay';
import { Tabs } from '@/components/ui/tabs';

export default function Home() {
    const [calculationResult, setCalculationResult] = useState(null);

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Header />
            <main className="flex-grow flex flex-col items-center justify-center p-4">
                <section className="text-center mb-8">
                    <h1 className="text-4xl font-bold">Welcome to Our Service</h1>
                    <p className="mt-2 text-lg">Your description goes here. This is where you can explain what your service is about.</p>
                </section>

                <Tabs />

                <CalculatorForm setCalculationResult={setCalculationResult} />

                {calculationResult && <ResultDisplay calculation={calculationResult} />}
            </main>
            <Footer />
        </div>
    );
}
