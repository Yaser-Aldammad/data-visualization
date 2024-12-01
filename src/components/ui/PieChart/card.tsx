
"use client";

import { useState, useEffect } from "react";
import { ChartContainer } from "./chart"; // Import the chart container
import processData from "../../../../data/processData"; // Ensure correct path

const categoryColors: Record<string, string> = {
  CO: "#FF6347",
  NP: "#3CB371",
  SE: "#4682B4",
  EE: "#FFD700",
  EC: "#FF8C00",
  ECM: "#000000",
  QI: "#DC143C",
  WS: "#20B2AA",
};

const categoryFullNames: Record<string, string> = {
  CO: "Coordination",
  NP: "Navigation & Positioning",
  SE: "Safety & Emergency",
  EE: "Emotion & Expression",
  EC: "Environment Conditions",
  ECM: "Equipment & Communication",
  QI: "Quantitative Information",
  WS: "Wildlife Sightings",
};

interface ChartData {
  category: string;
  value: number;
}

const CategoryFooter = () => (
  <div className="flex flex-col justify-start items-start mt-2 mr-4">
    {Object.entries(categoryFullNames).map(([key]) => (
      <div key={key} className="flex items-center mb-2">
        <span
          className="w-3 h-3 rounded-full mr-2"
          style={{ backgroundColor: categoryColors[key] }}
        />
        <span className="text-sm font-semibold">{key}</span>
      </div>
    ))}
  </div>
);

export const PieCard = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);

useEffect(() => {
  const data = processData.categorizedBySemantic.map((item) => ({
    ...item,
    fill: categoryColors[item.category] || "#ccc",
  }));
  setChartData(data);
}, []);


  return (
    <div className="card flex flex-col p-6 shadow-lg rounded-lg bg-white max-w-5xl mx-auto">
      <div className="card-header mb-4 text-center">
        <h2 className="text-2xl font-bold">Semantic Category Distribution</h2>
        <p className="text-sm text-gray-500">Message Categories Overview</p>
      </div>
      <div className="card-content flex">
        <CategoryFooter /> {/* Footer positioned vertically */}
        <div className="flex-1">
          <ChartContainer
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        </div>
      </div>
      <div className="card-footer mt-6">
        <h3 className="text-lg font-semibold text-center">Category Details</h3>
        <table className="table-auto w-full mt-4 border-collapse border border-gray-300 text-sm">
          <thead>
            <tr>
              <th className="border px-4 py-2">Color</th>
              <th className="border px-4 py-2 text-left">Abbreviation</th>
              <th className="border px-4 py-2 text-left">Full Name</th>
              <th className="border px-4 py-2 text-right">Count</th>
            </tr>
          </thead>
          <tbody>
            {chartData.map((entry, index) => (
              <tr
                key={entry.category}
                className={`${hoveredIndex === index ? "bg-gray-200" : ""}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <td className="border px-4 py-2 text-center">
                  <div
                    className="w-4 h-4 rounded-full mx-auto"
                    style={{ backgroundColor: categoryColors[entry.category] }}
                  ></div>
                </td>
                <td className="border px-4 py-2">{entry.category}</td>
                <td className="border px-4 py-2">{categoryFullNames[entry.category]}</td>
                <td className="border px-4 py-2 text-right">{entry.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
