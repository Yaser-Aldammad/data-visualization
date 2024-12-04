"use client";

import React, { useState, useEffect } from "react";
import { Treemap, Tooltip, ResponsiveContainer } from "recharts";
import processData from "../../../../data/processData";

interface TreemapData {
  name: string;
  value: number;
  fill: string;
}

// Generate unique colors for categories
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
  const [ categoryColors, setCategoryColors ] = useState<Record<string, string>>({});
  const [hoveredName, setHoveredName] = useState<string | null>(null); // State for hover interaction


  useEffect(() => {
    const allReferences = processData.messages.flatMap((msg) => msg.references);
    const uniqueReferences = Array.from(new Set(allReferences));
    const colors = generateCategoryColors(uniqueReferences);

    const data = uniqueReferences.map((ref) => ({
      name: ref,
      value: allReferences.filter((item) => item === ref).length,
      fill: colors[ref],
    }));

    // Sort data to ensure better rendering order
    const sortedData = data.sort((a, b) => b.value - a.value);

    setTreemapData(sortedData);
    setCategoryColors(colors);

    //console.log("Treemap Data: ", sortedData); // Debugging: Verify data includes all references
  }, []);

  // Custom content for the treemap to ensure small sections are displayed
const CustomTreemapContent = (props: any) => {
  const { x, y, width, height, name, fill } = props;

  // Ensure a minimum size for small cells
  const minimumWidth = 5;
  const minimumHeight = 5;
  const isSmall = width < minimumWidth || height < minimumHeight;

  // Dynamically adjust font size
  const fontSize = Math.min(width, height) / 5;

  // Determine whether text can be displayed
  const displayText = !isSmall && width > 20 && height > 10;

  // Debugging missing cells
  console.log(`Rendering Cell: ${name}, Width: ${width}, Height: ${height}, IsSmall: ${isSmall}`);

  return (
    <g
      onMouseEnter={() => setHoveredName(name)} // Highlight the row in the table
      onMouseLeave={() => setHoveredName(null)} // Clear the hover state
    >
      {/* Render the rectangle with a minimum size */}
      <rect
        x={x}
        y={y}
        width={Math.max(width, minimumWidth)}
        height={Math.max(height, minimumHeight)}
        style={{
          fill,
          stroke: hoveredName === name ? "#000" : "#fff", // Highlight on hover
          strokeWidth: hoveredName === name ? 2 : 1,
        }}
      />

      {/* Conditionally display the text */}
      {displayText && (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          fill="#fff"
          fontSize={Math.max(fontSize, 10)}
        >
          {name} {/* Only show the name */}
        </text>
      )}

      {/* Optional: Add visual cues for small sections */}
      {isSmall && (
        <circle
          cx={x + width / 2}
          cy={y + height / 2}
          r={2} // Small dot indicator for tiny sections
          fill="#fff"
        />
      )}
    </g>
  );
};


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
          content={<CustomTreemapContent />}
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
        <h3 className="text-lg font-semibold">Legend: References and Counts</h3>
        <table className="table-auto w-full mt-4 border-collapse border border-gray-300 text-sm">
          <thead>
            <tr>
              <th className="border px-4 py-2">Color</th>
              <th className="border px-4 py-2 text-left">Reference</th>
              <th className="border px-4 py-2 text-left">Count</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(categoryColors).map(([key, color]) => {
              const count = treemapData.find((item) => item.name === key)?.value || 0;
              return (
                <tr
                  key={key}
                  onMouseEnter={() => setHoveredName(key)} // Highlight the section in the chart
                  onMouseLeave={() => setHoveredName(null)} // Clear the hover state
                  className={`${
                    hoveredName === key ? "bg-gray-200" : ""
                  }`} // Highlight row on hover
                >
                  <td className="border px-4 py-2 text-center">
                    <div
                      className="w-4 h-4 rounded-full mx-auto"
                      style={{ backgroundColor: color }}
                    ></div>
                  </td>
                  <td className="border px-4 py-2">{key}</td>
                  <td className="border px-4 py-2">{count}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TreemapChart;
