// Importing the data
/*

const data = require('./data.json');

// Define TypeScript interfaces
interface Message {
    id: string;
  premise: string;
  message: string;
  messageVariations: string[];
  description: string;
  meaning: string;
  messageEncoder: string;
  messageDecoder: string;
  spatialContext: string;
  temporalContext: string;
  type: string;
  categories: string[];
  references: string[];
}

interface Data {
  category: string;
  value: number;
}

// Function to process the data
const processData = (): { category: string; value: number; fill: string }[] => {
  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
    "hsl(var(--chart-6))",
  ];

  // Type-safe reduce function with explicit generics
  const categoryCount = (data.messages as Message[]).reduce(
    (acc: Record<string, number>, message: Message) => {
      message.categories.forEach((category: string) => {
        acc[category] = (acc[category] || 0) + 1;
      });
      return acc;
    },
    {} as Record<string, number>
  );


  //console.log('Category Count:', categoryCount);

  return Object.entries(categoryCount).map(([category, value], index) => ({
    category,
    value: Number(value),
    fill: colors[index % colors.length],
  }));
};

// Run the function and log the results
//console.log('Processed Data:', processData());
export default processData;
 */

import data from './data.json'; // Use import syntax for consistency

// Define TypeScript interfaces
interface Message {
  id: string;
  premise: string;
  message: string;
  messageVariations: string[];
  description: string;
  meaning?: string; // Optional to account for missing values
  messageEncoder: string;
  messageDecoder: string;
  spatialContext: string;
  temporalContext: string;
  type: string;
  categories: string[];
  references: string[];
}

interface ChartData {
  category: string;
  value: number;
}

// Extract unique values dynamically
const getUniqueValues = <T extends keyof Message>(key: T): string[] => {
  const uniqueValues = Array.from(
    new Set(
      data.messages.flatMap((message: Message) => {
        const value = message[key];
        return Array.isArray(value) ? value : [value];
      })
    )
  ).filter((val): val is string => typeof val === "string"); // Filter non-string values

  //console.log(`Unique values for ${key}:`, uniqueValues);
  return uniqueValues;
};

// Function to process semantic category data
const processSemanticCategoryData = (): ChartData[] => {
  const categoryCount = data.messages.reduce<Record<string, number>>((acc, message: Message) => {
    message.categories.forEach((category) => {
      acc[category] = (acc[category] || 0) + 1;
    });
    return acc;
  }, {});

  //console.log("Category count:", categoryCount);

  return Object.entries(categoryCount).map(([category, value]) => ({
    category,
    value,
  }));
};

// Function to process type data
const processTypeData = (): ChartData[] => {
  const typeCount = data.messages.reduce<Record<string, number>>((acc, message: Message) => {
    acc[message.type] = (acc[message.type] || 0) + 1;
    return acc;
  }, {});

  //console.log("Type count:", typeCount);

  return Object.entries(typeCount).map(([type, value]) => ({
    category: type,
    value,
  }));
};

const processData = {
  semanticCategories: getUniqueValues('categories'),
  types: getUniqueValues('type'),
  categorizedBySemantic: processSemanticCategoryData(),
  categorizedByType: processTypeData(),
 messages: data.messages || [],

};

export default processData;