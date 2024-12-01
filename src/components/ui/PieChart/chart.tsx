
"use client";

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, Label } from "recharts";
import { useEffect, useState } from "react";
import processData from "../../../../data/processData";

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

interface ChartContainerProps {
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}

interface ChartData {
  category: string;
  value: number;
  fill: string;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({ hoveredIndex, setHoveredIndex }) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const data = processData.categorizedBySemantic.map((item) => ({
      ...item,
      fill: categoryColors[item.category] || "#ccc",
    }));
    setChartData(data);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="category"
            cx="50%"
            cy="50%"
            innerRadius={100}
            outerRadius={150}
            onMouseEnter={(_, index) => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            labelLine={false}
            label={(entry) => `${entry.value}`}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={entry.category}
                fill={entry.fill}
                style={{
                  transform: hoveredIndex === index ? "scale(1.1)" : "scale(1)",
                  transformOrigin: "center",
                  transition: "transform 0.2s ease-in-out",
                }}
                stroke={hoveredIndex === index ? "#000" : entry.fill}
                strokeWidth={hoveredIndex === index ? 2 : 1}
              />
            ))}
            <Label value="Category Distribution" position="centerBottom" className="text-lg font-semibold" />
          </Pie>
          <Tooltip formatter={(value, name) => [`${value}`, `${name} (${categoryFullNames[name]})`]} />
        </PieChart>
      </ResponsiveContainer>
      <Legend
        align="center"
        verticalAlign="bottom"
        formatter={(value) => `${value} (${categoryFullNames[value] || ""})`}
        wrapperStyle={{ fontSize: "12px" }}
      />
    </div>
  );
};
