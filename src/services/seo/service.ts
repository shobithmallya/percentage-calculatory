import { Calculation, CalculationFormat } from '@/types/calculation';

interface MetaInfo {
  title: string;
  description: string;
  canonical: string;
  openGraph: {
    title: string;
    description: string;
    url: string;
  };
  schema: object;
}

export const seoService = {
  generateMetaInfo(calculation: Calculation): MetaInfo {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const url = `${baseUrl}/${calculation.slug}`;

    const formatDescriptions = {
      [CalculationFormat.PERCENTAGE_OF]: `Calculate what is ${calculation.valueX}% of ${calculation.valueY}`,
      [CalculationFormat.RATIO_TO_PERCENT]: `Convert ${calculation.valueX}/${calculation.valueY} to a percentage`,
      [CalculationFormat.OUT_OF_PERCENTAGE]: `Calculate ${calculation.valueX} out of ${calculation.valueY} as a percentage`,
      [CalculationFormat.PERCENT_DIFFERENCE]: `Find the percentage difference between ${calculation.valueX} and ${calculation.valueY}`,
      [CalculationFormat.IS_WHAT_PERCENT]: `Calculate what percentage ${calculation.valueX} is of ${calculation.valueY}`,
      [CalculationFormat.PERCENT_OFF]: `Calculate ${calculation.valueX}% off ${calculation.valueY}`
    };

    const title = `${formatDescriptions[calculation.formatType]} | Percentage Calculator`;
    const description = `Learn how to ${formatDescriptions[calculation.formatType].toLowerCase()}. Step-by-step solution with detailed explanation. Result: ${calculation.result}`;

    return {
      title,
      description,
      canonical: url,
      openGraph: {
        title,
        description,
        url
      },
      schema: {
        '@context': 'https://schema.org',
        '@type': 'MathSolver',
        name: title,
        description,
        eduQuestionType: 'Percentage Calculation',
        text: formatDescriptions[calculation.formatType],
        resultText: `The result is ${calculation.result}`,
        steps: calculation.calculationSteps.map(step => ({
          '@type': 'Step',
          text: step.description,
          position: step.stepNumber
        }))
      }
    };
  },

  generateSiteMetadata() {
    return {
      title: {
        default: 'Percentage Calculator - Easy & Free Online Tool',
        template: '%s | Percentage Calculator'
      },
      description: 'Free online percentage calculator with step-by-step solutions. Calculate percentages easily with our user-friendly tool.',
      keywords: [
        'percentage calculator',
        'percent calculator',
        'calculate percentage',
        'percentage conversion',
        'percent off calculator',
        'percentage difference'
      ],
      openGraph: {
        type: 'website',
        locale: 'en_US',
        url: process.env.NEXT_PUBLIC_SITE_URL,
        siteName: 'Percentage Calculator',
        images: [
          {
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
            width: 1200,
            height: 630,
            alt: 'Percentage Calculator'
          }
        ]
      }
    };
  },

  generateBreadcrumbs(calculation?: Calculation) {
    const items = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: process.env.NEXT_PUBLIC_SITE_URL
      }
    ];

    if (calculation) {
      items.push({
        '@type': 'ListItem',
        position: 2,
        name: this.generateMetaInfo(calculation).title,
        item: `${process.env.NEXT_PUBLIC_SITE_URL}/${calculation.slug}`
      });
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items
    };
  }
}; 