"use client";

import React, { useState, useEffect } from "react";
import { Treemap, Tooltip, ResponsiveContainer } from "recharts";
import processData from "../../../../data/processData";

interface TreemapData {
  name: string;
  value: number;
  fill: string;
}

// Dynamically generate colors for unique references
const generateCategoryColors = (categories: string[]): Record<string, string> => {
  const baseColors = [
    "#FF6347", "#3CB371", "#4682B4", "#FFD700", "#FF8C00", "#DC143C",
    "#20B2AA", "#8A2BE2", "#00008B", "#CCCCCC", "#FF69B4", "#32CD32",
    "#4B0082", "#FF4500", "#2E8B57", "#9400D3", "#00CED1", "#B8860B",
    "#4169E1", "#8B0000", "#B22222", "#5F9EA0", "#9ACD32", "#FFA07A",
  ];

  return categories.reduce((acc, category, index) => {
    acc[category] = baseColors[index % baseColors.length];
    return acc;
  }, {} as Record<string, string>);
};

const TreemapChart: React.FC = () => {
  const [treemapData, setTreemapData] = useState<TreemapData[]>([]);
  const [categoryColors, setCategoryColors] = useState<Record<string, string>>({});

  useEffect(() => {
    const allReferences = processData.messages.flatMap((msg) => msg.references);
    const uniqueReferences = Array.from(new Set(allReferences));
    const colors = generateCategoryColors(uniqueReferences);

    const data = uniqueReferences.map((ref) => ({
      name: ref,
      value: allReferences.filter((item) => item === ref).length,
      fill: colors[ref],
    }));

    setTreemapData(data);
    setCategoryColors(colors);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Treemap of Referenced Documents</h2>
      <ResponsiveContainer width="100%" height={400}>
        <Treemap
          data={treemapData}
          dataKey="value"
          nameKey="name"
          stroke="#fff"
          fill="#8884d8"
          label={({ name, value, depth }) =>
            depth === 1 && value > 2 ? `${name} (${value})` : ""
          } // Show labels only for meaningful sizes
        >
          <Tooltip
            formatter={(value: number, name: string) => [
              `${value}`,
              `Reference: ${name}`,
            ]}
            cursor={{ strokeDasharray: "3 3" }}
          />
        </Treemap>
      </ResponsiveContainer>

      {/* Legend Table */}
      <div className="mt-6 text-center w-full">
        <h3 className="text-lg font-semibold">Legend: References and Colors</h3>
        <table className="table-auto w-full mt-4 border-collapse border border-gray-300 text-sm">
          <thead>
            <tr>
              <th className="border px-4 py-2">Color</th>
              <th className="border px-4 py-2 text-left">Reference</th>
              <th className="border px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(categoryColors).map(([key, color]) => (
              <tr key={key}>
                <td className="border px-4 py-2 text-center">
                  <div
                    className="w-4 h-4 rounded-full mx-auto"
                    style={{ backgroundColor: color }}
                  ></div>
                </td>
                <td className="border px-4 py-2">{key}</td>
                <td className="border px-4 py-2">
                  {/* Replace with actual descriptions if available */}
                  Description for {key}.
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TreemapChart;
